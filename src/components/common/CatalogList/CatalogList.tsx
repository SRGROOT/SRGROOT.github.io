import { Box, Button, Stack, Typography } from "@mui/material";
import { setPage, useGlobalStore } from "../../../store/store";
import { CatalogListItem } from "./CatalogListItem";
import { prepareListDataForView } from "./utils";

export const CatalogList = () => {
  const selectedCategories = useGlobalStore(
    (state) => state.selectedCategories
  );
  const search = useGlobalStore((state) => state.search);
  const page = useGlobalStore((state) => state.page);

  const [data, { isLastPage }] = prepareListDataForView(
    selectedCategories,
    search,
    page
  );

  if (!data.length)
    return (
      <Typography sx={{ textAlign: "center" }}>
        По вашему запросу ничего не найдено
      </Typography>
    );

  return (
    <Stack>
      <Box
        sx={({ breakpoints }) => ({
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          [breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
          },
        })}
      >
        {data.map((data) => (
          <CatalogListItem key={data.id} data={data} />
        ))}
      </Box>
      {!isLastPage && (
        <Button
          sx={{ margin: "auto", mt: 4 }}
          variant="contained"
          size="large"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Показать еще
        </Button>
      )}
    </Stack>
  );
};
