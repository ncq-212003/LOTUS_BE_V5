import LotusClient from "../lotus-api";


export const addRoleApi = async (data) => {
    try {
        const response = await LotusClient.post('/RoleSystem/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateRoleApi = async (data) => {
    try {
        const response = await LotusClient.put('/RoleSystem/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listRoleApi = async () => {
    try {
        const response = await LotusClient.get('/RoleSystem/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findRoleByIdApi = async (roleSystemId) => {
    try {
        const response = await LotusClient.get(`/RoleSystem/${roleSystemId}`);
        return response;
    } catch (error) {
        return error;
    }
}