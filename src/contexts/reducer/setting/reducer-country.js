const initialStateCountry = {
    countrys: []
}

const HANDLERS_COUNTRY = {
    ADD_COUNTRY: 'ADD_COUNTRY',
    LIST_COUNTRY: 'LIST_COUNTRY',
    UPDATE_COUNTRY: 'UPDATE_COUNTRY',
    FIND_COUNTRY_BYID: 'FIND_COUNTRY_BYID'
}

const handlerCountry = {
    // add
    [HANDLERS_COUNTRY.ADD_COUNTRY]: (state, action) => {
        const country = action.payload;

        return {
            ...state,
            countrys: [...state, country]
        }
    },

    // list 
    [HANDLERS_COUNTRY.LIST_COUNTRY]: (state, action) => {
        const country = action.payload;

        return {
            ...state,
            countrys: country
        }
    },

    //udpate 
    [HANDLERS_COUNTRY.UPDATE_COUNTRY]: (state, action) => {
        return state;
    },

    //find
    [HANDLERS_COUNTRY.FIND_COUNTRY_BYID]: (state, action) => {
        const country = action.payload;
        return country;
    }
}

const reducerCountry = (state, action) =>
    handlerCountry[action.type] ? handlerCountry[action.type](state, action) : state;
export { initialStateCountry, HANDLERS_COUNTRY, reducerCountry }