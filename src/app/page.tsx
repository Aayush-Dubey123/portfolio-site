export default function Home() {
  return (
    <main className="relative min-h-screen w-full select-none overflow-x-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 -z-50 w-full h-full bg-black">
        <video
          src="/animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Temporary content spacer to verify scrolling stability and video seamlessness */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[200vh] text-white">
        <div className="p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center max-w-md mx-auto my-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-light tracking-wider mb-2">Portfolio Horizon</h1>
          <p className="text-sm text-zinc-400 font-mono">
            Calm immersive environment background video loaded. Scroll to test stability.
          </p>
        </div>
      </div>
    </main>
  );
}

