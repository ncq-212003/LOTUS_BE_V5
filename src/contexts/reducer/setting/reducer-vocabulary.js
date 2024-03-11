const initialStateVocabulary = {
    vocabularies: [],
};

const HANDLERS_VOCABULARY = {
    ADD_VOCABULARY: "ADD_VOCABULARY",
    LIST_VOCABULARY: "LIST_VOCABULARY",
    DELETE_VOCABULARY: "DELETE_VOCABULARY",
    FIND_VOCABULARY_BYID: "FIND_VOCABULARY_BYID",
    UPDATE_VOCABULARY: "UPDATE_VOCABULARY",
};

const handlersVocabulary = {
    // add
    [HANDLERS_VOCABULARY.ADD_VOCABULARY]: (state, action) => {
        const vocabulary = action.payload;

        return {
            ...state,
            vocabularies: [ ...state, vocabulary],
        };
    },

    // list
    [HANDLERS_VOCABULARY.LIST_VOCABULARY]: (state, action) => {
        const vocabularyData = action.payload;

        return {
            ...state,
            vocabularies: vocabularyData,
        };
    },

    // delete
    [HANDLERS_VOCABULARY.DELETE_VOCABULARY]: (state, action) => {
        return {
            vocabularies: [],
        };
    },

    // find byid
    [HANDLERS_VOCABULARY.FIND_VOCABULARY_BYID]: (state, action) => {
        const vocabulary = action.payload;

        return vocabulary;
    },

    // update
    [HANDLERS_VOCABULARY.UPDATE_VOCABULARY]: (state, action) => {
        return state;
    },
};

const reducerVocabulray = (state, action) =>
  handlersVocabulary[action.type] ? handlersVocabulary[action.type](state, action) : state;

export { initialStateVocabulary, reducerVocabulray, HANDLERS_VOCABULARY };
