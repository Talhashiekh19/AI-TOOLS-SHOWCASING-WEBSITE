import { Box, Typography } from "@mui/material";
import React from "react";
import { GREY_COLOR } from "../Constants";

const HeadingAndDescription = ({heading,description}) => {
  return (
    <Box mb={5}>
        <Typography mb={1} sx={{isolation:"isolate"}} position="relative" className="paytone heading_underline" color="white" fontSize="2.5rem">
            {heading}
        </Typography>
        <Typography color={GREY_COLOR} className="mulish" variant="body1">
        {description}
        </Typography>
    </Box>
  );
};

export default HeadingAndDescription;
