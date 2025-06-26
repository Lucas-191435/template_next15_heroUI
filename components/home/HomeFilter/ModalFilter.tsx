import { Dispatch, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@heroui/react";

import { objFilter, PokemonTypeSelect } from "./types";
import SelectTypeFilter from "./SelectTypeFilter";
import SelectWeightFilter from "./SelectWeightFilter";

import pokemonTypes from "@/utils/pokemonTypes";

const pokeTypesSelect = pokemonTypes.map((type) => {
  return {
    ...type,
    isSelectedWeakness: false,
    isSelectedType: false,
    isSelectedResistant: false,
  };
});

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  objFilter?: objFilter;
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
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

  const handleApplyFilter = () => {
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
              <SelectWeightFilter
                objFilter={objFilterTemp}
                setObjFilter={setObjFilterTemp}
              />
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

                setPkTypeSelectTemp(update);
                setObjFilterTemp({
                  type: [],
                  weight: undefined,
                });
              }}
            >
              Limpar
            </Button>
            <Button onPress={handleApplyFilter}>Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
