export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="container-page pb-12 pt-14 text-center sm:pt-20">
      <h1 className="text-4xl sm:text-6xl">{title}</h1>
      {intro && <p className="lead mx-auto mt-6 max-w-xl">{intro}</p>}
    </section>
  );
}
