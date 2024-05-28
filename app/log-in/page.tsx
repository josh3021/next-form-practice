"use client";

// import { login } from "./actions";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function LoginPage() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto py-8 flex flex-col space-y-16 items-center">
        <h1 className="text-7xl">🥕</h1>
        <form action={dispatch} className="flex flex-col space-y-4 w-full">
          <LoginForm state={state} />
        </form>
        <Link
          href="/create-account"
          className="text-neutral-500 hover:text-neutral-400 active:text-neutral-300"
        >
          계정이 없으신가요? 계정을 만들어보세요!
        </Link>
      </div>
    </main>
  );
}
