import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { GREY_COLOR } from "../Constants";
import CHatGptImage from "../public/Chatgpt.webp";

const SingleCard = () => {
  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          sx={{borderRadius:"18px"}}
          image="https://findmyaitool-rh.s3.ap-southeast-2.amazonaws.com/images/ai-tool/web-thumbnail/Apple%20Books-1723795200803"
          alt="green iguana"
        />
        <CardContent sx={{ display: "flex", px: 0, gap: 2 }}>
          <Box>
            <img src={CHatGptImage} alt="Loading..." width={40} height={40} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              color="white"
              component="div"
              className="poppins"
              fontWeight="bold"
            >
              Lizard
            </Typography>
            <Typography
              mb={-2}
              className="mulish"
              variant="body2"
              color={GREY_COLOR}
            >
              Video generator
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SingleCard;
