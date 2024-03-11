import LotusClient from "../lotus-api";

export const addBranchApi = async (data) => {
    try {
        const response = await LotusClient.post('/Branch/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateBranchApi = async (data) => {
    try {
        const response = await LotusClient.put('/Branch/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listBranchApi = async () => {
    try {
        const response = await LotusClient.get('/Branch/all?sortByExpression=createdAt%20asc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findBranchByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/Branch/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}