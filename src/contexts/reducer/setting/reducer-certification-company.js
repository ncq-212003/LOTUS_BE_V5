const initialStateCertificationCompany = {
    certificationCompanys: []
}

const HANDLERS_CERTIFICATION_COMPANY = {
    ADD_CERTIFICATION_COMPANY: 'ADD_CERTIFICATION_COMPANY',
    LIST_CERTIFICATION_COMPANY: 'LIST_CERTIFICATION_COMPANY',
    FIND_CERTIFICATION_COMPANY: 'FIND_CERTIFICATION_COMPANY',
    UPDATE_CERTIFICATION_COMPANY: 'UPDATE_CERTIFICATION_COMPANY',
    DELETE_CERTIFICATION_COMPANY: 'DELETE_CERTIFICATION_COMPANY',
}

const handlersCertificationCompany = {
    [HANDLERS_CERTIFICATION_COMPANY.ADD_CERTIFICATION_COMPANY]: (state, action) => {
        const certificationCompany = action.payload;

        return {
            ...state,
            certificationCompanys: [...state, certificationCompany]
        }
    },

    // list
    [HANDLERS_CERTIFICATION_COMPANY.LIST_CERTIFICATION_COMPANY]: (state, action) => {
        const certificationCompany = action.payload;

        return {
            ...state,
            certificationCompanys: certificationCompany
        }
    },

    // find
    [HANDLERS_CERTIFICATION_COMPANY.FIND_CERTIFICATION_COMPANY]: (state, action) => {
        const certificationCompany = action.payload;
        return certificationCompany;
    },

    //delete
    [HANDLERS_CERTIFICATION_COMPANY.DELETE_CERTIFICATION_COMPANY]: (state, action) => {
        return {
            certificationCompanys: []
        }
    },

    // update 
    [HANDLERS_CERTIFICATION_COMPANY.UPDATE_CERTIFICATION_COMPANY]: (state, action) => {
        return state;
    }
}

const reudecerCertificationCompany = (state, action) =>
    handlersCertificationCompany[action.type] ? handlersCertificationCompany[action.type](state, action) : state;
export { initialStateCertificationCompany, HANDLERS_CERTIFICATION_COMPANY, reudecerCertificationCompany } 