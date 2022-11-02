
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const { user } = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = user;
        
        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    // The email of the user's account used.

    // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorMessage
        }
        
    }
};


export const registerUserWithEmailPassword = async({ email, password, displayName}) => {
    try {

        const { user } = await createUserWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL } = user;
       
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        
        
    } catch (error) {

        
        return{
            ok: false,
            errorMessage: error.message
        }
    }
};


export const loginWithEmailPassword = async({ email, password }) => {
    
    try {
    
        
        const { user } = await signInWithEmailAndPassword( FirebaseAuth, email, password );

        const { uid, photoURL, displayName } = user;

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        
    } catch (error) {
        return{
            ok: false,
            errorMessage: error.message
        }
    }
    
};



export const logoutFirebase = async() => {
   return await FirebaseAuth.signOut();
};

