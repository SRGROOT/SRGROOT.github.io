import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { PhoneInput } from "../../basic";
import { validateEmail, validatePhone } from "../../../utils/validators";
import { OrderFormData } from "./types";

type Props = {
  isCartNotEmpty: boolean;
  onSubmit: (data: OrderFormData) => void;
};

export const OrderForm = ({ isCartNotEmpty, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isEmailValid = validateEmail(email);
  const isFormValid =
    isCartNotEmpty && name && validatePhone(phone) && isEmailValid;

  return (
    <>
      <TextField
        required
        value={name}
        onChange={({ currentTarget: { value } }) => setName(value)}
        margin="dense"
        id="firstName"
        label="Имя"
        type="text"
        fullWidth
        variant="standard"
        inputProps={{ maxLength: 20 }}
      />
      <TextField
        required
        error={Boolean(email && !isEmailValid)}
        value={email}
        onChange={({ currentTarget: { value } }) => setEmail(value)}
        margin="dense"
        id="email"
        inputMode="email"
        label="Почта"
        type="text"
        fullWidth
        variant="standard"
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        required
        value={phone}
        margin="dense"
        id="phone"
        label="Телефон"
        fullWidth
        variant="standard"
        InputProps={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: PhoneInput as any,
          onChange: ({ currentTarget: { value } }) => setPhone(value),
        }}
      />

      <Button
        onClick={() => onSubmit({ name, phone, email })}
        sx={{ mt: 4 }}
        disabled={!isFormValid}
        fullWidth
        variant="contained"
        size="large"
      >
        Отправить заявку
      </Button>
    </>
  );
};
