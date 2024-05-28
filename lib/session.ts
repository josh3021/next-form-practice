import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface ISession {
  id?: number;
}

export async function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: "nomad-challenge",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function sessionLogin(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}

export async function sessionLogout() {
  const session = await getSession();
  session.destroy();
}
