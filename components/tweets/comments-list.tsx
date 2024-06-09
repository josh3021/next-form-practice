"use client";

import { getComments } from "@/app/tweets/[id]/actions";
import { addComment } from "@/app/tweets/[id]/create-comment.actions";
import { Prisma } from "@prisma/client";
import { useRef, useState } from "react";
import { CommentForm } from "./comment-form";
import { LoadMoreForm } from "./load-more";
import { OptimisticCommentsList } from "./optimistic-comments";

interface ICommentsListProps {
  tweetId: number;
  initialComments: Prisma.CommentGetPayload<{
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
  }>[];
  me: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export function CommentsList({
  initialComments,
  tweetId,
  me,
}: ICommentsListProps) {
  const [comments, setComments] = useState<any>(initialComments);
  // const [optimisticComments, addCommentDispatch] = useOptimistic(
  //   initialComments,
  //   (prev: any[], newComment: any[]) => {
  //     // console.log(newComment);
  //     // if (newComment[0].isNew) {
  //     //   return [...newComment, ...prev];
  //     // } else {
  //     return [...prev, ...newComment];
  //     // }
  //   }
  // );
  const formRef = useRef<HTMLFormElement>(null);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  async function getMoreComments() {
    const newComments = await getComments(tweetId, 10, page * 10);
    if (newComments.length < 10) {
      setIsEnd(true);
    }
    const nCs = newComments.map((n) => ({
      ...n,
      isNew: false,
    }));

    setComments((prev) => [...prev, ...nCs]);
    setPage((prev) => prev + 1);
    // loadMoreAction(tweetId);
  }

  async function formAction(formData: FormData) {
    // addCommentDispatch([
    //   {
    //     isNew: true,
    //     _count: { comment_likes: 0 },
    //     comment: formData.get("comment") as string,
    //     id: optimisticComments.length === 0 ? 1 : optimisticComments[0].id + 1,
    //     //@ts-ignore
    //     updated_at: new Date().toISOString(),
    //     user: {
    //       ...me,
    //     },
    //   },
    // ]);
    setComments((prev) => [
      {
        isNew: true,
        _count: { comment_likes: 0 },
        comment: formData.get("comment") as string,
        id: comments.length === 0 ? 1 : comments[0].id + 1,
        //@ts-ignore
        updated_at: new Date().toISOString(),
        user: {
          ...me,
        },
      },
      ...prev,
    ]);
    await addComment(tweetId, formData);
    formRef.current?.reset();
  }

  return (
    <>
      <ul className="w-full mb-14 px-8">
        <OptimisticCommentsList optimisticComments={comments} />
        <LoadMoreForm
          isEnd={isEnd}
          getMoreComments={getMoreComments}
          // addCommentDispatch={addCommentDispatch}
        />
      </ul>
      <CommentForm
        formRef={formRef}
        formAction={formAction}
        tweetId={tweetId}
      />
    </>
  );
}
