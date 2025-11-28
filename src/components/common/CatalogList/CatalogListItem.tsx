import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Button,
  Box,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { CatalogItem } from "../../../types/types";
import { setItemToCart, useGlobalStore } from "../../../store/store";
import { ItemCounter } from "../Cart";

type Props = {
  data: CatalogItem;
};

export const CatalogListItem = ({ data }: Props) => {
  const { description, id, image, name, price, vendorCode, isAvailable } = data;
  const cartItem = useGlobalStore((state) => state.cart[id]);
  const cartAmount = cartItem?.amount || 0;

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ aspectRatio: 1 }}
          image={new URL(`../../../assets/${image}.jpg`, import.meta.url).href}
          alt={name}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            opacity: cartAmount > 0 ? 1 : 0,
            transform: cartAmount > 0 ? "scale(1)" : "scale(0.95)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CheckCircleOutlineIcon sx={{ color: "white", fontSize: 70 }} />
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                mt: 1,
                fontSize: 16,
              }}
            >
              Добавлено в корзину
            </Typography>
          </Box>
        </Box>
      </Box>

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

        <Typography sx={{ fontSize: "24px" }} fontWeight="bold">
          {price} ₽
        </Typography>
      </CardActions>
    </Card>
  );
};
