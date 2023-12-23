export const validateEmail = (value: string) =>
  !!value.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export const validatePhone = (value: string) =>
  value.replace(/[\D]+/g, "").length === 11;
