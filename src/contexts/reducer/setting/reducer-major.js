const initialStateMajor = {
    major: [],
};

const HANDLERS_MAJOR = {
    ADD_MAJOR: "ADD_MAJOR",
    LIST_MAJOR: "LIST_MAJOR",
    UPDATE_MAJOR: "UPDATE_MAJOR",
    FIND_MAJOR_BYID: "FIND_MAJOR_BYID",
};

const handlersMajor = {
    // add
    [HANDLERS_MAJOR.ADD_MAJOR]: (state, action) => {
        const major = action.payload;

        return {
            ...state,
            majors: [ ...state, major],
        };
    },

    // list
    [HANDLERS_MAJOR.LIST_MAJOR]: (state, action) => {
        const majorsData = action.payload;

        return {
            ...state,
            majors: majorsData,
        };
    },

    // find byid
    [HANDLERS_MAJOR.FIND_MAJOR_BYID]: (state, action) => {
        const major = action.payload;

        return major;
    },

    // update
    [HANDLERS_MAJOR.UPDATE_MAJOR]: (state, action) => {
        return state;
    },
};

const reducerMajor = (state, action) =>
  handlersMajor[action.type] ? handlersMajor[action.type](state, action) : state;

export { initialStateMajor, reducerMajor, HANDLERS_MAJOR };