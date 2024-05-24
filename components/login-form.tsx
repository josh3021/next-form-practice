import {
  CheckCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useFormStatus } from "react-dom";
import { typeToFlattenedError } from "zod";

interface ILoginFormProps {
  state:
    | {
        success: boolean;
        errors: typeToFlattenedError<
          {
            email: string;
            username: string;
            password: string;
          },
          string
        >;
      }
    | {
        success: boolean;
        errors: null;
      };
}

export function LoginForm({ state: { errors, success } }: ILoginFormProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <div className="group flex space-x-2 items-center border rounded-full px-4 py-1.5 text-neutral-600 focus-within:ring focus-within:ring-offset-2 focus-within:ring-neutral-200">
          <EnvelopeIcon className="size-4" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="outline-none flex-grow"
          />
        </div>
        {errors?.fieldErrors.email
          ? errors.fieldErrors.email.map((error, index) => {
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
            placeholder="Username"
            className="outline-none flex-grow"
          />
        </div>
        {errors?.fieldErrors.username
          ? errors.fieldErrors.username.map((error, index) => {
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
            placeholder="Password"
            className="outline-none flex-grow"
          />
        </div>
        {errors?.fieldErrors.password
          ? errors.fieldErrors.password.map((error, index) => {
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
        {pending ? "Loading..." : "Log in"}
      </button>
      {success && (
        <div className="bg-emerald-500 rounded-xl w-full h-12 flex items-center px-6 space-x-2">
          <CheckCircleIcon className="size-4" />
          <span>Welcome back!</span>
        </div>
      )}
    </>
  );
}
