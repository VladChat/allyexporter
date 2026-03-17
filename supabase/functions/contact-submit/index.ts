import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type ContactSubmitBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  captchaToken?: unknown;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 255;
const SUBJECT_MIN = 3;
const SUBJECT_MAX = 200;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

type RateLimitStore = Map<string, number[]>;

const globalStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: RateLimitStore;
};

const rateLimitStore: RateLimitStore = globalStore.__contactRateLimitStore ?? new Map<string, number[]>();
globalStore.__contactRateLimitStore = rateLimitStore;

const jsonResponse = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const toSafeString = (value: unknown) => (typeof value === "string" ? value : "");

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const normalizeSingleLineText = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, " ")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("");

const normalizeMessage = (value: string) =>
  value
    .replace(/\r\n/g, "\n")
    .split("")
    .filter((char) => char.charCodeAt(0) !== 0)
    .join("")
    .trim();

const hasControlCharacters = (value: string) => {
  for (const char of value) {
    const code = char.charCodeAt(0);
    const isSafeNewlineOrTab = code === 9 || code === 10 || code === 13;
    const isControl = (code >= 0 && code <= 31) || code === 127;

    if (isControl && !isSafeNewlineOrTab) {
      return true;
    }
  }

  return false;
};

const countUrlMatches = (value: string) => (value.match(/https?:\/\/|www\./gi) ?? []).length;

const hasRepeatedCharacters = (value: string) => /(.)\1{9,}/.test(value);

const hasSingleVeryLongToken = (value: string) => value.split(/\s+/).some((token) => token.length > 120);

const isLikelySpam = (subject: string, message: string) => {
  const combined = `${subject} ${message}`;

  if (countUrlMatches(combined) > 4) return true;
  if (hasRepeatedCharacters(combined)) return true;
  if (hasSingleVeryLongToken(combined)) return true;

  return false;
};

const getClientIp = (request: Request) => {
  const rawForwardedFor = request.headers.get("x-forwarded-for") ?? "";
  if (rawForwardedFor) {
    const [first] = rawForwardedFor.split(",");
    const normalized = first?.trim();
    if (normalized) return normalized;
  }

  const fallback =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded") ??
    "unknown";

  return fallback.trim() || "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history = rateLimitStore.get(ip) ?? [];
  const recentHistory = history.filter((timestamp) => timestamp >= windowStart);

  if (recentHistory.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recentHistory);
    return true;
  }

  recentHistory.push(now);
  rateLimitStore.set(ip, recentHistory);
  return false;
};

const verifyCaptchaIfEnabled = async (captchaToken: string, remoteIp: string) => {
  const captchaSecret = (Deno.env.get("CONTACT_CAPTCHA_SECRET") ?? "").trim();
  if (!captchaSecret) {
    return true;
  }

  if (!captchaToken) {
    return false;
  }

  const verifyUrl =
    (Deno.env.get("CONTACT_CAPTCHA_VERIFY_URL") ?? "https://challenges.cloudflare.com/turnstile/v0/siteverify").trim();

  const formPayload = new URLSearchParams({
    secret: captchaSecret,
    response: captchaToken,
    remoteip: remoteIp,
  });

  const verifyResponse = await fetch(verifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formPayload,
  });

  if (!verifyResponse.ok) {
    return false;
  }

  const verifyData = (await verifyResponse.json()) as { success?: boolean };
  return Boolean(verifyData.success);
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse(405, { success: false, error: "Method not allowed." });
  }

  let body: ContactSubmitBody;
  try {
    body = (await request.json()) as ContactSubmitBody;
  } catch {
    return jsonResponse(400, { success: false, error: "Invalid request payload." });
  }

  const requestIp = getClientIp(request);
  if (isRateLimited(requestIp)) {
    return jsonResponse(429, { success: false, error: "Too many requests. Please wait and try again." });
  }

  const honeypot = toSafeString(body.website).trim();
  if (honeypot) {
    return jsonResponse(200, { success: true });
  }

  const name = normalizeSingleLineText(toSafeString(body.name));
  const email = normalizeEmail(toSafeString(body.email));
  const subject = normalizeSingleLineText(toSafeString(body.subject));
  const message = normalizeMessage(toSafeString(body.message));

  if (hasControlCharacters(name) || hasControlCharacters(email) || hasControlCharacters(subject) || hasControlCharacters(message)) {
    return jsonResponse(400, { success: false, error: "Message not accepted." });
  }

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return jsonResponse(400, { success: false, error: "Name length is invalid." });
  }

  if (!email || email.length > EMAIL_MAX || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(400, { success: false, error: "Email is invalid." });
  }

  if (subject.length < SUBJECT_MIN || subject.length > SUBJECT_MAX) {
    return jsonResponse(400, { success: false, error: "Subject length is invalid." });
  }

  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return jsonResponse(400, { success: false, error: "Message length is invalid." });
  }

  if (isLikelySpam(subject, message)) {
    return jsonResponse(400, { success: false, error: "Message not accepted." });
  }

  const captchaToken = toSafeString(body.captchaToken).trim();
  const captchaValid = await verifyCaptchaIfEnabled(captchaToken, requestIp);
  if (!captchaValid) {
    return jsonResponse(400, { success: false, error: "Captcha verification failed." });
  }

  const supabaseUrl = (Deno.env.get("SUPABASE_URL") ?? "").trim();
  const serviceRoleKey = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "").trim();

  if (!supabaseUrl) {
    console.error("Edge Function: SUPABASE_URL not configured");
    return jsonResponse(500, { success: false, error: "Server configuration error: Supabase URL missing." });
  }

  if (!serviceRoleKey) {
    console.error("Edge Function: SUPABASE_SERVICE_ROLE_KEY not configured");
    return jsonResponse(500, { success: false, error: "Server configuration error: Service role key missing." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
  });

  if (error) {
    console.error("Edge Function: Failed to store message in Supabase:", error);
    return jsonResponse(500, { 
      success: false, 
      error: `Database error: ${error.message || "Could not store message"}` 
    });
  }

  console.log("Edge Function: Message stored successfully", { name, email, subject });
  return jsonResponse(200, { success: true });
});
