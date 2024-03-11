const initialStateEmigrationGroup = {
    emigrationGroups: [],
};

const HANDLERS_EMIGRATION_GROUP = {
    ADD_EMIGRATION_GROUP: "ADD_EMIGRATION_GROUP",
    LIST_EMIGRATION_GROUP: "LIST_EMIGRATION_GROUP",
    DELETE_EMIGRATION_GROUP: "DELETE_EMIGRATION_GROUP",
    FIND_EMIGRATION_GROUP_BYID: "FIND_EMIGRATION_GROUP_BYID",
    UPDATE_EMIGRATION_GROUP: "UPDATE_EMIGRATION_GROUP",
};

const handlersEmigrationGroup = {
    // add
    [HANDLERS_EMIGRATION_GROUP.ADD_EMIGRATION_GROUP]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            emigrationGroups: [ ...state, data],
        };
    },

    // list
    [HANDLERS_EMIGRATION_GROUP.LIST_EMIGRATION_GROUP]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            emigrationGroups: data,
        };
    },

    // delete
    [HANDLERS_EMIGRATION_GROUP.DELETE_EMIGRATION_GROUP]: (state, action) => {
        return {
            emigrationGroups: [],
        };
    },

    // find byid
    [HANDLERS_EMIGRATION_GROUP.FIND_EMIGRATION_GROUP_BYID]: (state, action) => {
        const data = action.payload;

        return data;
    },

    // update
    [HANDLERS_EMIGRATION_GROUP.UPDATE_EMIGRATION_GROUP]: (state, action) => {
        return state;
    },
};

const reducerEmigrationGroup = (state, action) =>
  handlersEmigrationGroup[action.type] ? handlersEmigrationGroup[action.type](state, action) : state;

export { initialStateEmigrationGroup, reducerEmigrationGroup, HANDLERS_EMIGRATION_GROUP };
