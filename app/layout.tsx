import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CosmicBand from "./components/CosmicBand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moin Palekar",
  description: "Full-stack developer and AI researcher building production-grade apps and autonomous agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} min-h-screen bg-paper text-ink antialiased`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        <nav className="sticky top-0 z-50 overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-0">
            <CosmicBand height={64} />
          </div>
          <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <a href="/" className="rounded-full bg-paper/80 px-3 py-1 font-semibold tracking-tight backdrop-blur">
              Moin Palekar
            </a>
            <div className="flex gap-1 rounded-full bg-paper/80 px-2 py-1 text-sm text-muted backdrop-blur">
              <a href="/projects" className="rounded-full px-3 py-0.5 hover:text-accent">Projects</a>
              <a href="/blog" className="rounded-full px-3 py-0.5 hover:text-accent">Blog</a>
              <a href="/contact" className="rounded-full px-3 py-0.5 hover:text-accent">Contact</a>
            </div>
          </div>
        </nav>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-line py-8">
          <div className="mx-auto max-w-5xl px-6 text-sm text-muted">
            © {new Date().getFullYear()} Moin Palekar
          </div>
        </footer>
      </body>
    </html>
  );
}
