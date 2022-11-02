import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const deleteTestDocs = async( uid = '' ) => {
    const collectionRef = collection ( FirebaseDB, `${ uid }/journal/notes` ) ;
    const docs = await getDocs( collectionRef )

    const deletePromises = [];
    docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
    
    await Promise.all( deletePromises );
    
};