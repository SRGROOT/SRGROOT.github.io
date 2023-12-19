import { Container, AppBar } from "@mui/material";
import { Cart } from "../Cart";
import { Logo } from "../Logo";

export const Header = () => {
  return (
    <AppBar
      color="inherit"
      position="static"
      sx={({ breakpoints }) => ({
        py: 2,
        [breakpoints.down("md")]: {
          position: "fixed",
          top: 0,
          zIndex: 200,
          py: 1,
          pt: 1.5,
        },
      })}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <Cart />
      </Container>
    </AppBar>
  );
};
