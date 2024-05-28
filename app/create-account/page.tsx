"use client";

import { CreateAccountForm } from "@/components/create-account-form";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto py-8 flex flex-col space-y-16 items-center">
        <h1 className="text-7xl">🥕</h1>
        <form action={dispatch} className="flex flex-col space-y-4 w-full">
          <CreateAccountForm state={state} />
        </form>
        <Link
          href="/log-in"
          className="text-neutral-500 hover:text-neutral-400 active:text-neutral-300"
        >
          이미 계정이 있으신가요?
        </Link>
      </div>
    </main>
  );
}
