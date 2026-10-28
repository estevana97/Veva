import type { Experience } from "@/lib/data";

// Boutique-style block with member numbers. Values show as [x] until real data is added in lib/data.ts.
export default function MemberCircle({ experience }: { experience: Experience }) {
  const stats = experience.memberStats;

  return (
    <section className="mt-24 bg-[#f5f0e8] px-6 py-16 text-center sm:px-12 sm:py-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted">The Véva circle</p>
      <h2 className="mt-3 font-serif text-3xl italic sm:text-4xl">In good company</h2>
      <div className="mx-auto mt-4 h-px w-12 bg-[#b89b6a]" />

      <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-[#d9cdb8]">
        <div className="px-6">
          <p className="font-serif text-5xl sm:text-6xl">{stats?.visits ?? "[x]"}</p>
          <p className="mt-3 text-sm text-ink/80">Véva members have visited this before you</p>
        </div>
        <div className="px-6">
          <p className="font-serif text-5xl sm:text-6xl">{stats ? `${stats.recommend}%` : "[x]%"}</p>
          <p className="mt-3 text-sm text-ink/80">would recommend {experience.title}</p>
        </div>
      </div>

      <details className="group mx-auto mt-14 max-w-xl text-left">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 border-b border-ink pb-0.5 font-serif text-lg [&::-webkit-details-marker]:hidden">
          See more impressions of Véva members, including reviews
          <span aria-hidden className="transition-transform group-open:rotate-90">→</span>
        </summary>
        <div className="mt-8 border border-[#d9cdb8] bg-white/60 p-6 text-center text-sm text-muted">
          Photos and reviews from verified Véva visits will appear here. Every impression is linked to a real
          reservation, so you know it comes from someone who was really there.
        </div>
      </details>
    </section>
  );
}
