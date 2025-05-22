"use client";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";

import { title } from "@/components/primitives";
import CardPoke from "@/components/List/Card";
import { ListCardsIcon, ListIcon, SearchIcon } from "@/components/icons";
import ItemListPoke from "@/components/List/ItemList";
export default function AboutPage() {
  const [modeList, setModeList] = useState<"cards" | "list">("cards");
  const arrayExample = Array.from({ length: 100 });
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

  const ViewLists = () => {
    return (
      <>
        <ListIcon />
      </>
    );
  };

  const ViewCards = () => {
    return (
      <>
        <ListCardsIcon />
      </>
    );
  };

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
            isIconOnly
            onClick={() =>
              setModeList((prev) => (prev === "cards" ? "list" : "cards"))
            }
          >
            {modeList === "cards" ? <ViewLists /> : <ViewCards />}
          </Button>
        </div>
      </div>
      <div className="flex justify-center border1 border-blue-600">
        <div
          className={clsx(
            "mt-2 gap-5 px-8 py-8 md:py-10 m-auto",
            modeList === "cards"
              ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full border-1 border-green-600"
              : "flex flex-col w-full",
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
      <Pagination
        classNames={{
          base: "m-0 w-full flex items-center justify-center gap-2",
        }}
        initialPage={1}
        page={4}
        total={10}
        onChange={(page) => {
          console.log(page);
        }}
      />
    </div>
  );
}
