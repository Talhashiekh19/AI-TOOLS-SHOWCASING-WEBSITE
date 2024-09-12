import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HeadingAndDescription from "./Components/HeadingAndDescription";

export function useResponsivness(upordown, breakpoint) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints[upordown](breakpoint));

  return matches;
}

export const HomePageHeadingAndDescription = ({ heading, description }) => {
  const matchesSm = useResponsivness("down", "sm");
  return (
    <HeadingAndDescription
      heading={heading}
      headingVariant={matchesSm ? "h5" : "h3"}
      descVaraint={matchesSm ? "body2" : "body1"}
      description={description}
    />
  );
};
