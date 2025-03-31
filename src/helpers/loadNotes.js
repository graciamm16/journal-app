import { FirebaseDB } from "../firebase/config";
import {collection, getDocs} from 'firebase/firestore/lite';

export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error ('El UID del usuario no existe');

    //Accede a una colección específica de notas en la base de datos de Firestores y obtiene sus documentos.
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    
    const notes = [];
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()});
    });
    return notes;
}