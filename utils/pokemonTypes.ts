const pokemonTypes = [
  {
    key: "normal",
    label: "Normal",
    weakAgainst: ["fighting"],
    resistantTo: [],
  },
  {
    key: "fire",
    label: "Fire",
    weakAgainst: ["water", "ground", "rock"],
    resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"],
  },
  {
    key: "water",
    label: "Water",
    weakAgainst: ["electric", "grass"],
    resistantTo: ["fire", "water", "ice", "steel"],
  },
  {
    key: "grass",
    label: "Grass",
    weakAgainst: ["fire", "ice", "poison", "flying", "bug"],
    resistantTo: ["water", "electric", "grass", "ground"],
  },
  {
    key: "electric",
    label: "Electric",
    weakAgainst: ["ground"],
    resistantTo: ["electric", "flying", "steel"],
  },
  {
    key: "ice",
    label: "Ice",
    weakAgainst: ["fire", "fighting", "rock", "steel"],
    resistantTo: ["ice"],
  },
  {
    key: "fighting",
    label: "Fighting",
    weakAgainst: ["flying", "psychic", "fairy"],
    resistantTo: ["bug", "rock", "dark"],
  },
  {
    key: "poison",
    label: "Poison",
    weakAgainst: ["ground", "psychic"],
    resistantTo: ["grass", "fighting", "poison", "bug", "fairy"],
  },
  {
    key: "ground",
    label: "Ground",
    weakAgainst: ["water", "grass", "ice"],
    resistantTo: ["poison", "rock"],
  },
  {
    key: "flying",
    label: "Flying",
    weakAgainst: ["electric", "ice", "rock"],
    resistantTo: ["grass", "fighting", "bug"],
  },
  {
    key: "psychic",
    label: "Psychic",
    weakAgainst: ["bug", "ghost", "dark"],
    resistantTo: ["fighting", "psychic"],
  },
  {
    key: "bug",
    label: "Bug",
    weakAgainst: ["fire", "flying", "rock"],
    resistantTo: ["grass", "fighting", "ground"],
  },
  {
    key: "rock",
    label: "Rock",
    weakAgainst: ["water", "grass", "fighting", "ground", "steel"],
    resistantTo: ["normal", "fire", "poison", "flying"],
  },
  {
    key: "ghost",
    label: "Ghost",
    weakAgainst: ["ghost", "dark"],
    resistantTo: ["poison", "bug"],
  },
  {
    key: "dragon",
    label: "Dragon",
    weakAgainst: ["ice", "dragon", "fairy"],
    resistantTo: ["fire", "water", "electric", "grass"],
  },
  {
    key: "dark",
    label: "Dark",
    weakAgainst: ["fighting", "bug", "fairy"],
    resistantTo: ["ghost", "dark"],
  },
  {
    key: "steel",
    label: "Steel",
    weakAgainst: ["fire", "fighting", "ground"],
    resistantTo: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
  },
  {
    key: "fairy",
    label: "Fairy",
    weakAgainst: ["poison", "steel"],
    resistantTo: ["fighting", "bug", "dark"],
  },
] as const;

export type PokemonType = (typeof pokemonTypes)[number];
export default pokemonTypes;
