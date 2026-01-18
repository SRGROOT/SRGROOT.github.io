import { Box, Container, Typography } from "@mui/material";
import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <Box
      sx={{
        py: 3,
        position: "relative",
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Container>
        <Logo />
        <Typography
          mt={1.5}
          fontSize={13}
          sx={{
            color: "text.secondary",
          }}
        >
          &copy; 2023-{new Date().getFullYear()} Flower Market. Все права
          защищены.
        </Typography>
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 16,
          fontSize: "10px",
          opacity: 0.3,
          color: "text.secondary",
        }}
      >
        v{__APP_VERSION__} {__COMMIT_HASH__}
      </Box>
    </Box>
  );
};
