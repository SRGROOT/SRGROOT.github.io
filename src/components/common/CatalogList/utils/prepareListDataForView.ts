import { ITEMS_LIST } from "../../../../constants/data";
import { Store } from "../../../../store/store";

export const prepareListDataForView = (
  selectedCategories: Store["selectedCategories"],
  search: Store["search"]
) => {
  const selectedCategoriesAmount = Object.keys(selectedCategories).length;

  if (!search && !selectedCategoriesAmount)
    return ITEMS_LIST.slice().sort((a, b) => a.name.localeCompare(b.name));

  return ITEMS_LIST.filter(({ name, categoryId, subCategoryId }) => {
    return (
      (search ? name.toLowerCase().includes(search.toLowerCase()) : true) &&
      (!!selectedCategoriesAmount
        ? subCategoryId
          ? !!selectedCategories[categoryId]?.[subCategoryId]
          : !!selectedCategories[categoryId]
        : true)
    );
  }).sort((a, b) => a.name.localeCompare(b.name));
};
