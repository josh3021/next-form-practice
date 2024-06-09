"use client";

export function LoadMoreForm({
  getMoreComments,
  isEnd,
}: {
  getMoreComments: any;
  isEnd: boolean;
}) {
  return (
    <form name="getMoreComments" action={getMoreComments}>
      <button
        name="comments"
        className="bg-orange-500 hover:bg-orange-400 active:bg-orange-300 shadow disabled:bg-gray-500 text-white py-1 px-2 rounded-lg mb-10"
        disabled={isEnd}
        type="submit"
      >
        {isEnd ? "Last Comments" : "Load More Comments"}
      </button>
    </form>
  );
}
