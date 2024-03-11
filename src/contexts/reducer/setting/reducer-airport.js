const initialStateAirPort = {
    airports: []
}

const HANDLERS_AIRPORT = {
    ADD_AIRPORT: 'ADD_AIRPORT',
    LIST_AIRPORT: 'LIST_AIRPORT',
    UPDATE_AIRPORT: 'UPDATE_AIRPORT',
    FIND_AIRPORT_BYID: 'FIND_AIRPORT_BYID'
}

const handlderAirPort = {
    // add
    [HANDLERS_AIRPORT.ADD_AIRPORT]: (state, action) => {
        const airport = action.payload;

        return {
            ...state,
            airports: [...state, airport]
        }
    },

    // list
    [HANDLERS_AIRPORT.LIST_AIRPORT]: (state, action) => {
        const airport = action.payload;

        return {
            ...state,
            airports: airport
        }
    },

    // update
    [HANDLERS_AIRPORT.UPDATE_AIRPORT]: (state, action) => {
        return state;
    },

    // find
    [HANDLERS_AIRPORT.FIND_AIRPORT_BYID]: (state, action) => {
        const airport = action.payload;

        return airport;
    }
}

const reducerAirport = (state, action) =>
    handlderAirPort[action.type] ? handlderAirPort[action.type](state, action) : state;
export { initialStateAirPort, reducerAirport, HANDLERS_AIRPORT }