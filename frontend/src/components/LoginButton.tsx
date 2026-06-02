"use client";

export default function LoginButton() {
  const login = () => {
    window.location.href = "https://glorious-space-engine-g4r7p5xvwwv52p79w-5000.app.github.dev/api/auth/github";
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
