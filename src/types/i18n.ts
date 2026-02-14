export interface I18nTranslations {
  readonly nav: {
    readonly profile: string;
    readonly career: string;
    readonly education: string;
    readonly projects: string;
    readonly certificates: string;
    readonly blog: string;
    readonly testimonials: string;
    readonly contact: string;
  };
  readonly common: {
    readonly readMore: string;
    readonly download: string;
    readonly viewPdf: string;
    readonly present: string;
    readonly backToOverview: string;
    readonly filterAll: string;
    readonly noResults: string;
    readonly yearsExperience: string;
    readonly projectsCount: string;
    readonly certificatesCount: string;
    readonly technologiesCount: string;
  };
  readonly contact: {
    readonly namePlaceholder: string;
    readonly emailPlaceholder: string;
    readonly subjectPlaceholder: string;
    readonly messagePlaceholder: string;
    readonly submit: string;
    readonly successMessage: string;
    readonly validation: {
      readonly nameRequired: string;
      readonly emailInvalid: string;
      readonly messageRequired: string;
    };
  };
  readonly footer: {
    readonly imprint: string;
    readonly privacy: string;
    readonly copyright: string;
  };
  readonly print: {
    readonly title: string;
    readonly personalInfo: string;
    readonly workExperience: string;
    readonly educationSection: string;
    readonly skillsSection: string;
    readonly certificatesSection: string;
  };
}
