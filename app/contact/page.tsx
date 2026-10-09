"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, content }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent-soft";

  return (
    <main className="py-16">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="font-display text-5xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">
          Hiring, collaborating, or curious about a project? Send a message, or email me directly at{" "}
          <a href="mailto:moinismailp@gmail.com" className="font-medium text-accent hover:underline">
            moinismailp@gmail.com
          </a>
          .
        </p>

        {status === "sent" ? (
          <div className="mt-12 rounded-2xl border border-line bg-card p-8">
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
              Message sent
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">Thanks, {name.split(" ")[0] || "there"}.</h2>
            <p className="mt-2 leading-relaxed text-muted">
              Your message reached me. I&apos;ll reply to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className={field} />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@company.com" className={field} />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to talk about?"
                className={`${field} resize-y`}
              />
            </label>

            {status === "error" && (
              <p className="rounded-xl bg-saffron-soft px-4 py-3 text-sm text-saffron">
                Couldn&apos;t send that. Try again, or email me at moinismailp@gmail.com.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}