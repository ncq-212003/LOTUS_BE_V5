const HANDLERS_EDUCATIONLEVEL = {
    ADD_EDUCATIONLEVEL: 'ADD_EDUCATIONLEVEL',
    LIST_EDUCATIONLEVEL: 'LIST_EDUCATIONLEVEL',
    UPDATE_EDUCATIONLEVEL: 'UPDATE_EDUCATIONLEVEL',
    DELETE_EDUCATIONLEVEL: 'DELETE_EDUCATIONLEVEL',
    FIND_EDUCATIONLEVEL_BYID: 'FIND_EDUCATIONLEVEL_BYID'
}

const initialStateEducationLevel = {
    educationlevel: []
}

const handlersEducationLevel = {
    [HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL]: (state, action) => {
        const educationLevelsData = action.payload;

        return {
            ...state,
            educationlevels: educationLevelsData,
        };
    },

    [HANDLERS_EDUCATIONLEVEL.ADD_EDUCATIONLEVEL]: (state, action) => {
        const EDUCATIONLEVEL = action.payload;

        return {
            ...state,
            educationlevels: [...state, EDUCATIONLEVEL],
        }
    },

    [HANDLERS_EDUCATIONLEVEL.UPDATE_EDUCATIONLEVEL]: (state, action) => {
        return state;
    },

    // delete
    [HANDLERS_EDUCATIONLEVEL.DELETE_EDUCATIONLEVEL]: (state, action) => {
        return {
            educationlevels: [],
        };
    },

    // find byid
    [HANDLERS_EDUCATIONLEVEL.FIND_EDUCATIONLEVEL_BYID]: (state, action) => {
        const educationlevels = action.payload;

        return educationlevels;
    },
}

const reducerEducationLevel = (state, action) =>
    handlersEducationLevel[action.type] ? handlersEducationLevel[action.type](state, action) : state;

export { initialStateEducationLevel, reducerEducationLevel, HANDLERS_EDUCATIONLEVEL };