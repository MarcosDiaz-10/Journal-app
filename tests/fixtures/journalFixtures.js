export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const stateWithNotes = {
    isSaving: false,
    messageSaved: '',
    notes: [{id:'456DEF', title: 'Note de arreglo', body: 'note del state' , date:'fechaDeState', imageUrls: [] }, {id:'789DEF', title: 'Note de arreglo2', body: 'note del state2' , date:'fechaDeState2', imageUrls: [] }],
    active: null,
};

export const stateWithNotesAndActiveNote = {
    isSaving: false,
    messageSaved: '',
    notes: [{id:'456DEF', title: 'Note de arreglo', body: 'note del state' , date:'fechaDeState', imageUrls: [] }, {id:'789DEF', title: 'Note de arreglo2', body: 'note del state2' , date:'fechaDeState2', imageUrls: [] }],
    active: {id:'456DEF', title: 'Note de arreglo', body: 'note del state' , date:'fechaDeState', imageUrls: ['https://demo2.png'] },
};

export const note = {
    id: '123ABC',
    title: 'Prueba 1',
    body: 'Esto es una prueba',
    date: 'fecha',
    imageUrls: ['https://prueba.png']
};

export const notes = [{id:'4DEF', title: 'Note de arreglo', body: 'note del state' , date:'fechaDeState', imageUrls: [] }, {id:'7DEF', title: 'Note de arreglo2', body: 'note del state2' , date:'fechaDeState2', imageUrls: [] }];

export const noteEmpty = {
    id: '',
    title: '',
    body: '',
    date: 1000,
    imageUrls: []
};
    
