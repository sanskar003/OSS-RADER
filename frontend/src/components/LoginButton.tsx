"use client";

// import { FaGithub } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function LoginButton() {
  const login = () => {
    window.location.href = "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/github";
  };

  return (
    <button
      onClick={login}
      className="font-sans px-4 py-2 bg-black text-white rounded-lg cursor-pointer border border-transparent hover:border-emerald-500 transition-all duration-300"
    >
      <div className="flex gap-3 items-center">
        <FaGithub className="w-5 h-5" /> <p>Login with GitHub</p>
      </div>
    </button>
  );
}
