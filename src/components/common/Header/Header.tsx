import { Container, AppBar } from "@mui/material";
import { Cart } from "../Cart";
import { Logo } from "../Logo";

export const Header = () => {
  return (
    <AppBar
      color="inherit"
      position="static"
      elevation={0}
      sx={({ breakpoints }) => ({
        py: 2,
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        [breakpoints.down("md")]: {
          position: "fixed",
          top: 0,
          zIndex: 200,
          py: 1,
          pt: 1.5,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
