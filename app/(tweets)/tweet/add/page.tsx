"use client";

import { AddTweetButton } from "@/components/tweets/add-tweet";
import { useFormState } from "react-dom";
import { addTweet } from "./actions";

export default function AddTweetPage() {
  const [state, dispatch] = useFormState(addTweet, null);
  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto h-full flex flex-col gap-4">
        <h1 className="text-neutral-600 text-2xl font-bold">🥕 트윗트윗 🥕</h1>
        <form action={dispatch} className="flex flex-col gap-4">
          <textarea
            name="tweet"
            className="mt-2 w-full outline-none rounded-lg ring ring-neutral-400 focus:ring-neutral-500 p-2 text-lg font-light"
            rows={15}
            placeholder="당신의 멋진 이야기를 들려주세요!"
          />
          <AddTweetButton />
        </form>
      </div>
    </main>
  );
}
