import React, { useState, useRef, useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import ReactPlayer from "react-player";
import {
  ConvertButton,
  DownloadButton,
  SelectButton,
} from "../Components/CustomButtons";
import { handleImageDownload } from "./ImageGenerationScreen";

const VideoGenerationScreen = () => {
  const [value, setvalue] = useState("");
  const [video, setvideo] = useState("");
  const [loading, setloading] = useState(false);
  const [url, seturl] = useState("");
  const [showvideobox, setshowvideobox] = useState(false);
  const [showbuttons, setshowbuttons] = useState({
    showdwnld: false,
    shwslct: true,
    showcnvrt: false,
  });

  const { showdwnld, shwslct, showcnvrt } = showbuttons;


  function wait(time) {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, time);
    });
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let textRaw = JSON.stringify({
    key: import.meta.env.VITE_SECRET_VIDEO_GENERATION_KEY,
    model_id: "zeroscope",
    prompt: value,
    negative_prompt: "high quality",
    height: 240, // Lower resolution
    width: 320, // Lower resolution
    num_frames: 8, // Fewer frames
    num_inference_steps: 15, // Reduce inference steps
    guidance_scale: 5, // Lower scale
    upscale_height: 640,
    upscale_width: 1024,
    upscale_strength: 0.6,
    upscale_guidance_scale: 12,
    upscale_num_inference_steps: 20,
    output_type: "mp4",
    webhook: null,
    track_id: null,
  });

  let imageRaw = JSON.stringify({
    key: import.meta.env.VITE_SECRET_VIDEO_GENERATION_KEY,
    model_id: "svd",
    init_image: url,
    height: 512,
    width: 512,
    num_frames: 25,
    num_inference_steps: 20,
    min_guidance_scale: 1,
    max_guidance_scale: 3,
    motion_bucket_id: 200,
    noise_aug_strength: 0.02,
    webhook: null,
    track_id: null,
    output_type: "mp4",
  });

  async function fetchvideo(API, rqoptins) {
    // response.fetch_result
    const videoCheck = await fetch(API, rqoptins);
    const videoResponse = await videoCheck.json();

    return videoResponse;
  }

  async function handleVideoGeneration(isTextToVideo) {
    try {
      setshowvideobox(true);
      setloading(true);
      setshowbuttons((p) => ({ ...p, shwslct: false, showcnvrt: false }));

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: isTextToVideo ? textRaw : imageRaw,
        redirect: "follow",
      };

      const request = await fetch(
        `https://modelslab.com/api/v6/video/${
          isTextToVideo ? "text2video" : "img2video"
        }`,
        requestOptions
      );
      const response = await request.json();
      console.log(response);
      await wait(response.eta * 1000);
      let finalResponse = await fetchvideo(
        response.fetch_result,
        requestOptions
      );
      console.log(finalResponse);
      while (finalResponse.status === "processing") {
        console.log("Processed once");
        finalResponse = await fetchvideo(response.fetch_result, requestOptions);
        console.log("Processing again");
      }
      if (finalResponse.status === "success") {
        console.log(finalResponse.output[0]);
        setvideo(finalResponse.output[0]);
      }

      setloading(false);
      setshowbuttons((p) => ({ ...p, showdwnld: true }));
      isTextToVideo ? setvalue("") : seturl("");
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }

  function handleSelectFiles() {
    const imageURL = prompt("Enter the URL of image : ");
    seturl(imageURL);
    setshowbuttons((p) => ({ ...p, showcnvrt: true }));
  }

  return (
    <>
      <ReusableScreenContainer>
        <HeadingAndDesc
          heading={
            <p>
              Text to <span className="colorfull_text">Video generation</span>
            </p>
          }
          description="Create captivating videos from your ideas with our cutting-edge AI video generation tool!"
        />
        <ImagePromptInputAndButton
          value={value}
          setvalue={setvalue}
          handleImageGeneration={() => handleVideoGeneration(true)}
          placeholder={
            "Fierce warrior in futuristic armor, standing tall under a stormy sky."
          }
        />
        {url === "" ? (
          <>
            {shwslct && (
              <Typography
                color="white"
                variant="h4"
                my={3}
                textAlign="center"
                className="poppins"
              >
                OR
              </Typography>
            )}
            {shwslct && (
              <SelectButton text="Select Image" onClick={handleSelectFiles} />
            )}
          </>
        ) : (
          <>
         {showcnvrt &&<Box bgcolor="red" width="30%" height={300}>
            <img
              src={url}
              alt="Loading..."
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>}
          </>
        )}
        {showvideobox && (
          <Box width="80%" height={500}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ bgcolor: "grey" }}
                width={"100%"}
                height={"100%"}
              />
            ) : (
              <>
                <ReactPlayer
                  key={video}
                  width={"100%"}
                  height="100%"
                  controls
                  url={video}
                  loop
                />
              </>
            )}
          </Box>
        )}
        {showcnvrt && (
          <ConvertButton
            text="Convert to video"
            handleConversion={() => handleVideoGeneration(false)}
            loaded={loading}
          />
        )}
        {showdwnld && (
          <DownloadButton
            text={"Download Video"}
            handleDownload={() => handleImageDownload(video)}
          />
        )}
      </ReusableScreenContainer>
    </>
  );
};

export default VideoGenerationScreen;
