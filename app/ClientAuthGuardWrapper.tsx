"use client";
import AuthGuard from "./AuthGuard";
export default function ClientAuthGuardWrapper({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}