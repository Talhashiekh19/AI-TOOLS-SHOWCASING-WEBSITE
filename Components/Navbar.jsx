import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import React from "react";
import { pages } from "../Constants";

const Navbar = () => {
  return (
    <Box>
      <AppBar
        sx={{ p: 2,bgcolor:"black" }}
        component="nav"
        position="sticky"
        className="background"
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
          <Box component="div">
            <Typography className="poppins" fontWeight="bold" variant="h5">
              {"<SkyAiVerse/>"}
            </Typography>
          </Box>
          <Box component="div" display="flex" gap={6}>
            {pages.map((link) => (
              <Button color="primary" variant="text" key={link}>
                <Typography
                  position="relative"
                  className="poppins nav_link"
                  textTransform="capitalize"
                  fontSize="1.2rem"
                  color="white"
                >
                  {link}
                </Typography>
              </Button>
            ))}
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
