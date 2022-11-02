import PropTypes from 'prop-types'
import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({children, title = ''}) => {
  return (
    <Grid 
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid item
        className="box-shadow animate__animated animate__zoomIn animate__faster"
        xs={ 3 }
        sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, width: { sm: 450 }}}
      >
          <Typography variant="h5" sx={{mb:1}}>{ title }</Typography>

            { children }
        
        </Grid>
    </Grid>
  )
}

AuthLayout.propTypes = {
    title: PropTypes.string.isRequired
}
