import EditArticlePage from "@/components/articles/edit-article-page";
import { prisma } from "@/lib/prisma"; // ✅ Add this import
import React from "react";
import { notFound } from "next/navigation"; // optional for clean 404s

type EditArticleParams = {
  params: { id: string }; // ✅ No need to wrap in Promise
};

const Page = async ({ params }: EditArticleParams) => {
  const { id } = params;

  const article = await prisma.articles.findUnique({
    where: { id }, // Or where: { id: Number(id) } if `id` is a number
  });

  if (!article) {
    // return <h1>Article not found for this {id}</h1>; // This works too
    notFound(); // ✅ Next.js way to show 404 page
  }

  return (
    <div>
      <EditArticlePage article={article} />
    </div>
  );
};

export default Page;
