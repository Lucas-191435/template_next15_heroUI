import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IPokemon = {
  count: number;
  pokemon: {
    name: string;
    number: number;
    types: string[];
    region: string;
    height: number;
    weight: number;
    img1: string;
    img2: string;
    img3: string;
  }[];
};

export type PokemonItem = IPokemon["pokemon"][number];