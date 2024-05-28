"use server";

import db from "@/lib/db";
import { sessionLogin } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: "이메일은 문자열이어야 합니다.",
      required_error: "이메일은 필수 입력 사항입니다.",
    })
    .email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string({
    invalid_type_error: "비밀번호는 문자열이어야 합니다.",
    required_error: "비밀번호는 필수 입력 사항입니다.",
  }),
});

export async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const ok = await bcrypt.compare(result.data.password, user?.password ?? "");

  if (user && ok) {
    await sessionLogin(user.id);
    return redirect("/profile");
  }
  return {
    fieldErrors: {
      password: ["이메일 또는 비밀번호가 일치하지 않습니다."],
      email: [],
    },
  };
}
