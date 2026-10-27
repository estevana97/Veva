import Link from "next/link";
import Photo from "@/components/Photo";
import { formatEuro, type Experience } from "@/lib/data";

export default function ExperienceCard({ experience: e }: { experience: Experience }) {
  return (
    <Link href={`/experiences/${e.category}/${e.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          src={e.image}
          alt={e.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-xl">{e.title}</h3>
        <span className="shrink-0 text-xs text-muted">from {formatEuro(e.priceFrom)}</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted">
        {e.venue} · {e.city}
      </p>
      <p className="mt-3 text-sm text-ink/80">{e.summary}</p>
    </Link>
  );
}
