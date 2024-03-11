const initialStateClassroom = {
    classrooms: [],
};

const HANDLERS_CLASSROOM = {
    ADD_CLASSROOM: "ADD_CLASSROOM",
    LIST_CLASSROOM: "LIST_CLASSROOM",
    DELETE_CLASSROOM: "DELETE_CLASSROOM",
    FIND_CLASSROOM_BYID: "FIND_CLASSROOM_BYID",
    UPDATE_CLASSROOM: "UPDATE_CLASSROOM",
};

const handlersClassroom = {
    // add
    [HANDLERS_CLASSROOM.ADD_CLASSROOM]: (state, action) => {
        const classroom = action.payload;

        return {
            ...state,
            classrooms: [...state, classroom],
        };
    },

    // list
    [HANDLERS_CLASSROOM.LIST_CLASSROOM]: (state, action) => {
        const classroomsData = action.payload;
        console.log(classroomsData);

        return {
            ...state,
            classrooms: classroomsData,
        };
    },

    // delete
    [HANDLERS_CLASSROOM.DELETE_CLASSROOM]: (state, action) => {
        return {
            classrooms: [],
        };
    },

    // find byid
    [HANDLERS_CLASSROOM.FIND_CLASSROOM_BYID]: (state, action) => {
        const classroom = action.payload;

        return classroom;
    },

    // update
    [HANDLERS_CLASSROOM.UPDATE_CLASSROOM]: (state, action) => {
        return state;
    },
};

const reducerClassroom = (state, action) =>
    handlersClassroom[action.type] ? handlersClassroom[action.type](state, action) : state;

export { initialStateClassroom, reducerClassroom, HANDLERS_CLASSROOM };
