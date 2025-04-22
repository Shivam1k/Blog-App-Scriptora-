"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary configuration is missing in the environment variables.");
}

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
};

export const createArticle = async (
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
        formError: ["You must be logged in to create an article"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return {
      errors: {
        formError: ["User not found. Please register before creating an article"],
      },
    };
  }

  // Getting the featured image
  const imageFile = formData.get('featuredImage') as File;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["Please upload a featured image"],
      },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Cloudinary upload
  let UploadResponse: UploadApiResponse | undefined;
  try {
    UploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary upload success:", result);
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("❌ Error during Cloudinary upload:", error);
    return {
      errors: {
        featuredImage: ["Failed to upload image"],
      },
    };
  }

  const imageUrl = UploadResponse?.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image"],
      },
    };
  }

  try {
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser?.id,
      },
    });
  } catch (error: unknown) {
    console.error("❌ Error saving article to the database:", error);
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["An unknown error occurred"],
        },
      };
    }
  }

  // Revalidate path and redirect after success
  revalidatePath('/dashboard');
  console.log("✅ Article created, redirecting to dashboard...");
  redirect("/dashboard");
};



// ✅ Step-by-Step Flow of createArticle
// 1. Validate Form Data

//     Use zod schema (createArticleSchema) to validate:

//         title

//         category

//         content

//     ✅ If valid → continue

//     ❌ If invalid → return field-specific error messages

// 2. Authenticate User

//     Call auth() from Clerk to get the logged-in userId

//     ✅ If userId is present → continue

//     ❌ If not → return error: "You must be logged in to create an article"

// 3. Check User in Database

//     Use Prisma to find the user in the database by clerkUserId

//     ✅ If user exists → continue

//     ❌ If not → return error: "User not found. Please register before creating an article"

// 4. Handle Image Upload

//     Get the uploaded featuredImage from formData

//     ✅ If file exists → convert it to Buffer

//     ❌ If not → return error: "Please upload a featured image"

// 5. Upload to Cloudinary

//     Use cloudinary.uploader.upload_stream() to upload the image buffer

//     ✅ If upload succeeds → get secure_url

//     ❌ If fails → return error: "Failed to upload image"

// 6. Save Article in Database

//     Use Prisma to create a new article:

//         title, category, content, featuredImage (Cloudinary URL), authorId

//     ✅ If save succeeds → continue

//     ❌ If Prisma throws an error → return the error message

// 7. Revalidate & Redirect

//     Call revalidatePath("/dashboard") to refresh the page

//     Redirect to /dashboard

