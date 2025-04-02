export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    active: {
        id: 'ABC123',
        title: '',
        body: '',
        date: 1234567,
        imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    }
}

export const savingNewNote = {
    isSaving: true
}

export const addNewEmptyNote = {
    payload,
    isSaving: false
}

export const setActiveNote = {
    active: action.payload,
    messageSaved: ''
}

export const setNotes = {
    notes: action.payload
}

export const setSaving = {
    isSaving: true,
    messageSaved: ''
}

