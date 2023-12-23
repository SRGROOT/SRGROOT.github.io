import { Box, Container } from "@mui/material";
import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <Box
      sx={(theme) => ({
        py: 3,
        position: "relative",
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <Logo />
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "10px",
        }}
      >
        v{__APP_VERSION__} {__COMMIT_HASH__}
      </Box>
    </Box>
  );
};
