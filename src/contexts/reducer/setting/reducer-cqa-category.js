const initialStateCQACategory = {
    cqaCategories: [],
};

const HANDLERS_CQACATEGORY = {
    ADD_CQACATEGORY: "ADD_CQACATEGORY",
    LIST_CQACATEGORY: "LIST_CQACATEGORY",
    DELETE_CQACATEGORY: "DELETE_CQACATEGORY",
    FIND_CQACATEGORY_BYID: "FIND_CQACATEGORY_BYID",
    UPDATE_CQACATEGORY: "UPDATE_CQACATEGORY",
};

const handlersCQACategory = {
    // add
    [HANDLERS_CQACATEGORY.ADD_CQACATEGORY]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            cqaCategories: [ ...state, data],
        };
    },

    // list
    [HANDLERS_CQACATEGORY.LIST_CQACATEGORY]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            cqaCategories: data,
        };
    },

    // delete
    [HANDLERS_CQACATEGORY.DELETE_CQACATEGORY]: (state, action) => {
        return {
            cqaCategories: [],
        };
    },

    // find byid
    [HANDLERS_CQACATEGORY.FIND_CQACATEGORY_BYID]: (state, action) => {
        const data = action.payload;

        return data;
    },

    // update
    [HANDLERS_CQACATEGORY.UPDATE_CQACATEGORY]: (state, action) => {
        return state;
    },
};

const reducerCQACategory = (state, action) =>
  handlersCQACategory[action.type] ? handlersCQACategory[action.type](state, action) : state;

export { initialStateCQACategory, reducerCQACategory, HANDLERS_CQACATEGORY };
