const initialStateRoom = {
    rooms: [],
};

const HANDLERS_ROOM = {
    ADD_ROOM: "ADD_ROOM",
    LIST_ROOM: "LIST_ROOM",
    DELETE_ROOM: "DELETE_ROOM",
    FIND_ROOM_BYID: "FIND_ROOM_BYID",
    UPDATE_ROOM: "UPDATE_ROOM",
};

const handlersRoom = {
    // add
    [HANDLERS_ROOM.ADD_ROOM]: (state, action) => {
        const room = action.payload;

        return {
            ...state,
            rooms: [...state, room],
        };
    },

    // list
    [HANDLERS_ROOM.LIST_ROOM]: (state, action) => {
        const roomsData = action.payload;

        return {
            ...state,
            rooms: roomsData,
        };
    },

    // delete
    [HANDLERS_ROOM.DELETE_ROOM]: (state, action) => {
        return {
            rooms: [],
        };
    },

    // find byid
    [HANDLERS_ROOM.FIND_ROOM_BYID]: (state, action) => {
        const room = action.payload;

        return room;
    },

    // update
    [HANDLERS_ROOM.UPDATE_ROOM]: (state, action) => {
        return state;
    },
};

const reducerRoom = (state, action) =>
    handlersRoom[action.type] ? handlersRoom[action.type](state, action) : state;

export { initialStateRoom, reducerRoom, HANDLERS_ROOM };
