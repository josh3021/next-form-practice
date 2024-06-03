"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweet = z.string().min(1, "트윗은 1글자 이상이어야 합니다.");

export async function addTweet(_: any, formData: FormData) {
  const results = tweet.safeParse(formData.get("tweet"));
  if (!results.success) {
    return results.error.flatten();
  }

  const session = await getSession();
  if (!session.id) return;
  const newTweet = await db.tweet.create({
    data: {
      tweet: results.data,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
  });
  redirect(`/tweets/${newTweet.id}`);
}
