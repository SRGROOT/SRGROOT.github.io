import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { setPage, useGlobalStore } from "../../../store/store";
import { CatalogListItem } from "./CatalogListItem";
import { prepareListDataForView } from "./utils";

export const CatalogList = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const selectedCategories = useGlobalStore(
    (state) => state.selectedCategories
  );
  const search = useGlobalStore((state) => state.search);
  const page = useGlobalStore((state) => state.page);

  // Определяем количество элементов на страницу в зависимости от количества колонок
  const itemsPerPage = isMediumScreen ? 8 : 9;

  const [data, { isLastPage }] = prepareListDataForView(
    selectedCategories,
    search,
    page,
    itemsPerPage
  );

  if (!data.length)
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 1,
            fontWeight: 500,
          }}
        >
          По вашему запросу ничего не найдено
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          Попробуйте изменить параметры поиска или выбрать другую категорию
        </Typography>
      </Box>
    );

  return (
    <Stack>
      <Box
        sx={({ breakpoints }) => ({
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          [breakpoints.down("lg")]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
            gap: 2,
          },
        })}
      >
        {data.map((data) => (
          <Box
            key={data.id}
            sx={{
              animation: 'fadeIn 0.4s ease-out',
              '@keyframes fadeIn': {
                from: {
                  opacity: 0,
                },
                to: {
                  opacity: 1,
                },
              },
            }}
          >
            <CatalogListItem data={data} />
          </Box>
        ))}
      </Box>
      {!isLastPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setPage(page + 1);
            }}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
            }}
          >
            Показать еще
          </Button>
        </Box>
      )}
    </Stack>
  );
};
