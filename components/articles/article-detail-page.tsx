// components/articles/article-detail-page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import LikeButton from './like-button';
import CommentList from './comment-list';
import CommentInput from './comment-input';
import { auth } from '@clerk/nextjs/server';

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage = async ({ article }: ArticleDetailPageProps) => {
  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

const likes = await prisma.like.findMany({
    where:{
        articleId: article.id
    }
});

const {userId} = await auth();
const user = await prisma.user.findUnique({where:{clerkUserId : userId as string}})

const   isLiked : boolean = likes.some((like) => like.userId  === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                <AvatarImage src={article.author.imageUrl || ''} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm">{article.createdAt.toDateString()}</p>
              </div>
            </div>
          </header>

          <section
            className="mb-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <LikeButton  articleId={article.id} likes={likes} isLiked={isLiked} />
          <CommentInput articleId={article.id} />
          <CommentList comments={comments} />
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
