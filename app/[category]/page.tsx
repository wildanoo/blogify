import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Category, Post } from "@/types/collection";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  // return DUMMY_CATEGORIES.map((category) => {
  //   return {
  //     category: category.slug,
  //   };
  // });
  try {
    const categories = await directus.request(readItems("category", {
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"]
    }))
    const params = categories?.map(category => {
      return {
        category: category.slug as string,
      }
    })

    return params || []
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching categories");
  }
};
const Page = async ({ params }: { params: { category: string } }) => {
  // const category = DUMMY_CATEGORIES.find(
  //   (category) => category.slug === params.category
  // );

  // const posts = DUMMY_POSTS.filter(
  //   (post) => post.category.title.toLocaleLowerCase() === params.category
  // );

  const getCategoryData = async () => {
    try {
      const category = await directus.request(
        readItems("category", {
          filter: {
            slug: {
              _eq: params.category
            },
          },
          fields: ['*', 'posts.*','posts.author.id','posts.author.first_name', 'posts.author.last_name', 'posts.category.id','posts.category.title'],
          limit: 100
        })
      );

      return category[0];
    } catch (error) {
      console.log(error)
      throw new Error("Error fetching category")
    }
  }

  const category = await getCategoryData();
  if(!category) notFound();

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  }

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{typeCorrectedCategory?.title}</h1>
        <p className="text-lg text-neutral-600">{typeCorrectedCategory?.description}</p>
      </div>
      <PostList posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;
