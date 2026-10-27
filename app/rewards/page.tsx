import Link from "next/link";
import type { Metadata } from "next";
import { tiers } from "@/lib/data";

export const metadata: Metadata = { title: "Rewards program" };

export default function RewardsPage() {
  return (
    <>
      <section className="container-page pb-20 pt-10 text-center sm:pt-14">
        <h1 className="text-5xl sm:text-7xl">Véva rewards</h1>
        <p className="lead mx-auto mt-8 max-w-xl">
          Unlock exclusive perks with Véva Rewards, tailored to your passion for premium experiences. The more you book
          curated dining, sports, and cultural adventures, the more you earn—enjoy priority reservations, special
          packages, and personalised recommendations to elevate every moment with those you value most.
        </p>
      </section>

      <section className="container-page grid gap-16 pt-10 md:grid-cols-3 md:gap-10 lg:gap-32">
        {tiers.map((t) => (
          <div key={t.id} className="flex flex-col items-center text-center">
            <div className="aspect-[7/6] w-full rounded-2xl shadow-sm" style={{ background: t.surface }} role="img" aria-label={`${t.name} card`} />
            <h2 className="mt-12 text-3xl">{t.name}</h2>
            <p className="mt-5 max-w-sm flex-1 text-xs leading-relaxed">{t.summary}</p>
            <a href={`#${t.id}`} className="btn-outline mt-8 w-full">
              More info
            </a>
          </div>
        ))}
      </section>

      <section className="container-page mt-32">
        <h2 className="text-center text-3xl">How it works</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-10 text-center sm:grid-cols-3">
          {[
            ["Book", "Reserve any experience through Véva."],
            ["Earn", "Collect points for every euro you spend."],
            ["Enjoy", "Climb the tiers and unlock new privileges."],
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="lead mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-28 space-y-6">
        {tiers.map((t) => (
          <div key={t.id} id={t.id} className="grid scroll-mt-20 gap-8 border-t border-line pt-10 md:grid-cols-[220px_1fr]">
            <div>
              <div className="h-24 w-36 rounded-xl" style={{ background: t.surface }} />
              <h3 className="mt-4 text-2xl">{t.name}</h3>
              <p className="text-xs uppercase tracking-wider text-muted">{t.points}</p>
            </div>
            <ul className="grid gap-3 text-sm sm:grid-cols-2">
              {t.perks.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden>—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="container-page mt-24 text-center">
        <Link href="/login?mode=signup" className="btn-solid">
          Become a member
        </Link>
      </section>
    </>
  );
}
