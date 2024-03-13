import { createDirectus, rest, staticToken } from "@directus/sdk";

// console.log('pub url : ', process.env.NEXT_PUBLIC_API_URL)
// console.log('admin token : ', process.env.ADMIN_TOKEN)

const directus = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
  .with(staticToken(process.env.ADMIN_TOKEN as string))
  .with(rest());

export default directus;
