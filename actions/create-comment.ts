'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma'; // ✅ Important fix

const createCommentSchema = z.object({
  body: z.string().min(1),
});

type CreateCommentFormState = {
  errors: {
    body?: string[];
    formError?: string[];
  };
};

export const createComment = async (
  articleId: string,
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({ body: formData.get('body') });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as {
        body?: string[];
        formError?: string[];
      },
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formError: ['You must be logged in first.'],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) {
    return {
      errors: {
        formError: ['User not found.'],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        body: result.data.body,
        authorId: existingUser.id,
        articleId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ['Error occurred while adding comment.'],
        },
      };
    }
  }

  revalidatePath(`/articles/${articleId}`);

  return {
    ...prevState,
    errors: {},
  };
};





// ✅ Purpose:
// To validate the comment body using Zod before saving it.
// 🧠 Quick Breakdown:

//     formData.get('body') → gets the value from the form.

//     safeParse(...) → checks if it matches the schema.

//     createCommentSchema 
// → expects { body: string (min 1 char) }.


// [Start]
//    |
//    v
// [Validate form data with Zod]
//    |
//    |-- invalid --> [Return validation errors]
//    |
//    v
// [Check user auth with Clerk]
//    |
//    |-- not logged in --> [Return "login required" error]
//    |
//    v
// [Find user in DB via clerkUserId]
//    |
//    |-- not found --> [Return "User not found" error]
//    |
//    v
// [Create comment in DB]
//    |
//    |-- error --> [Return DB error]
//    |
//    v
// [Revalidate article page cache]
//    |
//    v
// [Return success state]
//    |
//    v
// [End]
