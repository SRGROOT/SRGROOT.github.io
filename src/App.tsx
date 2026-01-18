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
  LoaderManager,
} from "./components/common";

import { CATEGORIES_LIST } from "./constants/data";
import { CatalogList } from "./components/common/CatalogList";
import { AlertManager } from "./components/common/AlertManager/AlertManager";

const defaultTheme = createTheme({
  palette: {
    primary: {
      50: "#50BE00",   // Самый светлый - яркий зеленый
      100: "#48AB00",
      200: "#419A00",
      300: "#3B8B00",
      400: "#357D00",
      500: "#2F6F00",  // Основной цвет (main)
      600: "#2A6300",
      700: "#255800",
      800: "#214E00",
      900: "#1D4500",  // Самый темный
      main: "#2F6F00", // Основной цвет для кнопок, ссылок
      light: "#50BE00", // Светлый вариант (берется из 50)
      dark: "#1D4500",  // Темный вариант (берется из 900)
      contrastText: "#FFFFFF", // Белый текст на цветном фоне
    },
    secondary: {
      main: "#50BE00",  // Яркий зеленый для акцентов (кнопки "В корзину")
      light: "#7FD133", // Более светлый зеленый для hover эффектов
      dark: "#3A8F00",  // Более темный зеленый
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA", // Нейтральный светло-серый фон (лучше для каталога)
      paper: "#FFFFFF",    // Белый фон для карточек и панелей
    },
    divider: "rgba(0, 0, 0, 0.12)", // Стандартный серый для разделителей
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={({ breakpoints }) => ({
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          [breakpoints.down("md")]: {
            pt: 7,
          },
        })}
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
      <LoaderManager />
      <AlertManager />
    </ThemeProvider>
  );
}

export default App;
