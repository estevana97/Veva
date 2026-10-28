// Full-width looping background video with white content on top.
// Visitors who prefer reduced motion see the poster image instead (see .hero-video in globals.css).
export type HeroVideoSource = { mp4: string; webm: string; poster: string };

export default function HeroVideo({ video, children }: { video: HeroVideoSource; children: React.ReactNode }) {
  return (
    <section
      className="relative flex min-h-[560px] items-center overflow-hidden bg-cover bg-center text-white lg:min-h-[calc(100vh-3rem)]"
      style={{ backgroundImage: `url(${video.poster})` }}
    >
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={video.mp4} type="video/mp4" />
        <source src={video.webm} type="video/webm" />
      </video>
      {/* Darker on the left so the text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      <div className="container-page relative py-24">{children}</div>
    </section>
  );
}
