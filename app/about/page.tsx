import Link from "next/link";
import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { images } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

const partnerBenefits = [
  ["Reach the right guests", "Get in front of a curated audience of young professionals and lifestyle enthusiasts who actively look for premium experiences."],
  ["More bookings", "Fill tables, tee times, seats and treatment slots through a platform built for reservations."],
  ["Loyal guests", "Our shared rewards network keeps members coming back, to you and to the rest of the network."],
  ["Free marketing", "Every verified post by a guest promotes your venue to their followers. Featured placements are available too."],
  ["Insights", "Understand your guests' preferences and booking behaviour with clear reporting."],
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page grid gap-14 pt-14 lg:grid-cols-2 lg:pt-20">
        <div>
          <h1 className="text-4xl sm:text-5xl">About Véva</h1>
          <div className="lead mt-8 max-w-lg space-y-5">
            <p>
              Véva was founded on a simple idea: the best moments in life are the ones you share. We bring together the
              Netherlands&apos; finest restaurants, golf, padel and tennis clubs, races, museums, stages, festivals and
              spas on one platform, so you can spend less time planning and more time experiencing.
            </p>
            <p>
              Véva is more than a reservation tool; it&apos;s a lifestyle hub. Book a round of golf and dinner at a
              starred restaurant nearby, earn Véva Points for both, and use them anywhere in our network.
            </p>
            <p>
              And because every experience shared on Véva is linked to a real reservation, our community is built on
              authentic moments, not borrowed lifestyles.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full">
          <Photo src={images.about} alt="A carefully plated dish" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>

      <section id="partners" className="container-page mt-28 scroll-mt-20 border-t border-line pt-16">
        <h2 className="text-center text-3xl sm:text-4xl">For partner venues</h2>
        <p className="lead mx-auto mt-4 max-w-xl text-center">
          Restaurants, clubs, cultural venues, event organisers and spas: join a growing network of premium partners.
        </p>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {partnerBenefits.map(([title, text]) => (
            <div key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="lead mt-2">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-outline">
            Become a partner
          </Link>
        </div>
      </section>
    </>
  );
}
