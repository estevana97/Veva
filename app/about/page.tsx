import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { images } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="container-page grid gap-14 pt-14 lg:grid-cols-2 lg:pt-20">
      <div>
        <h1 className="text-4xl sm:text-5xl">About Véva</h1>
        <div className="lead mt-8 max-w-lg space-y-5">
          <p>
            Véva was founded on a simple idea: the best moments in life are the ones you share. We bring together the
            Netherlands&apos; finest restaurants, golf and padel clubs, sport events, museums and festivals on one
            platform, so you can spend less time planning and more time experiencing.
          </p>
          <p>
            Every partner is personally selected for quality, hospitality and character. From a chef&apos;s table in
            Amsterdam to a sunrise tee time in the dunes or the start line of an iron-distance triathlon, Véva makes it
            effortless to reserve and to bring the people you value along.
          </p>
          <p>
            Our rewards program thanks our most loyal members with priority access, upgrades and personal service.
          </p>
        </div>
      </div>
      <div className="relative aspect-[4/5] w-full">
        <Photo src={images.about} alt="A carefully plated dish" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    </section>
  );
}
