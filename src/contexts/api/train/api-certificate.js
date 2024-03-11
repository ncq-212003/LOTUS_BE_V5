import LotusClient from "../lotus-api";

// Get all Certificate
export const listCertificateApi = async() => {
    try {
        const response = await LotusClient.get("/Certificate/all?sortByExpression=createdAt%20desc");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add Certificate
export const addCertificateApi = async(data) => {
    try {
        const respone = await LotusClient.post("/Certificate/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit Certificate
export const editCertificateApi = async(data) => {
    try {
        const response = await LotusClient.put("/Certificate/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find Certificate by ID
export const findCertificateByIDApi = async (certificateId) => {
    try {
        const response = await LotusClient.get(`/Certificate/${certificateId}`);
        return response;
    } catch (error) {
        return error;
    }
}