"use client";

import { AddTweet } from "@/components/tweets/add-tweet";
import { TweetsList } from "@/components/tweets/tweets-list";
import { Prisma } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { getAllTweets, getTweetLength } from "./actions";

const TAKE = 10;

export default function Home() {
  const [tweetCount, setTweetCount] = useState<number>(0);
  const [tweets, setTweets] = useState<
    Prisma.TweetGetPayload<{
      select: {
        _count: {
          select: {
            likes: boolean;
          };
        };
        id: boolean;
        tweet: boolean;
        updated_at: boolean;
        user: {
          select: {
            id: boolean;
            username: boolean;
          };
        };
      };
    }>[]
  >([]);
  const [pagination, setPagination] = useState(0);

  const fetchTweets = useCallback(async () => {
    const newTweets = await getAllTweets(TAKE, pagination);
    setTweets(newTweets);
  }, [pagination]);

  const fetchTweetCount = useCallback(async () => {
    const count = await getTweetLength();
    setTweetCount(count);
  }, []);

  useEffect(() => {
    fetchTweetCount();
  }, [fetchTweetCount]);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  function goToPrevPage() {
    if (pagination === 0) return;
    setPagination((current) => current - 1);
    fetchTweets();
  }

  function goToNextPage() {
    if (tweetCount / TAKE + 1 >= pagination) return;
    setPagination((current) => current + 1);
    fetchTweets();
  }

  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto flex flex-col space-y-16 items-center relative">
        <h1 className="text-neutral-600 text-2xl font-bold">🥕 트윗 목록</h1>
        <TweetsList
          tweets={tweets}
          pagination={pagination}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
        />
      </div>
      <AddTweet />
    </main>
  );
}
