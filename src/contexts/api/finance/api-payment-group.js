import LotusClient from "../lotus-api";

export const addPaymentGroupApi = async (data) => {
    try {
        const response = await LotusClient.post('/PaymentGroup/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listPaymentGroupApi = async () => {
    try {
        const response = await LotusClient.get('/PaymentGroup/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const updatePaymentGroupApi = async (data) => {
    try {
        const response = await LotusClient.put("/PaymentGroup/update", data);
        return response;
    } catch (error) {
        return error;
    }
}

export const findPaymentGroupByIdApi = async (paymentgroupId) => {
    try {
        const response = await LotusClient.get(`/PaymentGroup/${paymentgroupId}`);
        return response;
    } catch (error) {
        return error;
    }
}