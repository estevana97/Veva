import Link from "next/link";
import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { categories } from "@/lib/data";

export const metadata: Metadata = { title: "Our experiences" };

export default function ExperiencesPage() {
  return (
    <section className="container-page pt-14">
      <h1 className="text-center text-3xl sm:text-4xl">Our experiences.</h1>
      <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((c) => (
          <div key={c.slug} className="flex flex-col items-center text-center">
            <Link href={`/experiences/${c.slug}`} className="group relative block aspect-[4/3] w-full overflow-hidden">
              <Photo
                src={c.image}
                alt={c.name}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>
            <p className="lead mt-10 max-w-md flex-1">{c.intro}</p>
            <Link href={`/experiences/${c.slug}`} className="btn-small mt-8">
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
