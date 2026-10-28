import Link from "next/link";
import Photo from "@/components/Photo";
import { getExperience, type Experience } from "@/lib/data";

// Grid of challenge stages. Stages with a description link to their own page.
export default function ChallengeStages({ experience }: { experience: Experience }) {
  if (!experience.stages) return null;
  const base = `/experiences/${experience.category}/${experience.slug}`;

  return (
    <section className="mt-24">
      <div className="border-b border-line pb-4">
        <h2 className="text-3xl">{experience.stagesTitle ?? "Stages"}</h2>
        {experience.stagesIntro && <p className="mt-1 text-sm text-muted">{experience.stagesIntro}</p>}
      </div>
      <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {experience.stages.map((stage) => {
          const related = stage.related && getExperience(stage.related.category, stage.related.slug);
          const card = (
            <>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo
                  src={stage.image}
                  alt={stage.title}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 text-2xl">{stage.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">{stage.subtitle}</p>
              <p className="mt-3 text-sm text-ink/80">{stage.summary}</p>
            </>
          );

          return stage.description ? (
            <Link key={stage.slug} href={`${base}/${stage.slug}`} className="group block">
              {card}
              <span className="mt-4 inline-block border-b border-ink pb-0.5 text-sm">More information</span>
            </Link>
          ) : (
            <div key={stage.slug} className="group">
              {card}
              {related && (
                <Link href={`/experiences/${related.category}/${related.slug}`} className="mt-4 inline-block border-b border-ink pb-0.5 text-sm">
                  {related.booking.kind === "external" ? "View event" : "Book"}: {related.title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
