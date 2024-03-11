import LotusClient from "../lotus-api";

export const addProcessApi = async (processData) => {
    try {
        const response = await LotusClient.post('/Process/insert', processData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listProcessApi = async () => {
    try {
        const response = await LotusClient.get('/Process/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const updateProcessApi = async (processData) => {
    try {
        const response = await LotusClient.put(`/Process/update`, processData);
        return response;
    } catch (error) {
        return error;
    }
}

export const findProcessById = async (processId) => {
    try {
        const response = await LotusClient.get(`/Process/${processId}`);
        return response;
    } catch (error) {
        return error;
    }
}

