import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="font-bricolage text-4xl tracking-tight text-white">
            Where OSS Radar
          </h1>

          <p className="font-sans mt-3 text-sm text-zinc-400">
            Discover, track, and analyze open source projects with ease.
          </p>
        </div>

        {/* Login */}
        <LoginButton />

        <p className="font-sans mt-6 text-xs text-zinc-500">
          Sign in securely using your GitHub account
        </p>
      </div>
    </main>
  );
}
