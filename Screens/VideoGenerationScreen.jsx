import React from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";

const VideoGenerationScreen = () => {
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
    </ReusableScreenContainer>
  );
};

export default VideoGenerationScreen;

