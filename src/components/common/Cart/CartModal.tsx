import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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
      sx={{ zIndex: 800 }}
      open={isOpen}
      fullScreen={fullScreen}
      onClose={handleClose}
    >
      <DialogTitle>Ваш заказ</DialogTitle>
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
                  <ListItem key={id} sx={{ px: 0 }}>
                    <Box
                      component="img"
                      src={
                        new URL(`../../../assets/${image}.jpg`, import.meta.url)
                          .href
                      }
                      sx={({ breakpoints }) => ({
                        height: "80px",
                        aspectRatio: 1,
                        borderRadius: 1,
                        [breakpoints.down("md")]: {
                          height: "50px",
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

            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                Сумма заказа:{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                }}
                fontWeight="bold"
              >
                {getOrderTotal(list)} ₽
              </Typography>
            </Box>
            <Divider />
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
