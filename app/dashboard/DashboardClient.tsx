"use client";
import { useState, useMemo } from "react";
import DashboardTable from "./DashboardTable";
import DashboardCards from "./DashboardCards";

const categories = ["all", "active", "missed", "ended"];

export default function DashboardClient({ data }: { data: any[] }) {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const mappedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    user: item.name || item.username || "User",
    status: item.id % 3 === 0 ? "missed" : item.id % 2 === 0 ? "ended" : "active",
    type: item.email ? "message" : "call",
    time: new Date(Date.now() - item.id * 3600 * 1000).toISOString().slice(0, 16).replace("T", " "),
  }));

  const filteredData = useMemo(() => {
    if (category === "all") return mappedData;
    return mappedData.filter((item) => item.status === category);
  }, [category, mappedData]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white py-10 px-2">
      <div className="w-full max-w-5xl mx-auto p-8 rounded-2xl shadow-lg border border-zinc-100">
        <h1 className="text-4xl font-extrabold mb-8 text-zinc-900 tracking-tight flex items-center gap-3">
          <span className="inline-block w-2 h-8 bg-blue-600 rounded-full mr-2"></span>
          Dashboard
        </h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all flex items-center gap-2 ${category === cat ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-blue-50 hover:text-blue-700"}`}
              onClick={() => { setCategory(cat); setPage(1); }}
            >
              {cat === "active" && <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>}
              {cat === "missed" && <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>}
              {cat === "ended" && <span className="inline-block w-2 h-2 bg-zinc-400 rounded-full"></span>}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="md:hidden">
          <DashboardCards data={paginatedData} />
          {/* Mobile Pagination Controls */}
          <div className="flex flex-wrap justify-center gap-2 p-4 border-t border-zinc-100 bg-zinc-50 mt-2">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-blue-100 hover:text-blue-700 transition disabled:opacity-40"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 16l-4-4 4-4"/></svg>
            </button>
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1).map((p) =>
              (p === 1 || p === Math.ceil(filteredData.length / itemsPerPage) || Math.abs(p - page) <= 1) ? (
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
              disabled={page === Math.ceil(filteredData.length / itemsPerPage)}
              aria-label="Next page"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 4l4 4-4 4"/></svg>
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <DashboardTable data={paginatedData} page={page} setPage={setPage} total={filteredData.length} itemsPerPage={itemsPerPage} />
        </div>
      </div>
    </div>
  );
}
