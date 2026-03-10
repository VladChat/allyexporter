export const company = {
  legalName: "AllyExporter LLC",
  displayName: "AllyExporter LLC",
  phone: "(224) 532-9236",
  email: "contact@allyexporter.com",
  addressLine1: "130 Old Oak Drive, Apt 247",
  city: "Buffalo Grove",
  state: "IL",
  zip: "60089",
  country: "USA",

  get fullAddress() {
    return `${this.addressLine1}, ${this.city}, ${this.state} ${this.zip}, ${this.country}`;
  },

  hero: {
    headline: "AllyExporter LLC",
    subheadline:
      "A U.S.-based company providing official business information and public contact details.",
    cta: "Contact Us",
  },

  about: {
    title: "About",
    metaDescription:
      "Learn about AllyExporter LLC — a U.S.-registered company based in Illinois.",
  },

  contact: {
    title: "Contact",
    metaDescription:
      "Get in touch with AllyExporter LLC. Reach us by phone, email, or contact form.",
  },

  privacy: {
    title: "Privacy Policy",
    metaDescription:
      "Privacy Policy for AllyExporter LLC website.",
  },

  terms: {
    title: "Terms of Use",
    metaDescription:
      "Terms of Use for the AllyExporter LLC website.",
  },

  home: {
    metaTitle: "AllyExporter LLC — Official Company Website",
    metaDescription:
      "AllyExporter LLC is a U.S.-based company. Visit for official business information and contact details.",
  },

  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} AllyExporter LLC. All rights reserved.`,
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Use",
  },

  whatWeDo: [
    {
      title: "Business Operations",
      description:
        "AllyExporter LLC manages and coordinates business activities across its operational scope within the United States.",
    },
    {
      title: "Brand Management",
      description:
        "The company maintains its brand presence and manages official accounts across digital platforms and app marketplaces.",
    },
    {
      title: "Public Company Contact",
      description:
        "This website serves as the official public point of contact for AllyExporter LLC, providing verified company information.",
    },
  ],
} as const;
