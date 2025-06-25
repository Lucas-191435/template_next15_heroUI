import { Dispatch, useEffect, useState } from "react";
import { Button } from "@heroui/button";

import pokemonTypes, { PokemonType } from "@/utils/pokemonTypes";

type PokemonTypeSelect = PokemonType & {
  isSelectedWeakness: boolean;
  isSelectedType: boolean;
  isSelectedResistant: boolean;
};

const pokeTypesSelect = pokemonTypes.map((type) => {
  return {
    ...type,
    isSelectedWeakness: false,
    isSelectedType: false,
    isSelectedResistant: false,
  };
});

type objFilter = {
  type: string[];
  weight?: "small" | "medium" | "large";
};

type SelectTypeFilterProps = {
  objFilter?: objFilter;
  pkTypeSelect: PokemonTypeSelect[];
  setPkTypeSelect: Dispatch<React.SetStateAction<PokemonTypeSelect[]>>;
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
  handleTempFilter: (
    newObjFilterTemp: objFilter,
    update: PokemonTypeSelect[],
  ) => void;
};

const SelectTypeFilter = ({
  objFilter,
  pkTypeSelect,
  setPkTypeSelect,
  handleTempFilter,
}: SelectTypeFilterProps) => {
  const [primeiraMetade, setPrimeiraMetade] = useState<PokemonTypeSelect[]>([]);
  const [segundaMetade, setSegundaMetade] = useState<PokemonTypeSelect[]>([]);

  useEffect(() => {
    const middleIndex = Math.ceil(pokeTypesSelect.length / 2);
    const primeiraMetadeTmp = pkTypeSelect.slice(0, middleIndex);
    const segundaMetadeTmp = pkTypeSelect.slice(middleIndex);

    setPrimeiraMetade(primeiraMetadeTmp);
    setSegundaMetade(segundaMetadeTmp);
  }, [pkTypeSelect]);

  const handlePress = (
    buttonType: "weekness" | "strenght" | "type",
    type: PokemonTypeSelect,
  ) => {
    const findProp = (
      btnType: "weekness" | "strenght" | "type",
    ): "isSelectedWeakness" | "isSelectedType" | "isSelectedResistant" => {
      if (btnType === "weekness") {
        return "isSelectedWeakness";
      } else if (btnType === "strenght") {
        return "isSelectedResistant";
      } else {
        return "isSelectedType";
      }
    };

    const foundProp = findProp(buttonType);

    const update = pkTypeSelect.map((typ) =>
      typ.key === type.key ? { ...typ, [foundProp]: !typ[foundProp] } : typ,
    );

    setPkTypeSelect(update);

    const result = update.map((type) => {
      const resultType = type.isSelectedType ? [type.key] : [];
      const resultResistant = type.isSelectedResistant ? type.resistantTo : [];
      const resultWeekness = type.isSelectedWeakness ? type.weakAgainst : [];

      return [...resultType, ...resultResistant, ...resultWeekness];
    });

    const resultTmp = result.flat();

    const semRepetidos = [...new Set(resultTmp)];

    const newObjFilterTemp = { ...objFilter, type: semRepetidos };

    handleTempFilter(newObjFilterTemp, update);
  };

  return (
    <>
      <div className="flex justify-end gap-4 px-1">
        <h4>
          <b>T</b>: Tipo
        </h4>
        <h4>
          <b>F</b>: Fraqueza
        </h4>
        <h4>
          <b>R</b>: Resistência
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {primeiraMetade.map((type) => (
            <div
              key={type.key}
              className="flex flex-nowrap justify-between w-full border-1 border-red-500 text-center"
            >
              <h4
                className={`p-1 text-sm font-medium border border-red-300 rounded-lg w-full pkeType${type.key}`}
              >
                {type.label}
              </h4>
              <PokemonTypeButton
                isType="type"
                selected={type.isSelectedType}
                type={type}
                onToggle={() => {
                  handlePress("type", type);
                }}
              />
              <PokemonTypeButton
                isType="weekness"
                selected={type.isSelectedWeakness}
                type={type}
                onToggle={() => {
                  handlePress("weekness", type);
                }}
              />
              <PokemonTypeButton
                isType="strenght"
                selected={type.isSelectedResistant}
                type={type}
                onToggle={() => {
                  handlePress("strenght", type);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          {segundaMetade.map((type) => (
            <div
              key={type.key}
              className="flex flex-nowrap justify-between w-full border-1 border-red-500 text-center"
            >
              <h4
                className={`p-1 text-sm font-medium border border-red-300 rounded-lg w-full pkeType${type.key}`}
              >
                {type.label}
              </h4>
              <PokemonTypeButton
                isType="type"
                selected={type.isSelectedType}
                type={type}
                onToggle={() => {
                  handlePress("type", type);
                }}
              />
              <PokemonTypeButton
                isType="weekness"
                selected={type.isSelectedWeakness}
                type={type}
                onToggle={() => {
                  handlePress("weekness", type);
                }}
              />
              <PokemonTypeButton
                isType="strenght"
                selected={type.isSelectedResistant}
                type={type}
                onToggle={() => {
                  handlePress("strenght", type);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTypeFilter;

const PokemonTypeButton = ({
  type,
  selected,
  onToggle,
  isType,
}: {
  type: { key: string; label: string };
  selected: boolean;
  onToggle: (key: string) => void;
  isType: "weekness" | "strenght" | "type";
}) => {
  const handleInputType = (type: string) => {
    if (type === "type") {
      return "T";
    } else if (type === "weekness") {
      return "F";
    } else {
      return "R";
    }
  };

  return (
    <Button
      isIconOnly
      className={`px-4 py-2 rounded-full text-white transition border-1 border-red-500 ml-2
        ${selected ? "bg-blue-600" : "bg-white text-black "}`}
      type="button"
      onPress={() => onToggle(type.key)}
    >
      {handleInputType(isType)}
    </Button>
  );
};
