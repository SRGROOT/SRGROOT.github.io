import { create } from "zustand";
import { Alert, CartItem, CategoryItem } from "../types/types";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export type Store = {
  selectedCategories: Record<number, Record<number, number>>;
  cart: Record<CartItem["id"], CartItem>;
  search: string;

  loaderCount: number;
  alertsMap: Record<Alert["id"], Alert>;
};

export const useGlobalStore = create<Store>()(
  devtools(
    immer(() => ({
      cart: {},
      selectedCategories: {},
      search: "",
      loaderCount: 0,
      alertsMap: {},
    }))
  )
);

export const createAlert = (alert: Alert) =>
  useGlobalStore.setState((state) => {
    state.alertsMap[alert.id] = alert;
  });

export const closeAlert = (id: Alert["id"]) =>
  useGlobalStore.setState((state) => {
    delete state.alertsMap[id];
  });

export const addLoaderValue = () =>
  useGlobalStore.setState((state) => {
    state.loaderCount++;
  });

export const subtractLoaderValue = () =>
  useGlobalStore.setState((state) => {
    state.loaderCount--;
  });

export const resetCart = () =>
  useGlobalStore.setState((state) => {
    state.cart = {};
  });

export const setItemToCart = (item: CartItem) =>
  useGlobalStore.setState((state) => {
    state.cart[item.id] = item;
  });

export const addCartItemAmount = (id: CartItem["id"], amount: number) =>
  useGlobalStore.setState((state) => {
    state.cart[id].amount += amount;
  });

export const subtractCartItemAmount = (id: CartItem["id"], amount: number) =>
  useGlobalStore.setState((state) => {
    state.cart[id].amount -= amount;

    if (state.cart[id].amount === 0) delete state.cart[id];
  });

export const CartItemAmount = (item: CartItem) =>
  useGlobalStore.setState((state) => {
    if (!(item.id in state.cart[item.id])) setItemToCart(item);
    else state.cart[item.id].amount += item.amount;
  });

export const changeAllSubCategoriesByParentCategory = (
  parentCategory: number,
  categories: CategoryItem[]
) =>
  useGlobalStore.setState((state) => {
    if (!categories.length) {
      delete state.selectedCategories[parentCategory];
      return;
    }

    state.selectedCategories[parentCategory] = categories.reduce<
      Record<number, number>
    >((acc, { id }) => {
      acc[id] = id;

      return acc;
    }, {});
  });

export const changeSelectedCategory = (
  parentCategory: number,
  categoryId?: CategoryItem["id"]
) =>
  useGlobalStore.setState((state) => {
    /** TODO Refactoring */

    if (categoryId) {
      if (!state.selectedCategories[parentCategory])
        state.selectedCategories[parentCategory] = {};

      if (categoryId in state.selectedCategories[parentCategory])
        delete state.selectedCategories[parentCategory][categoryId];
      else state.selectedCategories[parentCategory][categoryId] = categoryId;

      if (!Object.keys(state.selectedCategories[parentCategory]).length)
        delete state.selectedCategories[parentCategory];
    } else {
      if (parentCategory in state.selectedCategories)
        delete state.selectedCategories[parentCategory];
      else state.selectedCategories[parentCategory] = {};
    }
  });

export const resetAllCategories = () =>
  useGlobalStore.setState((state) => {
    state.selectedCategories = {};
  });

export const setSearchValue = (value: string) =>
  useGlobalStore.setState((state) => {
    state.search = value;
  });
