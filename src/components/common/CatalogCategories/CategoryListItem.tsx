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
  Typography,
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
  data: { id: parentId, subItems, value, length },
  selectedCategories,
}: Props) => {
  const [open, setOpen] = useState(true);

  const selectedSubCategories = selectedCategories[parentId];

  const itemsAvailableForSelection =
    subItems?.filter(({ length }) => !!length) || [];

  const isListItemDisabled = subItems
    ? !itemsAvailableForSelection.length
    : !length;

  const isCategoryChecked =
    !isListItemDisabled &&
    (selectedSubCategories && subItems
      ? itemsAvailableForSelection.length ===
        Object.keys(selectedSubCategories).length
      : !!selectedSubCategories);

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
                isCategoryChecked ? [] : itemsAvailableForSelection
              );
              setPage(1);
            }}
            sx={{ py: 0 }}
            disabled={isListItemDisabled}
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
        disabled={isListItemDisabled}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={isCategoryChecked}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              {value}{" "}
              {!isListItemDisabled && (
                <Typography component="span" sx={{ opacity: 0.38 }}>
                  ({length})
                </Typography>
              )}
            </>
          }
        />
      </ListItemButton>
    );
  };

  return (
    <>
      {getListItem()}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {subItems &&
            subItems.map(({ id, value, length }) => {
              const isDisabled = !length;

              return (
                <ListItemButton
                  key={id}
                  onClick={() => changeSelectedCategory(parentId, id)}
                  sx={{ py: 0, pl: 3 }}
                  disabled={isDisabled}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={!!selectedSubCategories?.[id]}
                      disableRipple
                      tabIndex={-1}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <>
                        {value}{" "}
                        {!isDisabled && (
                          <Typography component="span" sx={{ opacity: 0.38 }}>
                            ({length})
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItemButton>
              );
            })}
        </List>
      </Collapse>
    </>
  );
};
