import LotusClient from "../lotus-api";

export const addCompanyReceivingApi = async (data) => {
    try {
        const response = await LotusClient.post('/CompanyOversea/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCompanyReceivingApi = async (data) => {
    try {
        const response = await LotusClient.put('/CompanyOversea/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCompanyReceivingApi = async () => {
    try {
        const response = await LotusClient.get('/CompanyOversea/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCompanyReceivingByIdApi = async (companyId) => {
    try {
        const response = await LotusClient.get(`/CompanyOversea/${companyId}`);
        return response;
    } catch (error) {
        return error;
    }
}