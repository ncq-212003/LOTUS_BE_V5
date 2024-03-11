const initialStatePaymentGroup = {
    paymenttGroups: []
}

const HANDLERS_PAYMENT_GROUP = {
    ADD_PAYMENT_GROUP: 'ADD_PAYMENT_GROUP',
    LIST_PAYMENT_GROUP: 'LIST_PAYMENT_GROUP',
    UPDATE_PAYMENT_GROUP: 'UPDATE_PAYMENT_GROUP',
    FIND_PAYMENT_GROUP: 'FIND_PAYMENT_GROUP',
    DELETE_PAYMENT_GROUP: 'DELETE_PAYMENT_GROUP',
}

const handlersPaymentGroup = {
    [HANDLERS_PAYMENT_GROUP.ADD_PAYMENT_GROUP]: (state, action) => {
        const paymentGroup = action.payload;

        return {
            ...state,
            paymenttGroups: [...state, paymentGroup]
        }
    },

    [HANDLERS_PAYMENT_GROUP.LIST_PAYMENT_GROUP]: (state, action) => {
        const paymentGroup = action.payload;

        return {
            ...state,
            paymenttGroups: paymentGroup
        }
    },

    //delete 
    [HANDLERS_PAYMENT_GROUP.DELETE_PAYMENT_GROUP]: (state, action) => {
        return {
            paymenttGroups: []
        }
    },

    // update
    [HANDLERS_PAYMENT_GROUP.UPDATE_PAYMENT_GROUP]: (state, action) => {
        return state;
    },

    // find by id
    [HANDLERS_PAYMENT_GROUP.FIND_PAYMENT_GROUP]: (state, action) => {
        const paymentGroup = action.payload;

        return paymentGroup;
    },

}

const reducerPaymentGroup = (state, action) =>
    handlersPaymentGroup[action.type] ? handlersPaymentGroup[action.type](state, action) : state;
export { initialStatePaymentGroup, reducerPaymentGroup, HANDLERS_PAYMENT_GROUP }