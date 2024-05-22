"use server";

import { z } from "zod";

const formSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이어야 합니다.",
        required_error: "이메일은 필수 입력 사항입니다.",
      })
      .email({ message: "이메일 형식이 올바르지 않습니다." }),
    username: z
      .string({
        invalid_type_error: "이름은 문자열이어야 합니다.",
        required_error: "이름은 필수 입력 사항입니다.",
      })
      .min(3, "이름은 3글자 이상이어야 합니다."),
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
        required_error: "비밀번호는 필수 입력 사항입니다.",
      })
      .min(5, "비밀번호는 5글자 이상이어야 합니다."),
  })
  .superRefine(async ({ password }, ctx) => {
    if (password !== "12345") {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "비밀번호가 틀렸습니다.",
        fatal: false,
      });
      return z.never();
    }
  });

export async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  }

  return { success: true, errors: null };
}
