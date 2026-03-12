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

  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },

  home: {
    metaTitle: "AllyExporter LLC | Official Company Website",
    metaDescription:
      "Official website of AllyExporter LLC with company information, contact details, and legal pages.",
    heroHeadline: "AllyExporter LLC",
    heroSubheadline: "Official company profile, contact details, and legal pages.",
    heroActionLabel: "Get in touch",
    companyTitle: "Company",
    companyParagraphs: [
      "AllyExporter LLC is a private company based in Illinois, United States.",
      "This website provides official company information, contact details, and legal pages.",
      "The company owns and manages brand assets and related business activities.",
    ],
    aboutTitle: "About us",
    aboutText:
      "AllyExporter LLC is a private company based in Illinois, United States, and manages its own brands and related business assets.",
    aboutParagraphs: [
      "The website serves as an official source of company information for partners, clients, and verification needs.",
      "It provides clear contact details and access to legal pages in a concise, easy-to-navigate format.",
      "All published information is maintained to support transparent business communication.",
    ],
    contactCtaTitle: "Business contact",
    contactCtaText: "For general company inquiries, use the form below or our official contact details.",
    contactCtaActionLabel: "Send message",
  },

  about: {
    title: "About",
    metaDescription: "Company profile and official website scope for AllyExporter LLC.",
    intro: "Official company profile and contact reference.",
    summary: [
      "AllyExporter LLC is a private company based in Illinois, United States.",
      "This website serves as an official online company presence.",
      "It provides company information, contact details, and legal pages.",
      "The company owns and manages brand assets and related business activities.",
    ],
  },

  contact: {
    title: "Contact",
    metaDescription: "Contact page for AllyExporter LLC.",
    intro: "Use this page for general company inquiries. Please submit your message using the form below.",
  },

  privacy: {
    title: "Privacy Policy",
    metaDescription: "Privacy information for visitors using the AllyExporter website.",
  },

  terms: {
    title: "Terms of Use",
    metaDescription: "Terms for using the AllyExporter website.",
  },

  footer: {
    privacyLabel: "Privacy",
    termsLabel: "Terms",
    copyright: `© ${new Date().getFullYear()} AllyExporter LLC`,
  },
} as const;
