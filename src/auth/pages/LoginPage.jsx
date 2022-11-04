import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom'
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../stroe/auth';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';


const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
};



export const LoginPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth ); 
  
  const { email, password, onInputChange, onResetForm, formState, emailValid, passwordValid, isFormValid } = useForm({ email: '', password: ''}, formValidations) //{ email: 'marcosdiaz@gmail.com', password: '123456'}

  const isAuthenticating = useMemo( () => status === 'checking', [status] )


  const onSubmit = ( e ) => {
    e.preventDefault();
    
    
    

    if( !isFormValid ) return;
    dispatch( startLoginWithEmailPassword( {email, password} ) )


  }

  const onGoogleSignIn = () => {
      
      dispatch( startGoogleSignIn())
      
  }

  return (
    
    <AuthLayout title='Login'>
       <form onSubmit={ onSubmit } aria-label="submit-form" >
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@gmail.com"
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
                />        
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name='password'
                inputProps={{
                  'aria-label': 'password'
                }}
                value={ password }
                onChange={ onInputChange }
                />        
              </Grid>
              <Grid container spacing={ 2 } sx={{mb:2, mt: 1}}>
                  <Grid 
                      item 
                      xs={ 12 } 
                      sm={ 12 }
                      display={ !!errorMessage ? '' : 'none' }
                      >
                      <Alert severity='error'>
                        { errorMessage }
                      </Alert>
                  </Grid>

                  <Grid item xs={ 12 } sm={ 6 }>
                    <Button 
                      disabled={ isAuthenticating }
                      type="submit" 
                      variant="contained" 
                      fullWidth
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 6 }>
                    <Button 
                      aria-label="btn-google"
                      onClick={ onGoogleSignIn } 
                      variant="contained" 
                      fullWidth
                      disabled={ isAuthenticating }
                    >
                      <Google/>
                      <Typography sx={{ ml: 1 }}> Gooogle</Typography>
                    </Button>
                  </Grid>
              </Grid>

              <Grid container direction="row" justifyContent="end" >
                <Link component={ RouterLink } color="inherit" to="/auth/register">
                  Crear una cuenta
                </Link>
                
              </Grid>
            </Grid>
          </form>        
    </AuthLayout>

         
  )
}
