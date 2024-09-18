import { Container, Box, Grid2 as Grid, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HeadingAndDescription from "../Components/HeadingAndDescription";
import { CATEGORIES, TOOLS } from "../Constants";
import SingleCard from "../Components/SingleCard";
import { useResponsivness } from "../Helpers";
import { useLocation } from "react-router-dom";

const CategoriesScreen = () => {
  const location = useLocation();
  const { name } = location.state || {};

  const checkingDownSm = useResponsivness("down", "sm");

  const headings = CATEGORIES.map(category => category.cname).filter(Boolean);

  const ButtonRef = useRef(null);

  useEffect(() => {
    ButtonRef?.current?.click();
  }, []);

  return (
    <Container
      className="background"
      sx={{ pt: 20 }}
      maxWidth="lg"
      component="section"
    >
      <a ref={ButtonRef} href={`#${name}`}></a>
      <HeadingAndDescription
        heading={"AI Tools Categories"}
        headingVariant={checkingDownSm ? "h5" : "h3"}
        descVaraint={checkingDownSm ? "body2" : "body1"}
        center={true}
        description={
          <>
            Streamline your search and find the best AI solutions to enhance
            your operations <br /> improve customer experiences and drive growth
          </>
        }
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
      />
      {TOOLS.map((tool,index) => {
        const { name, description, path, icon, image, key } = tool;
        const propsObject = { name, description, path, icon, image };
        return (
          <Box
          id={headings[index]}
          key={key}
          >
            <HeadingAndDescription
              heading={headings[index]}
              headingVariant={"h4"}
              display="flex"
              justifyContent="center"
              width="100%"
            />
            <Grid container spacing={2}>
              <Grid size={{ lg: 4, md: 6, xs: 12 }}>
                <Box width="100%" display="flex" py={6}>
                  <SingleCard key={key} {...propsObject} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Container>
  );
};

export default CategoriesScreen;
