import { useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles";


export default function useResponsivness(upordown,breakpoint){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints[upordown](breakpoint));

    return matches;
}