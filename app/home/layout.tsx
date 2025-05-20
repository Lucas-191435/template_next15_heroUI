export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow ">
      <section className="h-full flex flex-col items-center justify-center gap-4 py-8  md:py-10 border-1 border-red-600">
        {children}
      </section>
    </main>
  );
}
