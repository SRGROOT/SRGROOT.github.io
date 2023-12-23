import { Box } from "@mui/material";
import { useGlobalStore } from "../../../store/store";
import { Alert } from "./Alert";

export const AlertManager = () => {
  const alertList = Object.values(useGlobalStore((state) => state.alertsMap));

  return (
    <Box
      sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}
    >
      {alertList.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </Box>
  );
};
