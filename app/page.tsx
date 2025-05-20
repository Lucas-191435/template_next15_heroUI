import FormLogin from "@/components/Forms/login";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow bg-[url('/background/wallpaperZekrom.jpg')] bg-cover bg-center">
      <section className="flex md:flex-row h-full flex-col items-center justify-between gap-4 px-8 py-8 md:py-10">
        <FormLogin />
      </section>
    </main>
  );
}
