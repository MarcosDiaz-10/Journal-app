import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;


export const JournalLayout = ({children}) => {
  return (
    <Box className="animate__animated animate__fadeIn animate__faster" sx={{display: 'flex', backgroundColor: '#e3e3e3'}} >
        {/* Navbar drawerWidth */}
        <NavBar drawerWidth={ drawerWidth }/>
        {/* Sidebar drawerWidth */}
        <SideBar drawerWidth={ drawerWidth }/>
        <Box 
            component="main"
            sx={{ flexGrow: 1, p: 3, backgroundColor: '#e3e3e3'}}
        >
            <Toolbar></Toolbar>

            {children}
        </Box>

    </Box>
  )
}