import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { chekingCredencials, login, logout } from "./authSlices";

export const chekingAuthentication = (  ) => {
    return async( dispatch ) => {
        dispatch( chekingCredencials() )
    }
};


export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( chekingCredencials());

        const { ok, uid, photoURL, email, displayName,errorMessage } = await singInWithGoogle();
        

        if( !ok ) return dispatch( logout( { errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL}));
    }
};


export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
   return async( dispatch ) => {
    dispatch( chekingCredencials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( {email, password, displayName});

    if( !ok ) return dispatch( logout( { errorMessage } ));
    
    dispatch( login({ uid, displayName, email, photoURL}));
    

   }
};


export const startLoginWithEmailPassword = ( { email, password }) => {
    return async( dispatch ) => {
       
       dispatch( chekingCredencials() );     

        const { ok, uid, photoURL, displayName,errorMessage } = await loginWithEmailPassword({ email, password});

       if( !ok ) return dispatch( logout( { errorMessage }));

       dispatch( login({ uid, displayName, email, photoURL}));

    }
};


export const startLogout = () => {
   return async( dispatch ) => {

    await logoutFirebase();
    dispatch( clearNotesLogout() );

    dispatch( logout() );

   } 
};