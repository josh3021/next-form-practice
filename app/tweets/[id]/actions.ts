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
      comments: {
        select: {
          id: true,
          comment: true,
          _count: { select: { comment_likes: true } },
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
              updated_at: true,
            },
          },
        },
        take: 10,
      },
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}

export async function getIsSelfLiked(tweetId: number, userId: number) {
  const like = await db.like.findFirst({
    where: {
      tweetId,
      userId,
    },
  });
  return !!like;
}
