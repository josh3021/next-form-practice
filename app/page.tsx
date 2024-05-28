import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-56">
      <div className="min-w-40 max-w-2xl px-16 mx-auto py-8 flex flex-col space-y-16 items-center">
        <h1 className="text-7xl">🥕</h1>
        <h2 className="text-2xl font-medium">
          당근 챌린지에 오신걸 환영합니다!
        </h2>
        <p className="text-neutral-500 font-light text-center">
          향상된 프로그래밍 실력을 느껴보세요!
        </p>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-center items-center gap-1">
            <span className="text-pink-400">👊 같이 시작해볼까요?</span>
            <Link
              href="/create-account"
              className="font-semibold text-pink-500 hover:text-pink-400 active:text-pink-300"
            >
              가입하기
            </Link>
          </div>
          <div className="flex justify-center items-center gap-1">
            <span className="text-green-600">🙌 이미 회원이신가요?</span>
            <Link
              href="/log-in"
              className="font-semibold text-green-700 hover:text-green-600 active:text-green-500"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
