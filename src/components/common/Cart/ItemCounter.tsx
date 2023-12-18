import {
  addCartItemAmount,
  setItemToCart,
  subtractCartItemAmount,
} from "../../../store/store";
import { CartItem } from "../../../types/types";
import { Counter } from "../../basic";

type Props = {
  cartItem: CartItem;
};

export const ItemCounter = ({ cartItem }: Props) => {
  const { id, amount } = cartItem;

  return (
    <Counter
      value={amount}
      onChangeValue={(value) => {
        setItemToCart({ ...cartItem, amount: value });
      }}
      onAddButtonClick={() => {
        addCartItemAmount(id, 1);
      }}
      onDecrementButtonClick={() => {
        subtractCartItemAmount(id, 1);
      }}
    />
  );
};
