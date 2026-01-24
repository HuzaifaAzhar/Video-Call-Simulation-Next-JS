import type { Metadata, Viewport } from "next";
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
  title: "Huzaifa Video Chat Demo",
  description:
    "A modern, real-time dashboard, chat, and call simulation app built with Next.js, TypeScript, and Tailwind CSS.",
  applicationName: "Huzaifa Video Chat Demo",
  themeColor: "#2563eb",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  other: {
    "apple-mobile-web-app-title": "Huzaifa Video Chat Demo",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


import ClientProviders from "./ClientProviders";
import AppHeader from "./AppHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Huzaifa Video Chat Demo" />
        <meta name="application-name" content="Huzaifa Video Chat Demo" />
        <meta name="description" content="A modern, real-time dashboard, chat, and call simulation app built with Next.js, TypeScript, and Tailwind CSS." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>Huzaifa Video Chat Demo</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen flex flex-col`}>
        <ClientProviders>
          <AppHeader />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <footer className="w-full border-t border-zinc-100 bg-white text-center py-6 text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} Video Chat App. All rights reserved.
          </footer>
        </ClientProviders>
      </body>
    </html>
  );
}
