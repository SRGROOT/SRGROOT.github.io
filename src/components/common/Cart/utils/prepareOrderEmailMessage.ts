import { SUB_CATEGORIES_MAP } from "../../../../constants/data";
import { CartItem } from "../../../../types/types";
import { OrderFormData } from "../types";

export const getEmailMessage = (
  { email, name, phone }: OrderFormData,
  list: CartItem[]
): FormData => {
  let total = 0;
  const rows = list.reduce<string>(
    (acc, { amount, name, price, vendorCode, subCategoryId, categoryId }) => {
      const sum = price * amount;
      total += sum;

      // TODO Нет проверок, что SUB_CATEGORIES_MAP[categoryId] содержит categoryId
      const subCategoryName = subCategoryId
        ? SUB_CATEGORIES_MAP[categoryId][subCategoryId].value
        : "";

      return (
        acc +
        `
        ------------
        Артикул: ${subCategoryName} (${vendorCode})
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
