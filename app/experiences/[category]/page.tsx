import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ExperienceCard from "@/components/ExperienceCard";
import Photo from "@/components/Photo";
import PageHeader from "@/components/PageHeader";
import { categories, getCategory, getExperiences } from "@/lib/data";

type Props = { params: { category: string }; searchParams: { city?: string; type?: string; sub?: string } };

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
  const { city, type, sub } = searchParams;
  const groups = category.groups.filter((g) => !type || g.id === type);

  // Changing the group clears the subsection; changing the city keeps it
  const href = (next: { city?: string; type?: string; sub?: string }) => {
    const q = new URLSearchParams();
    const merged = { city, type, sub: "type" in next ? undefined : sub, ...next };
    if (merged.type) q.set("type", merged.type);
    if (merged.sub) q.set("sub", merged.sub);
    if (merged.city) q.set("city", merged.city);
    const s = q.toString();
    return `/experiences/${category.slug}${s ? `?${s}` : ""}`;
  };

  const chip = (active: boolean) =>
    `border px-3 py-1 text-xs transition-colors ${active ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`;

  return (
    <>
      <PageHeader title={category.name} intro={category.intro} />

      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href={href({ type: undefined })} className={chip(!type)} scroll={false}>
            Everything
          </Link>
          {category.groups.map((g) => (
            <Link key={g.id} href={href({ type: g.id })} className={chip(type === g.id)} scroll={false}>
              {g.name}
            </Link>
          ))}
        </div>
        {cities.length > 1 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Link href={href({ city: undefined })} className={chip(!city)} scroll={false}>
              All cities
            </Link>
            {cities.map((c) => (
              <Link key={c} href={href({ city: c })} className={chip(city === c)} scroll={false}>
                {c}
              </Link>
            ))}
          </div>
        )}

        {groups.map((g) => {
          const list = all.filter((e) => e.group === g.id && (!city || e.city === city));
          if (list.length === 0) return null;
          return (
            <section key={g.id} id={g.id} className="mt-20 scroll-mt-20">
              <div className="border-b border-line pb-4">
                <h2 className="text-3xl">{g.name}</h2>
                <p className="mt-1 text-sm text-muted">{g.intro}</p>
              </div>
              {g.subgroups ? (
                (() => {
                  const open = g.subgroups.find((sg) => sg.id === sub);
                  // One subsection opened: show its items
                  const [one, many] = g.itemLabel ?? ["experience", "experiences"];
                  if (open) {
                    const items = list.filter((e) => e.subgroup === open.id);
                    return (
                      <div className="mt-10">
                        <Link href={href({ type: g.id, sub: undefined })} className="text-sm text-muted hover:text-ink" scroll={false}>
                          ← Back to {g.name}
                        </Link>
                        <h3 className="mt-4 text-2xl">{open.name}</h3>
                        <p className="mt-1 text-sm text-muted">{open.intro}</p>
                        <div className="mt-8 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                          {items.map((e) => (
                            <ExperienceCard key={e.slug} experience={e} />
                          ))}
                        </div>
                        {items.length === 0 && <p className="mt-8 text-muted">No {many} in this city yet.</p>}
                      </div>
                    );
                  }
                  // Otherwise: one card per subsection
                  return (
                    <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                      {g.subgroups.map((sg) => {
                        const count = list.filter((e) => e.subgroup === sg.id).length;
                        return (
                          <Link key={sg.id} href={href({ type: g.id, sub: sg.id })} className="group block">
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Photo
                                src={sg.image}
                                alt={sg.name}
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                            </div>
                            <div className="mt-5 flex items-baseline justify-between gap-4">
                              <h3 className="text-2xl">{sg.name}</h3>
                              <span className="shrink-0 text-xs text-muted">
                                {count} {count === 1 ? one : many}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-ink/80">{sg.intro}</p>
                            <span className="mt-4 inline-block border-b border-ink pb-0.5 text-sm">View {many}</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })()
              ) : (
                <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((e) => (
                    <ExperienceCard key={e.slug} experience={e} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {groups.every((g) => !all.some((e) => e.group === g.id && (!city || e.city === city))) && (
          <p className="mt-16 text-center text-muted">No experiences match these filters yet.</p>
        )}

        <div className="mt-24 flex flex-wrap justify-center gap-3">
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
