import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => {
    test('Debe regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        // console.log(state);

        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('Debe realizar la autenticación', () => {
        // console.log(login(demoUser));

        const state = authSlice.reducer(initialState, login(demoUser));
        // console.log(state);

        expect(state).toEqual({
            status: 'authenticated', 
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('Debe realizar el logout sin argumentos', () => {
        // console.log(logout(demoUser));

        const state = authSlice.reducer(authenticatedState, logout());
        // console.log(state);

        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Debe realizar el logout y mostrar un mensaje de error', () => {
        // console.log(logout(demoUser));
        const errorMessage = 'Credenciales incorrectas';

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        // console.log(state);

        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking');
    });
});