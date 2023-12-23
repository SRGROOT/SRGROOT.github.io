import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Collapse,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { CategoryItem } from "../../../types/types";
import {
  Store,
  changeAllSubCategoriesByParentCategory,
  changeSelectedCategory,
  setPage,
} from "../../../store/store";

type Props = {
  data: CategoryItem;
  selectedCategories: Store["selectedCategories"];
};

export const CategoryListItem = ({
  data: { id: parentId, subItems, value },
  selectedCategories,
}: Props) => {
  const [open, setOpen] = useState(false);

  const selectedSubCategories = selectedCategories[parentId];

  const isCategoryChecked =
    selectedSubCategories && subItems
      ? subItems.length === Object.keys(selectedSubCategories).length
      : !!selectedSubCategories;

  /** TODO Refactoring */
  const getListItem = () => {
    if (subItems)
      return (
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        >
          <ListItemButton
            onClick={() => {
              changeAllSubCategoriesByParentCategory(
                parentId,
                isCategoryChecked ? [] : subItems
              );
              setPage(1);
            }}
            sx={{ py: 0 }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                disableRipple
                checked={isCategoryChecked}
                tabIndex={-1}
              />
            </ListItemIcon>

            <ListItemText primary={value} />
          </ListItemButton>
        </ListItem>
      );

    return (
      <ListItemButton
        onClick={() => {
          changeSelectedCategory(parentId);
          setPage(1);
        }}
        sx={{ py: 0 }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={isCategoryChecked}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={value} />
      </ListItemButton>
    );
  };

  return (
    <>
      {getListItem()}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {subItems &&
            subItems.map(({ id, value }) => (
              <ListItemButton
                key={id}
                onClick={() => changeSelectedCategory(parentId, id)}
                sx={{ p: 0, pl: 3 }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={!!selectedSubCategories?.[id]}
                    disableRipple
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText primary={value} />
              </ListItemButton>
            ))}
        </List>
      </Collapse>
    </>
  );
};
