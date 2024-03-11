const initialStateDormitory = {
    dormitories: [],
};

const HANDLERS_DORMITORY = {
    ADD_DORMITORY: "ADD_DORMITORY",
    LIST_DORMITORY: "LIST_DORMITORY",
    DELETE_DORMITORY: "DELETE_DORMITORY",
    FIND_DORMITORY_BYID: "FIND_DORMITORY_BYID",
    UPDATE_DORMITORY: "UPDATE_DORMITORY",
};

const handlersDormitory = {
    // add
    [HANDLERS_DORMITORY.ADD_DORMITORY]: (state, action) => {
        const dormitory = action.payload;

        return {
            ...state,
            dormitories: [...state, dormitory],
        };
    },

    // list
    [HANDLERS_DORMITORY.LIST_DORMITORY]: (state, action) => {
        const dormitoriesData = action.payload;

        return {
            ...state,
            dormitories: dormitoriesData,
        };
    },

    // delete
    [HANDLERS_DORMITORY.DELETE_DORMITORY]: (state, action) => {
        return {
            dormitories: [],
        };
    },

    // find byid
    [HANDLERS_DORMITORY.FIND_DORMITORY_BYID]: (state, action) => {
        const dormitory = action.payload;

        return dormitory;
    },

    // update
    [HANDLERS_DORMITORY.UPDATE_DORMITORY]: (state, action) => {
        return state;
    },
};

const reducerDormitory = (state, action) =>
    handlersDormitory[action.type] ? handlersDormitory[action.type](state, action) : state;

export { initialStateDormitory, reducerDormitory, HANDLERS_DORMITORY };
