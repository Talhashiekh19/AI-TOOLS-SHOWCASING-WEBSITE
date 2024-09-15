import { Button, Typography } from "@mui/material";
import React from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { useResponsivness } from "../Helpers";
import { LINK_UNDERLINE_COLOR } from "../Constants";
import Loader from "./Loader";
import {
    CloudUpload as CloudUploadIcon,
  } from "@mui/icons-material";
import { useRouteLoaderData } from "react-router-dom";

export const DownloadButton = ({ handleDownload, text }) => {
  return (
    <Button
      onClick={handleDownload}
      startIcon={<DownloadIcon style={{ fontSize: 30, marginRight: 5 }} />}
      variant="contained"
      color="error"
      sx={{ p: 2,px:4, mt: 1 }}
    >
      <Typography className="poppins" variant="h5" textTransform="capitalize">
        {text}
      </Typography>
    </Button>
  );
};

export const SelectButton = ({ onClick, text }) => {
  const checkingSMDown = useResponsivness("down", "sm");
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        py: 3,
        px: checkingSMDown ? 2 : 5,
        borderRadius: 5,
        bgcolor: LINK_UNDERLINE_COLOR,
      }}
    >
      <Typography
        color="white"
        className="poppins"
        textTransform="capitalize"
        variant={checkingSMDown ? "h6" : "h5"}
      >
        {text}
      </Typography>
    </Button>
  );
};

export const ConvertButton = ({ handleConversion, loaded,text }) => (
  <Button
    startIcon={
      loaded ? null : (
        <CloudUploadIcon style={{ fontSize: 30, marginRight: 5 }} />
      )
    }
    onClick={handleConversion}
    variant="contained"
    color="error"
    sx={{ p: 2,px:4, mt: 1 }}
  >
      <Typography className="poppins" variant="h5" textTransform="capitalize">
        {text}
      </Typography>
  </Button>
);
