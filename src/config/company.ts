export const company = {
  legalName: "AllyExporter LLC",
  displayName: "AllyExporter LLC",
  domain: "allyexporter.com",
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
    subheadline: "Official company website with verified profile and contact information.",
    cta: "Contact the Company",
  },

  about: {
    title: "About",
    metaDescription: "Company profile and verified legal details for AllyExporter LLC in Illinois.",
  },

  contact: {
    title: "Contact",
    metaDescription: "Get in touch with AllyExporter LLC by email, phone, or contact form.",
  },

  privacy: {
    title: "Privacy Policy",
    metaDescription: "Privacy Policy for AllyExporter LLC website.",
  },

  terms: {
    title: "Terms of Use",
    metaDescription: "Terms of Use for the AllyExporter LLC website.",
  },

  home: {
    metaTitle: "AllyExporter LLC - Official Company Website",
    metaDescription: "Official AllyExporter LLC website with verified business and contact information.",
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
    tagline: "Official company reference website.",
  },

  overview: [
    {
      title: "Official Profile",
      description: "Publishes verified company identity and primary public contact details.",
    },
    {
      title: "Brand Presence",
      description: "Maintains company-managed brand presence across relevant digital platforms.",
    },
    {
      title: "Direct Contact",
      description: "Supports public and business inquiries through clear, direct contact channels.",
    },
    {
      title: "Legal Transparency",
      description: "Provides accessible website policies for privacy and terms of use.",
    },
  ],

  trust: {
    title: "Official Reference",
    description:
      "Information on this site is maintained by AllyExporter LLC for public verification and communication.",
  },

  finalCta: {
    title: "Need to reach AllyExporter LLC?",
    description: "Use the contact page for business or general inquiries.",
    actionLabel: "Go to Contact",
  },
} as const;
