import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Photo from "@/components/Photo";
import ReservationForm from "@/components/ReservationForm";
import { experiences, formatEuro, getCategory, getExperience, points, reservationPoints } from "@/lib/data";

type Props = { params: { category: string; slug: string } };

export function generateStaticParams() {
  return experiences.map((e) => ({ category: e.category, slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = getExperience(params.category, params.slug);
  return { title: e?.title ?? "Experience", description: e?.summary };
}

export default function ExperiencePage({ params }: Props) {
  const experience = getExperience(params.category, params.slug);
  const category = getCategory(params.category);
  if (!experience || !category) notFound();
  const group = category.groups.find((g) => g.id === experience.group);

  return (
    <div className="container-page pt-8">
      <nav className="text-xs text-muted">
        <Link href="/experiences" className="hover:underline">Experiences</Link>
        {" / "}
        <Link href={`/experiences/${category.slug}`} className="hover:underline">{category.name}</Link>
        {group && (
          <>
            {" / "}
            <Link href={`/experiences/${category.slug}?type=${group.id}`} className="hover:underline">{group.name}</Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Photo src={experience.image} alt={experience.title} priority sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
          <p className="mt-8 text-xs uppercase tracking-wider text-muted">
            {experience.venue} · {experience.city}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{experience.title}</h1>
          <p className="lead mt-5 max-w-2xl">{experience.description}</p>

          <h2 className="mt-10 text-xl">Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {experience.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden>—</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="border border-line p-6 sm:p-8">
            <p className="font-serif text-2xl">
              from {formatEuro(experience.priceFrom)}{" "}
              <span className="font-sans text-sm text-muted">{experience.priceNote}</span>
            </p>
            <p className="mt-3 border-l-2 border-ink pl-3 text-xs leading-relaxed">
              Earn <strong>{reservationPoints(experience)} Véva Points</strong> for booking
              {experience.premium && " (incl. premium bonus)"}, plus {points.perEuro} Véva Point per €1 you spend at the
              venue.
            </p>
            <ReservationForm experience={experience} />
          </div>
        </aside>
      </div>
    </div>
  );
}
