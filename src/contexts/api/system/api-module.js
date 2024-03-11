import LotusClient from "../lotus-api";


export const addModuleApi = async (data) => {
    try {
        const response = await LotusClient.post('/ModuleSystem/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateModuleApi = async (data) => {
    try {
        const response = await LotusClient.put('/ModuleSystem/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listModuleApi = async () => {
    try {
        const response = await LotusClient.get('/ModuleSystem/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findModuleByIdApi = async (moduleSystemId) => {
    try {
        const response = await LotusClient.get(`/ModuleSystem/${moduleSystemId}`);
        return response;
    } catch (error) {
        return error;
    }
}