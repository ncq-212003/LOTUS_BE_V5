const initialStateEthnic = {
    ethnics: [],
};

const HANDLERS_ETHNIC = {
    ADD_ETHNIC: "ADD_ETHNIC",
    LIST_ETHNIC: "LIST_ETHNIC",
    DELETE_ETHNIC: "DELETE_ETHNIC",
    FIND_ETHNIC_BYID: "FIND_ETHNIC_BYID",
    UPDATE_ETHNIC: "UPDATE_ETHNIC",
};

const handlersEthnic = {
    // add
    [HANDLERS_ETHNIC.ADD_ETHNIC]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            ethnics: [ ...state, data],
        };
    },

    // list
    [HANDLERS_ETHNIC.LIST_ETHNIC]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            ethnics: data,
        };
    },

    // delete
    [HANDLERS_ETHNIC.DELETE_ETHNIC]: (state, action) => {
        return {
            ethnics: [],
        };
    },

    // find byid
    [HANDLERS_ETHNIC.FIND_ETHNIC_BYID]: (state, action) => {
        const data = action.payload;

        return data;
    },

    // update
    [HANDLERS_ETHNIC.UPDATE_ETHNIC]: (state, action) => {
        return state;
    },
};

const reducerEthnic = (state, action) =>
  handlersEthnic[action.type] ? handlersEthnic[action.type](state, action) : state;

export { initialStateEthnic, reducerEthnic, HANDLERS_ETHNIC };
