const initialStateFeature = {
    features: [],
};

const HANDLERS_FEATURE = {
    ADD_FEATURE: "ADD_FEATURE",
    LIST_FEATURE: "LIST_FEATURE",
    DELETE_FEATURE: "DELETE_FEATURE",
    FIND_FEATURE_BYID: "FIND_FEATURE_BYID",
    UPDATE_FEATURE: "UPDATE_FEATURE",
};

const handlersFeature = {
    // add
    [HANDLERS_FEATURE.ADD_FEATURE]: (state, action) => {
        const featureData = action.payload;

        return {
            ...state,
            features: [...state, featureData],
        };
    },

    // list
    [HANDLERS_FEATURE.LIST_FEATURE]: (state, action) => {
        const featureData = action.payload;

        return {
            ...state,
            features: featureData,
        };
    },

    // delete
    [HANDLERS_FEATURE.DELETE_FEATURE]: (state, action) => {
        return {
            features: [],
        };
    },

    // find byid
    [HANDLERS_FEATURE.FIND_FEATURE_BYID]: (state, action) => {
        const featureData = action.payload;

        return featureData;
    },

    // update
    [HANDLERS_FEATURE.UPDATE_FEATURE]: (state, action) => {
        return state;
    },
};

const reducerFeature = (state, action) =>
    handlersFeature[action.type] ? handlersFeature[action.type](state, action) : state;

export { initialStateFeature, reducerFeature, HANDLERS_FEATURE };
