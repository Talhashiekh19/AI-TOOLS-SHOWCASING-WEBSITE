import { Box } from "@mui/material";
import { lazy, Suspense } from "react";

import Navbar from "../Components/Navbar";


const Categories = lazy(() => import("../Screens/Categories"))
const ToolsScreen = lazy(() => import("../Screens/ToolsScreen"));
const Home = lazy(() => import("../Screens/Home"));

function App() {


  return (
    <Suspense>
      <Box className="background">
        <Navbar />
        <Home />
        <ToolsScreen />
        <Categories/>
      </Box>
    </Suspense>
  );
}

export default App;
