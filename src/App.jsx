import { Box, CssBaseline } from "@mui/material";
import { Suspense, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import LoadingScreen from "../Components/LoadingScreen";

function App() {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  },[pathname]);

  function fn(link, navigateTo) {
    if (link === "Home") {
      navigateTo("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 1000);
    } else if (link === "Tools") {
      navigateTo("/");
      setTimeout(() => {
        window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
      }, 1000);
    }
  }

  function handleNavigate(link) {
    if (link === "Categories") {
      navigate(`/${link}`);
    } else {
      fn(link, navigate);
    }
  }

  return (
    <Suspense fallback={<LoadingScreen/>}>
      <Box className="background">
        <Navbar handleNavigate={handleNavigate} />
        <CssBaseline />
        <Outlet />
        <Footer handleNavigate={handleNavigate} />
      </Box>
    </Suspense>
  );
}

export default App;


// https://mockuuups.studio/developers/fb5CMh6DaKMMRqYA97aEZF/#api-keys

// https://mediamodifier.com/dashboard/mockup-api