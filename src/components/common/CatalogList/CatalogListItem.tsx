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
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "4px 4px 0 0",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            aspectRatio: 1,
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          image={new URL(`../../../assets/${image}.jpg`, import.meta.url).href}
          alt={name}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(47, 111, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px 4px 0 0",
            opacity: cartAmount > 0 ? 1 : 0,
            transform: cartAmount > 0 ? "scale(1)" : "scale(0.95)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
            zIndex: 2,
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

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 0.5,
            fontWeight: 600,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            mb: 1,
          }}
        >
          Артикул: {vendorCode}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          pt: 1,
          justifyContent: "space-between",
          alignItems: "center",
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {isAvailable ? (
          !cartAmount ? (
            <Button
              onClick={() => {
                setItemToCart({ ...data, amount: 1 });
              }}
              variant="contained"
              size="medium"
              color="secondary"
              sx={{
                minWidth: "auto",
                px: 2,
                py: 1,
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ mr: 0.5 }}  />
              В корзину
            </Button>
          ) : (
            <ItemCounter cartItem={cartItem} />
          )
        ) : (
          <Typography
            sx={{
              color: "error.main",
              fontWeight: 500,
            }}
          >
            Нет в наличии
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {price} ₽
        </Typography>
      </CardActions>
    </Card>
  );
};
