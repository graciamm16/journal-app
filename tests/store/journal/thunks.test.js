import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";
import { FirebaseDB } from "../../../src/firebase/config";


describe('Pruebas en Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    
    test('startNewNote debe crear una nueva nota en blanco', async() => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: {uid: uid}});

        await startNewNote()(dispatch, getState); 

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));

        // Función para borrar las notes de firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        // console.log(docs);

        // Almacenar las promesas para borrar docs del array.
        const deletePromises = [];
        // Añadir promesas en el array 
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        // Ejecutar todas las promesas
        await Promise.all(deletePromises);
    });

    // test('startSaveNote debe llamar setSaving, setDoc y updateNote', async() => {
    //     await startSaveNote()(dispatch, getState);

    //     expect(dispatch).toHaveBeenCalledWith(setSaving());
    //     expect(doc).toHaveBeenCalledWith(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    //     expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
    //         title: '',
    //         body: ''
    //     }, {merge: true});
    //     expect(dispatch).toHaveBeenCalledWith(updateNote({
    //         id: '',
    //         title: '',
    //         body: ''
    //     }));
    // });
});