"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/blog");
    } else {
      setError(data.error);
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-4xl font-bold">Login</h1>
        {error && <p className="mt-4 text-red-400">{error}</p>}
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Login
          </button>
          <p className="text-sm text-gray-400">Don't have an account? <a href="/register" className="text-white underline">Register</a></p>
        </div>
      </div>
    </main>
  );
}