import { Alert as AlertMUI } from "@mui/material";
import { closeAlert } from "../../../store/store";
import { Alert as AlertType } from "../../../types/types";
import { useEffect } from "react";

type Props = {
  alert: AlertType;
};

export const Alert = ({ alert: { id, message, type } }: Props) => {
  const handleCloseAlert = () => {
    closeAlert(id);
  };

  useEffect(() => {
    const timerId = setTimeout(handleCloseAlert, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <AlertMUI severity={type} onClose={handleCloseAlert}>
      {message}
    </AlertMUI>
  );
};
