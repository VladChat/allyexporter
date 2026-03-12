export const company = {
  legalName: "AllyExporter LLC",
  displayName: "AllyExporter",
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

  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },

  home: {
    metaTitle: "AllyExporter LLC | Official Company Website",
    metaDescription:
      "Official website of AllyExporter LLC with company information, contact details, and legal pages.",
    heroHeadline: "AllyExporter",
    heroSubheadline: "Official company information and contact.",
    heroActionLabel: "Contact",
    companyTitle: "Company",
    companyParagraphs: [
      "AllyExporter LLC is a private company based in Illinois, United States.",
      "This website provides official company information, contact details, and legal pages.",
    ],
    aboutTitle: "About",
    aboutText: "Official company presence for verification and contact.",
    contactCtaTitle: "Business contact",
    contactCtaText: "For company inquiries, please use the contact page.",
    contactCtaActionLabel: "Contact",
  },

  about: {
    title: "About",
    metaDescription: "Company profile and official website scope for AllyExporter LLC.",
    intro: "Official company presence for verification and contact.",
    summary: [
      "AllyExporter LLC is a private company registered in Illinois, United States.",
      "The website is maintained as an official source for company identity, contact details, and legal information.",
      "The company owns and manages its brand assets and related business activities.",
    ],
  },

  contact: {
    title: "Contact",
    metaDescription: "Contact page for AllyExporter LLC.",
    intro: "Use this form for company inquiries.",
  },

  privacy: {
    title: "Privacy",
    metaDescription: "Privacy information for visitors using the AllyExporter website.",
  },

  terms: {
    title: "Terms",
    metaDescription: "Terms for using the AllyExporter website.",
  },

  footer: {
    privacyLabel: "Privacy",
    termsLabel: "Terms",
    contactLabel: "Contact",
    copyright: `© ${new Date().getFullYear()} AllyExporter LLC`,
  },
} as const;
