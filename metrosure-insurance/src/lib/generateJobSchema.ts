import { Job } from "@/data/jobs";

/**
 * Estimated salary ranges for different job categories in South Africa (ZAR)
 * These are market-competitive estimates for the insurance industry
 * Note: Actual compensation may vary based on experience and performance
 */
const salaryEstimates: Record<string, { min: number; max: number }> = {
  sales: { min: 5000, max: 22000 }, // Base + commission structure
  "call-centre": { min: 4500, max: 12000 },
  admin: { min: 7000, max: 15000 },
  trainee: { min: 3000, max: 7000 },
};

/**
 * Generates JobPosting JSON-LD structured data for Google for Jobs
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function generateJobPostingSchema(job: Job, baseUrl: string = "https://www.metrosuregroup.co.za") {
  // Map employment type to schema.org format
  const employmentTypeMap: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    "Contract": "CONTRACTOR",
    "Temporary": "TEMPORARY",
    "Internship": "INTERN",
  };

  // Map location to region code
  const locationToRegion = (location: string): string => {
    const regionMap: Record<string, string> = {
      "Gauteng": "GP",
      "KwaZulu-Natal": "KZN",
      "Western Cape": "WC",
      "Eastern Cape": "EC",
      "Free State": "FS",
      "Limpopo": "LP",
      "Mpumalanga": "MP",
      "North West": "NW",
      "Northern Cape": "NC",
      "All Provinces": "ZA",
    };
    return regionMap[location] || "ZA";
  };

  // Get salary estimate based on job category or title
  const getSalaryEstimate = (job: Job) => {
    // Check for trainee positions first
    if (job.title.toLowerCase().includes("trainee")) {
      return salaryEstimates.trainee;
    }
    return salaryEstimates[job.category] || salaryEstimates.sales;
  };

  const salary = getSalaryEstimate(job);

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.description}\n\nKey Responsibilities:\n${job.responsibilities.map(r => `- ${r}`).join("\n")}\n\nRequirements:\n${job.requirements.map(r => `- ${r}`).join("\n")}\n\nWhat We Offer:\n${job.offers.map(o => `- ${o}`).join("\n")}`,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: employmentTypeMap[job.type] || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Metrosure Insurance Brokers",
      sameAs: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      description: "FSP-licensed insurance brokerage providing comprehensive insurance solutions across South Africa.",
    },
    jobLocation: job.location === "All Provinces"
      ? {
          "@type": "Country",
          name: "South Africa",
          identifier: "ZA",
        }
      : {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "ZA",
            addressRegion: locationToRegion(job.location),
            addressLocality: job.location,
          },
        },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "South Africa",
    },
    // Estimated salary range for Google Jobs ranking
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "ZAR",
      value: {
        "@type": "QuantitativeValue",
        minValue: salary.min,
        maxValue: salary.max,
        unitText: "MONTH",
      },
    },
    jobBenefits: job.offers.join(", "),
    responsibilities: job.responsibilities.join(", "),
    qualifications: job.requirements.join(", "),
    industry: "Insurance",
    occupationalCategory: job.department,
    directApply: true,
    url: `${baseUrl}/careers/${job.slug}`,
  };

  return schema;
}

/**
 * Generates a script tag string for embedding the schema
 */
export function generateJobSchemaScript(job: Job, baseUrl?: string): string {
  const schema = generateJobPostingSchema(job, baseUrl);
  return JSON.stringify(schema);
}
