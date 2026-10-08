import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <nav className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="font-semibold tracking-tight">Moin Palekar</a>
            <div className="flex gap-6 text-sm text-muted">
              <a href="/projects" className="hover:text-ink">Projects</a>
              <a href="/blog" className="hover:text-ink">Blog</a>
              <a href="/contact" className="hover:text-ink">Contact</a>
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
