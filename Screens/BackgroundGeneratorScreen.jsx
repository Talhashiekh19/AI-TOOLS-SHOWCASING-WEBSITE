import React, { useRef, useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LINK_UNDERLINE_COLOR } from "../Constants";
import Loader from "../Components/Loader";
import { DownloadButton } from "../Components/CustomButtons";

const BackgroundGeneratorScreen = () => {
  const [value, setvalue] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [loaded, setloaded] = useState(false);
  const [showdownload, setshowdownload] = useState(false);
  const [showbox, setshowbox] = useState(false);
  const downloadButtonRef = useRef(null);

  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_SECRET_TEXT_TO_IMAGE_KEY
            }`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageGeneration() {
    try {
      setshowbox(true)
      setloaded(true);
      const image = await query({ inputs: value });
      setloaded(false);
      const filereader = new FileReader();
      filereader.onload = function () {
        setimageurl(filereader.result);
      };
      filereader.readAsDataURL(image);
      setvalue("");
      setshowdownload(true);
    } catch (error) {
      console.log(error);
      setshowdownload(false);
    }
  }

  function handleDownload() {
    downloadButtonRef?.current?.click();
    setimageurl("");
    setloaded(false);
    setvalue("");
    setshowdownload(false);
    setshowbox(false)
  }

  return (
    <ReusableScreenContainer>
      <a
        href={imageurl !== "" ? imageurl : ""}
        ref={downloadButtonRef}
        download
      ></a>
      <Typography
        textAlign="center"
        className="paytone"
        variant="h4"
        color="white"
      >
        AI Background
        <span className="colorfull_text"> Generation </span>
      </Typography>
      <Typography
        textAlign="center"
        className="mulish"
        variant="h6"
        color="white"
      >
        Elevate your designs with AI-powered background generation
      </Typography>
      <Box position="relative" width="80%" mt={3}>
        <TextField
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          id="outlined-basic"
          placeholder="Background image of vibrant colors and fluid shapes, creating a dynamic and eye-catching design."
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
          onClick={handleImageGeneration}
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
     {showbox && <Box
        width="80%"
        height={500}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        my={5}
      >
        <>
          {!loaded ? (
            <>
              {imageurl !== "" && (
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={imageurl}
                  alt="Loading..."
                />
              )}
            </>
          ) : (
            <Loader />
          )}
          {showdownload && (
            <DownloadButton
              handleDownload={handleDownload}
              text="Download Image"
            />
          )}
        </>
      </Box>}
    </ReusableScreenContainer>
  );
};

export default BackgroundGeneratorScreen;
