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
        variant="outlined"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          px: 2,
          py: 1,
          borderColor: "primary.main",
          "&:hover": {
            borderColor: "primary.dark",
            backgroundColor: "rgba(47, 111, 0, 0.04)",
          },
        }}
        onClick={handleClickOpen}
        endIcon={
          <Badge
            badgeContent={cartItemsAmount}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                fontWeight: 600,
              },
            }}
          >
            <ShoppingCartOutlinedIcon color="primary"  />
          </Badge>
        }
      >
        <Typography fontWeight={500}>Мой заказ</Typography>
      </Button>
      <CartModal isOpen={isCartOpened} cart={cart} onClose={handleClose} />
    </Box>
  );
};
