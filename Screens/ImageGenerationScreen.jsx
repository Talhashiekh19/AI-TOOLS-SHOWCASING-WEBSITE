import React, { useRef, useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import {
  Typography,
  Grid2 as Grid,
  Container,
  Box,
  Skeleton,
  IconButton,
} from "@mui/material";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import { defaultImagesArray, GREY_COLOR, handleGeneration } from "../Constants";
import { GetApp as GetAppIcon } from "@mui/icons-material";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";

export const IMAGE_HEIGHT = 300;

export const IMAGES_SIZE = { xs: 10, md: 5, lg: 4 };

const ImagesGrid = ({ children, size, ...rest }) => {
  return (
    <Grid sx={{ bgcolor: GREY_COLOR }} size={size} {...rest}>
      {children}
    </Grid>
  );
};

export const ImageGrid = ({ image, width, height, size }) => {
  const [showdwnld, setshowdwnld] = useState(false);

  return (
    <ImagesGrid
      size={size}
      onMouseOver={() => setshowdwnld(true)}
      onMouseLeave={() => setshowdwnld(false)}
    >
      <Box height={height} position="relative">
        <img
          src={image}
          alt="Loading..."
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <DownloadButton showdwnld={showdwnld} image={image} />
      </Box>
    </ImagesGrid>
  );
};

export const SkeletonLoader = ({ size, height }) => {
  return (
    <ImagesGrid size={size}>
      <Box height={height}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey" }}
          variant="rounded"
          width={"100%"}
          height={"100%"}
        />
      </Box>
    </ImagesGrid>
  );
};

const DownloadButton = ({ showdwnld, image }) => {
  if (!showdwnld) {
    return null;
  }

  async function handleImageDownload() {
    const response = await fetch(image, { mode: "cors" });
    const dwnloadurl = await response.blob();
    const blobURL = URL.createObjectURL(dwnloadurl);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobURL);
  }

  return (
    <Box position="absolute" m={1} right={0} bottom={0}>
      <IconButton
        onClick={handleImageDownload}
        sx={{
          bgcolor: "rgba(0,0,0,.5)",
          height: 50,
          width: 50,
          border: ".1px solid white",
        }}
      >
        <GetAppIcon sx={{ color: "white", fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export const GridContainer = ({ children }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      container
      spacing={4}
    >
      {children}
    </Grid>
  );
};

const ImageGenerationScreen = () => {
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);
  const [imageurls, setimageurls] = useState(defaultImagesArray);

  const NUMBER_OF_IMAGES = 6;

  const ARRAY = Array(NUMBER_OF_IMAGES)
    .fill(null)
    .map((_, i) => i);

  async function handleImageGeneration() {
    setloading(true);
    await handleGeneration(NUMBER_OF_IMAGES, setimageurls, prompt);
    setprompt("");
    setloading(false);
  }

  return (
    <>
      <ReusableScreenContainer>
        <HeadingAndDesc
          heading={
            <p>
              AI Image
              <span className="colorfull_text"> Generation </span>
            </p>
          }
          description="Unleash Creativity with AI-Powered Image Generation"
        />
        <ImagePromptInputAndButton
          value={prompt}
          setvalue={setprompt}
          handleImageGeneration={handleImageGeneration}
          placeholder={
            "Fierce warrior in futuristic armor, standing tall under a stormy sky."
          }
        />
      </ReusableScreenContainer>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <GridContainer>
          {!loading ? (
            <>
              {imageurls.length > 0 &&
                imageurls.map(({ item, key }) => {
                  return (
                    <ImageGrid
                      width={IMAGE_HEIGHT}
                      size={IMAGES_SIZE}
                      height={IMAGE_HEIGHT}
                      key={key}
                      image={item}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {ARRAY.map((key) => (
                <SkeletonLoader
                  size={IMAGES_SIZE}
                  height={IMAGE_HEIGHT}
                  key={key}
                />
              ))}
            </>
          )}
        </GridContainer>
      </Container>
    </>
  );
};

export default ImageGenerationScreen;
