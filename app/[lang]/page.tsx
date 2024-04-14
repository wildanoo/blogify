import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { lang: string } }) {
  const locale = params.lang as "en" | "de";
  const getAllPosts = async () => {
    try {
      const posts = await directus.request<Post[]>(
        readItems("post" as any, {
          fields: [
            "*",
            { author: ["id", "first_name", "last_name"] },
            { category: ["id", "title", { translations: ["*"] }] },
            { translations: ["*"] },
          ],
          limit: 100,
        })
      );
      if (locale === "en") {
        return posts;
      } else {
        const localisedPost = posts.map((post) => {
          return {
            ...post,
            title: post.translations?.[0]?.title,
            description: post.translations?.[0]?.description,
            body: post.translations?.[0]?.body,
            category: {
              ...post.category,
              title: post.category?.title,
            },
          };
        });
        return localisedPost;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  };

  const posts = await getAllPosts();
  if (!posts) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={locale} post={posts[0] as Post} />
        <PostList
          locale={locale}
          posts={
            posts.filter((_post, index) => index > 0 && index < 3) as Post[]
          }
        />
        <CTACard dictionary={dictionary} />
        <PostCard locale={locale} post={posts[3] as Post} reverse />
        <PostList
          locale={locale}
          posts={
            posts.filter((_post, index) => index > 3 && index < 6) as Post[]
          }
        />
      </main>
    </PaddingContainer>
  );
}
