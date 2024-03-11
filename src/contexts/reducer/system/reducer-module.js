const initialStateModule = {
    modules: [],
};

const HANDLERS_MODULE = {
    ADD_MODULE: "ADD_MODULE",
    LIST_MODULE: "LIST_MODULE",
    DELETE_MODULE: "DELETE_MODULE",
    FIND_MODULE_BYID: "FIND_MODULE_BYID",
    UPDATE_MODULE: "UPDATE_MODULE",
};

const handlersModule = {
    // add
    [HANDLERS_MODULE.ADD_MODULE]: (state, action) => {
        const moduleData = action.payload;

        return {
            ...state,
            modules: [...state, moduleData],
        };
    },

    // list
    [HANDLERS_MODULE.LIST_MODULE]: (state, action) => {
        const moduleData = action.payload;

        return {
            ...state,
            modules: moduleData,
        };
    },

    // delete
    [HANDLERS_MODULE.DELETE_MODULE]: (state, action) => {
        return {
            modules: [],
        };
    },

    // find byid
    [HANDLERS_MODULE.FIND_MODULE_BYID]: (state, action) => {
        const moduleData = action.payload;

        return moduleData;
    },

    // update
    [HANDLERS_MODULE.UPDATE_MODULE]: (state, action) => {
        return state;
    },
};

const reducerModule = (state, action) =>
    handlersModule[action.type] ? handlersModule[action.type](state, action) : state;

export { initialStateModule, reducerModule, HANDLERS_MODULE };
