"use client";
import Link from "next/link";
import { useGlobalState } from "./context/GlobalStateContext";

export default function LayoutAuthButton() {
  const { user, loadingUser } = useGlobalState();
  if (loadingUser) return null;
  if (user) {
    return (
      <Link
        href="/auth"
        className="px-4 py-2 rounded-lg bg-zinc-100 text-blue-700 font-semibold hover:bg-blue-50 border border-zinc-200 transition flex items-center gap-2"
        title="Profile"
      >
            <span className="inline-flex w-8 h-8 rounded-full bg-blue-200 text-blue-800 items-center justify-center font-bold text-base leading-none">
            {user.name?.charAt(0).toUpperCase()}
            </span>

        <span className="sm:inline">{user.name}</span>
      </Link>
    );
  }
  return (
    <Link
      href="/auth"
      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition border border-blue-600"
    >
      Login
    </Link>
  );
}
