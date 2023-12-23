import { CartItem } from "../../../../types/types";
import { OrderFormData } from "../types";

// const getFullTable = (rows: string) => `
//     <table>
//       <thead>
//         <tr>
//           <td><b>№</b></td>
//           <td><b>Артикул</b></td>
//           <td><b>Название</b></td>
//           <td><b>Цена</b></td>
//           <td><b>Количество</b></td>
//           <td><b>Сумма</b></td>
//         </tr>
//       </thead>
//       <tbody>
//         ${rows}
//       </tbody>
//     </table>
//     `;

// export const getEmailMessageJSON = (
//     { email, name, phone }: OrderFormData,
//     list: CartItem[]
//   ): string => {
//     const rows = list.reduce(
//       (acc, { amount, name, price, vendorCode }, i) =>
//         acc +
//         `<tr><td>${i}</td>,<td>${vendorCode}</td><td>${name}</td><td>${price}</td><td>${amount}</td><td>${
//           price * amount
//         }₽</td></tr>`,
//       ""
//     );

//     return JSON.stringify(`{
//       data: <html>
//         <body>
//           <div>
//               <p>Покупатель: ${name}</p>
//               <p>Почта: ${email}</p>
//               <p>Телефон: ${phone}</p>
//           </div>
//           ${getFullTable(rows)}
//         </body>
//     </html
//     }`);
//   };

export const getEmailMessage = (
  { email, name, phone }: OrderFormData,
  list: CartItem[]
): FormData => {
  const rows = list.reduce<string>(
    (acc, { amount, name, price, vendorCode }, i) => {
      return (
        acc +
        `${i} ${vendorCode} ${name} ${price} ${amount} ${price * amount}₽\n\n`
      );
    },
    ""
  );

  const formData = new FormData();

  formData.append("Почта", email);
  formData.append("Покупатель", name);
  formData.append("Телефон", phone);
  formData.append("Заказ", rows);
  return formData;
};
