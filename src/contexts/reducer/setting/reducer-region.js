const initialStateRegion = {
    regions: []
}

const HANDLERS_REGION = {
    ADD_REGION: 'ADD_REGION',
    LIST_REGION: 'LIST_REGION',
    UPDATE_REGION: 'UPDATE_REGION',
    FIND_REGION_BYID: 'FIND_REGION_BYID'
}

const handlderRegion = {
    [HANDLERS_REGION.ADD_REGION]: (state, action) => {
        const region = action.payload;

        return {
            ...state,
            regions: [...state, region]
        }
    },

    [HANDLERS_REGION.LIST_REGION]: (state, action) => {
        const region = action.payload;

        return {
            ...state,
            regions: region
        }
    },

    [HANDLERS_REGION.UPDATE_REGION]: (state, action) => {
        return state;
    },

    [HANDLERS_REGION.FIND_REGION_BYID]: (state, action) => {
        const region = action.payload;

        return region;
    }
}

const reducerRegion = (state, action) =>
    handlderRegion[action.type] ? handlderRegion[action.type](state, action) : state;
export { initialStateRegion, HANDLERS_REGION, reducerRegion }