import { Box, Typography } from "@mui/material";
import React from "react";
import LoppinImage from "../public/loopin.webp";
import BingImage from "../public/bing.webp";
import AdobeImage from "../public/Adobe.webp";
import MonicaImage from "../public/monica.webp";
import CHatGptImage from "../public/Chatgpt.webp";
import JasperImage from "../public/Jasper.webp";
import AIComponent from "../Components/AIComponent";
import { GREY_COLOR } from "../Constants";

const Home = () => {
  return (
    <Box component="section" bgcolor="red" py={21} className="background">
      <Box>
        <Typography className="paytone" textAlign="center" variant="h2" color="white">
          Discover <span className="colorfull_text paytone"> AI Tools </span> for Your <br /> Business!
        </Typography>
        <Typography className="mulish" mt={3} fontSize="1.2rem" textAlign="center" color={GREY_COLOR}>
        Streamline Your Workflow with Our List of AI tools. Find Your <br/> Perfect Solution.
        </Typography>
      </Box>
      <Box position={"absolute"} top={80} width="100%">
      <AIComponent width="lg" img1={LoppinImage} img2={BingImage} />
      <AIComponent width="xl" img1={AdobeImage} img2={MonicaImage} />
      <AIComponent width="lg" img1={CHatGptImage} img2={JasperImage} />
      </Box>
    </Box>
  );
};

export default Home;
