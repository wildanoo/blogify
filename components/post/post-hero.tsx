import { Post } from "@/types/collection";
import React from "react";
import PostContent from "./post-content";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
  locale: "en" | "de";
}
const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <div>
      <PostContent locale={locale} isPostPage post={post} />
      <Image
        className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
        width={1280}
        height={500}
        alt={post.title}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post?.image}?key=optimised`}
      />
    </div>
  );
};

export default PostHero;
