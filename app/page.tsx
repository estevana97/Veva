import Link from "next/link";
import Photo from "@/components/Photo";
import { categories, images, tiers } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero: text left, tall image right */}
      <section className="container-page grid items-center gap-10 pt-8 lg:min-h-[calc(100vh-3rem)] lg:grid-cols-2 lg:gap-16 lg:pt-10">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl leading-tight sm:text-4xl">One platform for all your curated experiences</h1>
          <p className="lead mt-3 max-w-lg">
            Véva is your social and reservation platform, connecting you with (high-end) dining, sports, culture and
            wellness experiences in the Netherlands to share special moments with those you value most.
          </p>
          <Link href="/experiences" className="btn-outline mt-12">
            Explore now
          </Link>
        </div>
        <div className="relative order-1 mx-auto aspect-[4/5] w-[75%] lg:order-2 lg:mr-0 lg:aspect-auto lg:h-[calc((100vh-6rem)*0.7)] lg:w-[70%]">
          <Photo src={images.homeHero} alt="Friends raising glasses of champagne and red wine outdoors" className="object-[50%_75%]" priority sizes="(min-width: 1024px) 35vw, 75vw" />
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
          Earn Véva Points when you book and again when you spend. Use them across every partner, or rise from Silver
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
