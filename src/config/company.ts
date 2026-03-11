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
      "Official website with verified company information and direct contact details.",
    cta: "Contact Us",
  },

  about: {
    title: "About",
    metaDescription:
      "Company profile and verified legal details for AllyExporter LLC in Illinois.",
  },

  contact: {
    title: "Contact",
    metaDescription:
      "Get in touch with AllyExporter LLC by email, phone, or contact form.",
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
    metaTitle: "AllyExporter LLC - Official Company Website",
    metaDescription:
      "Official AllyExporter LLC website with verified business and contact information.",
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
        "Coordinates day-to-day operations and business administration in the United States.",
    },
    {
      title: "Brand Presence",
      description:
        "Maintains official brand presence and communication channels across digital platforms.",
    },
    {
      title: "Public Contact",
      description:
        "Provides a verified channel for public and business inquiries.",
    },
  ],
} as const;