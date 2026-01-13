/**
 * Employee Testimonials for Careers Page
 * Real voices from the Metrosure team
 */

export interface EmployeeTestimonial {
  id: string;
  name: string;
  role: string;
  department: string;
  tenure: string;
  image: string;
  quote: string;
  shortQuote: string;
  location?: string;
}

export const employeeTestimonials: EmployeeTestimonial[] = [
  {
    id: "khayakazi",
    name: "Khayakazi Ndlovu",
    role: "Senior Sales Consultant",
    department: "Field Sales",
    tenure: "4 years",
    image: "/images/staff/khayakazi.jpg",
    quote:
      "When I joined Metrosure, I was fresh out of school with no experience. Today, I lead a team of 12 consultants. The training programmes here don't just teach you about insurance — they teach you about life, about connecting with people, about building a future you can be proud of.",
    shortQuote: "They teach you about building a future you can be proud of.",
    location: "Durban, KZN",
  },
  {
    id: "khwezi",
    name: "Khwezi Mthembu",
    role: "Call Centre Team Lead",
    department: "Customer Service",
    tenure: "3 years",
    image: "/images/staff/khwezi_2n.jpg",
    quote:
      "I started answering phones, now I'm coaching the next generation of customer champions. What I love most is that management actually listens. When I suggested improvements to our callback system, they implemented it within weeks. Your voice matters here.",
    shortQuote: "Your voice matters here.",
    location: "Johannesburg, GP",
  },
  {
    id: "mercutio",
    name: "Mercutio Dlamini",
    role: "Regional Manager",
    department: "Operations",
    tenure: "6 years",
    image: "/images/staff/mercutio_2.jpg",
    quote:
      "Six years ago, I walked into a Metrosure retail campaign looking for any job. Now I oversee operations across three provinces. This company believes in promoting from within — if you show up, work hard, and treat people right, the opportunities are endless.",
    shortQuote: "If you show up and work hard, the opportunities are endless.",
    location: "Cape Town, WC",
  },
  {
    id: "mvelo",
    name: "Mvelo Zondi",
    role: "Insurance Advisor",
    department: "Sales",
    tenure: "2 years",
    image: "/images/staff/mvelo.jpg",
    quote:
      "Coming from a township where unemployment is the norm, having a stable job with benefits felt like a dream. But Metrosure gave me more than a salary — they gave me skills, confidence, and a career path. I'm now studying for my RE5 certification.",
    shortQuote: "They gave me skills, confidence, and a career path.",
    location: "Port Elizabeth, EC",
  },
  {
    id: "selona",
    name: "Selona Mahlangu",
    role: "Training Coordinator",
    department: "Learning & Development",
    tenure: "5 years",
    image: "/images/staff/selona.jpg",
    quote:
      "I've trained over 500 new employees and watched so many of them grow into leaders. The culture here is different — we celebrate each other's wins, support each other through challenges, and genuinely care about the communities we serve.",
    shortQuote: "We celebrate each other's wins and genuinely care.",
    location: "Pretoria, GP",
  },
  {
    id: "thami",
    name: "Thami Nkosi",
    role: "Sales Consultant",
    department: "Retail Partnerships",
    tenure: "1 year",
    image: "/images/staff/thami.jpg",
    quote:
      "Before Metrosure, I was unemployed for two years after matric. Now I'm earning commission, learning about financial products, and helping families protect what matters most. Every sale isn't just a number — it's a family I've helped.",
    shortQuote: "Every sale is a family I've helped protect.",
    location: "Bloemfontein, FS",
  },
];

// Helper functions
export function getTestimonialById(
  id: string
): EmployeeTestimonial | undefined {
  return employeeTestimonials.find((t) => t.id === id);
}

export function getTestimonialsByDepartment(
  department: string
): EmployeeTestimonial[] {
  return employeeTestimonials.filter((t) => t.department === department);
}

export function getFeaturedTestimonials(count: number): EmployeeTestimonial[] {
  return employeeTestimonials.slice(0, count);
}
