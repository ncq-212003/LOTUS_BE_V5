const initialStateAddress = {
    addresses: []
}

const HANDLERS_ADDRESS = {
    ADD_ADDRESS: "ADD_ADDRESS",
    LIST_ADDRESS: "LIST_ADDRESS",
    UPDATE_ADDRESS: "UPDATE_ADDRESS",
    FIND_ADDRESS_BYID: "FIND_ADDRESS_BYID",
}

const handlersAddress = {
    // add
    [HANDLERS_ADDRESS.ADD_ADDRESS]: (state, action) => {
        const address = action.payload;

        return {
            ...state,
            addresses: [...state, address]
        }
    },

    // list 
    [HANDLERS_ADDRESS.LIST_ADDRESS]: (state, action) => {
        const address = action.payload;

        return {
            ...state,
            addresses: address
        }
    },

    // update 
    [HANDLERS_ADDRESS.UPDATE_ADDRESS]: (state, action) => {
        return state;
    },

    // find
    [HANDLERS_ADDRESS.FIND_ADDRESS_BYID]: (state, action) => {
        const address = action.payload;
        return address;
    }
}

const reducerAddress = (state, action) =>
    handlersAddress[action.type] ? handlersAddress[action.type](state, action) : state;
export { initialStateAddress, reducerAddress, HANDLERS_ADDRESS }  