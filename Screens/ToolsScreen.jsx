import React from "react";
import HeadingAndDescription from "../Components/HeadingAndDescription";
import { Container, Grid2 as Grid, Typography } from "@mui/material";
import SingleCard from "../Components/SingleCard";

const ToolsScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: 10 }} component="section">
      <HeadingAndDescription
        heading={"Popular AI Tools"}
        description={
          "Discover the Best AI Tools Making Your Life Easier and More Efficient."
        }
      />
      <Grid container spacing={2}>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
        <Grid size={{ lg: 4,md:6,xs:12 }}>
          <SingleCard/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolsScreen;
