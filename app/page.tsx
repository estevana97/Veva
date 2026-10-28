import Link from "next/link";
import Photo from "@/components/Photo";
import { categories, images, tiers } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero: full-width background video with white text */}
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden bg-cover bg-center text-white lg:min-h-[calc(100vh-3rem)]"
        style={{ backgroundImage: `url(${images.homeVideo.poster})` }}
      >
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          poster={images.homeVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={images.homeVideo.mp4} type="video/mp4" />
          <source src={images.homeVideo.webm} type="video/webm" />
        </video>
        {/* Darker on the left so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

        <div className="container-page relative py-24">
          <h1 className="max-w-xl text-3xl leading-tight sm:text-4xl">One platform for all your curated experiences</h1>
          <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-white/90 sm:text-sm">
            Véva brings together the experiences that shape who you are, from chef’s tables and cultural activities to
            sports races and wellness. Book them in one place, share them with the people who move you forward, and get
            rewarded for every experience.
          </p>
          <Link
            href="/experiences"
            className="mt-8 inline-flex items-center justify-center border border-white px-7 py-2 font-serif text-base text-white transition-colors hover:bg-white hover:text-ink"
          >
            Explore now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-28">
        <h2 className="text-center text-3xl">What will you experience next?</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/experiences/${c.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Photo
                  src={c.image}
                  alt={c.name}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-4 text-xl">{c.name}</h3>
              <p className="text-xs uppercase tracking-wider text-muted">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-page mt-28 grid gap-10 border-y border-line py-16 text-center md:grid-cols-3">
        {[
          ["Reserve", "Book a table, tee time, start number, show or spa treatment in a few clicks, and earn Véva Points straight away."],
          ["Scan & enjoy", "Show your personal QR code at the venue and earn 1 Véva Point for every euro you spend."],
          ["Share", "Share your verified experiences with friends and followers, and discover where they go next."],
        ].map(([title, text], i) => (
          <div key={title}>
            <p className="font-serif text-sm text-muted">0{i + 1}</p>
            <h3 className="mt-2 text-2xl">{title}</h3>
            <p className="lead mx-auto mt-3 max-w-xs">{text}</p>
          </div>
        ))}
      </section>

      {/* Rewards teaser */}
      <section className="container-page mt-28 text-center">
        <h2 className="text-3xl">Véva rewards</h2>
        <p className="lead mx-auto mt-4 max-w-xl">
          Earn Véva Points when you book and again when you spend. Use them across every partner, or rise from Bronze
          to Diamond for early access, exclusive reservations and a personal concierge.
        </p>
        <div className="mx-auto mt-10 flex max-w-md justify-center gap-4">
          {tiers.map((t) => (
            <div key={t.id} className="h-16 flex-1 rounded-xl" style={{ background: t.surface }} aria-label={t.name} />
          ))}
        </div>
        <Link href="/rewards" className="btn-outline mt-10">
          Discover rewards
        </Link>
      </section>
    </>
  );
}
