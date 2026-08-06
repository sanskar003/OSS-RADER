export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute h-80 w-80 animate-spin rounded-full border-2 border-emerald-500/40 blur-sm" />
      <div className="absolute h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Hero Content */}
      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">

        <h1 className="font-bricolage text-6xl font-bold tracking-tight text-black md:text-7xl">
          OSS <span className="text-emerald-400">RADAR</span>
        </h1>

        <p className="font-sans  mt-6 max-w-2xl text-lg leading-5 text-zinc-500">
          Discover open-source repositories tailored to your interests,
          programming languages, and development goals. Spend less time
          searching and more time building.
        </p>

        <div className="mt-10 font-bricolage flex gap-4">
          <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400">
            Get Started
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-black transition hover:border-emerald-500 hover:bg-emerald-500">
            Explore Repositories
          </button>
        </div>
      </section>
    </main>
  );
}
