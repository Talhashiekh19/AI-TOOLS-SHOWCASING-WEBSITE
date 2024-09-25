import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import { SelectButton } from "../Components/CustomButtons";
import { Container, Grid2 as Grid } from "@mui/material";
import {
  GridContainer,
  ImageGrid,
  SkeletonLoader,
  IMAGES_SIZE,
  IMAGE_HEIGHT,
} from "./ImageGenerationScreen";

const NUMBER_OF_MOCKUPS = 9;

export default function MockupGeneratorScreen() {
  const [mockups, setmockups] = useState([]);
  const [loaded, setloaded] = useState(false);

  const ARRAY = Array(NUMBER_OF_MOCKUPS)
    .fill(null)
    .map((_, i) => i);

  async function handleGenerateMockups() {
    setloaded(true);
    const url = "https://api.mockuuups.studio/v1/mockups";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_SECRET_MOCKUP_GENERATION_KEY
        }`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const shuffledMockups = data.mockups.sort(() => 0.5 - Math.random());
      const mckups = shuffledMockups.slice(0, NUMBER_OF_MOCKUPS);
      setloaded(false);
      setmockups(mckups);
    } catch (error) {
      console.error(error);
      setloaded(false);
    }
  }

  return (
    <ReusableScreenContainer>
      <HeadingAndDesc
        heading={
          <p>
            AI
            <span className="colorfull_text"> Mockups Generator </span>
          </p>
        }
        description="Effortlessly generate stunning mockups with just one click using HiSkyMock"
      />
      <SelectButton onClick={handleGenerateMockups} text="Generate Mockups" />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <GridContainer>
          {!loaded ? (
            <>
              {mockups?.map(({ thumbnail, id }) => {
                return (
                  <ImageGrid
                    width={IMAGE_HEIGHT}
                    size={IMAGES_SIZE}
                    height={IMAGE_HEIGHT}
                    key={id}
                    image={thumbnail}
                  />
                );
              })}
            </>
          ) : (
            <>
              {ARRAY.map((key) => (
                <SkeletonLoader
                  size={IMAGES_SIZE}
                  height={IMAGE_HEIGHT}
                  key={key}
                />
              ))}
            </>
          )}
        </GridContainer>
      </Container>
    </ReusableScreenContainer>
  );
}
