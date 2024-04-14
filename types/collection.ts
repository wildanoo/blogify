export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  author: Author;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
  translations?: {
    title?: string;
    description?: string;
    body?: string;
  }[];
}

export interface Category {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  translations?: Translations[];
}

export interface Translations {
  id: number;
  category_id: string;
  languages_id: string;
  title: string;
  description: string;
}

export interface Author {
  id: string;
  first_name: string;
  last_name: string;
}
