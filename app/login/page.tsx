import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage({ searchParams }: { searchParams: { mode?: string } }) {
  return (
    <section className="container-page flex justify-center pt-16 sm:pt-24">
      <LoginForm initialMode={searchParams.mode === "signup" ? "signup" : "login"} />
    </section>
  );
}
