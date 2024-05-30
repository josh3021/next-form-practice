"use server";

import db from "@/lib/db";

export async function getAllTweets(take: number, pagination: number) {
  const tweets = await db.tweet.findMany({
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
      id: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take,
    skip: take * pagination,
  });
  return tweets;
}

export async function getTweetLength() {
  const count = await db.tweet.count();
  return count;
}
