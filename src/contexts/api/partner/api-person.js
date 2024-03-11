import LotusClient from "../lotus-api";

export const addPersonApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/Person/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updatePersonApi = async (data) => {
    try {
        const response = await LotusClient.put('/Person/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listPersonApi = async () => {
    try {
        const response = await LotusClient.get('/Person/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findPersonByIdApi = async (personId) => {
    try {
        const response = await LotusClient.get(`/Person/${personId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const findPersonBySyndicateIdApi = async (syndicateId) => {
    try {
        const response = await LotusClient.get(`/Person/by/${syndicateId}`);
        return response;
    } catch (error) {
        return error;
    }
}