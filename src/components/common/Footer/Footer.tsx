import { Box, Container, Typography } from "@mui/material";
import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <Box
      sx={(theme) => ({
        py: 2,
        position: "relative",
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <Logo />
        <Typography mt={1} fontSize={12}>
          &copy; 2023-{new Date().getFullYear()} Flower Market. Все права
          защищены.
        </Typography>
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "10px",
          opacity: 0.2,
        }}
      >
        v{__APP_VERSION__} {__COMMIT_HASH__}
      </Box>
    </Box>
  );
};
