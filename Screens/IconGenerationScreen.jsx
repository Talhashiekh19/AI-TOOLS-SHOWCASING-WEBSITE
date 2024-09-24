import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";

const IconGenerationScreen = () => {
  const [prompt, setprompt] = useState("");

  async function handleIconGeneration() {

  }

  return (
    <ReusableScreenContainer>
      <HeadingAndDesc
        heading={
          <p>
            Text to
            <span className="colorfull_text"> Icon Generation </span>
          </p>
        }
        description="Create unique icons instantly with HiSkyIcons, your go-to icon generation tool."
      />
      <ImagePromptInputAndButton
        value={prompt}
        setvalue={setprompt}
        handleImageGeneration={handleIconGeneration}
        placeholder={
          "Fierce warrior in futuristic armor, standing tall under a stormy sky."
        }
      />
    </ReusableScreenContainer>
  );
};

export default IconGenerationScreen;
