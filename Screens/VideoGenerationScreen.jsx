import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import { Player } from "video-react";

const VideoGenerationScreen = () => {
  const [prompt, setprompt] = useState("");

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  async function handleVideoGeneration() {
    let raw = JSON.stringify({
      key: import.meta.env.VITE_SECRET_VIDEO_GENERATION_KEY,
      model_id: "zeroscope",
      prompt: "A cat riding on a bike",
      negative_prompt: "low quality",
      height: 320,
      width: 500,
      num_frames: 16,
      num_inference_steps: 20,
      guidance_scale: 7,
      upscale_height: 640,
      upscale_width: 1024,
      upscale_strength: 0.6,
      upscale_guidance_scale: 12,
      upscale_num_inference_steps: 20,
      output_type: "gif",
      webhook: null,
      track_id: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const request = await fetch(
        "https://modelslab.com/api/v6/video/text2video",
        requestOptions
      );
      const response = await request.json();
      setTimeout(() => {
        console.log(response.future_links[0])
      },response.eta * 1000)
    } catch (e) {
      console.log(e);
    }
  }

  return (
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
        value={prompt}
        setvalue={setprompt}
        handleImageGeneration={handleVideoGeneration}
        placeholder={
          "Fierce warrior in futuristic armor, standing tall under a stormy sky."
        }
      />
      {/* <Player
        playsInline
        poster={Image}
        fluid
        autoPlay={true}
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      /> */}
    </ReusableScreenContainer>
  );
};

export default VideoGenerationScreen;
