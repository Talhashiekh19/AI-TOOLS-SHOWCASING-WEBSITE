import { Container, Grid2 as Grid } from "@mui/material";
import React from "react";
import CategoryCard from "../Components/CategoryCard";
import { CATEGORIES, pages } from "../Constants";
import { HomePageHeadingAndDescription } from "../Helpers";

const Categories = () => {
  return (
    <Container id={pages[1]} maxWidth="lg" sx={{ pb: 10 }} component="section">
      <HomePageHeadingAndDescription
        heading={"AI Tool Categories"}
        description={
          "Unlock innovation with our diverse range of cutting-edge solutions"
        }
      />
      <Grid container spacing={2}>
        {CATEGORIES.map(({ name, description, image, key }) => (
          <Grid key={key} size={{ lg: 4, md: 6, xs: 12 }}>
            <CategoryCard
              name={name}
              description={description}
              image={image}
              navigateTo={"Categories"}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
