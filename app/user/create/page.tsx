import Image from "next/image";

import FormBase from "@/components/FormBase";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center  justify-center gap-4 py-8 md:py-10">
      <Image
        alt="Imagem de exemplo"
        height={300}
        src="https://cdn.mos.cms.futurecdn.net/nJqzZf3iyhawJfofUMicFV.jpg"
        width={500}
      />
      <FormBase />
    </section>
  );
}
