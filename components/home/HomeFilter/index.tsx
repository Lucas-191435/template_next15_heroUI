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

import SelectTypeFilter from "./SelectTypeFilter";

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
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
  objFilter?: objFilter;
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
  setObjFilter,
  objFilter,
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
      <ModalFilter
        isOpen={open}
        objFilter={objFilter}
        setObjFilter={setObjFilter}
        title="Filtro"
        onClose={handleCloseModal}
      />
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
  objFilter?: objFilter;
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
};

type objFilter = {
  type: string[];
  weight?: "small" | "medium" | "large";
};
export function ModalFilter({
  isOpen,
  onClose,
  title,
  setObjFilter,
  objFilter,
}: ModalFilterProps) {
  const [objFilterTemp, setObjFilterTemp] = useState<objFilter>();
  const [pkTypeSelect, setPkTypeSelect] =
    useState<PokemonTypeSelect[]>(pokeTypesSelect);
  const [pkTypeSelectTemp, setPkTypeSelectTemp] =
    useState<PokemonTypeSelect[]>(pokeTypesSelect);

  useEffect(() => {
    if (isOpen) {
      setObjFilterTemp(objFilter);
      setPkTypeSelectTemp(pkTypeSelect);
    }
  }, [isOpen]);

  const handleTempFilter = (
    newObjFilterTemp: objFilter,
    update: PokemonTypeSelect[],
  ) => {
    setObjFilterTemp(newObjFilterTemp);
    setPkTypeSelectTemp(update);
  };

  const handleS = () => {
    setObjFilter(objFilterTemp);
    setPkTypeSelect(pkTypeSelectTemp);

    onClose();
  };

  return (
    <div className="p-8">
      <Modal isOpen={isOpen} placement="center" onClose={onClose}>
        <ModalContent className="max-w-6xl">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody className="grid grid-cols-2 gap-4">
            <div>
              <h2>Primeira Metade</h2>
              <SelectTypeFilter
                handleTempFilter={handleTempFilter}
                objFilter={objFilterTemp}
                pkTypeSelect={pkTypeSelectTemp}
                setObjFilter={setObjFilterTemp}
                setPkTypeSelect={setPkTypeSelectTemp}
              />
            </div>
            <div>
              <h2>Segunda Metade</h2>
              {/* <SelectTypeFilter
                handleTempFilter={handleTempFilter}
                objFilter={objFilterTemp}
                pkTypeSelect={pkTypeSelectTemp}
                setObjFilter={setObjFilterTemp}
                setPkTypeSelect={setPkTypeSelectTemp}
              /> */}
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
            <Button onPress={handleS}>Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
