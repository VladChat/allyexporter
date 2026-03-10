import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta = ({ title, description }: PageMetaProps) => {
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

  return null;
};

export default PageMeta;
