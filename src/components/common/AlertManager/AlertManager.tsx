import { Box } from "@mui/material";
import { useGlobalStore } from "../../../store/store";
import { Alert } from "./Alert";

export const AlertManager = () => {
  const alertList = Object.values(useGlobalStore((state) => state.alertsMap));

  if (!alertList.length) return null;

  return (
    <Box
      sx={({ breakpoints }) => ({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        pt: { xs: 7, md: 0 }, // Отступ сверху на мобильных, чтобы не перекрывать fixed Header
        pointerEvents: "none", // Не блокируем клики
        [breakpoints.down("md")]: {
          pt: 7, // Высота Header на мобильных
        },
      })}
    >
      {alertList.map((alert) => (
        <Box key={alert.id} sx={{ pointerEvents: "auto" }}>
          <Alert alert={alert} />
        </Box>
      ))}
    </Box>
  );
};
