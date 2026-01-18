import { Container } from "@mui/material";
import { setPage, setSearchValue, useGlobalStore } from "../../../store/store";
import { Search } from "../../basic";

export const CatalogSearch = () => {
  const searchValue = useGlobalStore((state) => state.search);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  return (
    <Container
      sx={({ breakpoints, spacing }) => ({
        position: "sticky",
        top: spacing(4),
        zIndex: 100,
        mb: 2,
        [breakpoints.down("md")]: {
          position: "static",
        },
      })}
      disableGutters
    >
      <Search
        handleDebouncedValue={handleSearch}
        initialValue={searchValue}
        onClear={() => handleSearch("")}
        placeholder="Введите артикул или наименование"
      />
    </Container>
  );
};
