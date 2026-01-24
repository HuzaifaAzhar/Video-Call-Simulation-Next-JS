"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiPhoneCall, FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff } from "react-icons/fi";
import Image from "next/image";
import { useGlobalState } from "../context/GlobalStateContext";

const callStatuses = ["Ringing", "Connected", "Ended"];

export default function CallPage() {
  const { users, setUsers } = useGlobalState();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [callUser, setCallUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ringing");
  const [timer, setTimer] = useState(0);
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [setUsers, users.length]);

  useEffect(() => {
    if (userId && users.length > 0) {
      setCallUser(users.find((u: any) => String(u.id) === String(userId)));
    }
  }, [userId, users]);

  useEffect(() => {
    if (status === "Connected") {
      setLoading(true);
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
      if (video) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
            setTimeout(() => setLoading(false), 1200);
          })
          .catch(() => {
            setStream(null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setLoading(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [status, video]);

  const startCall = () => {
    setStatus("Ringing");
    setTimer(0);
    setTimeout(() => setStatus("Connected"), 2000);
  };

  const endCall = () => {
    setStatus("Ended");
    setTimer(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-zinc-50 to-purple-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900 transition-colors">
      <div className={`w-full ${status === "Connected" && video ? "max-w-3xl" : "max-w-md"} rounded-2xl shadow-2xl bg-white dark:bg-zinc-800 flex m-5 flex-col items-center p-8 relative`}>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Call Simulation</h2>
        {callUser && (
          <div className="mb-2 text-base text-zinc-700 dark:text-zinc-200">Calling: <span className="font-semibold">{callUser.name}</span></div>
        )}
        <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Status: <span className={`font-semibold ${status === "Connected" ? "text-green-600" : status === "Ended" ? "text-red-600" : "text-yellow-500"}`}>{status}</span></div>
        <div className="mb-6 w-full flex justify-center items-center">
          {status === "Connected" ? (
            <div className="relative w-full flex flex-col items-center">
              <video
                ref={videoRef}
                autoPlay
                muted={muted}
                className={`rounded-2xl border-4 border-blue-400 shadow-lg bg-zinc-200 dark:bg-zinc-700 w-full max-h-[400px] object-cover ${video ? "block" : "hidden"}`}
                style={{ background: '#222' }}
              />
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-zinc-900/70 rounded-2xl z-10">
                  <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="text-zinc-500">Loading camera...</div>
                </div>
              )}
              {!video && (
                <Image
                  src={"/avatar.jpg"}
                  alt="User avatar"
                  width={120}
                  height={120}//absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  className="rounded-full border-4 border-blue-400 shadow-lg bg-zinc-200 dark:bg-zinc-700"
                />
              )}
            </div>
          ) : (
            <Image
              src={"/avatar.jpg"}
              alt="User avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-400 shadow-lg bg-zinc-200 dark:bg-zinc-700"
            />
          )}
        </div>
        <div className="mb-6 text-3xl font-mono text-zinc-700 dark:text-zinc-200">
          {status === "Connected" ? formatTime(timer) : "00:00"}
        </div>
        <div className="flex gap-4 mb-8">
          <button
            className={`p-4 rounded-full shadow ${muted ? "bg-red-100 dark:bg-red-900" : "bg-zinc-100 dark:bg-zinc-700"} hover:scale-110 transition`}
            onClick={() => setMuted((m) => !m)}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <FiMicOff className="text-red-500" size={24} /> : <FiMic className="text-zinc-700 dark:text-zinc-200" size={24} />}
          </button>
          <button
            className={`p-4 rounded-full shadow ${video ? "bg-blue-100 dark:bg-blue-900" : "bg-red-100 dark:bg-red-900"} hover:scale-110 transition`}
            onClick={() => setVideo((v) => !v)}
            title={video ? "Turn video off" : "Turn video on"}
          >
            {video ? <FiVideo className="text-blue-500" size={24} /> : <FiVideoOff className="text-zinc-700 dark:text-zinc-200" size={24} />}
          </button>
          {status !== "Ended" && (
            <button
              className="p-4 rounded-full shadow bg-red-600 hover:bg-red-700 transition"
              onClick={endCall}
              title="End call"
              disabled={status !== "Connected"}
            >
              <FiPhoneOff className="text-white" size={24} />
            </button>
          )}
        </div>
        {status === "Ended" ? (
          <button
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
            onClick={startCall}
          >
            <FiPhoneCall className="inline mr-2" /> Start Call
          </button>
        ) : status === "Ringing" ? (
          <button
            className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition animate-pulse"
            onClick={() => setStatus("Connected")}
          >
            <FiPhoneCall className="inline mr-2" /> Accept Call
          </button>
        ) : null}
      </div>
    </div>
  );
}