import { Backdrop, CircularProgress } from "@mui/material";
import { useGlobalStore } from "../../../store/store";
import { useEffect } from "react";

export const LoaderManager = () => {
  const loaderCount = useGlobalStore((state) => state.loaderCount);

  useEffect(() => {
    if (loaderCount) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [loaderCount]);

  if (!loaderCount) return null;

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 900 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
