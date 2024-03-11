const initialStateOrgan = {
    organs: [],
};

const HANDLERS_ORGAN = {
    ADD_ORGAN: "ADD_ORGAN",
    LIST_ORGAN: "LIST_ORGAN",
    DELETE_ORGAN: "DELETE_ORGAN",
    FIND_ORGAN_BYID: "FIND_ORGAN_BYID",
    UPDATE_ORGAN: "UPDATE_ORGAN",
};

const handlersOrgan = {
    // add
    [HANDLERS_ORGAN.ADD_ORGAN]: (state, action) => {
        const organ = action.payload;

        return {
            ...state,
            organs: [...state, organ],
        };
    },

    // list
    [HANDLERS_ORGAN.LIST_ORGAN]: (state, action) => {
        const organsData = action.payload;

        return {
            ...state,
            organs: organsData,
        };
    },

    // delete
    [HANDLERS_ORGAN.DELETE_ORGAN]: (state, action) => {
        return {
            organs: [],
        };
    },

    // find byid
    [HANDLERS_ORGAN.FIND_ORGAN_BYID]: (state, action) => {
        const organ = action.payload;

        return organ;
    },

    // update
    [HANDLERS_ORGAN.UPDATE_ORGAN]: (state, action) => {
        return state;
    },
};

const reducerOrgan = (state, action) =>
    handlersOrgan[action.type] ? handlersOrgan[action.type](state, action) : state;

export { initialStateOrgan, reducerOrgan, HANDLERS_ORGAN };
