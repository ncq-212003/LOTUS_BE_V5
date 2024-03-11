import dayjs from "dayjs";

const initialStateUnion = {
    unions: [],
    basicInfo: {
        selectedFile: "",
        avatar: "",
        maSoNghiepDoan: "",
        tenNghiepDoan: "",
        syndicateNameOtherLang: "",
        diaChiWebsite: "",
        tinhTrangTrinhCuc: "",
        maSoCapPhep: "",
        nhanVienChamSoc: "",
        ghiChu: "",
        maSoHopDong: "",
        ngayKyHopDong: dayjs(),
        troCapThangDau: "",
        phiCapDaoTao: "",
        thiTruong: null,
        thanhPho: "",
        diaChi: "",
        syndicateAddressOtherLang: "",
        soDienThoai: "",
        fax: "",
        hoTenNguoiDaiDien: "",
        personRepresentOtherLang: "",
        chucVu: "",
        phiQuanLy: "",
        touched: {},
        errors: {},
    },
    contact: [],
};

const HANDLERS_UNION = {
    SET_INPUT_UNION: "SET_INPUT_UNION",
    SET_TOUCHED_UNION: "SET_TOUCHED_UNION",
    SET_ERRORS_UNION: "SET_ERRORS_UNION",
    ADD_UNION: "ADD_UNION",
    LIST_UNION: "LIST_UNION",
    DELETE_UNION: "DELETE_UNION",
    FIND_UNION_BYID: "FIND_UNION_BYID",
    UPDATE_UNION: "UPDATE_UNION",
    SET_VALUES_FOR_EDIT_UNION: "SET_VALUES_FOR_EDIT_UNION",

    SET_FIELD_ROW_UNION: "SET_FIELD_ROW_UNION",
    SET_TOUCHED_ROW_UNION: "SET_TOUCHED_ROW_UNION",
    SET_ERRORS_ROW_UNION: "SET_ERRORS_ROW_UNION",
    ADD_ROW_TABLE_UNION: "ADD_ROW_TABLE_UNION",
    DELETE_ROW_TABLE_UNION: "DELETE_ROW_TABLE_UNION",


};

const handlerUnion = {
    //Set input union
    [HANDLERS_UNION.SET_INPUT_UNION]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;
        if (fieldName === 'syndicateNameOtherLang' || fieldName === 'syndicateAddressOtherLang' || fieldName === 'personRepresentOtherLang') {
            const nValue = JSON.stringify(newValue);
            return {
                ...state,
                [tab]: {
                    ...state[tab],
                    [fieldName]: nValue,
                },
            };
        }

        return {
            ...state,
            [tab]: {
                ...state[tab],
                [fieldName]: newValue,
            },
        };
    },

    // Set touched union
    [HANDLERS_UNION.SET_TOUCHED_UNION]: (state, action) => {
        const { tab, fieldName, value } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                touched: { ...state[tab].touched, [fieldName]: value },
            },
        };
    },

    // Set error union 
    [HANDLERS_UNION.SET_ERRORS_UNION]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                errors: {
                    ...state[tab].errors,
                    [fieldName]: newValue,
                },
            },
        };
    },

    //Add union
    [HANDLERS_UNION.ADD_UNION]: (state, action) => {
        const { basicInfo, contact } = action.payload;

        const newUnion = {
            basicInfo: basicInfo,
            contact: contact,
        };

        return {
            ...state,
            unions: [newUnion],
        };
    },

    // List unions
    [HANDLERS_UNION.LIST_UNION]: (state, action) => {
        return {
            ...state,
            unions: action.payload,
        };
    },



    //Set input row
    [HANDLERS_UNION.SET_FIELD_ROW_UNION]: (state, action) => {
        const { tab, index, fieldName, newValue } = action.payload;
        const updatedRows = [...state[tab]];

        updatedRows[index] = {
            ...updatedRows[index],
            [fieldName]: newValue,
        };
        console.log(updatedRows);

        return {
            ...state,
            [tab]: updatedRows,
        };
    },

    //Set touched row
    [HANDLERS_UNION.SET_TOUCHED_ROW_UNION]: (state, action) => {
        const { tab, index, fieldName, value } = action.payload;

        const updatedRowsTouched = [...state[tab]];

        updatedRowsTouched[index].touched = {
            ...updatedRowsTouched[index].touched,
            [fieldName]: value,
        };

        return {
            ...state,
            [tab]: updatedRowsTouched,
        };
    },



    //Set error row
    [HANDLERS_UNION.SET_ERRORS_ROW_UNION]: (state, action) => {
        const { tab, index, fieldName, newValue } = action.payload;
        const updatedRowsErrors = [...state[tab]];

        updatedRowsErrors[index].errors = {
            ...updatedRowsErrors[index].errors,
            [fieldName]: newValue,
        };

        return {
            ...state,
            [tab]: updatedRowsErrors,
        };
    },




    //Add row table
    [HANDLERS_UNION.ADD_ROW_TABLE_UNION]: (state, action) => {
        const { tab, newRow } = action.payload;
        return {
            ...state,
            [tab]: [...state[tab], { ...newRow }],
        };
    },

    //Delete row
    [HANDLERS_UNION.DELETE_ROW_TABLE_UNION]: (state, action) => {
        const { tab, index } = action.payload;
        const newArray = [...state[tab]];
        newArray.splice(index, 1);
        return {
            ...state,
            [tab]: newArray,
        };
    },

    //Set value for edit
    [HANDLERS_UNION.SET_VALUES_FOR_EDIT_UNION]: (state, action) => {
        const { rowData } = action.payload;
        console.log(rowData);
        console.log(dayjs(rowData.contractSignDate));

        return {
            ...state,
            basicInfo: {
                syndicateId: rowData.syndicateId,
                selectedFile: "",
                avatar: rowData.syndicateLogo || "",
                maSoNghiepDoan: rowData.syndicateCode || "",
                tenNghiepDoan: rowData.syndicateName || "",
                syndicateNameOtherLang: rowData.syndicateNameOtherLang || "",
                diaChiWebsite: rowData.website || "",
                tinhTrangTrinhCuc: rowData.status || "",
                maSoCapPhep: rowData.approveNumber || "",
                nhanVienChamSoc: rowData.employee || null,
                ghiChu: rowData.description || "",
                maSoHopDong: rowData.contractNumber || "",
                ngayKyHopDong: dayjs(rowData.contractSignDate) || dayjs(),
                troCapThangDau: rowData.supportFirstMonth || "",
                phiCapDaoTao: rowData.feeTraining || "",
                thiTruong: rowData.market || null,
                thanhPho: rowData.region || "",
                diaChi: rowData.syndicateAddress || "",
                syndicateAddressOtherLang: rowData.syndicateAddressOtherLang || "",
                soDienThoai: rowData.telephone || "",
                fax: rowData.fax || "",
                hoTenNguoiDaiDien: rowData.personRepresent || "",
                personRepresentOtherLang: rowData.personRepresentOtherLang || "",
                chucVu: rowData.position || "",
                phiQuanLy: rowData.feeContract || "",
                touched: {},
                errors: {},
            },
            contact: [],
        };
    },

};

const reducerUnion = (state, action) =>
    handlerUnion[action.type] ? handlerUnion[action.type](state, action) : state;

export { initialStateUnion, reducerUnion, HANDLERS_UNION };
