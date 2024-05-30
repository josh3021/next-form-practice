"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid";
import { Prisma } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

interface ITweetsListProps {
  tweets: Prisma.TweetGetPayload<{
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
  }>[];
  pagination: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

interface IPaginationProps {
  pagination: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

export function TweetsList({
  tweets,
  pagination,
  goToPrevPage,
  goToNextPage,
}: ITweetsListProps) {
  return (
    <>
      <ul className="flex flex-col w-full gap-4">
        {tweets.map((tweet) => (
          <li
            key={tweet.id}
            className="shadow hover:bg-neutral-200 active:bg-neutral-200 focus:scale-105 focus:ring focus:ring-offset-2 focus:ring-neutral-200 transition-all w-full rounded-lg flex p-4 flex-col gap-4"
          >
            <Link href={`/tweets/${tweet.id}`}>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-neutral-800" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold">
                      {tweet.user.username}
                    </h1>
                    <p className="font-light text-xs text-neutral-700">
                      {formatDistance(tweet.updated_at, new Date(), {
                        locale: ko,
                      })}{" "}
                      전
                    </p>
                  </div>
                  <p className="text-neutral-900">{tweet.tweet}</p>
                  <div className="flex gap-1 items-center">
                    <div className="flex items-center gap-1">
                      <HandThumbUpIcon className="size-4 text-orange-500" />
                      <span className="text-orange-500 text-sm">
                        {tweet._count.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        goToNextPage={goToNextPage}
        pagination={pagination}
        goToPrevPage={goToPrevPage}
      />
    </>
  );
}

function Pagination({
  goToNextPage,
  pagination,
  goToPrevPage,
}: IPaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={goToPrevPage}
        className="text-neutral-500 hover:text-orange-500 active:text-orange-600 transition-colors"
      >
        <ChevronLeftIcon className="size-10" />
      </button>
      <span className="text-neutral-400 text-xl font-medium">
        {pagination + 1}
      </span>
      <button
        onClick={goToNextPage}
        className="text-neutral-500 hover:text-orange-500 active:text-orange-600 transition-colors"
      >
        <ChevronRightIcon className="size-10" />
      </button>
    </div>
  );
}
