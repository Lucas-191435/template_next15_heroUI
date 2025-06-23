/* eslint-disable @next/next/no-img-element */
import { PokemonItem } from "@/types";

const ItemListPoke = ({ pokemon }: { pokemon: PokemonItem }) => {
  return (
    <div className="pl-2 flex flex-row items-center w-full h-[80px] bg-white rounded-lg shadow-md">
      <img alt="Pokemon" className="h-[60px]" src={pokemon.img1} />
      <p className="text-gray-600">{pokemon.name}</p>
      
    </div>
  );
};

export default ItemListPoke;
