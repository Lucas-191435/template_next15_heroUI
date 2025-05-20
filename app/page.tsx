import FormBase from "@/components/FormBase";
import FormLogin from "@/components/Forms/login";

export default function Home() {
  return (
    <section className="flex md:flex-row h-full flex-col border-1 border-red-600 items-center justify-between gap-4 px-8 py-8 md:py-10">
      {/* <FormBase /> */}
    <FormLogin />
    <FormLogin />
    </section>
  );
}
