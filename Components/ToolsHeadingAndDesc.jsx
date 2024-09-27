import { Typography } from "@mui/material";
import React from "react";
import { useResponsivness } from "../Helpers";

const HeadingAndDesc = ({heading,description}) => {
  const checkingMd = useResponsivness("down","md");
  return (
    <>
      <Typography
        textAlign="center"
        className="paytone"
        variant={checkingMd ? "h4" : "h3"}
        color="white"
      >
        {heading}
      </Typography>
      <Typography
        textAlign="center"
        className="mulish"
        variant="h6"
        color="white"
      >
        {description}
      </Typography>
    </>
  );
};

export default HeadingAndDesc;
