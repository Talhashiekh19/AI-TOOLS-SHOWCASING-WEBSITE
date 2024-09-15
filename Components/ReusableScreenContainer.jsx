import { Container } from "@mui/material";
import React from "react";

const ReusableScreenContainer = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
        pt: 15,
        pb: 5,
      }}
      component="section"
    >
      {children}
    </Container>
  );
};

export default ReusableScreenContainer;
