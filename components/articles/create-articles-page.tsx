"use client";

import React, { FormEvent, startTransition, useState } from "react";
import { useActionState } from "react"; // ✅ Correct import

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import { createArticle } from "@/actions/create-article";
import type { CreateArticleFormstate } from "@/actions/create-article"; // ✅ Import the type from server action

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticlesPage = () => {
  const [content, setContent] = useState("");

  const [formState, action, isPending] = useActionState<
    CreateArticleFormstate,
    FormData
  >(createArticle, { errors: {} });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Create a new FormData instance
    formData.append("content", content); // Append content to FormData

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                placeholder="Enter an article title"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="flex h-10 w-full rounded-md"
                name="category"
                id="category"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="business">Business</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">
                  {formState.errors.category}
                </span>
              )}
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
            </div>

            {/* Rich Text Content */}
            <div className="space-y-2">
              <label>Content</label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              <input type="hidden" name="content" value={content} />
              {formState.errors.content && (
                <span className="text-red-600 text-sm">
                  {formState.errors.content}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="reset" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>

            {/* Form-level error */}
            {formState.errors.formError && (
              <div className="text-red-600 text-sm">
                {formState.errors.formError}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;
