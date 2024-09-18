import { Box } from "@mui/material";
import React from "react";
import { ThreeCircles } from 'react-loader-spinner'

const LoadingScreen = () => {
  return (
    <Box className="background" display="flex" justifyContent="center" alignItems="center" height="100vh">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#fff"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
};

export default LoadingScreen;
