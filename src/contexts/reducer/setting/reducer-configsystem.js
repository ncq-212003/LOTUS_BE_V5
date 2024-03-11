const initialStateConfigSystem = {
    configsystem: [],
};

const HANDLERS_CONFIGSYSTEM = {
    ADD_CONFIGSYSTEM: "ADD_CONFIGSYSTEM",
    LIST_CONFIGSYSTEM: "LIST_CONFIGSYSTEM",
    UPDATE_CONFIGSYSTEM: "UPDATE_CONFIGSYSTEM",
    FIND_CONFIGSYSTEM_BYID: "FIND_CONFIGSYSTEM_BYID",
};

const handlersConfigSystem = {
    // add
    [HANDLERS_CONFIGSYSTEM.ADD_CONFIGSYSTEM]: (state, action) => {
        const configsystem = action.payload;

        return {
            ...state,
            configsystems: [ ...state, configsystem],
        };
    },

    // list
    [HANDLERS_CONFIGSYSTEM.LIST_CONFIGSYSTEM]: (state, action) => {
        const configsystemsData = action.payload;

        return {
            ...state,
            configsystems: configsystemsData,
        };
    },

    // find byid
    [HANDLERS_CONFIGSYSTEM.FIND_CONFIGSYSTEM_BYID]: (state, action) => {
        const configsystem = action.payload;

        return configsystem;
    },

    // update
    [HANDLERS_CONFIGSYSTEM.UPDATE_CONFIGSYSTEM]: (state, action) => {
        return state;
    },
};

const reducerConfigSystem = (state, action) =>
  handlersConfigSystem[action.type] ? handlersConfigSystem[action.type](state, action) : state;

export { initialStateConfigSystem, reducerConfigSystem, HANDLERS_CONFIGSYSTEM };