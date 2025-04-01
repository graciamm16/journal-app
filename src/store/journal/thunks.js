import {doc, deleteDoc, setDoc, collection} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setPhotoToActiveNote, setSaving, updateNote} from './journalSlice';
import { fileUpload } from '../../helpers';


export const startNewNote = () => {
    return async(dispatch, getState) => {
        // console.log('startNewNote');

        dispatch(savingNewNote());

        //uid
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        // console.log({newDoc, setDocResp});

        newNote.id = newDoc.id;

        //dispatch(newNote)
        dispatch(addNewEmptyNote(newNote));
        //dispatch(activarNote)
        dispatch(setActiveNote(newNote));
    };
};

export const startSaveNote = () => {    
    return async(dispatch, getState) => {
        dispatch(setSaving());
        
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteToFireStore = {...note};
        // console.log(noteToFireStore);
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        
        // await fileUpload(files[0]);

        const fileUploadPromises = [];

        for(const file of files){
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        // console.log(photosUrls);

        dispatch(setPhotoToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); //Refencia al documento apuntándolo como si quisiéramos hacer una actualización
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}