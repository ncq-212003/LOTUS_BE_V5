const HANDLERS_CERTIFICATE = {
    ADD_CERTIFICATE: 'ADD_CERTIFICATE',
    LIST_CERTIFICATE: 'LIST_CERTIFICATE',
    UPDATE_CERTIFICATE: 'UPDATE_CERTIFICATE',
    DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
    FIND_CERTIFICATE_BYID: 'FIND_CERTIFICATE_BYID'
}

const initialStateCertificate = {
    certificate: []
}

const handlersCertificate = {
    [HANDLERS_CERTIFICATE.LIST_CERTIFICATE]: (state, action) => {
        const certificatesData = action.payload;

        return {
            ...state,
            certificates: certificatesData,
        };
    },

    [HANDLERS_CERTIFICATE.ADD_CERTIFICATE]: (state, action) => {
        const CERTIFICATE = action.payload;

        return {
            ...state,
            certificates: [...state, CERTIFICATE],
        }
    },

    [HANDLERS_CERTIFICATE.UPDATE_CERTIFICATE]: (state, action) => {
        return state;
    },

    // delete
    [HANDLERS_CERTIFICATE.DELETE_CERTIFICATE]: (state, action) => {
        return {
            certificates: [],
        };
    },

    // find byid
    [HANDLERS_CERTIFICATE.FIND_CERTIFICATE_BYID]: (state, action) => {
        const menu = action.payload;

        return menu;
    },
}

const reducerCertificate = (state, action) =>
    handlersCertificate[action.type] ? handlersCertificate[action.type](state, action) : state;

export { initialStateCertificate, reducerCertificate, HANDLERS_CERTIFICATE };