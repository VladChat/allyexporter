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
    metaTitle: "AllyExporter | International Sourcing and Export Operations",
    metaDescription:
      "AllyExporter LLC is a U.S.-based company focused on product sourcing, export logistics, and direct business partnerships.",
    headline: "AllyExporter",
    subheadline: "International product sourcing and export operations.",
    primaryActionLabel: "Contact",
    companyTitle: "Company",
    companyParagraphs: [
      "AllyExporter LLC is based in Illinois, United States, and operates as a private company focused on cross-border trade activity.",
      "The company manages product sourcing and export coordination for business clients through direct communication and operational planning.",
    ],
    operationsTitle: "Operations",
    operations: [
      {
        title: "Product sourcing",
        description: "Supplier review, product matching, and purchase coordination based on client requirements.",
      },
      {
        title: "Export logistics",
        description: "Shipment preparation, documentation support, and routing coordination for international delivery.",
      },
      {
        title: "Direct partnerships",
        description: "Structured communication between the company, suppliers, and buyers through defined channels.",
      },
    ],
    contactCtaTitle: "Business inquiries",
    contactCtaDescription: "Use the contact page for sourcing requests or export coordination.",
    contactCtaActionLabel: "Contact",
  },

  about: {
    title: "About",
    metaDescription: "Company profile of AllyExporter LLC, including scope of activity and operating approach.",
    intro:
      "AllyExporter LLC is a U.S. company that supports business clients with international sourcing and export-related operations.",
    sections: [
      {
        title: "Who we are",
        description: "A registered Illinois company focused on practical cross-border trade execution.",
      },
      {
        title: "What we do",
        description: "We coordinate sourcing, supplier communication, and export movement for selected product categories.",
      },
      {
        title: "How we operate",
        description: "Requests are handled through direct communication, clear scope definition, and step-by-step coordination.",
      },
    ],
  },

  contact: {
    title: "Contact",
    metaDescription: "Contact AllyExporter LLC for sourcing and export communication.",
    intro: "Use the form on this page for business communication. Messages are reviewed by the company team.",
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
