import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="container-page grid gap-14 pt-14 lg:grid-cols-2 lg:pt-20">
      <div>
        <h1 className="text-4xl sm:text-5xl">Contact</h1>
        <p className="lead mt-6 max-w-md">
          Questions about a reservation, a partnership or our rewards program? We&apos;re happy to help.
        </p>
        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="label">Email</dt>
            <dd>hello@veva.nl</dd>
          </div>
          <div>
            <dt className="label">Partners</dt>
            <dd>Restaurants, clubs and venues who want to join Véva: partners@veva.nl</dd>
          </div>
          <div>
            <dt className="label">Office</dt>
            <dd>Amsterdam, the Netherlands</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </section>
  );
}
