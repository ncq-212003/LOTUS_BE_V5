import LotusClient from "../lotus-api";

export const addCarApi = async (carData) => {
    try {
        const response = await LotusClient.post('/Car/insert', carData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCarApi = async () => {
    try {
        const response = await LotusClient.get('/Car/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCarByIdApi = async (carId) => {
    try {
        const response = await LotusClient.get(`/Car/${carId}`)
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCarApi = async (carData) => {
    try {
        const response = await LotusClient.put('/Car/update', carData);
        return response;
    } catch (error) {
        return error;
    }
}