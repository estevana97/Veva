import { cityCodes } from "@/lib/data";

// Small city code (e.g. AMS) in the upper-left corner of a photo. The parent must be positioned.
export default function CityBadge({ city }: { city: string }) {
  const code = cityCodes[city];
  if (!code) return null;
  return (
    <span className="absolute left-4 top-4 z-10 bg-white/90 px-2.5 py-1 font-serif text-xs tracking-[0.25em] text-ink">
      {code}
    </span>
  );
}
