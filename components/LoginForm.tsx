"use client";

import { useState } from "react";

// UI only: connect to an auth provider (e.g. NextAuth/Auth.js, Clerk or Supabase Auth) to make this work.
export default function LoginForm({ initialMode }: { initialMode: "login" | "signup" }) {
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");
  const signup = mode === "signup";

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-center text-4xl">{signup ? "Become a member" : "Welcome back"}</h1>
      <form
        className="mt-10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setMessage("Member accounts are coming soon. We'll notify you when they launch.");
        }}
      >
        {signup && (
          <div>
            <label className="label" htmlFor="l-name">Name</label>
            <input id="l-name" required className="field" autoComplete="name" />
          </div>
        )}
        <div>
          <label className="label" htmlFor="l-email">Email</label>
          <input id="l-email" type="email" required className="field" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="l-password">Password</label>
          <input id="l-password" type="password" required minLength={8} className="field" autoComplete={signup ? "new-password" : "current-password"} />
        </div>
        <button className="btn-solid w-full">{signup ? "Create account" : "Login"}</button>
        {message && <p className="text-center text-sm text-muted">{message}</p>}
      </form>
      <p className="mt-6 text-center text-sm">
        {signup ? "Already a member? " : "New to Véva? "}
        <button className="underline" onClick={() => { setMode(signup ? "login" : "signup"); setMessage(""); }}>
          {signup ? "Login" : "Create an account"}
        </button>
      </p>
    </div>
  );
}
