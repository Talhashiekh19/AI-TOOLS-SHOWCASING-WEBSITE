import { Typography } from "@mui/material";
import React from "react";

const HeadingAndDesc = ({heading,description}) => {
  return (
    <>
      <Typography
        textAlign="center"
        className="paytone"
        variant="h4"
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
