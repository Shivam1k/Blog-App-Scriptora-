"use client";

import React, { FormEvent, startTransition, useState } from "react";
import { useActionState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";

import type { CreateArticleFormstate } from "@/actions/create-article";
import type { Articles } from "@prisma/client";
import { EditArticle } from "@/actions/edit-article";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
  article: Articles;
};

const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content || "");

  const [formState, action, isPending] = useActionState<
    CreateArticleFormstate,
    FormData
  >(EditArticle.bind(null, article.id), {
    errors: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Enter article title"
              />
              {formState.errors.title?.map((err, idx) => (
                <span key={idx} className="text-red-600 text-sm block">
                  {err}
                </span>
              ))}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                className="flex h-10 w-full rounded-md"
                name="category"
                id="category"
                defaultValue={article.category}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="business">Business</option>
              </select>
              {formState.errors.category?.map((err, idx) => (
                <span key={idx} className="text-red-600 text-sm block">
                  {err}
                </span>
              ))}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <label
                htmlFor="featuredImage"
                className="block text-sm font-medium text-gray-700"
              >
                Featured Image
              </label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />
              {article.featuredImage && (
                <Image
                  src={article.featuredImage}
                  alt="Featured"
                  width={192}
                  height={128}
                  className="w-48 h-32 object-cover rounded-md"
                />
              )}
              {formState.errors.featuredImage?.map((err, idx) => (
                <span key={idx} className="text-red-600 text-sm block">
                  {err}
                </span>
              ))}
            </div>

            {/* Rich Text Content */}
            <div className="space-y-2">
              <label>Content</label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              {formState.errors.content?.map((err, idx) => (
                <span key={idx} className="text-red-600 text-sm block">
                  {err}
                </span>
              ))}
            </div>

            {/* Form-level error */}
            {formState.errors.formError?.map((err, idx) => (
              <div key={idx} className="text-red-600 text-sm">
                {err}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="reset" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Edit Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
