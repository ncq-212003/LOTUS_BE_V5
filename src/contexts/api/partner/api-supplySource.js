import LotusClient from "../lotus-api";

export const addSupplySourceApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/SupplySource/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateSupplySourceApi = async (data) => {
    try {
        const response = await LotusClient.put('/SupplySource/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listSupplySourceApi = async () => {
    try {
        const response = await LotusClient.get('/SupplySource/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findSupplySourceByIdApi = async (supplySourceId) => {
    try {
        const response = await LotusClient.get(`/SupplySource/${supplySourceId}`);
        return response;
    } catch (error) {
        return error;
    }
}