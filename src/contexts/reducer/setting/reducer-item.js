const initialStateItem = {
    item: []
}
const HANDLERS_ITEM = {
    LIST_ITEM: "LIST_ITEM",
    ADD_ITEM: "ADD_ITEM",
    EDIT_ITEM: "EDIT_ITEM",
    FIND_ITEM_BYID: "FIND_ITEM_BYID"
};


const handlesItem = {
    // list
    [HANDLERS_ITEM.LIST_ITEM]: (state, action) => {
        const itemsData = action.payload;

        return {
            ...state,
            items: itemsData,
        };
    },

    [HANDLERS_ITEM.ADD_ITEM]: (state, action) => {
        const ITEM = action.payload;

        return {
            ...state,
            items: [...state, ITEM],
        }
    },

    // find byid
    [HANDLERS_ITEM.FIND_ITEM_BYID]: (state, action) => {
        const item = action.payload;
        return item;
    }
};

const reducerItem = (state, action) =>
    (handlesItem[action.type] ? handlesItem[action.type](state, action) : state);

export { initialStateItem, reducerItem, HANDLERS_ITEM };