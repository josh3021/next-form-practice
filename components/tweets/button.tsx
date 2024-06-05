"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex gap-1 items-center hover:bg-neutral-100 active:bg-neutral-200 rounded-xl p-2"
    >
      <ChevronLeftIcon className="size-10" />
      <span className="text-xl">Back</span>
    </button>
  );
}
