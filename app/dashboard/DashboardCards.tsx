import React from "react";

interface DataItem {
  id: number;
  name: string;
  user: string;
  status: string;
  type: string;
  time: string;
}

import { useRouter } from "next/navigation";

export default function DashboardCards({ data }: { data: DataItem[] }) {
  const router = useRouter();
  return (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className={`rounded-2xl shadow-lg border border-zinc-100 p-4 flex flex-col gap-2 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900 ${item.status === "missed" ? "border-red-200" : item.status === "ended" ? "border-zinc-200" : "border-green-200"} transition-all duration-200`}
        >
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${item.status === "active" ? "bg-green-500" : item.status === "missed" ? "bg-red-500" : "bg-zinc-400"}`}></div>
            <span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 truncate">{item.user}</span>
          </div>
          <div className="flex flex-col xs:flex-row flex-wrap gap-1 text-xs text-zinc-500 mb-2">
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 w-fit">{item.type}</span>
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 w-fit">{item.status}</span>
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 w-fit">{item.time}</span>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 mt-auto w-full">
            <button
              className="w-full xs:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-semibold shadow"
              onClick={() => router.push(`/call?userId=${item.id}`)}
            >
              Call
            </button>
            <button
              className="w-full xs:w-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm font-semibold shadow"
              onClick={() => router.push(`/chat?userId=${item.id}`)}
            >
              Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
