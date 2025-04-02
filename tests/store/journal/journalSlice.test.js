import { journalSlice } from "../../../src/store/journal/journalSlice";
import { initialState } from "../../fixtures/authFixtures";

describe('Pruebas en journalSlice', () => {
    test('Debe regresar el estado inicial y llamarse "journal"', () => {
        const state = journalSlice.reducer(initialState, {});
        // console.log(state);

        expect(journalSlice.name).toBe('journal');
        expect(state).toEqual(initialState);
    });
});