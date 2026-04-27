import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignIn from "./auth/sign-in/page";

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token");

  if (refreshToken) {
    redirect("/dashboard");
  }

  return <SignIn />;
}