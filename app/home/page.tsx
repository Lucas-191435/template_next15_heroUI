"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";
import { useQuery } from "@tanstack/react-query";

import { title } from "@/components/primitives";
import ItemListPoke from "@/components/List/ItemList";
import api from "@/services/api";
import CardPoke from "@/components/List/Card";
import { IPokemon, PokemonItem } from "@/types";
import HomeFilter from "@/components/home/HomeFilter";
import { objFilter } from "@/components/home/HomeFilter/types";

export default function HomePage() {
  const [types, setTypes] = useState<string[]>([
    // "dark",
    // "water",
  ]);
  const [weight, setWeight] = useState<
    "small" | "medium" | "large" | undefined
  >();
  const [search, setSearch] = useState<string>("");
  const [total, setTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(30);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);
  const [modeList, setModeList] = useState<"cards" | "list">("cards");
  const [objFilter, setObjFilter] = useState<objFilter>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const getPokemons = async ({
    queryKey,
  }: {
    queryKey: [string, string, number, number, objFilter | undefined];
  }): Promise<IPokemon["pokemon"]> => {
    try {
      const [, search, page, perPage, objFilter] = queryKey;

      const response = await api.get<IPokemon>("pokemon", {
        params: {
          query: search,
          types: (objFilter?.type?.length ?? 0) > 0 ? objFilter?.type : [],
          page: page,
          pageSize: perPage,
          weight: objFilter?.weight ? objFilter?.weight : undefined,
        },
      });

      const pokemon = response.data.pokemon;

      setTotal(response.data.count);

      return pokemon;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", debouncedSearchTerm, page, perPage, objFilter],
    queryFn: getPokemons,
  });

  return (
    <div className="h-full w-full ">
      <div className="flex justify-center">
        <h1 className={clsx(title(), "text-center border border-red-600")}>
          Pokedex
        </h1>
      </div>
      <HomeFilter
        modeList={modeList}
        objFilter={objFilter}
        search={search}
        setModeList={setModeList}
        setObjFilter={setObjFilter}
        setPerPage={setPerPage}
        setSearch={setSearch}
      />
      {isLoading ? (
        <div className="text-center w-full h-full border border-red-500 flex items-center justify-center">
          <p> Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center border1 border-blue-600">
          <div
            className={clsx(
              "mt-2 gap-5 px-8 py-8 md:py-10 m-auto",
              modeList === "cards"
                ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full border-1 border-green-600"
                : "flex flex-col w-full",
            )}
          >
            {data?.map((poke: PokemonItem, i: number) => {
              return modeList === "cards" ? (
                <CardPoke key={i} pokemon={poke} />
              ) : (
                <ItemListPoke key={i} pokemon={poke} />
              );
            })}
          </div>
        </div>
      )}
      <Pagination
        classNames={{
          base: "m-0 w-full flex items-center justify-center gap-2",
        }}
        initialPage={1}
        page={page}
        total={Math.ceil(total / perPage)}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
}
