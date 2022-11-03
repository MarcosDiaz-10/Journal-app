import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helper";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlices";

export const startNewNote = () => {
   return async( dispatch, getState ) => {
       dispatch( savingNewNote() );

        const { uid } = getState().auth; 
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
   
   }
};


export const startLoadingNotes = () => {
   return async( dispatch, getState ) => {
    const { uid } = getState().auth; 
    if(!uid ) throw new Error('El uid no existe')
    
    const notes = await loadNotes( uid );

    dispatch( setNotes( notes ))

   }
};

export const startSaveNote = () => {
   return async( dispatch, getState ) => {
      dispatch( setSaving() )
      const { uid } = getState().auth; 
      const { active:note } = getState().journal;
    
      const noteToFireStore = { ...note };
      delete noteToFireStore.id;

      const refDoc = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`);

      await setDoc( refDoc, noteToFireStore, { merge: true})
      
      dispatch( updateNote(note) );
    
   }
};


export const startUploadingFiles = (files = []) => {
   return async( dispatch ) => {
      dispatch( setSaving() );

      const fileUploadPromises = [];
      
      for (const file of files) {
         fileUploadPromises.push( fileUpload(file) )
      }
      
      
      
      const photosUrls = await Promise.all( fileUploadPromises );
      
      
      dispatch(setPhotosToActiveNote( photosUrls ));
   }
};

export const startDeletingNote = () => {
   return async( dispatch, getState ) => {
      const { active:note } = getState().journal;
      const { uid } = getState().auth;

      const refDoc = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`);
      await deleteDoc( refDoc )

      dispatch( deleteNoteById(note.id))

   }
};