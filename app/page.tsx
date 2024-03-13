import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const getAllPosts = async () => {
    try {
      const posts = await directus.request<Post[]>(
        readItems("post", {
          fields: ['*', { author: ['id', 'first_name','last_name'] }, {category: ['id', 'title']}],
          limit: 100
        })
      );
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  };

  const posts = await getAllPosts();
  if (!posts) notFound();
  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} />
        <PostList
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CTACard />
        <PostCard post={posts[3]} reverse />
        <PostList
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
