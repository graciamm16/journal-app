import { Notes } from "@mui/icons-material";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { loadNotes } from "../../helpers/loadNotes";
import { setNotes } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
       
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({email, password, displayName});
        // console.log(result);

        if(!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({email, password});
        console.log(result);

        if(!result.ok) return dispatch(logout(result));
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(logout({}));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        if(!uid) throw new Error('El UID no existe');
        // console.log({uid});

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}