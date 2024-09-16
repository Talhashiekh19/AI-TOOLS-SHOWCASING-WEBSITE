import {
  AppBar,
  Box,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { pages } from "../Constants";
import { useLocation, useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SideBar from "./SideBar";
import CloseIcon from "@mui/icons-material/Close";
import { useResponsivness } from "../Helpers";
import logo from "/logo.png"

const Navbar = ({handleNavigate}) => {
  const checkingSm = useResponsivness("down", "sm");
  const [openDrawer, setopenDrawer] = useState(false);
  const navigate = useNavigate();
  const [currentlocation,setcurrentlocation] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const activelocation = location.pathname.split("/")[1];
    if(activelocation === ""){
      setcurrentlocation("Home")
    }else {
      setcurrentlocation(activelocation);
    }
  },[location.pathname]);

  return (
    <>
      <SideBar
        handleNavigate={handleNavigate}
        openDrawer={openDrawer}
        setopenDrawer={setopenDrawer}
      />
      <Box>
        <AppBar
          sx={{ p: 2, bgcolor: "black", zIndex: 9999999 }}
          component="nav"
          position="sticky"
          className="background navbar"
        >
          <Container
            maxWidth="lg"
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            component="section"
          >
            <Box
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img src={logo} height={40} alt="Loading..." />
            </Box>
            {checkingSm ? (
              <IconButton onClick={() => setopenDrawer((p) => !p)}>
                <Box>
                  {openDrawer ? (
                    <CloseIcon sx={{ color: "white", fontSize: "2rem" }} />
                  ) : (
                    <MenuOpenIcon sx={{ color: "white", fontSize: "2rem" }} />
                  )}
                </Box>
              </IconButton>
            ) : (
              <Box component="div" display="flex" gap={checkingSm ? 1 : 6}>
                {pages.map((link) => {
                  const checkingActivness = currentlocation === link;
                  return <Button
                    onClick={() => handleNavigate(link, navigate)}
                    color="primary"
                    variant="text"
                    key={link}
                  >
                    <Typography
                      position="relative"
                      className={`poppins nav_link ${checkingActivness ? "active" : ""}`}
                      textTransform="capitalize"
                      fontSize={checkingSm ? "1rem" : "1.2rem"}
                      color="white"
                    >
                      {link}
                    </Typography>
                  </Button>
})}
              </Box>
            )}
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
