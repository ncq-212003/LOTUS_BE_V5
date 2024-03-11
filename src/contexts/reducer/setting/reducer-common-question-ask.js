const initialStateCommonQuestionAsk = {
    commonQuestionAsks: [],
};

const HANDLERS_COMMON_QUESTION_ASK = {
    ADD_COMMON_QUESTION_ASK: "ADD_COMMON_QUESTION_ASK",
    LIST_COMMON_QUESTION_ASK: "LIST_COMMON_QUESTION_ASK",
    DELETE_COMMON_QUESTION_ASK: "DELETE_COMMON_QUESTION_ASK",
    FIND_COMMON_QUESTION_ASK_BYID: "FIND_COMMON_QUESTION_ASK_BYID",
    UPDATE_COMMON_QUESTION_ASK: "UPDATE_COMMON_QUESTION_ASK",
};

const handlersCommonQuestionAsk = {
    // add
    [HANDLERS_COMMON_QUESTION_ASK.ADD_COMMON_QUESTION_ASK]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            commonQuestionAsks: [ ...state, data],
        };
    },

    // list
    [HANDLERS_COMMON_QUESTION_ASK.LIST_COMMON_QUESTION_ASK]: (state, action) => {
        const data = action.payload;

        return {
            ...state,
            commonQuestionAsks: data,
        };
    },

    // delete
    [HANDLERS_COMMON_QUESTION_ASK.DELETE_COMMON_QUESTION_ASK]: (state, action) => {
        return {
            commonQuestionAsks: [],
        };
    },

    // find byid
    [HANDLERS_COMMON_QUESTION_ASK.FIND_COMMON_QUESTION_ASK_BYID]: (state, action) => {
        const data = action.payload;

        return data;
    },

    // update
    [HANDLERS_COMMON_QUESTION_ASK.UPDATE_COMMON_QUESTION_ASK]: (state, action) => {
        return state;
    },
};

const reducerCommonQuestionAsk = (state, action) =>
  handlersCommonQuestionAsk[action.type] ? handlersCommonQuestionAsk[action.type](state, action) : state;

export { initialStateCommonQuestionAsk, reducerCommonQuestionAsk, HANDLERS_COMMON_QUESTION_ASK };
