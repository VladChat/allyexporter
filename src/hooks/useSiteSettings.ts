import { useEffect, useState } from "react";
import {
  fallbackSiteSettings,
  getPublicSiteSettings,
  PublicSiteSettings,
} from "@/services/siteSettingsService";

type UseSiteSettingsResult = {
  settings: PublicSiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
};

export const useSiteSettings = (): UseSiteSettingsResult => {
  const [settings, setSettings] = useState<PublicSiteSettings>(fallbackSiteSettings);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const next = await getPublicSiteSettings();
      setSettings(next);
    } catch {
      setSettings(fallbackSiteSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return {
    settings,
    loading,
    refresh,
  };
};
