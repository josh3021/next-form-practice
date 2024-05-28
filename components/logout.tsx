"use client";

import { logout } from "@/app/profile/actions";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { MouseEvent } from "react";

export function Logout() {
  async function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    await logout();
  }
  return (
    <button
      onClick={handleLogout}
      className="text-neutral-700 rounded-lg hover:bg-neutral-200 active:bg-neutral-300 font-bold"
    >
      <ArrowRightStartOnRectangleIcon className="size-8" />
    </button>
  );
}
