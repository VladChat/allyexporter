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
    services: "Services",
    contact: "Contact",
  },

  home: {
    metaTitle: "AllyExporter LLC | Official Company Website",
    metaDescription:
      "Official website of AllyExporter LLC with company information, contact details, and legal pages.",
    heroHeadline: "AllyExporter LLC",
    heroSubheadline: "Official company profile, core services, and contact information for business communication.",
    heroActionLabel: "Get in touch",
    sectionNav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    companyTitle: "Company",
    companyParagraphs: [
      "AllyExporter LLC is a private company based in Illinois, United States.",
      "This website provides official company information, contact details, and legal pages.",
      "The company owns and manages brand assets and related business activities.",
    ],
    aboutTitle: "About us",
    aboutText:
      "AllyExporter LLC maintains a clear and reliable online company presence for partners, clients, and business verification.",
    aboutParagraphs: [
      "We focus on building trusted business relationships and clear communication channels with stakeholders.",
      "Our official website is designed to provide concise information, straightforward navigation, and dependable contact options.",
      "This digital presence supports transparency and helps partners quickly access key company details.",
    ],
    servicesTitle: "Our services",
    servicesIntro:
      "We provide practical support capabilities for business operations, communication, and partner collaboration.",
    services: [
      {
        title: "Consulting",
        description: "Business-focused guidance for operational clarity and strategic decision support.",
      },
      {
        title: "Solutions",
        description: "Structured company solutions designed around reliability, communication, and execution.",
      },
      {
        title: "Support",
        description: "Responsive assistance for inquiries, coordination, and ongoing business interactions.",
      },
    ],
    contactCtaTitle: "Business contact",
    contactCtaText: "For general company inquiries, use the form below or reach out using our official contact details.",
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
    tagline: "Official company information and communication channel.",
    quickLinksLabel: "Quick links",
    socialLabel: "Follow",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
    contactLabel: "Contact",
    copyright: `© ${new Date().getFullYear()} AllyExporter LLC`,
  },
} as const;
