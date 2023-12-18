import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../store/store";
import { ItemCounter } from ".";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  cart: Store["cart"];
};

export const CartModal = ({ isOpen, onClose, cart }: Props) => {
  const list = Object.values(cart).sort((a, b) => a.name.localeCompare(b.name));

  const total = list.reduce(
    (acc, { amount, price }) => acc + price * amount,
    0
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={isOpen} fullScreen={fullScreen} onClose={onClose}>
      <DialogTitle>Ваш заказ</DialogTitle>
      <IconButton
        onClick={onClose}
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
        {!!list.length ? (
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
                {total} ₽
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

        <TextField
          required
          autoFocus
          margin="dense"
          id="firstName"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="surname"
          label="Фамилия"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="phone"
          label="Телефон"
          type="tel"
          fullWidth
          variant="standard"
        />
        <Button sx={{ mt: 4 }} fullWidth variant="contained" size="large">
          Отправить заявку
        </Button>
      </DialogContent>
      {/* <DialogActions sx={{ justifyContent: "center" }}>
        <Button fullWidth variant="contained" size="large" onClick={onClose}>
          Отправить заявку
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};
