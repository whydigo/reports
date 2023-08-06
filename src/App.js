import { createTheme } from "@mui/material";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "@emotion/react";

const darkTheme = createTheme({
   typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12
  },
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
