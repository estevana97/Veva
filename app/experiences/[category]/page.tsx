import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ExperienceCard from "@/components/ExperienceCard";
import PageHeader from "@/components/PageHeader";
import { categories, getCategory, getExperiences } from "@/lib/data";

type Props = { params: { category: string }; searchParams: { city?: string } };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return { title: getCategory(params.category)?.name ?? "Experiences" };
}

export default function CategoryPage({ params, searchParams }: Props) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const all = getExperiences(category.slug);
  const cities = Array.from(new Set(all.map((e) => e.city))).sort();
  const city = searchParams.city;
  const list = city ? all.filter((e) => e.city === city) : all;

  const chip = (active: boolean) =>
    `border px-3 py-1 text-xs transition-colors ${active ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`;

  return (
    <>
      <PageHeader title={category.name} intro={category.intro} />

      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href={`/experiences/${category.slug}`} className={chip(!city)} scroll={false}>
            All cities
          </Link>
          {cities.map((c) => (
            <Link key={c} href={`/experiences/${category.slug}?city=${encodeURIComponent(c)}`} className={chip(city === c)} scroll={false}>
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <ExperienceCard key={e.slug} experience={e} />
          ))}
        </div>
        {list.length === 0 && <p className="mt-12 text-center text-muted">No experiences in this city yet.</p>}

        <div className="mt-20 flex flex-wrap justify-center gap-3">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link key={c.slug} href={`/experiences/${c.slug}`} className="btn-small">
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
