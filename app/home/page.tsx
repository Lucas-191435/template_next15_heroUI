"use client";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { title } from "@/components/primitives";
import CardPoke from "@/components/List/Card";
import { SearchIcon } from "@/components/icons";
import ItemListPoke from "@/components/List/ItemList";

export default function AboutPage() {
  const [modeList, setModeList] = useState<"cards" | "list">("cards");
  const arrayExample = Array.from({ length: 60 });
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="h-full w-full ">
      <div className="flex justify-center">
        <h1 className={clsx(title(), "text-center border border-red-600")}>
          Pokedex
        </h1>
      </div>
      <div className="border-1 border-purple-600 flex items-center justify-between px-5">
        <div>{searchInput}</div>
        <div>
          <Button
            onClick={() =>
              setModeList((prev) => (prev === "cards" ? "list" : "cards"))
            }
          >
            {modeList === "cards" ? "Ver em lista" : "Ver em cartas"}
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          "mt-2 flex flex-wrap items-center justify-center gap-5 px-8 py-8 md:py-10 border-1 border-red-600",
          modeList === "cards" ? "flex-row" : "flex-col",
        )}
      >
        {arrayExample.map((_, i) => {
          return modeList === "cards" ? (
            <CardPoke key={i} />
          ) : (
            <ItemListPoke key={i} />
          );
        })}
      </div>
    </div>
  );
}
