import { Container, Grid2 as Grid } from "@mui/material";
import React from "react";
import HeadingAndDescription from "../Components/HeadingAndDescription";
import CategoryCard from "../Components/CategoryCard";
import { CATEGORIES } from "../Constants";

const Categories = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: 10 }} component="section">
      <HeadingAndDescription
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
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
