const initialStateRole = {
    roles: [],
};

const HANDLERS_ROLE = {
    ADD_ROLE: "ADD_ROLE",
    LIST_ROLE: "LIST_ROLE",
    DELETE_ROLE: "DELETE_ROLE",
    FIND_ROLE_BYID: "FIND_ROLE_BYID",
    UPDATE_ROLE: "UPDATE_ROLE",
};

const handlersRole = {
    // add
    [HANDLERS_ROLE.ADD_ROLE]: (state, action) => {
        const roleData = action.payload;

        return {
            ...state,
            roles: [...state, roleData],
        };
    },

    // list
    [HANDLERS_ROLE.LIST_ROLE]: (state, action) => {
        const roleData = action.payload;

        return {
            ...state,
            roles: roleData,
        };
    },

    // delete
    [HANDLERS_ROLE.DELETE_ROLE]: (state, action) => {
        return {
            roles: [],
        };
    },

    // find byid
    [HANDLERS_ROLE.FIND_ROLE_BYID]: (state, action) => {
        const roleData = action.payload;

        return roleData;
    },

    // update
    [HANDLERS_ROLE.UPDATE_ROLE]: (state, action) => {
        return state;
    },
};

const reducerRole = (state, action) =>
    handlersRole[action.type] ? handlersRole[action.type](state, action) : state;

export { initialStateRole, reducerRole, HANDLERS_ROLE };
