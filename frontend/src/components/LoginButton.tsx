"use client";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function LoginButton() {
  const login = () => {
    window.location.href = "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/github";
  };

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-black text-white rounded-lg"
    > 
      Login with GitHub
    </button>
  );
}
