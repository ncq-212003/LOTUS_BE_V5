import LotusClient from "../lotus-api";

export const addAddressApi = async (addressData) => {
    try {
        const response = await LotusClient.post('/Place/insert', addressData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listAddressApi = async () => {
    try {
        const response = await LotusClient.get('/Place/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const updateAddressApi = async (addressData) => {
    try {
        const response = await LotusClient.put('/Place/update', addressData);
        return response;
    } catch (error) {
        return error;
    }
}

export const findAddressByIdApi = async (placeId) => {
    try {
        const response = await LotusClient.get(`/Place/${placeId}`);
        return response;
    } catch (error) {
        return error;
    }
}