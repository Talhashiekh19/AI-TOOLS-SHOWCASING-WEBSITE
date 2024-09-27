import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { LINK_UNDERLINE_COLOR } from "../Constants";
import { useResponsivness } from "../Helpers";

const ImagePromptInputAndButton = ({value,setvalue,handleImageGeneration,placeholder}) => {
  const checkingMd = useResponsivness("down","md");
  return (
    <Box position="relative" width={checkingMd ? "100%" : "80%"} mt={3}>
      <TextField
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        id="outlined-basic"
        placeholder={placeholder}
        fullWidth
        sx={{
          border: "1px solid white",
          borderRadius: 10,
          pr: 15,
          "& .MuiInputBase-root.Mui-focused": {
            "& > fieldset": {
              border: "none",
            },
          },
        }}
        variant="outlined"
        InputProps={{
          style: {
            color: "white",
            fontSize: 15,
            fontFamily: "poppins",
            borderRadius: 25,
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: LINK_UNDERLINE_COLOR,
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        }}
        onClick={() => {
          if(value === "") {
            alert("Please enter a prompt")
          }else {
            handleImageGeneration()
          }
        }}
      >
        <Typography
          className="poppins"
          textTransform={"capitalize"}
          variant="h6"
        >
          Generate
        </Typography>
      </Button>
    </Box>
  );
};

export default ImagePromptInputAndButton;
