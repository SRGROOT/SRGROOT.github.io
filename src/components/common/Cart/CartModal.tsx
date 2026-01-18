import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Store,
  addLoaderValue,
  createAlert,
  resetCart,
  subtractLoaderValue,
} from "../../../store/store";
import { ItemCounter } from ".";
import { OrderForm } from "./OrderForm";
import { OrderFormData } from "./types";

import { getOrderTotal } from "./utils/getOrderTotal";
import { getEmailMessage } from "./utils/prepareOrderEmailMessage";
import { AlertType } from "../../../constants/constants";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  cart: Store["cart"];
};

export const CartModal = ({ isOpen, onClose, cart }: Props) => {
  const list = Object.values(cart).sort((a, b) => a.name.localeCompare(b.name));

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmitOrder = (data: OrderFormData) => {
    addLoaderValue();
    fetch(import.meta.env.VITE_EMAIL_PROXY_URL, {
      method: "POST",
      body: getEmailMessage(data, list),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          resetCart();

          createAlert({
            id: Math.random(),
            message: "Заявка отправлена!",
            type: AlertType.SUCCESS,
          });
        }
      })
      .catch(() =>
        createAlert({
          id: Math.random(),
          message: "Произошла ошибка!",
          type: AlertType.ERROR,
        })
      )
      .finally(() => {
        subtractLoaderValue();
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{
        zIndex: 800,
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
      open={isOpen}
      fullScreen={fullScreen}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: "1.5rem",
          pb: 1,
        }}
      >
        Ваш заказ
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 0 }}>
        {list.length ? (
          <>
            <List sx={{ width: "100%" }}>
              {list.map((item) => {
                const { id, image, name, price, vendorCode } = item;

                return (
                  <ListItem
                    key={id}
                    disablePadding
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        new URL(`../../../assets/${image}.jpg`, import.meta.url)
                          .href
                      }
                      sx={({ breakpoints }) => ({
                        height: "100px",
                        width: "100px",
                        aspectRatio: 1,
                        borderRadius: 1.5,
                        objectFit: "cover",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        flexShrink: 0,
                        [breakpoints.down("md")]: {
                          height: "80px",
                          width: "80px",
                        },
                      })}
                    />
                    {/* <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" /> */}
                    <ListItemText
                      sx={({ breakpoints }) => ({
                        mx: 2,
                        [breakpoints.down("md")]: {
                          mx: 1,
                        },
                      })}
                    >
                      <Typography
                        sx={({ breakpoints }) => ({
                          fontSize: "16px",
                          [breakpoints.down("md")]: {
                            fontSize: "14px",
                          },
                        })}
                      >
                        {name}
                      </Typography>
                      <Typography
                        sx={({ breakpoints }) => ({
                          fontSize: "14px",
                          [breakpoints.down("md")]: {
                            fontSize: "12px",
                          },
                        })}
                      >
                        Артикул: {vendorCode}
                      </Typography>
                      <Typography
                        sx={({ breakpoints }) => ({
                          fontSize: "14px",
                          [breakpoints.down("md")]: {
                            fontSize: "12px",
                          },
                        })}
                        fontWeight="bold"
                      >
                        {price} ₽
                      </Typography>
                    </ListItemText>
                    <ItemCounter cartItem={item} />
                  </ListItem>
                );
              })}
            </List>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 2,
                px: 2,
                backgroundColor: "rgba(47, 111, 0, 0.04)",
                borderRadius: 1,
                mt: 2,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                Сумма заказа:
              </Typography>
              <Typography
                sx={{
                  fontSize: "28px",
                  color: "primary.main",
                }}
                fontWeight="bold"
              >
                {getOrderTotal(list)} ₽
              </Typography>
            </Box>
          </>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              my: 4,
            }}
          >
            Корзина пока пуста
          </Typography>
        )}

        <OrderForm
          onSubmit={handleSubmitOrder}
          isCartNotEmpty={Boolean(list.length)}
        />
      </DialogContent>
    </Dialog>
  );
};
