import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
}

const PostCard = ({ post, layout = "horizontal" }: PostProps) => {
  return (
    <Link
      className={`${
        layout === "horizontal"
          ? "grid items-center grid-cols-2 gap-10"
          : " space-y-10"
      }`}
      href={`/post/${post.slug}`}
    >
      <Image
        className="rounded-md w-full object-cover object-center max-h-[300px]"
        alt={post.title}
        src={post.image}
        width={600}
        height={300}
      />
      <PostContent post={post} />
    </Link>
  );
};

export default PostCard;
