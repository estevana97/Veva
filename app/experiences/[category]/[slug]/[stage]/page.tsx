import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { experiences, getCategory, getExperience, points } from "@/lib/data";

type Props = { params: { category: string; slug: string; stage: string } };

// Only stages with a description have their own page
export function generateStaticParams() {
  return experiences.flatMap((e) =>
    (e.stages ?? []).filter((s) => s.description).map((s) => ({ category: e.category, slug: e.slug, stage: s.slug })),
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const stage = getExperience(params.category, params.slug)?.stages?.find((s) => s.slug === params.stage);
  return { title: stage ? `${stage.title}: ${stage.subtitle}` : "Challenge", description: stage?.summary };
}

export default function StagePage({ params }: Props) {
  const challenge = getExperience(params.category, params.slug);
  const category = getCategory(params.category);
  const stage = challenge?.stages?.find((s) => s.slug === params.stage);
  if (!challenge || !category || !stage?.description) notFound();

  const base = `/experiences/${category.slug}/${challenge.slug}`;
  const others = (challenge.stages ?? []).filter((s) => s.slug !== stage.slug && s.description);

  return (
    <div className="container-page pt-8">
      <nav className="text-xs text-muted">
        <Link href={`/experiences/${category.slug}`} className="hover:underline">{category.name}</Link>
        {" / "}
        <Link href={base} className="hover:underline">{challenge.title}</Link>
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Photo src={stage.image} alt={stage.title} priority sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
          <h1 className="mt-8 text-4xl sm:text-5xl">{stage.title}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{stage.subtitle}</p>
          <p className="lead mt-6 max-w-2xl">{stage.description}</p>
          {stage.highlights && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {stage.highlights.map((h) => (
                <li key={h} className="border border-line px-3 py-1 text-xs">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="border border-line p-6 sm:p-8">
            <p className="label">Part of the challenge</p>
            <p className="font-serif text-2xl">{challenge.title}</p>
            {stage.when && <p className="mt-5 text-sm">{stage.when}</p>}
            <p className="mt-5 border-l-2 border-ink pl-3 text-xs leading-relaxed">
              Finish this marathon to complete a stage and earn <strong>{points.challengeStage} bonus Véva Points</strong>.
            </p>
            <Link href={base} className="btn-solid mt-6 w-full">
              Join the challenge
            </Link>
            {stage.website && (
              <a href={stage.website.href} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm underline">
                {stage.website.label}
              </a>
            )}
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-24">
          <h2 className="border-b border-line pb-4 text-3xl">Other cities in the challenge</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
            {others.map((s) => (
              <Link key={s.slug} href={`${base}/${s.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden">
                  <Photo src={s.image} alt={s.title} sizes="(min-width: 1024px) 14vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-2 font-serif text-lg">{s.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
