"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(100),
  content: z.string().min(10),
});

export type CreateArticleFormstate = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formError?: string[];
  };
  message?: string;
};

export const EditArticle = async (
  articleId: string, // ✅ use plain string here
  prevState: CreateArticleFormstate,
  formData: FormData
): Promise<CreateArticleFormstate> => {
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formError: ["You must be logged in to edit an article"],
      },
    };
  }

  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: {
        formError: ["Article not found."],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser || existingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        formError: ["Unauthorized. You can't edit this article."],
      },
    };
  }

  let imageUrl = existingArticle.featuredImage;
  const imageFile = formData.get("featuredImage");

  if (
    imageFile &&
    typeof imageFile === "object" &&
    "arrayBuffer" in imageFile &&
    imageFile.size > 0
  ) {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        uploadStream.end(buffer);
      });

      if (uploadResult.secure_url) {
        imageUrl = uploadResult.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image"],
          },
        };
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return {
        errors: {
          featuredImage: ["Failed to upload image"],
        },
      };
    }
  }

  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id,
      },
    });

    revalidatePath("/dashboard");
    console.log("✅ Article updated:", articleId);
    redirect("/dashboard");
  } catch (error) {
    console.error("❌ Error saving article:", error);
    return {
      errors: {
        formError: ["Failed to update article. Try again."],
      },
    };
  }
};
