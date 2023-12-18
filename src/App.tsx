import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  CatalogCategories,
  CatalogSearch,
  Footer,
  Header,
} from "./components/common";

import { CATEGORIES_LIST } from "./constants/data";
import { CatalogList } from "./components/common/CatalogList";

const defaultTheme = createTheme({
  palette: {
    primary: {
      50: "#50BE00",
      100: "#48AB00",
      200: "#419A00",
      300: "#3B8B00",
      400: "#357D00",
      500: "#2F6F00",
      600: "#2A6300",
      700: "#255800",
      800: "#214E00",
      900: "#1D4500",
    },

    // background: {
    //   default: "#F8FFF8",
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container
          sx={({ breakpoints }) => ({
            paddingY: 4,
            [breakpoints.down("md")]: {
              paddingY: 3,
            },
          })}
        >
          <Container
            disableGutters
            sx={({ breakpoints }) => ({
              display: "grid",
              gridTemplateColumns: "320px auto",

              gap: 3,
              [breakpoints.down("md")]: {
                gridTemplateColumns: "1fr",
                // [`& > :first-of-type`]: {
                //   order: 2,
                // },
                gap: 2,
              },
            })}
          >
            <CatalogCategories data={CATEGORIES_LIST} />
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",

                gap: 3,
              }}
              disableGutters
            >
              <CatalogSearch />
              <CatalogList />
            </Container>
          </Container>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
