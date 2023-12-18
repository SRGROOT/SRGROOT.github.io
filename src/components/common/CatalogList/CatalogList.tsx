import { Container, Typography } from "@mui/material";
import { useGlobalStore } from "../../../store/store";
import { CatalogListItem } from "./CatalogListItem";
import { prepareListDataForView } from "./utils";

export const CatalogList = () => {
  const [selectedCategories, search] = useGlobalStore((state) => [
    state.selectedCategories,
    state.search,
  ]);

  const data = prepareListDataForView(selectedCategories, search);

  if (!data.length)
    return (
      <Typography sx={{ textAlign: "center" }}>
        По вашему запросу ничего не найдено
      </Typography>
    );

  return (
    <Container
      sx={({ breakpoints }) => ({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 3,
        [breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
        },
      })}
      disableGutters
    >
      {data.map((data) => (
        <CatalogListItem key={data.id} data={data} />
      ))}
    </Container>
  );
};
