const HANDLERS_MARKET = {
    ADD_MARKET: 'ADD_MARKET',
    LIST_MARKET: 'LIST_MARKET',
    UPDATE_MARKET: 'UPDATE_MARKET',
    FIND_MARKET_BYID: 'FIND_MARKET_BYID',
}

const initialStateMarket = {
    market: []
}

const handlersMarket = {
    [HANDLERS_MARKET.LIST_MARKET]: (state, action) => {
        const marketsData = action.payload;

        return {
            ...state,
            markets: marketsData,
        };
    },

    [HANDLERS_MARKET.ADD_MARKET]: (state, action) => {
        const market = action.payload;

        return {
            ...state,
            markets: [...state, market],
        }
    },

    [HANDLERS_MARKET.UPDATE_MARKET]: (state, action) => {
        return state;
    },

    // find byid
    [HANDLERS_MARKET.FIND_MARKET_BYID]: (state, action) => {
        const market = action.payload;

        return market;
    },
}

const reducerMarket = (state, action) =>
    handlersMarket[action.type] ? handlersMarket[action.type](state, action) : state;

export { initialStateMarket, reducerMarket, HANDLERS_MARKET };