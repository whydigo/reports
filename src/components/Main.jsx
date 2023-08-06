import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Reports from "./Reports";
import Copyright from "./Copyright";

const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {/* импорт таблицы */}
          <Reports />
        </Paper>
        <Copyright />
      </Container>
    </>
  );
};

export default Main;
