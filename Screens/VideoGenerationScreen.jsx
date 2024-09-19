import React from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";

const VideoGenerationScreen = () => {

  async function handleVideoGeneration(){


  }


  // r8_MAvewTwWFfEmX2252KIISa7XnPgl09h1JTySI

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

// 43f6c888d0msh22f217c42dcee8dp176c01jsn1fcf3145a75f
