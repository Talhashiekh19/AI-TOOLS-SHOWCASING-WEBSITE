import { Box, CssBaseline } from "@mui/material";
import { Suspense } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Suspense>
      <Box className="background">
        <Navbar />
        <CssBaseline />
        <Outlet />
      </Box>
    </Suspense>
  );
}

export default App;
