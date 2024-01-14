import { CATEGORIES_MAP, SUB_CATEGORIES_MAP } from "../../../../constants/data";
import { CartItem } from "../../../../types/types";
import { OrderFormData } from "../types";

type PreparedList = Pick<
  CartItem,
  "amount" | "name" | "price" | "vendorCode"
> & { categoryOrSubCategoryName: string };

export const getEmailMessage = (
  { email, name, phone }: OrderFormData,
  list: CartItem[]
): FormData => {
  let totalPrice = 0;
  let flowersCount = 0;
  const rows = list
    .reduce<PreparedList[]>(
      (acc, { amount, categoryId, name, price, subCategoryId, vendorCode }) => {
        const categoryOrSubCategoryName = subCategoryId
          ? SUB_CATEGORIES_MAP[categoryId][subCategoryId].value
          : CATEGORIES_MAP[categoryId].value;

        acc.push({
          amount,
          vendorCode,
          price,
          name,
          categoryOrSubCategoryName,
        });

        return acc;
      },
      []
    )
    .sort((a, b) =>
      a.categoryOrSubCategoryName.localeCompare(b.categoryOrSubCategoryName)
    )
    .reduce<string>(
      (acc, { amount, name, price, vendorCode, categoryOrSubCategoryName }) => {
        const sum = price * amount;
        totalPrice += sum;
        flowersCount += amount;

        return (
          acc +
          `
        ------------
        Артикул: ${categoryOrSubCategoryName} (${vendorCode})
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
  formData.append("Сумма заказа", `${totalPrice}₽`);
  formData.append("Количество позиций", String(list.length));
  formData.append("Количество товара", `${flowersCount}шт.`);
  formData.append("Заказ", rows);

  return formData;
};
