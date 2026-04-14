"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, content }),
    });

    if (res.ok) {
      setStatus("Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setContent("");
    } else {
      const data = await res.json();
      setStatus(data.error || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-3 text-gray-300">Have a question or want to work together? Send me a message.</p>
        {status && <p className="mt-4 text-green-400">{status}</p>}
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
}