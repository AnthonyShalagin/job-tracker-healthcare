import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healthcare Job Tracker",
  description: "Director-level healthcare operations roles, verified daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-[family-name:var(--font-geist-sans)]">
        <header className="sticky top-0 z-10 bg-white border-b border-stone-200">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-stone-800">
              Healthcare Job Tracker
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-stone-600 hover:text-stone-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/companies"
                className="text-stone-600 hover:text-stone-900 transition-colors"
              >
                Companies
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
