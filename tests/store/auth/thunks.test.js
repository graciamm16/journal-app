import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers');

describe('Pruebas en thunks', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe invocar el checkingCredentials', async() => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe llamar checkingCredentials y login -> Éxito', async() => {
        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe llamar checkingCredentials y logout -> Error', async() => {
        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startCreatingUserWithEmailPassword debe llamar a checkingCredentials y login -> Éxito', async() => {
        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startCreatingUserWithEmailPassword debe llamar a checkingCredentials y logout -> Error', async() => {
        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailAndPassword debe llamar checkingCredentials y login -> Éxito', async() => {
        const loginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLoginWithEmailAndPassword debe llamar checkingCredentials y logout -> Error', async() => {
        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        const formData = {email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });
});