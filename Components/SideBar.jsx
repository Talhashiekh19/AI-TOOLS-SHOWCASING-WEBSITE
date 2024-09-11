import {
  Box,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import { pages } from "../Constants";

import background from "../public/background.png";

const SideBar = ({ openDrawer, setopenDrawer,handleNavigate }) => {
  return (
    <SwipeableDrawer
      onOpen={() => setopenDrawer(true)}
      PaperProps={{
        sx: {
          background: `black url(${background}) no-repeat center fixed`,
          width: "100vw",
          position: "relative",
          zIndex: 999999999999,
        },
      }}
      open={openDrawer}
      onClose={() => setopenDrawer(false)}
    >
      <Box padding={5} mt={5} height="100%">
        {pages.map((link) => {
          return (
            <List key={link} sx={{ mt: 3 }}>
              <ListItem
                onClick={() => handleNavigate(link)}
                sx={() => ({
                  "& .MuiTouchRipple-child": {
                    backgroundColor: `white !important`,
                  },
                })}
                disablePadding
              >
                <div onClick={() => setopenDrawer(false)}>
                  <ListItemText>
                    <Typography
                      className="poppins"
                      color={"white"}
                      variant="h5"
                    >
                      {link}
                    </Typography>
                  </ListItemText>
                </div>
              </ListItem>
            </List>
          );
        })}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideBar;
