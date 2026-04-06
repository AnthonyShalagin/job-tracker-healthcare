import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8f9fa] font-[family-name:var(--font-inter)]">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-stone-200/60">
          <nav className="max-w-[1200px] mx-auto px-6 h-[56px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <span className="font-semibold text-[15px] text-stone-800">
                Job Tracker
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                Roles
              </Link>
              <Link
                href="/companies"
                className="px-3 py-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                Companies
              </Link>
              <Link
                href="/leads"
                className="px-3 py-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                Leads
              </Link>
              <Link
                href="/resources"
                className="px-3 py-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                Resources
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
