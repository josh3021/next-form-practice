"use client";

import { LoginForm } from "@/components/login-form";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Home() {
  const [state, dispatch] = useFormState(login, {
    success: false,
    errors: null,
  });
  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto py-8 flex flex-col space-y-16 items-center">
        <h1 className="text-7xl">🥕</h1>
        <form action={dispatch} className="flex flex-col space-y-4 w-full">
          <LoginForm state={state} />
        </form>
      </div>
    </main>
  );
}
