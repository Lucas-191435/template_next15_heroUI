import { PokemonItem } from "@/types";

/* eslint-disable @next/next/no-img-element */
const CardPoke = ({ pokemon }: { pokemon: PokemonItem }) => {
  return (
    <div
      className="
    mx-auto
    flex flex-col items-center justify-center
    w-full max-w-[300px] sm:w-[150px] h-[200px]
    bg-white rounded-lg shadow-md
    p-4 transition hover:scale-105 hover:shadow-lg
  "
    >
      <img
        alt="Pokemon"
        className="h-[100px] object-contain mb-2"
        src={pokemon.img1}
      />
      <p className="text-gray-700 text-sm font-medium">{pokemon.name}</p>
      <div className="flex flex-row justify-between mt-2 text-center gap-1 w-full ">
        {pokemon.types.map((type, index) => (
          <p
            key={index}
            className={` text-sm font-medium border border-red-300 rounded-lg w-full pkeType${type}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CardPoke;
