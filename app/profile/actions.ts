"use server";

import db from "@/lib/db";
import { sessionLogout } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      bio: true,
      created_at: true,
      email: true,
      id: true,
      username: true,
      _count: {
        select: {
          likes: true,
          tweets: true,
        },
      },
    },
  });
  return user;
}

export async function logout() {
  await sessionLogout();
  redirect("/");
}
