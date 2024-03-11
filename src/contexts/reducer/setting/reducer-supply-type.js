const initialStateSupplyType = {
    supplyTypes: []
}

const HANDLERS_SUPPLY_TYPE = {
    ADD_SUPPLY_TYPE: 'ADD_SUPPLY_TYPE',
    LIST_SUPPLY_TYPE: 'LIST_SUPPLY_TYPE',
    UPDATE_SUPPLY_TYPE: 'UPDATE_SUPPLY_TYPE',
    FIND_SUPPLY_TYPE_BYID: 'FIND_SUPPLY_TYPE_BYID'
}

const handlderSupplyType = {
    // add
    [HANDLERS_SUPPLY_TYPE.ADD_SUPPLY_TYPE]: (state, action) => {
        const supplyType = action.payload;

        return {
            ...state,
            supplyTypes: { ...state, supplyType }
        }
    },

    // list
    [HANDLERS_SUPPLY_TYPE.LIST_SUPPLY_TYPE]: (state, action) => {
        const supplyType = action.payload;

        return {
            ...state,
            supplyTypes: supplyType
        }
    },

    // update
    [HANDLERS_SUPPLY_TYPE.UPDATE_SUPPLY_TYPE]: (state, action) => {
        return state;
    },

    // find
    [HANDLERS_SUPPLY_TYPE.FIND_SUPPLY_TYPE_BYID]: (state, action) => {
        const supplyType = action.payload;

        return supplyType;
    }
}

const reducerSupplyType = (state, action) =>
    handlderSupplyType[action.type] ? handlderSupplyType[action.type](state, action) : state;
export { initialStateSupplyType, reducerSupplyType, HANDLERS_SUPPLY_TYPE }