import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { cache } from "react";

export const getCategoryData = cache(
  async (categorySlug: string, locale: string) => {
    try {
      const category = await directus.request(
        readItems("category", {
          filter: {
            slug: {
              _eq: categorySlug,
            },
          },
          fields: [
            "*",
            "translations.*",
            "posts.*",
            "posts.author.id",
            "posts.author.first_name",
            "posts.author.last_name",
            "posts.category.id",
            "posts.category.title",
            "posts.translations.*",
          ],
          limit: 100,
        })
      );

      if (locale === "en") {
        return category[0];
      } else {
        const fetchedCategory = category?.[0];
        const localisedCategory = {
          ...fetchedCategory,
          title: fetchedCategory.translations[0].title,
          description: fetchedCategory.translations[0].description,
          posts: fetchedCategory.posts.map((post: any) => {
            return {
              ...post,
              title: post.translations[0].title,
              description: post.translations[0].description,
              body: post.translations[0].body,
              category: {
                ...post.category,
                title: fetchedCategory.translations[0].title,
              },
            };
          }),
        };
        return localisedCategory;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  }
);

export const getPostData = cache(async (postSlug: string, locale: string) => {
    try {
      const post = await directus.request(
        readItems("post" as any, {
          filter: { slug: { _eq: postSlug } },
          fields: [
            "*",
            "category.id",
            "category.title",
            "author.id",
            "author.first_name",
            "author.last_name",
            "translations.*",
            "category.translations.*",
          ],
        })
      );
  
      const postData = post?.[0] as Post;
      if (locale === "en") {
        return postData;
      } else {
        const localisedPostData = {
          ...postData,
          title: postData?.translations?.[0].title,
          description: postData?.translations?.[0].description,
          body: postData?.translations?.[0].body,
          category: {
            ...postData?.category,
            title: postData?.category?.translations?.[0]?.title,
          },
        };
  
        return localisedPostData;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  });