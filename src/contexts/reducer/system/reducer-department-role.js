const initialStateDepartmentRole = {
    departmentRoles: [],
    findDepartmentRoles: [],
};

const HANDLERS_DEPARTMENT_ROLE = {
    ADD_DEPARTMENT_ROLE: "ADD_DEPARTMENT_ROLE",
    LIST_DEPARTMENT_ROLE: "LIST_DEPARTMENT_ROLE",
    DELETE_DEPARTMENT_ROLE: "DELETE_DEPARTMENT_ROLE",
    FIND_DEPARTMENT_ROLE_BYID: "FIND_DEPARTMENT_ROLE_BYID",
    UPDATE_DEPARTMENT_ROLE: "UPDATE_DEPARTMENT_ROLE",
    FIND_DEPARTMENT_ROLE_DEPARTMENTID: "FIND_DEPARTMENT_ROLE_DEPARTMENTID",
};

const handlersDepartmentRole = {
    // add
    [HANDLERS_DEPARTMENT_ROLE.ADD_DEPARTMENT_ROLE]: (state, action) => {
        const departmentRoleData = action.payload;

        return {
            ...state,
            departmentRoles: [...state, departmentRoleData],
        };
    },

    // list
    [HANDLERS_DEPARTMENT_ROLE.LIST_DEPARTMENT_ROLE]: (state, action) => {
        const departmentRoleData = action.payload;

        return {
            ...state,
            departmentRoles: departmentRoleData,
        };
    },

    // delete
    [HANDLERS_DEPARTMENT_ROLE.DELETE_DEPARTMENT_ROLE]: (state, action) => {
        return {
            departmentRoles: [],
        };
    },

    // find by id
    [HANDLERS_DEPARTMENT_ROLE.FIND_DEPARTMENT_ROLE_BYID]: (state, action) => {
        const departmentRoleData = action.payload;

        return departmentRoleData;
    },

    // update
    [HANDLERS_DEPARTMENT_ROLE.UPDATE_DEPARTMENT_ROLE]: (state, action) => {
        return state;
    },

    // Find by departmentId
    [HANDLERS_DEPARTMENT_ROLE.FIND_DEPARTMENT_ROLE_DEPARTMENTID]: (state, action) => {
        const departmentRoleData = action.payload;

        return {
            ...state,
            findDepartmentRoles: departmentRoleData,
        };
    },
};

const reducerDepartmentRole = (state, action) =>
    handlersDepartmentRole[action.type] ? handlersDepartmentRole[action.type](state, action) : state;

export { initialStateDepartmentRole, reducerDepartmentRole, HANDLERS_DEPARTMENT_ROLE };
