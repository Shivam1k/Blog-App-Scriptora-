// recent-articles.tsx
"use client";

import React, {  useTransition } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Articles, Comment, User } from "@prisma/client";
import { deleteArticle } from "@/actions/delete-article";

type ArticleWithExtras = Articles & {
  comments: Comment[];
  author: {
    name: string;
    email: string;
    imageUrl: string;
  };
};

type RecentArticlesProps = {
  articles: ArticleWithExtras[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <div className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button size="sm" variant={"ghost"} className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {articles.length === 0 ? (
          <div>No articles found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 rounded-full"
                    >
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton  articleId ={article.id}/>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </div>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
}

// Simple Delete Button placeholder
const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          return await deleteArticle(articleId);
        });
      }}
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};





// Render <RecentArticles articles={...} />
//      ↓
// Check if articles are available
// ├── No articles
// │     ↓
// │  Show "No articles found"
// │
// └── Articles present
//       ↓
//    Render Table:
//    ┌────────────┬──────────┬────────────┬────────────┬─────────────┐
//    │   Title    │  Status  │ Comments # │   Date     │   Actions   │
//    └────────────┴──────────┴────────────┴────────────┴─────────────┘
//        ↓ Each Row (article)
//           ├── Title from `article.title`
//           ├── Status = "Published" (badge)
//           ├── Comment count = `article.comments.length`
//           ├── Date formatted
//           └── Actions:
//               ├── Edit button ➝ link to edit page
//               └── Delete button:
//                    ↓
//               On click ➝ `deleteArticle(article.id)` via form
//                    ↓
//               Button shows "Loading..." while pending
