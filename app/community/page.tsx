import type { Metadata } from "next";
import AppPreview from "@/components/AppPreview";
import HeroVideo from "@/components/HeroVideo";
import NewsletterForm from "@/components/NewsletterForm";
import { images } from "@/lib/data";

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
  return (
    <>
      <HeroVideo video={images.communityVideo}>
        <h1 className="max-w-xl text-3xl leading-tight sm:text-4xl">
          It all starts with the Véva app, your gateway to experiences.
        </h1>
        {/* Replace href with your App Store / Google Play links */}
        <a
          href="#download"
          className="mt-8 inline-flex items-center justify-center border border-white bg-white px-7 py-2 font-serif text-base text-ink transition-colors hover:bg-transparent hover:text-white"
        >
          Download here
        </a>
      </HeroVideo>

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
            <p>
              Take a sneak peek of the app: scroll through the feed, like a post, and tap through Discover, Reserve,
              Search and your own profile.
            </p>
          </div>
        </div>

        {/* Interactive sneak peek of the app */}
        <AppPreview />
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
