"use client";

export default function LoginButton() {
  const login = () => {
    window.location.href;
    ("http://localhost:5000/api/auth/github");
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
