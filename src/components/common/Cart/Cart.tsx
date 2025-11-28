import { Badge, Box, Button, Typography } from "@mui/material";
import { useGlobalStore } from "../../../store/store";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState } from "react";
import { CartModal } from "./CartModal";

export const Cart = () => {
  const cart = useGlobalStore((state) => state.cart);

  const cartItemsAmount = Object.keys(cart).length;

  const [isCartOpened, setIsCartOpened] = useState(false);

  const handleClickOpen = () => {
    setIsCartOpened(true);
  };

  const handleClose = () => {
    setIsCartOpened(false);
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
        endIcon={
          <Badge badgeContent={cartItemsAmount} color="secondary">
            <ShoppingCartOutlinedIcon color="primary" />
          </Badge>
        }
      >
        <Typography>Мой заказ</Typography>
      </Button>
      <CartModal isOpen={isCartOpened} cart={cart} onClose={handleClose} />
    </Box>
  );
};
