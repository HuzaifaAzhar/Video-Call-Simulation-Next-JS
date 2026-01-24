
import DashboardClient from "./DashboardClient";


export default async function DashboardPage() {
  let data: any[] = [];
  let error = null;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch data");
    data = await res.json();
  } catch (e: any) {
    error = e.message || "Unknown error";
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading dashboard</h2>
          <p className="text-zinc-500">{error}</p>
        </div>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-5xl mx-auto p-8 rounded-2xl shadow-lg border border-zinc-100">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-zinc-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-zinc-100 rounded-2xl"></div>)}
            </div>
            <div className="h-64 bg-zinc-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }
  return <DashboardClient data={data} />;
}

