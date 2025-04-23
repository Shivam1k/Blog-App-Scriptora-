import { prisma } from "@/lib/prisma";

export async function getArticleById(id: string) {
  try {
    const article = await prisma.articles.findUnique({
      where: { id },
    });
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
} 