import dayjs from "dayjs";
import LotusClient, { UploadSingleImage } from "../lotus-api";

export const addUnionApi = async (data) => {
    const { basicInfo, contact } = data;
    console.log(basicInfo);
    console.log(contact);

    const contractSignDate = dayjs(basicInfo.ngayKyHopDong).format("YYYY-MM-DD");
    const personContactList = JSON.stringify(contact)
    // .slice(1, -1);   

    console.log(personContactList);

    const formData =
    {
        syndicateId: 3,
        syndicateLogo: basicInfo.avatar,
        syndicateCode: basicInfo.maSoNghiepDoan,
        syndicateName: basicInfo.tenNghiepDoan,
        syndicateNameOtherLang: basicInfo.syndicateNameOtherLang,
        website: basicInfo.diaChiWebsite,
        statusAprove: basicInfo.tinhTrangTrinhCuc.value,
        approveNumber: basicInfo.maSoCapPhep,
        employeeIdTakecare: basicInfo.nhanVienChamSoc.value,
        contractNumber: basicInfo.maSoHopDong,
        contractSignDate: contractSignDate,
        supportFirstMonth: basicInfo.troCapThangDau,
        feeTraining: basicInfo.phiCapDaoTao,
        marketId: basicInfo.thiTruong.value,
        regionId: basicInfo.thanhPho.value,
        syndicateAddress: basicInfo.diaChi,
        syndicateAddressOtherLang: basicInfo.syndicateAddressOtherLang,
        telephone: basicInfo.soDienThoai,
        fax: basicInfo.fax,
        personRepresent: basicInfo.hoTenNguoiDaiDien,
        personRepresentOtherLang: basicInfo.personRepresentOtherLang,
        position: basicInfo.chucVu,
        feeContract: basicInfo.phiQuanLy,
        description: basicInfo.ghiChu,
        field1: null,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
        timeStamp: Math.floor(new Date().getTime() / 1000),
        createdAt: new Date().toISOString(),
        createdBy: null,
        lastModifiedAt: new Date().toISOString(),
        lastModifiedBy: null,
        flag: null,
        personContactList: personContactList,
    }
    console.log(formData);
    try {
        const response = await LotusClient.post('/Syndicate/insert', formData);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateUnionApi = async (data) => {
    const { basicInfo, contact } = data;
    const contractSignDate = dayjs(basicInfo.ngayKyHopDong).format("YYYY-MM-DD");
    const personContactList = JSON.stringify(contact)
    const feeContract = parseFloat(basicInfo.phiQuanLy.replace(/\./g, ""));
    console.log(basicInfo);
    try {
        const formData =
        {
            syndicateId: basicInfo.syndicateId,
            syndicateLogo: basicInfo.avatar,
            syndicateCode: basicInfo.maSoNghiepDoan,
            syndicateName: basicInfo.tenNghiepDoan,
            syndicateNameOtherLang: basicInfo.syndicateNameOtherLang,
            website: basicInfo.diaChiWebsite,
            statusAprove: basicInfo.tinhTrangTrinhCuc.value,
            approveNumber: basicInfo.maSoCapPhep,
            employeeIdTakecare: basicInfo.nhanVienChamSoc.value,
            contractNumber: basicInfo.maSoHopDong,
            contractSignDate: contractSignDate,
            supportFirstMonth: basicInfo.troCapThangDau,
            feeTraining: basicInfo.phiCapDaoTao,
            marketId: basicInfo.thiTruong.value,
            regionId: basicInfo.thanhPho.value,
            syndicateAddress: basicInfo.diaChi,
            syndicateAddressOtherLang: basicInfo.syndicateAddressOtherLang,
            telephone: basicInfo.soDienThoai,
            fax: basicInfo.fax,
            personRepresent: basicInfo.hoTenNguoiDaiDien,
            personRepresentOtherLang: basicInfo.personRepresentOtherLang,
            position: basicInfo.chucVu,
            feeContract: feeContract,
            description: basicInfo.ghiChu,
            field1: null,
            field2: null,
            field3: null,
            field4: null,
            field5: null,
            timeStamp: Math.floor(new Date().getTime() / 1000),
            createdAt: new Date().toISOString(),
            createdBy: null,
            lastModifiedAt: new Date().toISOString(),
            lastModifiedBy: null,
            flag: null,
            personContactList: personContactList,
        }

        console.log(formData);

        const response = await LotusClient.put('/Syndicate/update', formData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listUnionApi = async () => {
    try {
        const response = await LotusClient.get('/Syndicate/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findUnionByIdApi = async (syndicateId) => {
    try {
        const response = await LotusClient.get(`/Syndicate/${syndicateId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const uploadAvatar = async (uploadDirectory, fileName) => {
    try {
        const data = {
            file: fileName,
        };
        const response = await UploadSingleImage.post(`?uploadDirectory=${uploadDirectory}`, data);

        return response;
    } catch (error) {
        return error;
    }
};