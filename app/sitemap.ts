import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  //get post
  const post = await directus.request(
    readItems("post", {
      fields: ["slug", "date_updated"],
    })
  );

  const postLinks = post?.map((post) => {
    return [
      {
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseUrl}/de/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
    ];
  });

  // get category
  const categories = await directus.request(
    readItems("category", {
      fields: ["slug", "date_updated"],
    })
  );

  const categoryLinks = categories?.map((category) => {
    return [
      {
        url: `${baseUrl}/en/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/de/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/${category.slug}`,
        lastModified: new Date(),
      },
    ];
  });

  const dynamicLinks = postLinks.concat(categoryLinks ?? []).flat() ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
    },
    ...dynamicLinks
  ];
}
