"use server";

import { GoBackButton, TweetLikeButton } from "@/components/tweets/button";
import { CommentsList } from "@/components/tweets/comments-list";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/outline";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getComments, getTweetDetails } from "./actions";

async function getLikeStatus(tweetId: number, sessionId: number) {
  const [likeCount, liked] = await Promise.all([
    db.like.count({
      where: {
        tweetId,
      },
    }),
    db.like.findUnique({
      where: { id: { tweetId, userId: sessionId } },
    }),
  ]);
  return { likeCount, isLiked: !!liked };
}

// async function getCachedTweetDetails(tweetId: number) {
//   const session = await getSession();
//   if (!session.id) return null;
//   const cachedOperation = nextCache(getTweetDetails, [`tweet`], {
//     tags: [`tweet-${tweetId}`],
//   });
//   return cachedOperation(tweetId);
// }

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  if (!session.id) return { likeCount: 0, isLiked: false };
  const cachedOperation = nextCache(getLikeStatus, [`tweet-like-${tweetId}`], {
    tags: [`tweet-like-${tweetId}`],
  });
  return cachedOperation(tweetId, session.id);
}

export default async function TweetDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  // const tweetDetails = await getCachedTweetDetails(id);
  const tweetDetails = await getTweetDetails(id);
  if (!tweetDetails) return notFound();
  const comments = await getComments(id, 10, 0);
  const session = await getSession();
  const me = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
    },
  });
  if (!me) return notFound();
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetDetails.id);
  return (
    <main className="min-h-screen">
      <div className="min-w-40 max-w-4xl mx-auto py-8 flex flex-col space-y-5 items-center">
        <div className="w-full">
          <GoBackButton />
        </div>
        <div className="rounded-xl text-neutral-700 w-full">
          <div className="flex gap-4 items-start px-8">
            <div className="size-10 rounded-full relative ring-1 ring-offset-1 ring-neutral-300 overflow-hidden">
              {tweetDetails.user.avatar ? (
                <Image
                  src={tweetDetails.user.avatar}
                  fill
                  className="object-cover"
                  alt={tweetDetails.user.username}
                />
              ) : (
                <UserIcon className="size-10" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="font-medium mr-1 text-xl">
                  {tweetDetails.user.username}
                </span>
                <span className="font-light text-sm text-neutral-700">
                  {formatDistance(tweetDetails.updated_at, new Date(), {
                    locale: ko,
                  })}{" "}
                  전
                </span>
                <span className="text-sm ml-3 font-light">Author</span>
              </div>
              <div className="items-start">
                <p className="text-sm">{tweetDetails.tweet}</p>
                <div className="flex items-center">
                  <TweetLikeButton
                    tweetId={tweetDetails.id}
                    isLiked={isLiked}
                    likeCount={likeCount}
                  />
                </div>
              </div>
            </div>
          </div>
          <CommentsList
            initialComments={comments}
            tweetId={tweetDetails.id}
            me={me}
          />
        </div>
      </div>
    </main>
  );
}
