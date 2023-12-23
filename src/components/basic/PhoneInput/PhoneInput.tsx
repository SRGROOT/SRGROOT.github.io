import React from "react";
import { IMaskInput } from "react-imask";

export const PhoneInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+7 (___) ___-__-__"
      definitions={{
        _: /[0-9]/,
      }}
      inputRef={ref}
      overwrite
    />
  );
});
