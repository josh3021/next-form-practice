import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { useFormStatus } from "react-dom";
import { typeToFlattenedError } from "zod";

interface ICreateAccountFormProps {
  state: {
    errors: typeToFlattenedError<
      {
        email: string;
        password: string;
        username: string;
        passwordConfirm: string;
      },
      string
    >;
  } | null;
}

export function CreateAccountForm({ state }: ICreateAccountFormProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <div className="group flex space-x-2 items-center border rounded-full px-4 py-1.5 text-neutral-600 focus-within:ring focus-within:ring-offset-2 focus-within:ring-neutral-200">
          <EnvelopeIcon className="size-4" />
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            className="outline-none flex-grow"
          />
        </div>
        {state?.errors.fieldErrors.email
          ? state.errors.fieldErrors.email.map((error, index) => {
              return (
                <p key={index} className="text-red-500 text-sm ml-4">
                  {error}
                </p>
              );
            })
          : null}
      </div>
      <div>
        <div className="group flex space-x-2 items-center border rounded-full px-4 py-1.5 text-neutral-600 focus-within:ring focus-within:ring-offset-2 focus-within:ring-neutral-200">
          <UserIcon className="size-4" />
          <input
            type="text"
            name="username"
            placeholder="닉네임을 입력해주세요"
            className="outline-none flex-grow"
          />
        </div>
        {state?.errors.fieldErrors.username
          ? state.errors.fieldErrors.username.map((error, index) => {
              return (
                <p key={index} className="text-red-500 text-sm ml-4">
                  {error}
                </p>
              );
            })
          : null}
      </div>
      <div>
        <div className="group flex space-x-2 items-center border rounded-full px-4 py-1.5 text-neutral-600 focus-within:ring focus-within:ring-offset-2 focus-within:ring-neutral-200">
          <KeyIcon className="size-4" />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="outline-none flex-grow"
          />
        </div>
        {state?.errors.fieldErrors.password
          ? state.errors.fieldErrors.password.map((error, index) => {
              return (
                <p key={index} className="text-red-500 text-sm ml-4">
                  {error}
                </p>
              );
            })
          : null}
      </div>
      <div>
        <div className="group flex space-x-2 items-center border rounded-full px-4 py-1.5 text-neutral-600 focus-within:ring focus-within:ring-offset-2 focus-within:ring-neutral-200">
          <KeyIcon className="size-4" />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요"
            className="outline-none flex-grow"
          />
        </div>
        {state?.errors.fieldErrors.passwordConfirm
          ? state.errors.fieldErrors.passwordConfirm.map((error, index) => {
              return (
                <p key={index} className="text-red-500 text-sm ml-4">
                  {error}
                </p>
              );
            })
          : null}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-neutral-100 rounded-full font-semibold py-3 hover:bg-neutral-200 active:bg-neutral-300 active:scale-x-105 transition-all"
      >
        {pending ? "잠시 기다려주세요..." : "가입하기"}
      </button>
    </>
  );
}
