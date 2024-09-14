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
import CHatGptImage from "/Chatgpt.webp";
import { useNavigate } from "react-router-dom";

const SingleCard = ({name,description,path,image}) => {

  const navigate = useNavigate()

  return (
    <Card className="card">
      <CardActionArea onClick={() => navigate(path)}>
        <CardMedia
          component="img"
          height="200"
          sx={{borderRadius:"18px"}}
          image="https://findmyaitool-rh.s3.ap-southeast-2.amazonaws.com/images/ai-tool/web-thumbnail/Apple%20Books-1723795200803"
          alt="green iguana"
        />
        <CardContent sx={{ display: "flex", px: 0, gap: 2 }}>
          <Box>
            <img src={image} alt="Loading..." width={40} height={40} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              color="white"
              component="div"
              className="poppins"
              fontWeight="bold"
            >
              {name}
            </Typography>
            <Typography
              mb={-2}
              className="mulish"
              variant="body2"
              color={GREY_COLOR}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SingleCard;
