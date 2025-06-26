import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Dispatch, useState } from "react";

import { objFilter } from "./types";
import { ModalFilter } from "./ModalFilter";

import {
  FilterIcon,
  ListCardsIcon,
  ListIcon,
  SearchIcon,
} from "@/components/icons";
type HomerFilterProps = {
  search: string;
  modeList: "cards" | "list";
  setModeList: Dispatch<React.SetStateAction<"cards" | "list">>;
  setSearch: Dispatch<React.SetStateAction<string>>;
  setPerPage: Dispatch<React.SetStateAction<number>>;
  setObjFilter: Dispatch<React.SetStateAction<objFilter | undefined>>;
  objFilter?: objFilter;
};

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
