import { UserIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

interface ICommentProps {
  comment: Prisma.CommentGetPayload<{
    select: {
      id: true;
      comment: true;
      updated_at: true;
      user: {
        select: {
          id: true;
          username: true;
          avatar: true;
        };
      };
      _count: { select: { comment_likes: true } };
    };
  }>;
}

export function Comments({ comment }: ICommentProps) {
  return (
    <div className="p-4 rounded-xl text-neutral-700 w-full">
      <div className="flex gap-4 items-start">
        <div className="size-10 rounded-full relative ring-1 ring-offset-1 ring-neutral-300 overflow-hidden flex justify-center items-center">
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
            <span className="font-medium mr-1">{comment.user.username}</span>
            <span className="font-light text-xs text-neutral-700">
              {formatDistance(comment.updated_at, new Date(), {
                locale: ko,
              })}{" "}
              전
            </span>
          </div>
          <div className="items-start">
            <p className="text-sm">{comment.comment}</p>
            <div className="flex items-center gap-4">
              {/* <LikeButton
                commentId={comment.id}
                // isLiked={comment.user.id === tweetDetails.user.id}
                isLiked={false}
                likeCount={comment._count.comment_likes}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
