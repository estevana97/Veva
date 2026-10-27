import Link from "next/link";
import { categories } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-14 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">Véva</p>
          <p className="mt-3 max-w-xs text-muted">
            Curated dining, sports, culture and wellness experiences in the Netherlands.
          </p>
        </div>
        <div>
          <p className="label">Experiences</p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/experiences/${c.slug}`} className="hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Véva</p>
          <ul className="space-y-2">
            <li><Link href="/rewards" className="hover:underline">Rewards program</Link></li>
            <li><Link href="/community" className="hover:underline">Download the app</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Stay in touch</p>
          <p className="text-muted">hello@veva.nl</p>
          <p className="text-muted">Amsterdam, the Netherlands</p>
        </div>
      </div>
      <div className="container-page border-t border-line py-6 text-xs text-muted">
        © {new Date().getFullYear()} Véva. All rights reserved.
      </div>
    </footer>
  );
}
