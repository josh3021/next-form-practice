import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import { notFound } from "next/navigation";
import { getTweetDetails } from "./actions";

export default async function TweetDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const tweetDetails = await getTweetDetails(id);
  if (!tweetDetails) return notFound();

  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40max-w-2xl px-16 mx-auto py-8 flex flex-col space-y-5 items-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="size-24 rounded-full bg-neutral-800" />
          <h1 className="text-2xl">{tweetDetails.user.username}</h1>
          <p className="font-light text-xs text-neutral-700">
            최초 작성시간{" "}
            {formatDistance(tweetDetails.created_at, new Date(), {
              locale: ko,
            })}{" "}
            전
          </p>
          <p className="font-light text-xs text-neutral-700">
            마지막 업데이트{" "}
            {formatDistance(tweetDetails.updated_at, new Date(), {
              locale: ko,
            })}{" "}
            전
          </p>
        </div>
        <p className="font-light p-4 rounded-xl bg-neutral-100 text-neutral-700 w-full">
          {tweetDetails.tweet}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-orange-500 font-medium">
            <span>좋아요</span>
            <span>{tweetDetails._count.likes}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
