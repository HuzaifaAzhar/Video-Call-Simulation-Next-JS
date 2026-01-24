"use client";
import React, { useState } from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const LOCAL_USERS_KEY = "localUsers";
const getLocalUsers = () => {
  if (typeof window === "undefined") return [];
  const users = window.localStorage.getItem(LOCAL_USERS_KEY);
  return users ? JSON.parse(users) : [];
};
const setLocalUsers = (users: any[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  }
};
const HARDCODED_USERS = [
  { id: 1, name: "Demo User", email: "demo@example.com", password: "demo123" },
  { id: 2, name: "Alice", email: "alice@example.com", password: "alice123" },
  { id: 3, name: "Bob", email: "bob@example.com", password: "bob123" },
];

export default function LoginPage() {
  const { user, setUser } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const queryClient = useQueryClient();

  const { data: localUsers = [] } = useQuery({
    queryKey: ["localUsers"],
    queryFn: getLocalUsers,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const signupMutation = useMutation({
    mutationFn: async (newUser: { name: string; email: string; password: string }) => {
      const allUsers = [...HARDCODED_USERS, ...getLocalUsers()];
      if (allUsers.some(u => u.email === newUser.email)) {
        throw new Error("Email already exists");
      }
      const users = getLocalUsers();
      const id = Date.now();
      const userObj = { id, ...newUser };
      setLocalUsers([...users, userObj]);
      return Promise.resolve(userObj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["localUsers"] });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const allUsers = [...HARDCODED_USERS, ...localUsers];
    const found = allUsers.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("authUser", JSON.stringify({ id: found.id, name: found.name, email: found.email }));
      }
    } else {
      setError("Invalid credentials");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: (userObj: any) => {
          setUser({ id: userObj.id, name: userObj.name, email: userObj.email });
          if (typeof window !== "undefined") {
            window.localStorage.setItem("authUser", JSON.stringify({ id: userObj.id, name: userObj.name, email: userObj.email }));
          }
        },
        onError: (err: any) => setError(err.message || "Signup failed"),
      }
    );
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
                    <button
                      className="mt-4 mr-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.location.href = "/dashboard";
                        }
                      }}
                    >
                      Dashboard
                    </button>
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            onClick={() => {
              setUser(null);
              if (typeof window !== "undefined") window.localStorage.removeItem("authUser");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 w-full max-w-sm">
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition border ${mode === "login" ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-blue-50"}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition border ${mode === "signup" ? "bg-green-600 text-white border-green-600" : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-green-50"}`}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>
        {mode === "login" ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <input
              className="w-full mb-4 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full mb-4 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
            <button
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              type="submit"
            >
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <input
              className="w-full mb-4 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className="w-full mb-4 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full mb-4 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
            <button
              className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              type="submit"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
