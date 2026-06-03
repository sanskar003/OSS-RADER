"use client";

export default function LoginButton() {
  const login = () => {
    window.location.href = "https://stunning-sniffle-x5pv49rgq765c6w56-5000.app.github.dev/api/auth/github";
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
