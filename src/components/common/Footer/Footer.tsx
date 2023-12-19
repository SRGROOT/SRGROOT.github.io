import { Box, Container } from "@mui/material";
import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <Box
      sx={(theme) => ({
        py: 3,

        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <Logo />
      </Container>
    </Box>
  );
};
