import { Logout } from "@/components/logout";
import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/outline";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getUser } from "./actions";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session.id) return notFound();
  const user = await getUser(session.id);
  if (!user) return notFound();

  return (
    <div className="max-w-xs mx-auto h-full py-28 flex flex-col">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">내 프로필</h1>
        <Logout />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative bg-gray-100 flex justify-center items-center overflow-hidden rounded-full size-32 ring ring-offset-2 ring-gray-200">
          {user.avatar ? (
            <Image src={user.avatar} fill alt={user.username} />
          ) : (
            <UserIcon className="size-28 text-neutral-700" />
          )}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <h2 className="text-2xl font-medium">{user.username}</h2>
          <h3 className="text-neutral-500 font-light">{user.email}</h3>
          <div className="w-full h-24 flex gap-4 my-8 text-white">
            <div className="w-1/2 h-full rounded-lg bg-pink-400 flex flex-col items-center justify-center gap-1">
              <span className="font-medium">Likes</span>
              <span className="font-medium">{user._count.likes}</span>
            </div>
            <div className="w-1/2 h-full rounded-lg bg-sky-500 flex flex-col items-center justify-center gap-1">
              <span className="font-medium">Tweets</span>
              <span className="font-medium">{user._count.likes}</span>
            </div>
          </div>
          <h5 className="font-light">
            저희와 함께한 시간{" "}
            <span className="font-medium text-pink-400">
              {formatDistance(user.created_at, new Date(), { locale: ko })} 💖
            </span>
          </h5>
          <h6 className="mx-4 text-neutral-500 font-light text-sm">
            {user.bio}
          </h6>
        </div>
      </div>
    </div>
  );
}
