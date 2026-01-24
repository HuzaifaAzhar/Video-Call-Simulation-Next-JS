'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-zinc-50 to-purple-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900 transition-colors px-2 pb-6">
      {/* <header className="w-full flex justify-between items-center px-8 py-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-200 tracking-tight">Video Chat App</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/dashboard" className="px-4 py-2 rounded-full font-medium text-zinc-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition">Dashboard</Link>
          <Link href="/chat" className="px-4 py-2 rounded-full font-medium text-zinc-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition">Chat</Link>
          <Link href="/call" className="px-4 py-2 rounded-full font-medium text-zinc-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition">Call Simulation</Link>
        </nav>
      </header> */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-2 sm:px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-6 text-center leading-tight animate-fadeIn">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Video Chat</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 mb-10 text-center max-w-2xl animate-fadeIn">
          A modern, real-time dashboard, chat, and call simulation app built with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs animate-fadeIn md:flex-row md:gap-6 md:max-w-none md:justify-center">
          <Link href="/dashboard" className="w-full md:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition text-center">Go to Dashboard</Link>
          <Link href="/chat" className="w-full md:w-auto px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold text-lg shadow-lg hover:bg-purple-700 transition text-center">Open Chat</Link>
          <Link href="/call" className="w-full md:w-auto px-8 py-4 rounded-xl bg-zinc-900 text-white font-semibold text-lg shadow-lg hover:bg-zinc-800 transition text-center">Simulate Call</Link>
        </div>
      </main>
      {/* <footer className="w-full text-center py-6 text-zinc-400 text-sm mt-10 animate-fadeIn">
        &copy; {new Date().getFullYear()} Video Chat App. All rights reserved.
      </footer>
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style> */}
    </div>
  );
}
