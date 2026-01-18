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
    <AlertMUI
      severity={type}
      onClose={handleCloseAlert}
      sx={{
        borderRadius: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {message}
    </AlertMUI>
  );
};
