const initialStatePaymentType = {
    paymentTypes: []
}

const HANDLERS_PAYMENT_TYPE = {
    ADD_PAYMENT_TYPE: "ADD_PAYMENT_TYPE",
    LIST_PAYMENT_TYPE: "LIST_PAYMENT_TYPE",
    UPDATE_PAYMENT_TYPE: "UPDATE_PAYMENT_TYPE",
    FIND_PAYMENT_TYPE_BYID: "FIND_PAYMENT_TYPE_BYID"
}

const handlersPaymentType = {
    // add 
    [HANDLERS_PAYMENT_TYPE.ADD_PAYMENT_TYPE]: (state, action) => {
        const paymentType = action.payload;

        return {
            ...state,
            paymentTypes: [...state, paymentType]
        }
    },

    // list
    [HANDLERS_PAYMENT_TYPE.LIST_PAYMENT_TYPE]: (state, action) => {
        const paymentType = action.payload;

        return {
            ...state,
            paymentTypes: paymentType
        }
    },

    // update 
    [HANDLERS_PAYMENT_TYPE.UPDATE_PAYMENT_TYPE]: (state, action) => {
        return state;
    },

    //find
    [HANDLERS_PAYMENT_TYPE.FIND_PAYMENT_TYPE_BYID]: (state, action) => {
        const paymentType = action.payload;
        return paymentType;
    }
}

const reducerPaymentType = (state, action) =>
    handlersPaymentType[action.type] ? handlersPaymentType[action.type](state, action) : state;
export { initialStatePaymentType, HANDLERS_PAYMENT_TYPE, reducerPaymentType }