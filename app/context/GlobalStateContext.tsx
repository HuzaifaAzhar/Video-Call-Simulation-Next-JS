"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
}

interface GlobalState {
  user: User | null;
  setUser: (user: User | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  loadingUser: boolean;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("authUser");
      if (stored) setUser(JSON.parse(stored));
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) window.localStorage.setItem("authUser", JSON.stringify(user));
      else window.localStorage.removeItem("authUser");
    }
  }, [user]);

  return (
    <GlobalStateContext.Provider value={{ user, setUser, users, setUsers, loadingUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error("useGlobalState must be used within GlobalStateProvider");
  return context;
}
