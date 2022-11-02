import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#6666cc'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        },
        buttonfloating: {
            main:'#443399' 
        }
    }
})

