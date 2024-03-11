import LotusClient from "../lotus-api";


export const addFeatureApi = async (data) => {
    try {
        const response = await LotusClient.post('/FunctionSystem/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateFeatureApi = async (data) => {
    try {
        const response = await LotusClient.put('/FunctionSystem/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listFeatureApi = async () => {
    try {
        const response = await LotusClient.get('/FunctionSystem/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findFeatureByIdApi = async (functionSystemId) => {
    try {
        const response = await LotusClient.get(`/FunctionSystem/${functionSystemId}`);
        return response;
    } catch (error) {
        return error;
    }
}