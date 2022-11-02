import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/stroe/journal";
import { note, noteEmpty, notes, stateWithNotes,initialState, stateWithNotesAndActiveNote } from "../../fixtures/journalFixtures";

describe('Pruebas en journalSlices', () => { 

    test('Debe de regresar el estado inicial y llamarse journal', () => { 

        const state = journalSlice.reducer( initialState, {});
        const { name } = journalSlice;
        
        expect( state ).toEqual( initialState );
        expect( name ).toBe('journal');
        
     });


    test('Debe de establecer isSaving en true con una nueva nota', () => { 

        const state = journalSlice.reducer( initialState, savingNewNote());
        
        expect( state.isSaving ).toBeTruthy()
        
        
     });

    test('Debe de añadir una nueva nota vacía, establecer el isSaving en false', () => { 

        const { notes, isSaving} = journalSlice.reducer( stateWithNotes, addNewEmptyNote(noteEmpty));

        
        expect( notes ).toContain( noteEmpty );
        expect( isSaving ).toBeFalsy();

     });

    test('Debe colocar una nota en active', () => { 

        const { active } = journalSlice.reducer( stateWithNotes, setActiveNote( stateWithNotes.notes[0]));
        
        
        expect( active ).toEqual(stateWithNotes.notes[0]);
        

     });

    test('Debe de añadir las notas', () => { 

        const { notes: notesState} = journalSlice.reducer( initialState, setNotes( notes ));

        expect( notesState ).toHaveLength(notes.length)
        


      });

    test('Debe de establecer el isSaving en true y limpiar el messageSaved', () => { 


        const { isSaving, messageSaved} = journalSlice.reducer( initialState, setSaving( notes ));

        expect( isSaving ).toBeTruthy();
        expect( messageSaved ).toBe('');
        


      });

    test('Debe de actualizar la nota, poner el isSaving en false y devolver un mensaje de guardado', () => { 

        const newNote = {
            id: '456DEF',
            title: 'Prueba 1',
            body: 'Esto es una prueba',
            date: 'fecha',
            imageUrls: ['https://prueba.png']
        }

        const { isSaving, notes, messageSaved } = journalSlice.reducer( stateWithNotes, updateNote( newNote ));

        expect( isSaving).toBeFalsy();
        expect( notes ).toContain( newNote );
        expect( messageSaved ).toBe(`${newNote.title}, actualizada correctamente`);

     }) 

    test('Debe de añadir una url de una foto a una nota activa', () => { 


        const { active } = journalSlice.reducer( stateWithNotesAndActiveNote, setPhotosToActiveNote( note.imageUrls ));
        

        expect( active.imageUrls ).toContain(note.imageUrls[0])

     }) 


    test('Debe de dejar el estado en su forma inicial', () => { 


        const state = journalSlice.reducer( stateWithNotesAndActiveNote, clearNotesLogout());
        

        expect( state ).toEqual(initialState)

     }) 

    test('Debe de eliminar una nota por id', () => { 


        const {active, notes} = journalSlice.reducer( stateWithNotesAndActiveNote, deleteNoteById( stateWithNotesAndActiveNote.active.id));
        
        expect( active ).toBe(null)
        expect( notes ).not.toContain( stateWithNotesAndActiveNote.notes[0])

     }) 




 })