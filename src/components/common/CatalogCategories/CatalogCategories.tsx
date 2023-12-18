import { List, Paper, Button, Container } from "@mui/material";
import { CategoryItem } from "../../../types/types";
import { CategoryListItem } from "./CategoryListItem";
import { resetAllCategories, useGlobalStore } from "../../../store/store";

type Props = {
  data: CategoryItem[];
};

export const CatalogCategories = ({ data }: Props) => {
  const selectedCategories = useGlobalStore(
    (state) => state.selectedCategories
  );

  return (
    <Paper
      elevation={5}
      sx={({ breakpoints, spacing }) => ({
        position: "sticky",
        top: spacing(4),
        overflow: "hidden",
        height: "min-content",
        [breakpoints.down("md")]: {
          position: "static",
        },
      })}
    >
      <List>
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          {
            <Button
              size="small"
              sx={{ ml: "auto" }}
              onClick={resetAllCategories}
              disabled={!Object.keys(selectedCategories).length}
            >
              Сбросить
            </Button>
          }
        </Container>
        {data.map((item) => (
          <CategoryListItem
            key={item.id}
            selectedCategories={selectedCategories}
            data={item}
          />
        ))}
      </List>
    </Paper>
  );
};
