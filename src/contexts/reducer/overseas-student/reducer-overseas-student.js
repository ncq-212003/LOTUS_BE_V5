import dayjs from "dayjs";

const initialStateOverseasStudent = {
    duHocSinh: [],
    thongTinCoBan: {
        selectedPortraitPhoto: "",
        selectedFullBodyPhoto: "",
        overseasStId: 1,
        maHoSo: "",
        maHocSinh: "",
        ngayNhapHoc: dayjs(),
        ho: "",
        tenDem: "",
        ten: "",
        ngaySinh: null,
        gioiTinh: "Nam",
        quocTich: "Việt Nam",
        email: "",
        tinhTrangHonNhan: 'Độc thân',
        trinhDoVanHoa: 1,
        maDanToc: { label: 'Kinh', value: 1 },
        tonGiao: 'Không',
        tienTrinhHoSo: 22,
        maChuongTrinhThamGia: "",
        ngayDangKy: dayjs(),
        soCCCD: "",
        ngayCapCCCD: dayjs(),
        noiCapCCCD: "",
        noiCapHoChieu: "",
        soHoChieu: "",
        ngayCapHoChieu: dayjs(),
        ngayHetHanHoChieu: dayjs().add(10, "year"),
        soHoSoVisa: "",
        ngayCapVisa: dayjs(),
        ngayHetHanVisa: dayjs().add(2, "year"),
        ngayNhanTCLT: dayjs().add(3, "month"),
        maThanhPho: "",
        maQuan: "",
        maPhuong: "",
        diaChiThuongTru: "",
        diaChiTamTru: "",
        diaChiNguyenQuan: "",
        dienThoai: "",
        anhChanDung: "",
        anhToanThan: "",
        muonDi: [],
        canBoTuyenDung: "",
        kinhNghiem: [],
        nhomNguon: "",
        touched: {},
        errors: {},
    },
    tinhTrangSucKhoe: {
        nhomMau: "",
        canNang: "",
        chieuCao: "",
        uongRuou: "Không lựa chọn",
        hutThuoc: "Không lựa chọn",
        thiLucTrai: "",
        thiLucPhai: "",
        tayThuan: "Không lựa chọn",
        muMau: "Không lựa chọn",
        moHoiTay: "Không lựa chọn",
        soDoCao: "Không lựa chọn",
        coHinhXam: "Không lựa chọn",
        chiTietHinhXam: "",
        touched: {},
        errors: {},
    },
    nguyenVongTrungTuyen: {
        muonVaoTruongId: "",
        truongTrungTuyenId: "",
        chuyenNganhHocId: "",
        soHocKy: "",
        capHoc: 6,
        touched: {},
        errors: {},
    },
    daoTao: {
        danhSachLopId: "",
        chuNhiemLop: "",
        soDienThoaiChuNhiemLop: "",
        ngayKhaiGiang: dayjs(),
        ngayKetThuc: dayjs(),
        touched: {},
        errors: {},
    },
    quanHeGiaDinh: [],
    quaTrinhHocTap: [],
    kinhNghiemTrongNuoc: [],
    kinhNghiemNgoaiNuoc: [],
    ghiChuChung: {
        ghiChu: "",
    }
};

