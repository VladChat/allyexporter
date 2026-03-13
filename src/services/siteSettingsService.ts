import { company } from "@/config/company";
import { supabaseClient } from "@/lib/supabaseClient";

export type PublicSiteSettings = {
  phone: string;
  email: string;
  address: string;
};

export type SiteSettingsRecord = PublicSiteSettings & {
  id: string;
  updated_at?: string;
};

export type SiteSettingsUpdateInput = {
  phone: string;
  email: string;
  address: string;
};

export const fallbackSiteSettings: PublicSiteSettings = {
  phone: company.phone,
  email: company.email,
  address: company.fullAddress,
};

const SETTINGS_COLUMNS_WITH_UPDATED_AT = "id, phone, email, address, updated_at";
const SETTINGS_COLUMNS_BASE = "id, phone, email, address";

type QueryError = {
  message: string;
  code?: string | null;
};

const isMissingSiteSettingsTableError = (error: QueryError | null) => {
  const message = error?.message?.toLowerCase() ?? "";
  return message.includes("public.site_settings") && message.includes("schema cache");
};

const isMissingUpdatedAtColumnError = (error: QueryError | null) => {
  const message = error?.message?.toLowerCase() ?? "";
  const isUndefinedColumnCode = error?.code === "42703";
  const referencesUpdatedAt = message.includes("updated_at");
  const referencesSiteSettings = message.includes("site_settings");
  const indicatesMissingColumn =
    message.includes("schema cache") || message.includes("does not exist");

  return (
    referencesUpdatedAt &&
    indicatesMissingColumn &&
    (referencesSiteSettings || isUndefinedColumnCode)
  );
};

const isNoRowsReturnedError = (error: QueryError | null) => error?.code === "PGRST116";

const toSiteSettingsRecord = (data: {
  id: string;
  phone: string;
  email: string;
  address: string;
  updated_at?: string;
}): SiteSettingsRecord => ({
  id: data.id,
  phone: data.phone,
  email: data.email,
  address: data.address,
  updated_at: data.updated_at,
});

const createMissingSiteSettingsTableError = () =>
  new Error(
    "Could not find table public.site_settings in the schema cache. Run docs/admin-panel-supabase.sql in Supabase SQL Editor for this project.",
  );

const normalizeSettings = (value?: Partial<PublicSiteSettings> | null): PublicSiteSettings => ({
  phone: value?.phone || fallbackSiteSettings.phone,
  email: value?.email || fallbackSiteSettings.email,
  address: value?.address || fallbackSiteSettings.address,
});

async function getFirstSiteSettingsRecord(): Promise<SiteSettingsRecord | null> {
  const primaryQuery = await supabaseClient
    .from("site_settings")
    .select(SETTINGS_COLUMNS_WITH_UPDATED_AT)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (primaryQuery.error) {
    if (isMissingSiteSettingsTableError(primaryQuery.error)) {
      return null;
    }

    if (isMissingUpdatedAtColumnError(primaryQuery.error)) {
      const fallbackQuery = await supabaseClient
        .from("site_settings")
        .select(SETTINGS_COLUMNS_BASE)
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (fallbackQuery.error) {
        if (isMissingSiteSettingsTableError(fallbackQuery.error)) {
          return null;
        }

        throw new Error(fallbackQuery.error.message);
      }

      if (!fallbackQuery.data) return null;

      return toSiteSettingsRecord(fallbackQuery.data);
    }

    throw new Error(primaryQuery.error.message);
  }

  if (!primaryQuery.data) return null;

  return toSiteSettingsRecord(primaryQuery.data);
}

export async function getLatestSiteSettingsRecord(): Promise<SiteSettingsRecord | null> {
  return getFirstSiteSettingsRecord();
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const record = await getLatestSiteSettingsRecord();
  return normalizeSettings(record);
}

export async function upsertSiteSettings(
  values: SiteSettingsUpdateInput,
  currentId?: string | null,
): Promise<SiteSettingsRecord> {
  const payloadWithoutUpdatedAt = {
    phone: values.phone,
    email: values.email,
    address: values.address,
  };

  const payloadWithUpdatedAt = {
    ...payloadWithoutUpdatedAt,
    updated_at: new Date().toISOString(),
  };

  const existingRecord = currentId
    ? { id: currentId }
    : await getFirstSiteSettingsRecord();

  if (!existingRecord) {
    throw new Error("No existing site_settings row found to update.");
  }

  const primaryUpdate = await supabaseClient
    .from("site_settings")
    .update(payloadWithUpdatedAt)
    .eq("id", existingRecord.id)
    .select(SETTINGS_COLUMNS_WITH_UPDATED_AT)
    .single();

  if (!primaryUpdate.error && primaryUpdate.data) {
    return toSiteSettingsRecord(primaryUpdate.data);
  }

  if (primaryUpdate.error && isMissingUpdatedAtColumnError(primaryUpdate.error)) {
    const fallbackUpdate = await supabaseClient
      .from("site_settings")
      .update(payloadWithoutUpdatedAt)
      .eq("id", existingRecord.id)
      .select(SETTINGS_COLUMNS_BASE)
      .single();

    if (!fallbackUpdate.error && fallbackUpdate.data) {
      return toSiteSettingsRecord(fallbackUpdate.data);
    }

    if (fallbackUpdate.error) {
      if (isMissingSiteSettingsTableError(fallbackUpdate.error)) {
        throw createMissingSiteSettingsTableError();
      }

      if (isNoRowsReturnedError(fallbackUpdate.error)) {
        throw new Error("Selected site_settings row was not found for update.");
      }

      throw new Error(fallbackUpdate.error.message);
    }

    throw new Error("Failed to update site settings.");
  }

  if (primaryUpdate.error) {
    if (isMissingSiteSettingsTableError(primaryUpdate.error)) {
      throw createMissingSiteSettingsTableError();
    }

    if (isNoRowsReturnedError(primaryUpdate.error)) {
      throw new Error("Selected site_settings row was not found for update.");
    }

    throw new Error(primaryUpdate.error.message);
  }

  throw new Error("Failed to update site settings.");
}
