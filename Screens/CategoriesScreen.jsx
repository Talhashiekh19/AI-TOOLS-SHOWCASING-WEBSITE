import { Container, Box, Grid2 as Grid, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HeadingAndDescription from "../Components/HeadingAndDescription";
import { CATEGORIES } from "../Constants";
import SingleCard from "../Components/SingleCard";
import {useResponsivness} from "../Helpers";
import { useLocation } from "react-router-dom";

const CategoriesScreen = () => {
  const location = useLocation();
  const {name} = location.state || {};
  
  const checkingDownSm = useResponsivness("down","sm");
  const headings = CATEGORIES.map((c) => {
    return {
      key: c.key,
      name: c.name,
    };
  });

  const ButtonRef = useRef(null);

  useEffect(() => {
    ButtonRef?.current?.click()
  },[])

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
          <div style={{ marginTop: 20 }}>
            Streamline your search and find the best AI solutions to enhance
            your operations <br /> improve customer experiences and drive growth
          </div>
        }
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
      />
      {headings.map(({ name, key }) => {
        return (
          <Box id={name} key={key}>
            <HeadingAndDescription
             
              heading={name}
              headingVariant={"h4"}
              display="flex"
              justifyContent="center"
              width="100%"
            />
            <Grid container spacing={2}>
              <Grid size={{ lg: 4, md: 6, xs: 12 }}>
                <Box width="100%" display="flex" py={6}>
                  <SingleCard />
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