const HANDLERS_OVERSEAS_STUDENT = {
    SET_INPUT_OVERSEAS_STUDENT: "SET_INPUT_OVERSEAS_STUDENT",
    ADD_OVERSEAS_STUDENT: "ADD_OVERSEAS_STUDENT",
    DELETE_OVERSEAS_STUDENT: "DELETE_OVERSEAS_STUDENT",
    ADD_ROW_TABLE_OVERSEAS_STUDENT: "ADD_ROW_TABLE_OVERSEAS_STUDENT",
    SET_FIELD_ROW_OVERSEAS_STUDENT: "SET_FIELD_ROW_OVERSEAS_STUDENT",
    DELETE_ROW_TABLE_OVERSEAS_STUDENT: "DELETE_ROW_TABLE_OVERSEAS_STUDENT",
    SET_TOUCHED_OVERSEAS_STUDENT: "SET_TOUCHED_OVERSEAS_STUDENT",
    SET_ERRORS_OVERSEAS_STUDENT: "SET_ERRORS_OVERSEAS_STUDENT",
    SET_TOUCHED_ROW_OVERSEAS_STUDENT: "SET_TOUCHED_ROW_OVERSEAS_STUDENT",
    SET_ERRORS_ROW_OVERSEAS_STUDENT: "SET_ERRORS_ROW_OVERSEAS_STUDENT",
    SET_VALUES_FOR_EDIT_OVERSEAS_STUDENT: "SET_VALUES_FOR_EDIT_OVERSEAS_STUDENT",
    RESET_OVERSEAS_STUDENT: "RESET_OVERSEAS_STUDENT",
    LIST_OVERSEAS_STUDENT: "LIST_OVERSEAS_STUDENT",
};

