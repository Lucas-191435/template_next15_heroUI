import { PokemonType } from "@/utils/pokemonTypes";

export type PokemonTypeSelect = PokemonType & {
  isSelectedWeakness: boolean;
  isSelectedType: boolean;
  isSelectedResistant: boolean;
};

export type objFilter = {
  type: string[];
  weight?: "small" | "medium" | "large";
};
