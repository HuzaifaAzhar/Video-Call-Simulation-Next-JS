import React from "react";

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    email?: string;
    status?: string;
    type?: string;
    time?: string;
  } | null;
}

export default function DetailsModal({ open, onClose, user }: DetailsModalProps) {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-zinc-900">User Details</h2>
        <div className="space-y-2">
          <div><span className="font-semibold">Name:</span> {user.name}</div>
          {user.email && <div><span className="font-semibold">Email:</span> {user.email}</div>}
          {user.status && <div><span className="font-semibold">Status:</span> {user.status}</div>}
          {user.type && <div><span className="font-semibold">Type:</span> {user.type}</div>}
          {user.time && <div><span className="font-semibold">Time:</span> {user.time}</div>}
        </div>
      </div>
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
