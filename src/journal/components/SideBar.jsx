import PropTypes from 'prop-types'
import { Box, Divider, Drawer,  List, Toolbar, Typography } from "@mui/material"

import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem';

export const SideBar = ({drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );


  return (
    <Box
        componet='nav'
        sx={{width: { sm: drawerWidth }, flexShrink: { sm: 0}}}
     
    >
        <Drawer
            variant="permanent" //temporary
            open
            sx={{ 
                display: { xs: 'block' },
                 '& .MuiDrawer-paper' : { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#e3e3e3'},
            }}
        >
            <Toolbar sx={{backgroundColor: '#e3e3e3'}}>
                <Typography variant="h6" noWrap component="div">
                    { displayName ?? 'Anonimo'}
                </Typography>
            </Toolbar>
            <Divider/>
            <List sx={{ backgroundColor: '#e3e3e3'}}>
                {
                    notes.map(note => (
                       <SideBarItem key={ note.id } {...note} />

                    ))
                }
            </List>

        </Drawer>
    </Box>
  )
}


SideBar.propTypes = {
    drawerWidth: PropTypes.number.isRequired
}