const initialStatePresent = {
    presents: []
}

const HANDLERS_PRESENT = {
    ADD_PRESENT: 'ADD_PRESENT',
    LIST_PRESENT: 'LIST_PRESENT',
    UPDATE_PRESENT: 'UPDATE_PRESENT',
    FIND_PRESENT_BYID: "FIND_PRESENT_BYID"
}

const handlersPresent = {
    // add 
    [HANDLERS_PRESENT.ADD_PRESENT]: (state, action) => {
        const present = action.payload;

        return {
            ...state,
            presents: [...state, present]
        }
    },

    // list
    [HANDLERS_PRESENT.LIST_PRESENT]: (state, action) => {
        const present = action.payload;

        return {
            ...state,
            presents: present
        }
    },

    // update 
    [HANDLERS_PRESENT.UPDATE_PRESENT]: (state, action) => {
        return state;
    },

    // find 
    [HANDLERS_PRESENT.FIND_PRESENT_BYID]: (state, action) => {
        const present = action.payload;

        return present;
    }
}

const reducerPresent = (state, action) =>
    handlersPresent[action.type] ? handlersPresent[action.type](state, action) : state;
export { initialStatePresent, reducerPresent, HANDLERS_PRESENT }