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

const VideoGenerationScreen = () => {
  const [value, setvalue] = useState("");
  const [video, setvideo] = useState("");
  const [loading, setloading] = useState(false);
  const [url, seturl] = useState("");
  const [showdownload, setshowdownload] = useState(false);
  const [showvideobox, setshowvideobox] = useState(false);
  const [showcnvrtbtn, setshowcnvrtbtn] = useState(false);

  function handleVideoDownload() {}

  function wait(time) {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, time);
    });
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
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

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  async function fetchvideo(API) {
    // response.fetch_result
    const videoCheck = await fetch(API, requestOptions);
    const videoResponse = await videoCheck.json();

    return videoResponse;
  }

  async function handleVideoGeneration() {
    setshowvideobox(true);
    setloading(true);

    try {
      const request = await fetch(
        "https://modelslab.com/api/v6/video/text2video",
        requestOptions
      );
      const response = await request.json();
      console.log(response);
      await wait(response.eta * 1000);
      let finalResponse = await fetchvideo(response.fetch_result);
      console.log(finalResponse);
      while (finalResponse.status === "processing") {
        console.log("Processed once")
        finalResponse = await fetchvideo(response.fetch_result);
        console.log("Processing again")
      }
      if (finalResponse.status === "success") {
        console.log(finalResponse.output[0])
        setvideo(finalResponse.output[0]);
      }
      setloading(false);
      setshowdownload(true);
      setvalue("");
      // processing
    } catch (e) {
      setloading(false);
      console.log(e);
    }
  }

  async function handleConvertToVideo() {
    setshowvideobox(true);
    setloading(true);
    // setshowcnvrtbtn(false)
    var raw = JSON.stringify({
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

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const request = await fetch(
        "https://modelslab.com/api/v6/video/img2video",
        requestOptions
      );
      const response = await request.json();
      await wait(response.eta * 1000);
      let finalResponse = await fetchvideo(response.fetch_result);
      console.log(finalResponse);
      while (finalResponse.status === "processing") {
        console.log("Processed once")
        finalResponse = await fetchvideo(response.fetch_result);
        console.log("Processing again")
      }
      if (finalResponse.status === "success") {
        console.log(finalResponse.output[0])
        setvideo(finalResponse.output[0]);
      }
      setloading(false);
      setshowdownload(true);
      seturl("")
    } catch (e) {
      setloading(false);
      console.log(e);
    }
  }

  function handleSelectFiles() {
    const imageURL = prompt("Enter the URL of image : ");
    seturl(imageURL);
    setshowcnvrtbtn(true);
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
          description="Transform your words into stunning videos with HiSkyVid"
        />
        <ImagePromptInputAndButton
          value={value}
          setvalue={setvalue}
          handleImageGeneration={handleVideoGeneration}
          placeholder={
            "Fierce warrior in futuristic armor, standing tall under a stormy sky."
          }
        />
        {!showdownload && !showcnvrtbtn && (
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
        {!showdownload && !showcnvrtbtn && (
          <SelectButton text="Select Image" onClick={handleSelectFiles} />
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
        {showcnvrtbtn && (
          <ConvertButton
            text="Convert to video"
            handleConversion={handleConvertToVideo}
            loaded={loading}
          />
        )}
        {showvideobox &&
          video !== "" &&
          !loading &&
          showdownload &&
          !showcnvrtbtn && (
            <DownloadButton
              text={"Download Video"}
              handleDownload={handleVideoDownload}
            />
          )}
      </ReusableScreenContainer>
    </>
  );
};

export default VideoGenerationScreen;
