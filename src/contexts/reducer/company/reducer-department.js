const initialStateDepartment = {
    departments: [],
};

const HANDLERS_DEPARMENT = {
    ADD_DEPARMENT: "ADD_DEPARMENT",
    LIST_DEPARTMENT: "LIST_DEPARTMENT",
    DELETE_DEPARMENT: "DELETE_DEPARMENT",
    FIND_DEPARMENT_BYID: "FIND_DEPARMENT_BYID",
    UPDATE_DEPARTMENT: "UPDATE_DEPARTMENT",
};

const handlersDepartment = {
    // add
    [HANDLERS_DEPARMENT.ADD_DEPARMENT]: (state, action) => {
        const deparment = action.payload;

        return {
            ...state,
            departments: [ ...state, deparment],
        };
    },

    // list
    [HANDLERS_DEPARMENT.LIST_DEPARTMENT]: (state, action) => {
        const departments = action.payload;

        return {
            ...state,
            departments: departments,
        };
    },

    // delete
    [HANDLERS_DEPARMENT.DELETE_DEPARMENT]: (state, action) => {
        return {
            departments: [],
        };
    },

    // find byid
    [HANDLERS_DEPARMENT.FIND_DEPARMENT_BYID]: (state, action) => {
        const deparment = action.payload;

        return deparment;
    },

    // update
    [HANDLERS_DEPARMENT.UPDATE_DEPARTMENT]: (state, action) => {
        return state;
    },
};

const reducerDepartment = (state, action) =>
  handlersDepartment[action.type] ? handlersDepartment[action.type](state, action) : state;

export { initialStateDepartment, reducerDepartment, HANDLERS_DEPARMENT };