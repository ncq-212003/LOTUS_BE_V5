import LotusClient from "../lotus-api";

export const addPresentApi = async (presentData) => {
    try {
        const response = await LotusClient.post('/Present/insert', presentData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listPresentApi = async () => {
    try {
        const response = await LotusClient.get('/Present/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const updatePresentApi = async (presentData) => {
    try {
        const response = await LotusClient.put('/Present/update', presentData);
        return response;
    } catch (error) {
        return error;
    }
}

export const findPresentByIdApi = async (presentId) => {
    try {
        const response = await LotusClient.get(`/Present/${presentId}`);
        return response;
    } catch (error) {
        return error;
    }
}