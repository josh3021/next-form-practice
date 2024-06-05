import { GoBackButton } from "@/components/tweets/button";
import {
  HeartIcon as HeartOutlineIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getIsSelfLiked, getTweetDetails } from "./actions";

export default async function TweetDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const tweetDetails = await getTweetDetails(id);
  if (!tweetDetails) return notFound();
  const isSelfLiked = await getIsSelfLiked(
    tweetDetails.id,
    tweetDetails.user.id
  );
  return (
    <main className="min-h-screen">
      <div className="min-w-40 max-w-4xl px-4 mx-auto py-8 flex flex-col space-y-5 items-center">
        <div className="w-full">
          <GoBackButton />
        </div>
        <div className="p-4 rounded-xl text-neutral-700 w-full">
          <div className="flex gap-4 items-start">
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
                  <div className="flex items-center text-pink-400 font-medium">
                    {isSelfLiked ? (
                      <HeartSolidIcon className="size-5" />
                    ) : (
                      <HeartOutlineIcon className="size-5" />
                    )}
                    <span className="font-light ml-1">
                      {tweetDetails._count.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          {tweetDetails.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl text-neutral-700 w-full"
            >
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-full relative ring-1 ring-offset-1 ring-neutral-300 overflow-hidden">
                  {comment.user.avatar ? (
                    <Image
                      src={comment.user.avatar}
                      fill
                      className="object-cover"
                      alt={comment.user.username}
                    />
                  ) : (
                    <UserIcon className="size-8" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">
                      {comment.user.username}
                    </span>
                    <span className="font-light text-xs text-neutral-700">
                      {formatDistance(comment.user.updated_at, new Date(), {
                        locale: ko,
                      })}{" "}
                      전
                    </span>
                  </div>
                  <div className="items-start">
                    <p className="text-sm">{comment.comment}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-pink-400 font-medium">
                        {comment.user.id === tweetDetails.user.id ? (
                          <HeartSolidIcon className="size-5" />
                        ) : (
                          <HeartOutlineIcon className="size-5" />
                        )}
                        <span className="font-light">
                          {comment._count.comment_likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
