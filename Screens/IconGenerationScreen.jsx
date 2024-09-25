import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import {ImageGrid,SkeletonLoader} from "./ImageGenerationScreen";
import { Grid2 as Grid, Container} from "@mui/material";
import { handleGeneration,DEFAULT_ICONS } from "../Constants";

const NUMBER_OF_ICONS = 8;
const ICON_HEIGHT = 200;

const ICONS_ARRAY = Array(NUMBER_OF_ICONS)
  .fill(null)
  .map((_, i) => i);

const ICONS_SIZE = { lg: 3, md: 4, sm: 5, xs: 8 };

 

const IconGenerationScreen = () => {
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);

  const [iconsurls, seticonsurls] = useState(DEFAULT_ICONS);

  async function handleIconGeneration() {
    setloading(true);
    await handleGeneration(NUMBER_OF_ICONS, seticonsurls, prompt);
    setprompt("");
    setloading(false);
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
          "A sleek, modern icon with smooth lines and vibrant colors, representing creativity and simplicity"
        }
      />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid
          container
          spacing={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {!loading ? (
            <>
              {iconsurls.length > 0 &&
                iconsurls.map(({ item, key }) => {
                  return (
                    <ImageGrid
                      key={key}
                      image={item}
                      width={ICON_HEIGHT}
                      height={ICON_HEIGHT}
                      size={ICONS_SIZE}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {ICONS_ARRAY.map((key) => (
                <SkeletonLoader key={key} size={ICONS_SIZE} height={ICON_HEIGHT} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </ReusableScreenContainer>
  );
};

export default IconGenerationScreen;
