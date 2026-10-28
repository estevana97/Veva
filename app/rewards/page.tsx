import Link from "next/link";
import type { Metadata } from "next";
import { points, tiers } from "@/lib/data";

export const metadata: Metadata = { title: "Rewards program" };

const earnSteps = [
  {
    title: "Reserve",
    text: `Earn ${points.perReservation} Véva Points as soon as you book through Véva, whatever you spend. Premium bookings such as chef's tables earn a ${points.premiumBonus}-point bonus.`,
  },
  {
    title: "Scan",
    text: "Every booking comes with a personal QR code. Show it at the venue so your visit is confirmed and linked to your bill.",
  },
  {
    title: "Spend",
    text: `After your visit, earn ${points.perEuro} Véva Point for every €1 you spend. No QR scan? Upload a photo of your receipt in the app.`,
  },
];

const example = [
  ["Reservation at a Michelin-starred restaurant", points.perReservation],
  ["Premium bonus for a chef's table", points.premiumBonus],
  ["Spend of €200 confirmed by QR scan", 200 * points.perEuro],
] as const;

const redeem = [
  ["Discounts", "Use your points for discounts on future reservations, up to 50% off a table at a high-end restaurant."],
  ["Exclusive experiences", "Unlock private viewings, backstage passes and VIP packages that aren't for sale."],
  ["Gift to friends", "Transfer points to friends or family to treat them to an experience of their choice."],
  ["Refer and earn", "Earn bonus Véva Points for every friend who joins and makes their first reservation."],
];

export default function RewardsPage() {
  const total = example.reduce((sum, [, p]) => sum + p, 0);

  return (
    <>
      <section className="container-page pb-20 pt-10 text-center sm:pt-14">
        <h1 className="text-5xl sm:text-7xl">Véva rewards</h1>
        <p className="lead mx-auto mt-8 max-w-xl">
          Unlock exclusive perks with Véva Rewards, tailored to your passion for premium experiences. Earn Véva Points
          when you book curated dining, sports, cultural and wellness experiences, and again for what you spend at the
          venue. Enjoy priority reservations, special packages and personalised recommendations to elevate every
          moment with those you value most.
        </p>
      </section>

      <section className="container-page grid gap-16 pt-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 xl:gap-14">
        {tiers.map((t) => (
          <div key={t.id} className="flex flex-col items-center text-center">
            <div className="aspect-[7/6] w-full rounded-2xl shadow-sm" style={{ background: t.surface }} role="img" aria-label={`${t.name} card`} />
            <h2 className="mt-10 text-3xl">{t.name}</h2>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted">{t.points}</p>
            <p className="mt-4 max-w-sm flex-1 text-sm leading-relaxed text-ink/80">{t.summary}</p>
            <a href={`#${t.id}`} className="btn-outline mt-8 w-full">
              More info
            </a>
          </div>
        ))}
      </section>

      {/* Earning */}
      <section className="container-page mt-32">
        <h2 className="text-center text-3xl">Two ways to earn Véva Points</h2>
        <p className="lead mx-auto mt-4 max-w-xl text-center">
          You&apos;re rewarded for choosing a venue through Véva, and for the experience itself.
        </p>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          {earnSteps.map((s, i) => (
            <div key={s.title}>
              <p className="font-serif text-sm text-muted">0{i + 1}</p>
              <h3 className="mt-2 text-xl">{s.title}</h3>
              <p className="lead mt-2">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-xl border border-line p-6 sm:p-8">
          <p className="label">Example</p>
          <p className="text-sm">Maria books a chef&apos;s table for Saturday evening and pays €200 for dinner.</p>
          <dl className="mt-5 space-y-2 text-sm">
            {example.map(([label, p]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-ink/80">{label}</dt>
                <dd>+{p}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-3 font-serif text-lg">
              <dt>Total</dt>
              <dd>{total} Véva Points</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Redeeming */}
      <section className="container-page mt-28">
        <h2 className="text-center text-3xl">Use your points</h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {redeem.map(([title, text]) => (
            <div key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="lead mt-2">{text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-muted">
          Points earned at one partner can be used at any other partner across all categories.
        </p>
      </section>

      {/* Tiers */}
      <section className="container-page mt-28 space-y-6">
        <h2 className="pb-4 text-center text-3xl">Membership levels</h2>
        {tiers.map((t) => (
          <div key={t.id} id={t.id} className="grid scroll-mt-20 gap-8 border-t border-line pt-10 md:grid-cols-[220px_1fr]">
            <div>
              <div className="h-24 w-36 rounded-xl" style={{ background: t.surface }} />
              <h3 className="mt-4 text-2xl">{t.name}</h3>
              <p className="text-xs uppercase tracking-wider text-muted">{t.points}</p>
            </div>
            <div className="self-start">
              <p className="lead max-w-2xl italic">{t.summary}</p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden>—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
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
