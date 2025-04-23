import { getArticleById } from "@/actions/article";
import { EditArticleForm } from "@/components/dashboard/edit-article-form";
import { notFound } from "next/navigation";

interface EditArticleParams {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticleParams) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <EditArticleForm article={article} />
    </div>
  );
}
