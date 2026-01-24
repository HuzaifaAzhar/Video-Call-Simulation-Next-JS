"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSend, FiTrash2, FiMoon, FiSun } from "react-icons/fi";
import { useGlobalState } from "../context/GlobalStateContext";

const initialMessages = [
  { id: 1, user: "Alice", text: "Hey there! 👋", time: "10:00 AM" },
  { id: 2, user: "Bob", text: "Hi Alice! How are you?", time: "10:01 AM" },
  { id: 3, user: "Alice", text: "I'm good, thanks! Ready for the call?", time: "10:02 AM" },
];

export default function ChatPage() {
  const { user, users, setUsers } = useGlobalState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [chatUser, setChatUser] = useState<any>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [setUsers, users.length]);

  useEffect(() => {
    if (userId && users.length > 0) {
      setChatUser(users.find((u: any) => String(u.id) === String(userId)));
    }
  }, [userId, users]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        user: user?.name || "You",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: msgs.length + 2,
        user: chatUser?.name || "Other",
        text: `Auto-reply from ${chatUser?.name || "Other"}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-2 pb-4 sm:px-0 sm:pb-0">
      <div className={`w-full max-w-lg rounded-2xl shadow-xl flex flex-col h-[80vh] transition-colors duration-300 ${dark ? "bg-zinc-900" : "bg-white"} rounded-b-2xl sm:rounded-b-2xl`}> 
        <div className={`flex items-center justify-between p-4 border-b ${dark ? "border-zinc-700" : "border-zinc-200"}`}>
          <div>
            <h2 className={`text-xl font-bold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>Chat Room</h2>
            {chatUser && (
              <div className={`text-sm mt-1 ${dark ? "text-zinc-300" : "text-zinc-500"}`}>Chatting with <span className={`font-semibold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>{chatUser.name}</span></div>
            )}
          </div>
          <div className="flex gap-2">

                        {chatUser && (
              <button
                className="p-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                title="Video Call"
                onClick={() => router.push(`/call?userId=${chatUser.id}`)}
              >
                📞 Call
              </button>  
            )}
                        <button
                          className={`p-2 rounded transition ${dark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
                          onClick={() => setDark((d) => !d)}
                          title={dark ? "Light mode" : "Dark mode"}
                        >
                          {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-zinc-700" />}
                        </button>
            <button
              className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
              onClick={clearChat}
              title="Clear chat"
            >
              <FiTrash2 className="text-red-500" />
            </button>
          </div>
        </div>
        <div
          ref={chatRef}
          className={`flex-1 overflow-y-auto px-4 py-2 space-y-3 transition-colors ${dark ? "bg-zinc-900" : "bg-zinc-50"}`}
        >
          {messages.length === 0 ? (
            <div className="text-center text-zinc-400 mt-10">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${msg.user === (user?.name || "You") ? "ml-auto items-end" : "items-start"}`}
              >
                <div className={`rounded-xl px-4 py-2 shadow text-base font-medium animate-fadeIn
                  ${msg.user === (user?.name || "You")
                    ? (dark ? "bg-blue-700 text-white" : "bg-blue-600 text-white")
                    : (dark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-200 text-zinc-900")}
                `}>{msg.text}</div>
                <span className="text-xs text-zinc-400 mt-1">{msg.user} • {msg.time}</span>
              </div>
            ))
          )}
        </div>
        <form
          className={`flex items-center gap-2 p-4 rounded-2xl border-t ${dark ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"}`}
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
        >
          <input
            className={`flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400 transition
              ${dark
                ? "border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-400"
                : "border-zinc-200 bg-zinc-100 text-zinc-900 placeholder-zinc-500"}
            `}
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!input.trim()}
            title="Send"
          >
            <FiSend />
          </button>
        </form>
      </div>
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}