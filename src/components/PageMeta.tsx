import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  structuredData?: Record<string, unknown>;
}

const STRUCTURED_DATA_SCRIPT_ID = "page-structured-data";

const PageMeta = ({ title, description, structuredData }: PageMetaProps) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = description;
      document.head.appendChild(el);
    }
  }, [title, description]);

  useEffect(() => {
    const existing = document.getElementById(STRUCTURED_DATA_SCRIPT_ID);

    if (!structuredData) {
      if (existing) {
        existing.remove();
      }
      return;
    }

    const script = existing ?? document.createElement("script");
    script.id = STRUCTURED_DATA_SCRIPT_ID;
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(structuredData);

    if (!existing) {
      document.head.appendChild(script);
    }
  }, [structuredData]);

  return null;
};

export default PageMeta;
