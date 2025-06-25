import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Dispatch, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

import {
  FilterIcon,
  ListCardsIcon,
  ListIcon,
  SearchIcon,
} from "@/components/icons";
import pokemonTypes, { PokemonType } from "@/utils/pokemonTypes";
type HomerFilterProps = {
  search: string;
  modeList: "cards" | "list";
  setModeList: Dispatch<React.SetStateAction<"cards" | "list">>;
  setSearch: Dispatch<React.SetStateAction<string>>;
  setPerPage: Dispatch<React.SetStateAction<number>>;
};

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

const HomeFilter = ({
  search,
  setSearch,
  setPerPage,
  modeList,
  setModeList,
}: HomerFilterProps) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalFilter isOpen={open} title="Filtro" onClose={handleCloseModal} />
      <div className="border-1 border-purple-600 flex items-center justify-between px-5">
        <div>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Button
              isIconOnly
              type="button"
              onPress={() => {
                setModeList((prev) => (prev === "cards" ? "list" : "cards"));
                setPerPage((prev) => (prev === 30 ? 10 : 30));
              }}
            >
              {modeList === "cards" ? <ListIcon /> : <ListCardsIcon />}
            </Button>
          </div>
          <div>
            <Button isIconOnly type="button" onPress={handleOpenModal}>
              {<FilterIcon />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFilter;

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export function ModalFilter({ isOpen, onClose, title }: ModalFilterProps) {
  const [primeiraMetade, setPrimeiraMetade] = useState<PokemonTypeSelect[]>([]);
  const [segundaMetade, setSegundaMetade] = useState<PokemonTypeSelect[]>([]);

  const [pkTypeSelect, setPkTypeSelect] =
    useState<PokemonTypeSelect[]>(pokeTypesSelect);

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
  };

  return (
    <div className="p-8">
      <Modal isOpen={isOpen} placement="center" onClose={onClose}>
        <ModalContent className="max-w-6xl">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody className="grid grid-cols-2 gap-4">
            <div>
              <h2>Primeira Metade</h2>
              <div className="grid grid-cols-2 gap-4">
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
                        onToggle={(key) => {
                          handlePress("type", type);
                        }}
                      />
                      <PokemonTypeButton
                        isType="weekness"
                        selected={type.isSelectedWeakness}
                        type={type}
                        onToggle={(key) => {
                          handlePress("weekness", type);
                        }}
                      />
                      <PokemonTypeButton
                        isType="strenght"
                        selected={type.isSelectedResistant}
                        type={type}
                        onToggle={(key) => {
                          handlePress("strenght", type);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2>Segunda Metade</h2>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cancelar</Button>
            <Button
              onPress={() => {
                const update = pkTypeSelect.map((pkType) => {
                  return {
                    ...pkType,
                    isSelectedResistant: false,
                    isSelectedType: false,
                    isSelectedWeakness: false,
                  };
                });

                setPkTypeSelect(update);
              }}
            >
              Limpar
            </Button>
            <Button onPress={onClose}>Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

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
