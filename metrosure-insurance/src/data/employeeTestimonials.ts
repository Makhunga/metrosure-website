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
}

export const employeeTestimonials: EmployeeTestimonial[] = [
  {
    id: "khayakazi",
    name: "Khayakazi Cele",
    role: "Accounts Clerk",
    department: "Finance",
    tenure: "4 years",
    image: "/images/staff/khayakazi.jpg",
    quote:
      "Working in Finance at Metrosure has sharpened my eye for detail in ways I never imagined. Every transaction I process, every reconciliation I complete, contributes to the bigger picture of our company's success. The training programmes here have transformed me from someone who simply captured data into a professional who truly understands financial systems.",
    shortQuote: "Every transaction contributes to the bigger picture of success.",
  },
  {
    id: "selona",
    name: "Selona Ramjiawan",
    role: "Executive Administrator",
    department: "Executive Office",
    tenure: "5 years",
    image: "/images/staff/selona.jpg",
    quote:
      "Being part of the Executive Office has given me exposure to strategic decision-making at the highest level. I coordinate board meetings, manage executive schedules, and ensure our leadership team operates seamlessly. The trust placed in me has accelerated my professional development beyond anything I could have achieved elsewhere.",
    shortQuote: "The trust placed in me has accelerated my professional development.",
  },
  {
    id: "thami",
    name: "Thami Mbambo",
    role: "Project Manager",
    department: "Operations",
    tenure: "1 year",
    image: "/images/staff/thami.jpg",
    quote:
      "Delivering projects at Metrosure means working with incredible people across every department. From system implementations to process improvements, I lead cross-functional teams to achieve measurable results. What I love most is seeing a project through from concept to completion and watching the positive impact it has on our operations.",
    shortQuote: "I lead cross-functional teams to achieve measurable results.",
  },
  {
    id: "mercutio",
    name: "Mercutio Buthelezi",
    role: "Sales Manager",
    department: "Sales",
    tenure: "6 years",
    image: "/images/staff/mercutio_2.jpg",
    quote:
      "Managing a sales team is about so much more than hitting targets — it's about developing people. I take pride in coaching my team members, celebrating their wins, and watching them grow into top performers. When one of my consultants achieves something they thought was impossible, that's what makes this role truly rewarding.",
    shortQuote: "When my team achieves the impossible, that's truly rewarding.",
  },
  {
    id: "khwezi",
    name: "Khwezi Dube",
    role: "Facilitator",
    department: "Learning & Development",
    tenure: "3 years",
    image: "/images/staff/khwezi_2n.jpg",
    quote:
      "As a Facilitator, I have the privilege of shaping the next generation of Metrosure talent. Creating engaging training programmes that transform nervous new starters into confident professionals is incredibly fulfilling. There's nothing quite like seeing the lightbulb moment when a concept finally clicks for someone.",
    shortQuote: "Shaping talent and seeing lightbulb moments is fulfilling.",
  },
  {
    id: "mvelo",
    name: "Mvelo Mkhwanazi",
    role: "Sales Manager",
    department: "Sales",
    tenure: "2 years",
    image: "/images/staff/mvelo.jpg",
    quote:
      "Building lasting client relationships is at the heart of what I do. As a Sales Manager, I've learned that success comes from understanding client needs and providing solutions that genuinely help them. Leading my team to consistently exceed targets while maintaining excellent service standards is what drives me every day.",
    shortQuote: "Success comes from understanding client needs.",
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
