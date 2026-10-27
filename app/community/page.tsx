import type { Metadata } from "next";
import Photo from "@/components/Photo";
import NewsletterForm from "@/components/NewsletterForm";
import { images } from "@/lib/data";

export const metadata: Metadata = { title: "Join the community" };

export default function CommunityPage() {
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

      <section className="container-page mt-28 grid gap-10 text-center md:grid-cols-3">
        {[
          ["Plan together", "Invite friends to a reservation and split the bill in the app."],
          ["Share moments", "Follow friends, see where they go and save experiences for later."],
          ["Member events", "Join tastings, clinics and private viewings exclusive to the community."],
        ].map(([title, text]) => (
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
