import LotusClient from "../lotus-api";

export const addClassroomApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/EClass/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateClassroomApi = async (data) => {
    try {
        const response = await LotusClient.put('/EClass/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listClassroomApi = async () => {
    try {
        const response = await LotusClient.get('/EClass/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findClassroomByIdApi = async (eClassId) => {
    try {
        const response = await LotusClient.get(`/EClass/${eClassId}`);
        return response;
    } catch (error) {
        return error;
    }
}