const handlersOverseasStudent = {
    //set value for edit
    [HANDLERS_OVERSEAS_STUDENT.SET_VALUES_FOR_EDIT_OVERSEAS_STUDENT]: (state, action) => {
        const { rowData } = action.payload;

        return {
            ...state,
            thongTinCoBan: {
                selectedPortraitPhoto: "",
                selectedFullBodyPhoto: "",
                overseasStId: 1,
                maHoSo: "",
                maHocSinh: "",
                ngayNhapHoc: dayjs(),
                ho: "",
                tenDem: "",
                ten: "",
                ngaySinh: null,
                gioiTinh: "Nam",
                quocTich: "Việt Nam",
                email: "",
                tinhTrangHonNhan: 'Đã kết hôn',
                trinhDoVanHoa: 1,
                maDanToc: { label: 'Kinh', value: 1 },
                tonGiao: 'Không',
                tienTrinhHoSo: 22,
                maChuongTrinhThamGia: "",
                ngayDangKy: dayjs(),
                soCCCD: "",
                ngayCapCCCD: dayjs(),
                noiCapCCCD: "",
                noiCapHoChieu: "",
                soHoChieu: "",
                ngayCapHoChieu: dayjs(),
                ngayHetHanHoChieu: dayjs().add(10, "year"),
                soHoSoVisa: "",
                ngayCapVisa: dayjs(),
                ngayHetHanVisa: dayjs().add(2, "year"),
                ngayNhanTCLT: dayjs().add(3, "month"),
                maThanhPho: "",
                maQuan: "",
                maPhuong: "",
                diaChiThuongTru: "",
                diaChiTamTru: "",
                diaChiNguyenQuan: "",
                dienThoai: "",
                anhChanDung: "",
                anhToanThan: "",
                muonDi: [],
                canBoTuyenDung: "",
                kinhNghiem: [],
                nhomNguon: "",
                touched: {},
                errors: {},
            },
            tinhTrangSucKhoe: {
                nhomMau: "",
                canNang: "",
                chieuCao: "",
                uongRuou: "Không lựa chọn",
                hutThuoc: "Không lựa chọn",
                thiLucTrai: "",
                thiLucPhai: "",
                tayThuan: "Không lựa chọn",
                muMau: "Không lựa chọn",
                moHoiTay: "Không lựa chọn",
                soDoCao: "Không lựa chọn",
                coHinhXam: "Không lựa chọn",
                chiTietHinhXam: "",
                touched: {},
                errors: {},
            },
            nguyenVongTrungTuyen: {
                muonVaoTruongId: "",
                truongTrungTuyenId: "",
                chuyenNganhHocId: "",
                soHocKy: "",
                capHoc: 6,
                touched: {},
                errors: {},
            },
            daoTao: {
                danhSachLopId: "",
                chuNhiemLop: "",
                soDienThoaiChuNhiemLop: "",
                ngayKhaiGiang: dayjs(),
                ngayKetThuc: dayjs(),
                touched: {},
                errors: {},
            },
            quanHeGiaDinh: [],
            quaTrinhHocTap: [],
            kinhNghiemTrongNuoc: [],
            kinhNghiemNgoaiNuoc: [],
            ghiChuChung: {
                ghiChu: "",
            }
        };
    },

    // reset form
    [HANDLERS_OVERSEAS_STUDENT.RESET_OVERSEAS_STUDENT]: (state, action) => {
        return {
            ...state,
            thongTinCoBan: {
                selectedPortraitPhoto: "",
                selectedFullBodyPhoto: "",
                overseasStId: 1,
                maHoSo: "",
                maHocSinh: "",
                ngayNhapHoc: dayjs(),
                ho: "",
                tenDem: "",
                ten: "",
                ngaySinh: null,
                gioiTinh: "Nam",
                quocTich: "Việt Nam",
                email: "",
                tinhTrangHonNhan: 'Đã kết hôn',
                trinhDoVanHoa: 1,
                maDanToc: { label: 'Kinh', value: 1 },
                tonGiao: 'Không',
                tienTrinhHoSo: 22,
                maChuongTrinhThamGia: "",
                ngayDangKy: dayjs(),
                soCCCD: "",
                ngayCapCCCD: dayjs(),
                noiCapCCCD: "",
                noiCapHoChieu: "",
                soHoChieu: "",
                ngayCapHoChieu: dayjs(),
                ngayHetHanHoChieu: dayjs().add(10, "year"),
                soHoSoVisa: "",
                ngayCapVisa: dayjs(),
                ngayHetHanVisa: dayjs().add(2, "year"),
                ngayNhanTCLT: dayjs().add(3, "month"),
                maThanhPho: "",
                maQuan: "",
                maPhuong: "",
                diaChiThuongTru: "",
                diaChiTamTru: "",
                diaChiNguyenQuan: "",
                dienThoai: "",
                anhChanDung: "",
                anhToanThan: "",
                muonDi: [],
                canBoTuyenDung: "",
                kinhNghiem: [],
                nhomNguon: "",
                touched: {},
                errors: {},
            },
            tinhTrangSucKhoe: {
                nhomMau: "",
                canNang: "",
                chieuCao: "",
                uongRuou: "Không lựa chọn",
                hutThuoc: "Không lựa chọn",
                thiLucTrai: "",
                thiLucPhai: "",
                tayThuan: "Không lựa chọn",
                muMau: "Không lựa chọn",
                moHoiTay: "Không lựa chọn",
                soDoCao: "Không lựa chọn",
                coHinhXam: "Không lựa chọn",
                chiTietHinhXam: "",
                touched: {},
                errors: {},
            },
            nguyenVongTrungTuyen: {
                muonVaoTruongId: "",
                truongTrungTuyenId: "",
                chuyenNganhHocId: "",
                soHocKy: "",
                capHoc: 6,
                touched: {},
                errors: {},
            },
            daoTao: {
                danhSachLopId: "",
                chuNhiemLop: "",
                soDienThoaiChuNhiemLop: "",
                ngayKhaiGiang: dayjs(),
                ngayKetThuc: dayjs(),
                touched: {},
                errors: {},
            },
            quanHeGiaDinh: [],
            quaTrinhHocTap: [],
            kinhNghiemTrongNuoc: [],
            kinhNghiemNgoaiNuoc: [],
            ghiChuChung: {
                ghiChu: "",
            }
        };
    },

    // list
    [HANDLERS_OVERSEAS_STUDENT.LIST_OVERSEAS_STUDENT]: (state, action) => {
        const duHocSinh = action.payload;

        return {
            ...state,
            duHocSinh: duHocSinh,
        };
    },

    //set touched row
    [HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_ROW_OVERSEAS_STUDENT]: (state, action) => {
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

    //set error row
    [HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_ROW_OVERSEAS_STUDENT]: (state, action) => {
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

    // set touched
    [HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, fieldName, value } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                touched: { ...state[tab].touched, [fieldName]: value },
            },
        };
    },

    // set error
    [HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT]: (state, action) => {
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

    // set input
    [HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;

        if (fieldName === "ngayCapHoChieu") {
            const ngayHetHanHoChieu = dayjs(newValue).add(10, "year");

            return {
                ...state,
                [tab]: {
                    ...state[tab],
                    ngayCapHoChieu: newValue,
                    ngayHetHanHoChieu: ngayHetHanHoChieu,
                },
            };
        }

        if (fieldName === "maThanhPho") {
            if (newValue.length === 0) {
                return {
                    ...state,
                    [tab]: {
                        ...state[tab],
                        maThanhPho: "",
                        maQuan: "",
                        maPhuong: "",
                    },
                };
            } else {
                return {
                    ...state,
                    [tab]: {
                        ...state[tab],
                        maThanhPho: newValue,
                        maQuan: "",
                        maPhuong: "",
                    },
                };
            }
        }

        if (fieldName === "maQuan") {
            if (newValue.length === 0) {
                return {
                    ...state,
                    [tab]: {
                        ...state[tab],
                        maQuan: "",
                        maPhuong: "",
                    },
                };
            } else {
                return {
                    ...state,
                    [tab]: {
                        ...state[tab],
                        maQuan: newValue,
                        maPhuong: "",
                    },
                };
            }
        }

        return {
            ...state,
            [tab]: {
                ...state[tab],
                [fieldName]: newValue,
            },
        };
    },

    //add dhs
    [HANDLERS_OVERSEAS_STUDENT.ADD_OVERSEAS_STUDENT]: (state, action) => {
        const {
            thongTinCoBan,
            tinhTrangSucKhoe,
            daoTao,
            quanHeGiaDinh,
            quaTrinhHocTap,
            kinhNghiemTrongNuoc,
            kinhNghiemNgoaiNuoc,
        } = action.payload;

        const newDuHocSinh = {
            thongTinCoBan: thongTinCoBan,
            tinhTrangSucKhoe: tinhTrangSucKhoe,
            daoTao: daoTao,
            quanHeGiaDinh: quanHeGiaDinh,
            quaTrinhHocTap: quaTrinhHocTap,
            kinhNghiemTrongNuoc: kinhNghiemTrongNuoc,
            kinhNghiemNgoaiNuoc: kinhNghiemNgoaiNuoc,
        };

        return {
            ...state,
            duHocSinh: [newDuHocSinh],
        };
    },

    //delete dhs
    [HANDLERS_OVERSEAS_STUDENT.DELETE_OVERSEAS_STUDENT]: (state, action) => {
        return {
            duHocSinh: [],
        };
    },

    //add row table
    [HANDLERS_OVERSEAS_STUDENT.ADD_ROW_TABLE_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, newRow } = action.payload;
        return {
            ...state,
            [tab]: [...state[tab], { ...newRow }],
        };
    },

    //set input row
    [HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index, fieldName, newValue } = action.payload;
        const updatedRows = [...state[tab]];

        updatedRows[index] = {
            ...updatedRows[index],
            [fieldName]: newValue,
        };

        return {
            ...state,
            [tab]: updatedRows,
        };
    },

    //delete row
    [HANDLERS_OVERSEAS_STUDENT.DELETE_ROW_TABLE_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index } = action.payload;
        const newArray = [...state[tab]];
        newArray.splice(index, 1);
        return {
            ...state,
            [tab]: newArray,
        };
    },
};

const reducerOverseasStudent = (state, action) =>
    handlersOverseasStudent[action.type] ? handlersOverseasStudent[action.type](state, action) : state;

export { initialStateOverseasStudent, reducerOverseasStudent, HANDLERS_OVERSEAS_STUDENT };