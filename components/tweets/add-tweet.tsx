import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export function AddTweet() {
  return (
    <Link
      href="/tweet/add"
      className="absolute top-8 right-8 bg-orange-400 rounded-full p-1.5"
    >
      <PlusIcon className="size-8 text-white" />
    </Link>
  );
}

export function AddTweetButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="disabled:bg-neutral-400 bg-orange-400 hover:bg-orange-300 active:bg-orange-200 px-4 rounded text-white py-1.5 font-semibold"
    >
      {pending ? "로딩중..." : "게시하기"}
    </button>
  );
}
