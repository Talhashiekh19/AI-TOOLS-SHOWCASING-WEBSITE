import { Box, Typography } from "@mui/material";
import React from "react";
import { GREY_COLOR } from "../Constants";

const HeadingAndDescription = ({
  heading,
  description,
  headingVariant,
  descVaraint,
  center = false,
  ...props
}) => {
  return (
    <Box mb={5}  width={"fit-content"} {...props}>
      <Typography
        mb={1}
        sx={{ isolation: "isolate" }}
        position="relative"
        className="paytone heading_underline"
        color="white"
        variant={headingVariant}
      >
        {heading}
      </Typography>
      <Typography color={GREY_COLOR} className="mulish" textAlign={center ? "center" : ""} variant={descVaraint}>
        {description}
      </Typography>
    </Box>
  );
};

export default HeadingAndDescription;
