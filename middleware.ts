import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrls: IRoutes = {
  "/": false,
  "/log-in": true,
  "/create-account": true,
  "/profile": false,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  // 로그인 상태가 아니면
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
    //로그인 상태이면
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/iamge|favicon.ico).*)"],
};
