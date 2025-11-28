import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Button,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { CatalogItem } from "../../../types/types";
import {
  createAlert,
  setIsOrderReminderDisplayed,
  setItemToCart,
  useGlobalStore,
} from "../../../store/store";
import { ItemCounter } from "../Cart";
import { AlertType } from "../../../constants/constants";

type Props = {
  data: CatalogItem;
};

export const CatalogListItem = ({ data }: Props) => {
  const { description, id, image, name, price, vendorCode, isAvailable } = data;
  const isOrderReminderDisplayed = useGlobalStore(
    (state) => state.isOrderReminderDisplayed
  );
  const cartItem = useGlobalStore((state) => state.cart[id]);
  const cartAmount = cartItem?.amount || null;

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{
          aspectRatio: 1,
        }}
        image={new URL(`../../../assets/${image}.jpg`, import.meta.url).href}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle2">Артикул: {vendorCode}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          justifyContent: "space-between",
          mt: "auto",
        }}
      >
        {isAvailable ? (
          !cartAmount ? (
            <Button
              onClick={() => {
                setItemToCart({ ...data, amount: 1 });
                if (!isOrderReminderDisplayed) {
                  createAlert({
                    id: Math.random(),
                    message:
                      "Товар добавлен, не забудьте оформить заказ в корзине.",
                    type: AlertType.INFO,
                  });
                  setIsOrderReminderDisplayed(true);
                }
              }}
              variant="contained"
              size="small"
              color="secondary"
            >
              <ShoppingCartOutlinedIcon />
            </Button>
          ) : (
            <ItemCounter cartItem={cartItem} />
          )
        ) : (
          <Typography>Нет в наличии</Typography>
        )}

        <Typography
          sx={{
            fontSize: "24px",
          }}
          fontWeight="bold"
        >
          {price} ₽
        </Typography>
      </CardActions>
    </Card>
  );
};
