"use server";

import { z } from "zod";

const formSchema = z.object({
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
