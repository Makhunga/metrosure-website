/**
 * News data for the Latest News section
 * Inspired by Starbucks About page news grid
 */

export interface NewsCategory {
  id: string;
  label: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  readTime: number;
  publishedDate?: string;
}

export const newsCategories: NewsCategory[] = [
  { id: "news", label: "NEWS" },
  { id: "people-impact", label: "PEOPLE & IMPACT" },
  { id: "insurance-tips", label: "INSURANCE TIPS" },
  { id: "company", label: "COMPANY" },
];

export const latestNews: NewsArticle[] = [
  {
    id: "1",
    slug: "metrosure-expands-to-western-cape",
    title:
      "Metrosure expands operations to Western Cape with 15 new retail partnerships",
    category: newsCategories[0],
    readTime: 2,
    publishedDate: "2025-12-15",
  },
  {
    id: "2",
    slug: "youth-employment-milestone",
    title:
      "Creating futures: How Metrosure has employed over 5,000 young South Africans since 2013",
    category: newsCategories[1],
    readTime: 4,
    publishedDate: "2025-11-28",
  },
  {
    id: "3",
    slug: "understanding-life-cover",
    title:
      "Understanding your life cover needs: A comprehensive guide for South African families",
    category: newsCategories[2],
    readTime: 3,
    publishedDate: "2025-11-10",
  },
];
