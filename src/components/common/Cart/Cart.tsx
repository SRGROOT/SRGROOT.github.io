import { Badge, Box, IconButton } from "@mui/material";
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
    <Box>
      <IconButton onClick={handleClickOpen}>
        <Badge badgeContent={cartItemsAmount} color="secondary">
          <ShoppingCartOutlinedIcon color="primary" />
        </Badge>
      </IconButton>
      <CartModal isOpen={isCartOpened} cart={cart} onClose={handleClose} />
    </Box>
  );
};
