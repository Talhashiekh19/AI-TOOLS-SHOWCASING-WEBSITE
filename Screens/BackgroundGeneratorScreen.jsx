import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LINK_UNDERLINE_COLOR } from "../Constants";
import axios from "axios";
import FormData from "form-data";

const BackgroundGeneratorScreen = () => {
  const [value, setvalue] = useState("");

  const payload = {
    prompt: value,
    output_format: "webp",
  };

  async function handleImageGeneration() {
    try {


     
    } catch (error) {
      console.log(error);
    }
  }


//   https://platform.openai.com/settings/profile?tab=api-keys

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// https://platform.openai.com/docs/guides/images/usage

// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [],
//   temperature: 1,
//   max_tokens: 2048,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
//   response_format: {
//     "type": "text"
//   },
// });

  return (
    <Box
      bgcolor="red"
      height="100vh"
      className="generated_bg_box"
      style={{
        background:
          "url(https://images.unsplash.com/photo-1673297180075-411992cad941?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww) center/cover no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReusableScreenContainer>
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
        <Box
          display="flex"
          position="relative"
          width="80%"
          justifyContent={"space-between"}
        >
          <TextField
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            id="outlined-basic"
            placeholder="Write prompt of background you want to generate"
            fullWidth
            sx={{ border: "1px solid white", borderRadius: 10 }}
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
      </ReusableScreenContainer>
    </Box>
  );
};

export default BackgroundGeneratorScreen;
