import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "../ui/Tooltip";
import { useGlobalState } from "../context/GlobalStateContext";
import DetailsModal from "./DetailsModal";

interface DataItem {
  id: number;
  name: string;
  user: string;
  status: string;
  type: string;
  time: string;
}

interface DashboardTableProps {
  data: DataItem[];
  page: number;
  setPage: (p: number) => void;
  total: number;
  itemsPerPage: number;
}

export default function DashboardTable({ data, page, setPage, total, itemsPerPage }: DashboardTableProps) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState<any>(null);
  const handleView = (item: any) => {
    setModalUser(item);
    setModalOpen(true);
  };
  const handleChat = (item: any) => {
    router.push(`/chat?userId=${item.id}`);
  };
  return (
    <div className="bg-white rounded-2xl shadow border border-zinc-100 p-0 overflow-hidden relative">
      <table className="w-full text-left">
        <thead className="bg-zinc-50 border-b border-zinc-100">
          <tr>
            <th className="py-3 px-4 text-xs font-semibold text-zinc-500 uppercase">User</th>
            <th className="py-3 px-4 text-xs font-semibold text-zinc-500 uppercase">Type</th>
            <th className="py-3 px-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
            <th className="py-3 px-4 text-xs font-semibold text-zinc-500 uppercase">Time</th>
            <th className="py-3 px-4 text-xs font-semibold text-zinc-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50 transition">
              <td className="py-3 px-4 font-medium text-zinc-900">{item.user}</td>
              <td className="py-3 px-4 capitalize text-zinc-700">{item.type}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === "active" ? "bg-green-100 text-green-700" : item.status === "missed" ? "bg-red-100 text-red-700" : "bg-zinc-200 text-zinc-700"}`}>{item.status}</span>
              </td>
              <td className="py-3 px-4 text-xs text-zinc-500">{item.time}</td>
              <td className="py-3 px-4 flex gap-2">
                <Tooltip text="View Details">
                  <button className="px-4 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-xs font-semibold shadow" onClick={() => handleView(item)}>View</button>
                </Tooltip>
                <Tooltip text="Chat with user">
                  <button
                    className="px-4 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-xs font-semibold shadow"
                    onClick={() => handleChat(item)}
                  >
                    Chat
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap justify-center md:justify-end gap-2 p-4 border-t border-zinc-100 bg-zinc-50">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-blue-100 hover:text-blue-700 transition disabled:opacity-40"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 16l-4-4 4-4"/></svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
          (p === 1 || p === totalPages || Math.abs(p - page) <= 1) ? (
            <button
              key={p}
              className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm transition border ${p === page ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-blue-100 hover:text-blue-700"}`}
              onClick={() => setPage(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ) :
            (p === page - 2 || p === page + 2) ? (
              <span key={p} className="w-9 h-9 flex items-center justify-center text-zinc-400">…</span>
            ) : null
        )}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-blue-100 hover:text-blue-700 transition disabled:opacity-40"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 4l4 4-4 4"/></svg>
        </button>
      </div>
      {modalOpen && (
        <DetailsModal open={modalOpen} onClose={() => setModalOpen(false)} user={modalUser} />
      )}
    </div>
  );
}
