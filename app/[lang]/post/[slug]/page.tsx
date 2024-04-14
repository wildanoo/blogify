import CTACard from "@/components/elements/cta-card";
import SocialLink from "@/components/elements/social-link";
import PaddingContainer from "@/components/layout/padding-container";
import PostBody from "@/components/post/post-body";
import PostHero from "@/components/post/post-hero";
import siteConfig from "@/config/site";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { getPostData } from "@/lib/utils";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import React from "react";

export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  const post = await getPostData(slug, lang);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: post.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
      },
    },
  };
};
export const generateStaticParams = async () => {
  try {
    const posts = await directus.request(
      readItems("post" as any, {
        filter: { status: { _eq: "published" } },
        fields: ["slug"],
      })
    );

    const params = posts?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "en",
      };
    });

    const localisedParams = posts?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "de",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

const Page = async ({ params }: { params: { slug: string; lang: string } }) => {
  const locale = params.lang as "en" | "de";
  const postSlug = params.slug;
  const post = await getPostData(postSlug, locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `${process.env.NEXT_PUBLIC_ASSETS_URL}${post?.image}`,
    author: post.author.first_name + " " + post.author.last_name,
    genre: post.category.title,
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postSlug}/opengraph-image.png`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };
  if (!post) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-10">
        <PostHero locale={locale} post={post as Post} />
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky flex items-center md:flex-col gap-5 top-20">
              <div className="font-medium md:hidden">Share this content:</div>
              <SocialLink
                isShareUrl
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareUrl
                platform="twitter"
                link={`https://www.twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareUrl
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        <CTACard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
