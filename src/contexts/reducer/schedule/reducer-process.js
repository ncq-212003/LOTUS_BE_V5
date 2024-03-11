const initialStateProcess = {
    processes: []
}

const HANDLERS_PROCESS = {
    ADD_PROCESS: "ADD_PROCESS",
    LIST_PROCESS: "LIST_PROCESS",
    DELETE_PROCESS: "DELETE_PROCESS",
    UPDATE_PROCESS: "UPDATE_PROCESS",
    FIND_PROCESS_BYID: "FIND_PROCESS_BYID"
}

const handlersProcess = {
    // add
    [HANDLERS_PROCESS.ADD_PROCESS]: (state, action) => {
        const process = action.payload;

        return {
            ...state,
            processes: [...state, process]
        }
    },

    // list
    [HANDLERS_PROCESS.LIST_PROCESS]: (state, action) => {
        const process = action.payload;

        return {
            ...state,
            processes: process
        }
    },

    // update 
    [HANDLERS_PROCESS.UPDATE_PROCESS]: (state, action) => {
        return state;
    },

    // find
    [HANDLERS_PROCESS.FIND_PROCESS_BYID]: (state, action) => {
        const process = action.payload;

        return process;
    }

}

const reducerProcess = (state, action) =>
    handlersProcess[action.type] ? handlersProcess[action.type](state, action) : state;
export { initialStateProcess, reducerProcess, HANDLERS_PROCESS }