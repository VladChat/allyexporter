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

const SETTINGS_COLUMNS = "id, phone, email, address, updated_at";

const normalizeSettings = (value?: Partial<PublicSiteSettings> | null): PublicSiteSettings => ({
  phone: value?.phone || fallbackSiteSettings.phone,
  email: value?.email || fallbackSiteSettings.email,
  address: value?.address || fallbackSiteSettings.address,
});

export async function getLatestSiteSettingsRecord(): Promise<SiteSettingsRecord | null> {
  const { data, error } = await supabaseClient
    .from("site_settings")
    .select(SETTINGS_COLUMNS)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return {
    id: data.id,
    phone: data.phone,
    email: data.email,
    address: data.address,
    updated_at: data.updated_at,
  };
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const record = await getLatestSiteSettingsRecord();
  return normalizeSettings(record);
}

export async function upsertSiteSettings(
  values: SiteSettingsUpdateInput,
  currentId?: string | null,
): Promise<SiteSettingsRecord> {
  const payload = {
    phone: values.phone,
    email: values.email,
    address: values.address,
    updated_at: new Date().toISOString(),
  };

  if (currentId) {
    const { data, error } = await supabaseClient
      .from("site_settings")
      .update(payload)
      .eq("id", currentId)
      .select(SETTINGS_COLUMNS)
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      phone: data.phone,
      email: data.email,
      address: data.address,
      updated_at: data.updated_at,
    };
  }

  const { data, error } = await supabaseClient
    .from("site_settings")
    .insert(payload)
    .select(SETTINGS_COLUMNS)
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    phone: data.phone,
    email: data.email,
    address: data.address,
    updated_at: data.updated_at,
  };
}
