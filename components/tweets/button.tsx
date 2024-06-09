"use client";

import {
  dislikeComment,
  dislikeTweet,
  likeComment,
  likeTweet,
} from "@/app/tweets/[id]/actions";
import {
  ChevronLeftIcon,
  HeartIcon as HeartOutlineIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";

export function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex gap-1 items-center hover:bg-neutral-100 active:bg-neutral-200 rounded-xl p-2"
    >
      <ChevronLeftIcon className="size-10" />
      <span className="text-xl">Back</span>
    </button>
  );
}

interface IPostLikeButtonProps {
  tweetId: number;
  isLiked: boolean;
  likeCount: number;
}

export function TweetLikeButton({
  isLiked,
  likeCount,
  tweetId,
}: IPostLikeButtonProps) {
  const [state, action] = useOptimistic(
    { isLiked, likeCount },
    (prevState, _) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );

  async function formAction() {
    action(undefined);
    if (isLiked) await dislikeTweet(tweetId);
    else await likeTweet(tweetId);
  }

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="flex items-center text-pink-400 font-medium hover:bg-pink-100 active:bg-pink-200 p-0.5 rounded-lg"
      >
        {state.isLiked ? (
          <HeartSolidIcon className="size-5" />
        ) : (
          <HeartOutlineIcon className="size-5" />
        )}
        <span className="font-light ml-1">{state.likeCount}</span>
      </button>
    </form>
  );
}

interface ILikeButtonProps {
  commentId: number;
  isLiked: boolean;
  likeCount: number;
}

export function LikeButton({
  isLiked,
  likeCount,
  commentId,
}: ILikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, _) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );

  async function formAction() {
    reducerFn(undefined);
    if (state.isLiked) await dislikeComment(commentId);
    else await likeComment(commentId);
  }

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="flex items-center text-pink-400 font-medium hover:bg-pink-100 active:bg-pink-200 p-0.5 rounded-lg"
      >
        {state.isLiked ? (
          <HeartSolidIcon className="size-5" />
        ) : (
          <HeartOutlineIcon className="size-5" />
        )}
        <span className="font-light ml-1">{state.likeCount}</span>
      </button>
    </form>
  );
}
