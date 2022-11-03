import { fileUpload } from "../../../src/helper/fileUpload";
import { deleteTestDocs } from "../../../src/helper/deleteTestDocs";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/stroe/journal/journalSlices";
import { startDeletingNote, startLoadingNotes, startNewNote, startSaveNote, startUploadingFiles } from "../../../src/stroe/journal/thunks";
import { note, noteEmpty, notesFirebase } from "../../fixtures/journalFixtures";

jest.mock('../../../src/helper/fileUpload')


describe('Pruebas en journalThunks', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    jest.setTimeout(20000)
    test('startNewNote debe de crear una nueva nota en blanco', async() => { 
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid }})

        await startNewNote()(dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            title: '',
            body: '',
            date: expect.any(Number),
            imageUrls: [],
            id: expect.any(String)
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            title: '',
            body: '',
            date: expect.any(Number),
            imageUrls: [],
            id: expect.any(String)
        }));

        //Borrar de firebase
        await deleteTestDocs( uid )
     });

     test('startLoadingNotes debe de cargar las notas existentes', async() => { 
    
            const uid = 'TEST-UID-FIJO'

            getState.mockReturnValue({ auth: { uid: uid }});

            await startLoadingNotes()(dispatch, getState);

            expect( dispatch ).toHaveBeenCalledWith( setNotes( [
                {
                    id:expect.any(String),
                    title:expect.any(String),
                    body:expect.any(String),
                    date:expect.any(Number),
                    imageUrls:expect.any(Array)  
                },
                {
                    id:expect.any(String),
                    title:expect.any(String),
                    body:expect.any(String),
                    date:expect.any(Number),
                    imageUrls:expect.any(Array)
                }
            ] ) )


      });

      test('startSaveNote debe de guardar una nueva nota con el texto del usuario', async() => { 
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }, journal: { active: note}});        

        await startSaveNote()(dispatch, getState);

        expect( dispatch ).toHaveBeenCalledWith( setSaving() );
        expect( dispatch ).toHaveBeenCalledWith( updateNote( note ) );


        //Borrar de firebase
        await deleteTestDocs( uid )
     });

     test('startUploadingFiles Debe de subir la imagen a cloudinary y guardar el arreglo de fotos', async() => { 
        
        const imageTest = 'https://res.cloudinary.com/djnblsfrb/image/upload/v1667200578/journal/dghsd8dxuo01rngxjsnm.png'
        await fileUpload.mockResolvedValue( imageTest );

        await startUploadingFiles([''])(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( setSaving() )
        expect( dispatch ).toHaveBeenCalledWith( setPhotosToActiveNote([imageTest]) )
    
      });


      test('startDeletingNote debe de eliminar una nota', async() => { 
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid }, journal: { active: note}});        

        await startDeletingNote()(dispatch, getState);


        expect( dispatch ).toHaveBeenCalledWith( deleteNoteById( note.id ) );



     });


 })