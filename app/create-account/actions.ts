"use server";

import db from "@/lib/db";
import { sessionLogin } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이어야 합니다.",
        required_error: "이메일은 필수 입력 사항입니다.",
      })
      .email({ message: "이메일 형식이 올바르지 않습니다." })
      .refine((email) => email.endsWith("@zod.com"), {
        message: "이메일은 @zod.com으로 끝나야 합니다.",
        path: ["email"],
      }),
    username: z
      .string({
        invalid_type_error: "이름은 문자열이어야 합니다.",
        required_error: "이름은 필수 입력 사항입니다.",
      })
      .min(5, "이름은 5글자 이상이어야 합니다."),
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
        required_error: "비밀번호는 필수 입력 사항입니다.",
      })
      .min(10, "비밀번호는 10글자 이상이어야 합니다.")
      .regex(/[0-9]/, { message: "비밀번호는 숫자를 포함해야 합니다." }),
    passwordConfirm: z.string({
      invalid_type_error: "비밀번호는 문자열이어야 합니다.",
      required_error: "비밀번호는 필수 입력 사항입니다.",
    }),
  })
  .superRefine(async ({ email }, ctx) => {
    const emailSameUser = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (emailSameUser) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "이미 사용 중인 이메일입니다.",
        fatal: true,
      });
      return z.never();
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const emailSameUser = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (emailSameUser) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["username"],
        message: "이미 사용 중인 닉네임입니다..",
        fatal: true,
      });
      return z.never();
    }
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
      return z.never();
    }
  });

export async function createAccount(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const newUser = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  await sessionLogin(newUser.id);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  redirect("/profile");
}
