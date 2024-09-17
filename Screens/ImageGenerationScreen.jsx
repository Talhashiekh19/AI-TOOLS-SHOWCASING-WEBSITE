import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import { Typography, Grid2 as Grid, Container, Box, Skeleton } from "@mui/material";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import { query } from "./BackgroundGeneratorScreen";
import generatedimg1 from "/generated-img-1.jpg";
import generatedimg2 from "/generated-img-2.jpg";
import generatedimg3 from "/generated-img-3.jpg";
import generatedimg4 from "/generated-img-4.jpg";
import generatedimg5 from "/generated-img-5.jpg";
import generatedimg6 from "/generated-img-6.jpg";
import { GREY_COLOR } from "../Constants";

const defaultImagesArray = [
    {
        url:generatedimg1,
        key:1
    },
    {
        url:generatedimg2,
        key:2
    },
    {
        url:generatedimg3,
        key:3
    },
    {
        url:generatedimg4,
        key:4
    },
    {
        url:generatedimg5,
        key:5
    },
    {
        url:generatedimg6,
        key:6
    },
]

const ImageGenerationScreen = () => {
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);
  const [imageurls, setimageurls] = useState(defaultImagesArray);

  const NUMBER_OF_IMAGES = 6;

  async function handleImageGeneration() {
    try {
        setimageurls([]);
        setloading(true)
      const imagePromises = Array(NUMBER_OF_IMAGES)
        .fill(null)
        .map(async () => {
          const image = await query({ inputs: prompt });
          return image;
        });
      const images = await Promise.all(imagePromises);
      setloading(false)

      const newImageUrls = [];

      let count = 1;

      images.forEach((image) => {
        const filereader = new FileReader();
        filereader.onload = function () {
          let imageObject = {
            url: filereader.result,
            key: count++,
          };
          newImageUrls.push(imageObject);
        };
        filereader.readAsDataURL(image);
      });

      setprompt("");
      setimageurls(newImageUrls);
      console.log(newImageUrls)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <ReusableScreenContainer>
        <Typography
          textAlign="center"
          className="paytone"
          variant="h4"
          color="white"
        >
          AI Image
          <span className="colorfull_text"> Generation </span>
        </Typography>
        <Typography
          textAlign="center"
          className="mulish"
          variant="h6"
          color="white"
        >
          Unleash Creativity with AI-Powered Image Generation
        </Typography>
        <ImagePromptInputAndButton
          value={prompt}
          setvalue={setprompt}
          handleImageGeneration={handleImageGeneration}
        />
      </ReusableScreenContainer>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          container
          spacing={4}
        >
          {imageurls.length > 0 && imageurls.map(({ url, key }) => {
            return (
              <Grid
                key={key}
                sx={{ bgcolor: GREY_COLOR }}
                size={{ xs: 10, md: 5, lg: 4 }}
              >
                {/* <Box height={400} bgcolor={"grey"}>
                  <img
                    src={url}
                    alt="Loading..."
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box> */}
                
                
                <Skeleton animation="wave" variant="rectangular" width={400} height={400} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ImageGenerationScreen;
