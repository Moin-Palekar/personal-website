// @ts-nocheck
"use client";
import { useState, useEffect } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/messages", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        setError("Unauthorized — please log in.");
      }
    }

    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Messages</h1>
        {error && <p className="mt-4 text-red-400">{error}</p>}
        <div className="mt-10 flex flex-col gap-6">
          {messages.length === 0 && !error && (
            <p className="text-gray-400">No messages yet.</p>
          )}
          {messages.map((msg) => (
            <div key={msg._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-gray-400">{new Date(msg.timestamp).toLocaleDateString()}</p>
              </div>
              <p className="mt-1 text-sm text-gray-400">{msg.email}</p>
              <p className="mt-4 text-gray-300">{msg.content}</p>
              <p className="mt-3 text-xs text-gray-600">{msg.userAgent}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 