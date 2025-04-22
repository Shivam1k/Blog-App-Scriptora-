"use client";

import React from "react";
import { useActionState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComment } from "@/actions/create-comment";

type CommentInputProps = {
  articleId: string;
};

type FormState = {
  errors: {
    body?: string[];
    formError?: string[];
  };
};

const initialState: FormState = {
  errors: {},
};

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, articleId),
    initialState
  );

  return (
    <form action={action} className="space-y-4">
      <div className="flex gap-4 items-start">
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Input
            type="text"
            name="body"
            placeholder="Add a comment..."
            disabled={isPending}
          />

          {formState.errors.body && (
            <p className="text-red-600 text-sm mt-1">
              {formState.errors.body[0]}
            </p>
          )}

          {formState.errors.formError && (
            <div className="mt-2 p-2 border border-red-600 bg-red-100 text-sm text-red-800 rounded">
              {formState.errors.formError[0]}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentInput;
