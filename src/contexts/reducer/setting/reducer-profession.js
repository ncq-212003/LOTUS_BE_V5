const HANDLERS_PROFESSION = {
    ADD_PROFESSION: 'ADD_PROFESSION',
    LIST_PROFESSION: 'LIST_PROFESSION',
    UPDATE_PROFESSION: 'UPDATE_PROFESSION',
    FIND_PROFESSION_BYID: 'FIND_FROFESSION_BYID'
}

const initialStateProfession = {
    profession: []
}

const handlersProfession = {
    [HANDLERS_PROFESSION.LIST_PROFESSION]: (state, action) => {
        const professionsData = action.payload;

        return {
            ...state,
            professions: professionsData,
        };
    },

    [HANDLERS_PROFESSION.ADD_PROFESSION]: (state, action) => {
        const profession = action.payload;

        return {
            ...state,
            professions: [...state, profession],
        }
    },

    [HANDLERS_PROFESSION.UPDATE_PROFESSION]: (state, action) => {
        return state;
    },

    // delete
    [HANDLERS_PROFESSION.DELETE_PROFESSION]: (state, action) => {
        return {
            professions: [],
        };
    },
}

const reducerProfession = (state, action) =>
    handlersProfession[action.type] ? handlersProfession[action.type](state, action) : state;

export { initialStateProfession, reducerProfession, HANDLERS_PROFESSION };