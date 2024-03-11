const initialStatePerson = {
    persons: [],
};

const HANDLERS_PERSON = {
    ADD_PERSON: "ADD_PERSON",
    LIST_PERSON: "LIST_PERSON",
    DELETE_PERSON: "DELETE_PERSON",
    FIND_PERSON_BYID: "FIND_PERSON_BYID",
    UPDATE_PERSON: "UPDATE_PERSON",
    FIND_PERSON_BY_SYNDICATEDID: "FIND_PERSON_BY_SYNDICATEDID"
};

const handlersPerson = {
    // add
    [HANDLERS_PERSON.ADD_PERSON]: (state, action) => {
        const person = action.payload;

        return {
            ...state,
            persons: [...state, person],
        };
    },

    // list
    [HANDLERS_PERSON.LIST_PERSON]: (state, action) => {
        const personsData = action.payload;

        return {
            ...state,
            persons: personsData,
        };
    },

    // delete
    [HANDLERS_PERSON.DELETE_PERSON]: (state, action) => {
        return {
            persons: [],
        };
    },

    // find by id
    [HANDLERS_PERSON.FIND_PERSON_BYID]: (state, action) => {
        const person = action.payload;

        return person;
    },

    // update
    [HANDLERS_PERSON.UPDATE_PERSON]: (state, action) => {
        return state;
    },

    // find by syndicate
    [HANDLERS_PERSON.FIND_PERSON_BY_SYNDICATEDID]: (state, action) => {
        const personData = action.payload;

        return {
            ...state,
            persons: personData,
        }
    },
};

const reducerPerson = (state, action) =>
    handlersPerson[action.type] ? handlersPerson[action.type](state, action) : state;

export { initialStatePerson, reducerPerson, HANDLERS_PERSON };
