import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import {
  GREY_COLOR,
  LINK_UNDERLINE_COLOR,
  pages,
  SOCIAL_LINKS,
} from "../Constants";
import HeadingAndDescription from "./HeadingAndDescription";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png"
import { useResponsivness } from "../Helpers";

const CustomFooterTypography = ({ text, handleNavigate }) => {
  const navigate = useNavigate();
  return (
    <Typography
      onClick={() => handleNavigate(text, navigate)}
      style={{ cursor: "pointer" }}
      sx={{
        "&:hover": {
          color: LINK_UNDERLINE_COLOR,
        },
      }}
      fontSize="1.1rem"
      color="white"
      className="mulish"
      mb={2}
    >
      {text}
    </Typography>
  );
};

const Footer = ({ handleNavigate }) => {
    const checkingSMDown = useResponsivness("down","sm");
  return (
    <Box width="100%" className="footer">
      <Container maxWidth="xl" sx={{ p: 5 }} component="section">
        <Grid container spacing={2}>
          <Grid size={{ lg: 7 }}>
            <Box sx={{mb:2}}>
          <img src={logo} height={40} alt="Loading..." />
            </Box>
            <Typography
              variant="body1"
              color={GREY_COLOR}
              className="mulish"
            >
              FindMyAITool is a website dedicated to providing a comprehensive
              list of AI tools to assist individuals and businesses in finding
              the most suitable AI tool for their specific requirements.
            </Typography>
            <Box py={3}>
              {SOCIAL_LINKS.map(({ Icon, key, link }) => {
                return (
                  <IconButton href={link} target="_blank" sx={{ mr: 2 }} key={key}>
                    {Icon}
                  </IconButton>
                );
              })}
            </Box>
          </Grid>
          <Grid
            size={{ lg: 5 }}
            sx={{ display: "flex", gap: 8, justifyContent: "flex-end",pr:3,flexDirection:checkingSMDown ? "column" : "row" }}
          >
            <Box>
              <HeadingAndDescription
                heading={"Useful Links"}
                headingVariant={"h5"}
              />
              <Box mt={-3}>
                {pages.map((link) => (
                  <CustomFooterTypography
                  key={link}
                    handleNavigate={handleNavigate}
                    text={link}
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <HeadingAndDescription
                heading={"Contact Us"}
                headingVariant={"h5"}
              />
              <Box
                mt={-3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Box>
                  <EmailIcon
                    sx={{ color: LINK_UNDERLINE_COLOR, fontSize: 25, mb: 1 }}
                  />
                </Box>
                <Box>
                  <CustomFooterTypography text={"info@hiskytechs.com"} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
