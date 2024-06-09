"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";

export async function getTweetDetails(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          id: true,
          comment: true,
          updated_at: true,
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          _count: { select: { comment_likes: true } },
        },
        orderBy: {
          updated_at: "desc",
        },
        take: 10,
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return tweet;
}

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id,
      },
    });
    revalidateTag(`tweet-like-${tweetId}`);
  } catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id,
        },
      },
    });
    revalidateTag(`tweet-like-${tweetId}`);
  } catch (e) {}
}

export async function likeComment(commentId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.commentLike.create({
      data: {
        commentId,
        userId: session.id,
      },
    });
    revalidateTag(`comment-like-${commentId}`);
  } catch (e) {}
}

export async function dislikeComment(commentId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.commentLike.delete({
      where: {
        id: {
          commentId,
          userId: session.id,
        },
      },
    });
    revalidateTag(`comment-like-${commentId}`);
  } catch (e) {}
}

export async function getComments(tweetId: number, take: number, skip: number) {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      comment: true,
      updated_at: true,
      _count: { select: { comment_likes: true } },
    },
    orderBy: {
      updated_at: "desc",
    },
    take,
    skip,
  });
  return comments;
}

export async function getCachedComments(
  tweetId: number,
  take: number,
  skip: number
) {
  const session = await getSession();
  if (!session.id) return [];
  const cachedOperation = nextCache(getComments, [`tweet-comments`], {
    tags: [`tweet-comments-${tweetId}`],
  });
  return cachedOperation(tweetId, take, skip);
}

export async function loadMoreAction(tweetId: number) {
  revalidatePath(`/tweets/${tweetId}`);
}
