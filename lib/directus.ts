import { createDirectus, rest, staticToken } from "@directus/sdk";

// console.log('pub url : ', process.env.NEXT_PUBLIC_API_URL)
// console.log('admin token : ', process.env.ADMIN_TOKEN)

interface Article {
	id: number;
	title: string;
	content: string;
}
interface Category {
	id: number;
  status: string;
	title: string;
	slug: string;
  description: string;
  posts: any;
  translations: any;
}

interface Posts {
  id: number;
  status: string;
  user_created: any;
  date_created: any;
  date_updated: any;
  title: string;
  description: string;
  slug: string;
  image: any;
  body: string;
  category: any;
  author: any;
  translations: any;
}

interface Schema {
	articles: Article[];
  category: Category[];
}

const directus = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
  .with(staticToken(process.env.ADMIN_TOKEN as string))
  .with(rest());

export default directus;
