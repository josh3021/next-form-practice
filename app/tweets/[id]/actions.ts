import db from "@/lib/db";

export async function getTweetDetails(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
      id: true,
      created_at: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return tweet;
}
