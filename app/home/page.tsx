"use client";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "@heroui/button";

import { title } from "@/components/primitives";
import CardPoke from "@/components/List/Card";
import ItemListPoke from "@/components/List/ItemList";

export default function AboutPage() {
  const [modeList, setModeList] = useState<"cards" | "list">("cards");

  return (
    <div className="h-full w-full ">
      <div className="flex justify-center">
        <h1 className={clsx(title(), "text-center border border-red-600")}>
          Pokedex
        </h1>
      </div>
      <div className="border-1 border-purple-600 flex items-center justify-between">
        <div />
        <div>
          <Button
            onClick={() => setModeList(modeList === "cards" ? "list" : "cards")}
          >
            aaa
          </Button>
        </div>
      </div>
      <div
        className={`${modeList === "cards" ? "" : "hidden"} mt-2 flex flex-row flex-wrap items-center justify-center gap-5 px-8 py-8 md:py-10 border-1 border-red-600`}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <CardPoke key={i} />
        ))}
      </div>

      <div
        className={`${modeList === "cards" ? "hidden" : ""} mt-2 flex flex-col flex-wrap items-center justify-center gap-5 px-8 py-8 md:py-10 border-1 border-red-600`}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <ItemListPoke key={i} />
        ))}
      </div>
    </div>
  );
}
