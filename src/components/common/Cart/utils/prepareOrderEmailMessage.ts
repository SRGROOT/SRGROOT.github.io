import { CartItem } from "../../../../types/types";
import { OrderFormData } from "../types";

export const getEmailMessage = (
  { email, name, phone }: OrderFormData,
  list: CartItem[]
): FormData => {
  let total = 0;
  const rows = list.reduce<string>(
    (acc, { amount, name, price, vendorCode }) => {
      const sum = price * amount;
      total += sum;

      return (
        acc +
        `
        ------------
        Артикул: ${vendorCode}
        Наименование: ${name}
        Цена: ${price}
        Количество: ${amount}
        Сумма: ${sum}₽\n`
      );
    },
    ""
  );

  const formData = new FormData();

  formData.append("Покупатель", name);
  formData.append("Телефон", phone);
  formData.append("Почта", email);
  formData.append("Сумма заказа", `${total}₽`);
  formData.append("Количество позиций", String(list.length));
  formData.append("Заказ", rows);

  return formData;
};
