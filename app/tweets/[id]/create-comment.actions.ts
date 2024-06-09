"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  comment: z
    .string({
      message: "Comment is required",
    })
    .min(1, "Comment is required"),
});

export async function addComment(tweetId: number, formData: FormData) {
  const session = await getSession();
  if (!session.id) return;

  const comment = formData.get("comment");
  const results = await formSchema.safeParseAsync({ comment });
  if (!results.success) {
    return results.error.flatten();
  }
  const newComment = await db.comment.create({
    data: {
      comment: results.data.comment,
      userId: session.id,
      tweetId: tweetId,
    },
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
  });
  revalidatePath(`/tweets/${tweetId}`);

  // revalidateTag(`tweet-comments-${tweetId}`);

  return { success: true };
}
