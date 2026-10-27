import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page pt-24 text-center">
      <h1 className="text-4xl">Page not found</h1>
      <p className="lead mt-4">The experience you&apos;re looking for doesn&apos;t exist (yet).</p>
      <Link href="/experiences" className="btn-outline mt-10">
        Explore experiences
      </Link>
    </section>
  );
}
