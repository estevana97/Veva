import type { Metadata } from "next";
import Photo from "@/components/Photo";
import NewsletterForm from "@/components/NewsletterForm";
import { experiences, images } from "@/lib/data";

export const metadata: Metadata = { title: "Join the community" };

const features = [
  ["Your profile", "Keep track of your reservations, the Véva Points you've earned and the experiences you've enjoyed."],
  ["Share moments", "Post photos, reviews and updates from your bookings, much like Instagram or Strava, but for experiences."],
  ["Follow & engage", "Follow people with similar tastes, like and comment on their experiences, and discover where to go next."],
  ["Challenges", "Take on challenges such as five starred dinners in a month or a race and a spa day, and earn bonus Véva Points."],
  ["Invite friends", "Earn bonus Véva Points for every friend who joins and makes their first reservation."],
  ["Plan together", "Invite friends to a reservation, so everyone has the details and earns points."],
];

export default function CommunityPage() {
  const post = experiences.find((e) => e.slug === "signature-spa-ritual") ?? experiences[0];

  return (
    <>
      <section className="container-page grid items-center gap-12 pt-12 lg:min-h-[calc(100vh-3rem)] lg:grid-cols-2 lg:pt-20">
        <div>
          <h1 className="max-w-xl text-3xl leading-snug sm:text-4xl">
            It all starts with the Véva app, your gateway to experiences.
          </h1>
          {/* Replace href with your App Store / Google Play links */}
          <a href="#download" className="btn-solid mt-6">
            Download here
          </a>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-lg">
          <Photo src={images.community} alt="A glass raised against the setting sun" priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </section>

      {/* Authenticity */}
      <section className="container-page mt-28 grid items-center gap-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">Real experiences, verified.</h2>
          <div className="lead mt-6 max-w-lg space-y-4">
            <p>
              Social media is full of borrowed lifestyles. On Véva, every shared experience is linked to a real
              reservation, and confirmed by a QR scan at the venue or an uploaded receipt.
            </p>
            <p>
              Posts from confirmed visits carry a <strong>verified</strong> label, so you know that recommendations
              come from people who were really there.
            </p>
          </div>
        </div>

        {/* Example post */}
        <article className="mx-auto w-full max-w-sm border border-line">
          <header className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-serif text-sm text-white">M</div>
            <div className="flex-1 text-sm">
              <p className="font-medium">Maria</p>
              <p className="text-xs text-muted">
                {post.venue} · {post.city}
              </p>
            </div>
            <span className="border border-ink px-2 py-0.5 text-[10px] uppercase tracking-wider">✓ Verified visit</span>
          </header>
          <div className="relative aspect-square">
            <Photo src={post.image} alt={post.title} sizes="384px" />
          </div>
          <div className="space-y-2 p-4 text-sm">
            <p>
              <span className="font-medium">Maria</span> Two hours of pure calm, then tea in the thermal area with a
              view of the dunes. Already booked my next visit.
            </p>
            <p className="text-xs text-muted">24 likes · 5 comments · earned 265 Véva Points</p>
          </div>
        </article>
      </section>

      <section className="container-page mt-28 grid gap-x-10 gap-y-12 text-center sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([title, text]) => (
          <div key={title}>
            <h2 className="text-2xl">{title}</h2>
            <p className="lead mx-auto mt-3 max-w-xs">{text}</p>
          </div>
        ))}
      </section>

      <section id="download" className="container-page mt-28 scroll-mt-20 border-t border-line pt-16 text-center">
        <h2 className="text-3xl">Be the first to know</h2>
        <p className="lead mx-auto mt-4 max-w-md">
          The Véva app is launching soon on iOS and Android. Leave your email and we&apos;ll send you an invitation.
        </p>
        <NewsletterForm />
      </section>
    </>
  );
}
