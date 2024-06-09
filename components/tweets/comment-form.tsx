"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { RefObject } from "react";

interface ICommentFormProps {
  formAction: (formData: FormData) => Promise<void>;
  tweetId: number;
  formRef: RefObject<HTMLFormElement>;
}

export function CommentForm({
  formRef,
  tweetId,
  formAction,
}: ICommentFormProps) {
  return (
    <div className="bg-white fixed bottom-0 w-full h-16 border-t flex flex-col items-center justify-center">
      <form
        action={formAction}
        ref={formRef}
        className="flex w-full items-center justify-between px-4 gap-2"
      >
        <input
          type="text"
          name="comment"
          placeholder="Write a comment here!"
          className="flex-grow h-10 ring-neutral-300 rounded-full px-4 outline-none focus:ring-orange-500 ring-1 transition-shadow"
        />
        <button
          type="submit"
          className="bg-orange-500 transition-colors hover:bg-orange-400 active:bg-orange-300 size-8 text-white flex items-center justify-center rounded-full"
        >
          <ChevronUpIcon className="size-5 " />
        </button>
      </form>
      {/* {state?.fieldErrors
        ? state.fieldErrors.comment && (
            <p className="text-red-500 text-xs px-4">
              {state.fieldErrors.comment}
            </p>
          )
        : null} */}
    </div>
  );
}
