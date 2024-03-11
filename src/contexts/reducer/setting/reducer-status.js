const initialStateStatus = {
    statuss: [],
};

const HANDLERS_STATUS = {
    ADD_STATUS: "ADD_STATUS",
    LIST_STATUS: "LIST_STATUS",
    DELETE_STATUS: "DELETE_STATUS",
    FIND_STATUS_BYID: "FIND_STATUS_BYID",
    UPDATE_STATUS: "UPDATE_STATUS",
};

const handlersStatus = {
    // add
    [HANDLERS_STATUS.ADD_STATUS]: (state, action) => {
        const status = action.payload;

        return {
            ...state,
            statuss: [ ...state, status],
        };
    },

    // list
    [HANDLERS_STATUS.LIST_STATUS]: (state, action) => {
        const statusData = action.payload;

        return {
            ...state,
            statuss: statusData,
        };
    },

    // delete
    [HANDLERS_STATUS.DELETE_STATUS]: (state, action) => {
        return {
            statuss: [],
        };
    },

    // find byid
    [HANDLERS_STATUS.FIND_STATUS_BYID]: (state, action) => {
        const status = action.payload;

        return status;
    },

    // update
    [HANDLERS_STATUS.UPDATE_STATUS]: (state, action) => {
        return state;
    },
};

const reducerStatus = (state, action) =>
  handlersStatus[action.type] ? handlersStatus[action.type](state, action) : state;

export { initialStateStatus, reducerStatus, HANDLERS_STATUS };
