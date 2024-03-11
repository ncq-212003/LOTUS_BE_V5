const initialStateNotification = {
    notifications: [],
};

const HANDLERS_NOTIFICATION = {
    ADD_NOTIFICATION: "ADD_NOTIFICATION",
    LIST_NOTIFICATION: "LIST_NOTIFICATION",
    UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
    FIND_NOTIFICATION_BYID: "FIND_NOTIFICATION_BYID",
};

const handlersNotification = {
    // add
    [HANDLERS_NOTIFICATION.ADD_NOTIFICATION]: (state, action) => {
        const notification = action.payload;

        return {
            ...state,
            notifications: [ ...state, notification],
        };
    },

    // list
    [HANDLERS_NOTIFICATION.LIST_NOTIFICATION]: (state, action) => {
        const notificationsData = action.payload;

        return {
            ...state,
            notifications: notificationsData,
        };
    },

    // find byid
    [HANDLERS_NOTIFICATION.FIND_NOTIFICATION_BYID]: (state, action) => {
        const notification = action.payload;

        return notification;
    },

    // update
    [HANDLERS_NOTIFICATION.UPDATE_NOTIFICATION]: (state, action) => {
        return state;
    },
};

const reducerNotification = (state, action) =>
  handlersNotification[action.type] ? handlersNotification[action.type](state, action) : state;

export { initialStateNotification, reducerNotification, HANDLERS_NOTIFICATION };