import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import { Player } from "video-react";

const VideoGenerationScreen = () => {

  const [prompt,setprompt] = useState("");

  async function handleVideoGeneration(){


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
          fluid
          autoPlay={true}
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        /> */}
    </ReusableScreenContainer>
  );
};

export default VideoGenerationScreen;

