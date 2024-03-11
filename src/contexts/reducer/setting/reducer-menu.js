const initialStateMenu = {
    menus: [],
};

const HANDLERS_MENU = {
    ADD_MENU: "ADD_MENU",
    LIST_MENU: "LIST_MENU",
    DELETE_MENU: "DELETE_MENU",
    FIND_MENU_BYID: "FIND_MENU_BYID",
    UPDATE_MENU: "UPDATE_MENU",
};

const handlersMenu = {
    // add
    [HANDLERS_MENU.ADD_MENU]: (state, action) => {
        const menu = action.payload;

        return {
            ...state,
            menus: [ ...state, menu],
        };
    },

    // list
    [HANDLERS_MENU.LIST_MENU]: (state, action) => {
        const menusData = action.payload;

        return {
            ...state,
            menus: menusData,
        };
    },

    // delete
    [HANDLERS_MENU.DELETE_MENU]: (state, action) => {
        return {
            menus: [],
        };
    },

    // find byid
    [HANDLERS_MENU.FIND_MENU_BYID]: (state, action) => {
        const menu = action.payload;

        return menu;
    },

    // update
    [HANDLERS_MENU.UPDATE_MENU]: (state, action) => {
        return state;
    },
};

const reducerMenu = (state, action) =>
  handlersMenu[action.type] ? handlersMenu[action.type](state, action) : state;

export { initialStateMenu, reducerMenu, HANDLERS_MENU };
