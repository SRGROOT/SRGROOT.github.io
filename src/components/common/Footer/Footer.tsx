import { Box, Container } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

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
        <LocalFloristIcon component="svg" fontSize="large" color="primary" />
      </Container>
    </Box>
  );
};
