import { deleteTestDocs } from "../../../src/helper/deleteTestDocs";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/stroe/journal/journalSlices";
import { startNewNote } from "../../../src/stroe/journal/thunks";
import { noteEmpty } from "../../fixtures/journalFixtures";

describe('Pruebas en journalThunks', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    jest.setTimeout(10000)
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
     })


 })