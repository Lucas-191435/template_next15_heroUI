import { Dispatch } from "react";
import { Button } from "@heroui/button";
import Image from "next/image";

import { objFilter } from "./types";

type SelectWeightFilterProps = {
  objFilter?: objFilter;
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
};
const SelectWeightFilter = ({
  objFilter,
  setObjFilter,
}: SelectWeightFilterProps) => {
  const handlePress = (select?: "small" | "medium" | "large") => {
    if (select) {
      console.log(select);
      const objFilterTemp = {
        ...objFilter,
        weight: select === objFilter?.weight ? undefined : select,
      };

      setObjFilter(objFilterTemp);
    }
  };

  return (
    <>
      <h4>Peso</h4>
      <div className="border-1 border-purple-500 flex justify-around px-4 mt-2">
        <Button
          isIconOnly
          className={`h-[100px] w-[100px] flex flex-col relative ${objFilter?.weight === "small" ? "bg-sky-500" : ""}`}
          onPress={() => {
            handlePress("small");
          }}
        >
          <Image
            alt="small-size"
            height={100}
            src={"/smallWeight.png"}
            width={100}
          />
          <h4 className="absolute bottom-2">Leve</h4>
        </Button>
        <Button
          isIconOnly
          className={`h-[100px] w-[100px] flex flex-col relative ${objFilter?.weight === "medium" ? "bg-sky-500" : ""}`}
          onPress={() => {
            handlePress("medium");
          }}
        >
          <Image
            alt="small-size"
            height={100}
            src={"/mediumWeight.png"}
            width={100}
          />
          <h4 className="absolute bottom-2">Medio</h4>
        </Button>
        <Button
          isIconOnly
          className={`h-[100px] w-[100px] flex flex-col relative ${objFilter?.weight === "large" ? "bg-sky-500" : ""}`}
          onPress={() => {
            handlePress("large");
          }}
        >
          <Image
            alt="small-size"
            height={100}
            src={"/bigWeight.png"}
            width={100}
          />
          <h4 className="absolute bottom-2">Pesado</h4>
        </Button>
      </div>
    </>
  );
};

export default SelectWeightFilter;
