const initialStateCompany = {
    companies: [],
};

const HANDLERS_COMPANY = {
    ADD_COMPANY: "ADD_COMPANY",
    LIST_COMPANY: "LIST_COMPANY",
    DELETE_COMPANY: "DELETE_COMPANY",
    FIND_COMPANY_BYID: "FIND_COMPANY_BYID",
    UPDATE_COMPANY: "UPDATE_COMPANY",
};

const handlersCompany = {
    // add
    [HANDLERS_COMPANY.ADD_COMPANY]: (state, action) => {
        const company = action.payload;

        return {
            ...state,
            companies: [ ...state, company],
        };
    },

    // list
    [HANDLERS_COMPANY.LIST_COMPANY]: (state, action) => {
        const companies = action.payload;

        return {
            ...state,
            companies: [companies],
        };
    },

    // delete
    [HANDLERS_COMPANY.DELETE_COMPANY]: (state, action) => {
        return {
            companies: [],
        };
    },

    // find byid
    [HANDLERS_COMPANY.FIND_COMPANY_BYID]: (state, action) => {
        const company = action.payload;

        return company;
    },

    // update
    [HANDLERS_COMPANY.UPDATE_COMPANY]: (state, action) => {
        return state;
    },
};

const reducerCompany = (state, action) =>
  handlersCompany[action.type] ? handlersCompany[action.type](state, action) : state;

export { initialStateCompany, reducerCompany, HANDLERS_COMPANY };