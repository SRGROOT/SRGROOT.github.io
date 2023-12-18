import { Container } from "@mui/material";
import { setSearchValue, useGlobalStore } from "../../../store/store";
import { Search } from "../../basic";

export const CatalogSearch = () => {
  const searchValue = useGlobalStore((state) => state.search);

  return (
    <Container
      sx={({ breakpoints, spacing }) => ({
        position: "sticky",
        top: spacing(4),
        zIndex: 100,
        [breakpoints.down("md")]: {
          position: "static",
        },
      })}
      disableGutters
    >
      <Search
        handleDebouncedValue={setSearchValue}
        initialValue={searchValue}
        onClear={() => setSearchValue("")}
      />
    </Container>
  );
};
