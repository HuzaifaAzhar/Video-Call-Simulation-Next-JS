
"use client";
import { useGlobalState } from "./context/GlobalStateContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {

  const { user, loadingUser } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loadingUser) return;
    if (!user && ["/dashboard", "/chat", "/call"].some((p) => pathname.startsWith(p))) {
      router.replace("/auth");
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [user, pathname, router, loadingUser]);

  if (loadingUser || !checked) return null;
  return <>{children}</>;
}