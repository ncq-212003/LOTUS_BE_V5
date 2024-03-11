const initialStateCompanyReceiving = {
    companies: [],
};

const HANDLERS_COMPANY_RECEIVING = {
    ADD_COMPANY_RECEIVING: "ADD_COMPANY_RECEIVING",
    LIST_COMPANY_RECEIVING: "LIST_COMPANY_RECEIVING",
    DELETE_COMPANY_RECEIVING: "DELETE_COMPANY_RECEIVING",
    FIND_COMPANY_RECEIVING_BYID: "FIND_COMPANY_RECEIVING_BYID",
    UPDATE_COMPANY_RECEIVING: "UPDATE_COMPANY_RECEIVING",
};

const handlersCompanyReceiving = {
    // add
    [HANDLERS_COMPANY_RECEIVING.ADD_COMPANY_RECEIVING]: (state, action) => {
        const company = action.payload;

        return {
            ...state,
            companies: [ ...state, company],
        };
    },

    // list
    [HANDLERS_COMPANY_RECEIVING.LIST_COMPANY_RECEIVING]: (state, action) => {
        const companies = action.payload;

        return {
            ...state,
            companies: companies,
        };
    },

    // delete
    [HANDLERS_COMPANY_RECEIVING.DELETE_COMPANY_RECEIVING]: (state, action) => {
        return {
            companies: [],
        };
    },

    // find byid
    [HANDLERS_COMPANY_RECEIVING.FIND_COMPANY_RECEIVING_BYID]: (state, action) => {
        const company = action.payload;

        return company;
    },

    // update
    [HANDLERS_COMPANY_RECEIVING.UPDATE_COMPANY_RECEIVING]: (state, action) => {
        return state;
    },
};

const reducerCompanyReceiving = (state, action) =>
  handlersCompanyReceiving[action.type] ? handlersCompanyReceiving[action.type](state, action) : state;

export { initialStateCompanyReceiving, reducerCompanyReceiving, HANDLERS_COMPANY_RECEIVING };