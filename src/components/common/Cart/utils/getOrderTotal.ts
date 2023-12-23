import { CartItem } from "../../../../types/types";

export const getOrderTotal = (list: CartItem[]) =>
  list.reduce((acc, { amount, price }) => acc + price * amount, 0);
