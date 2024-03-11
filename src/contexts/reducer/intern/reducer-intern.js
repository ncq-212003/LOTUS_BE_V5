import axios from "axios";
import dayjs from "dayjs";
import Profiles from "./profile.json";

const initialStateIntern = {
  thucTapSinh: [],
  thongTinCoBan: {
    selectedPortraitPhoto: "",
    selectedFullBodyPhoto: "",
    internId: 1,
    maHoSo: "",
    maThucTapSinh: "",
    ngayNhapHoc: dayjs(),
    ho: "",
    tenDem: "",
    ten: "",
    ngaySinh: null,
    gioiTinh: "Nam",
    quocTich: "Việt Nam",
    email: "",
    tinhTrangHonNhan: "Độc thân",
    trinhDoVanHoa: 1,
    maDanToc: { label: "Kinh", value: 1 },
    tonGiao: "Không",
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
    uongRuou: "Không",
    hutThuoc: "Không",
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
  hoSo: Profiles,
  daoTao: {
    maLop: "",
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
  },
};

const HANDLERS_INTERN = {
  SET_TOUCHED_INTERN: "SET_TOUCHED_INTERN",
  SET_ERRORS_INTERN: "SET_ERRORS_INTERN",
  SET_TOUCHED_ROW_INTERN: "SET_TOUCHED_ROW_INTERN",
  SET_ERRORS_ROW_INTERN: "SET_ERRORS_ROW_INTERN",
  SET_TOUCHED_PROFILE: "SET_TOUCHED_PROFILE",
  SET_ERRORS_PROFILE: "SET_ERRORS_PROFILE",
  SET_INPUT_INTERN: "SET_INPUT_INTERN",
  SET_PROFILE_FIELD: "SET_PROFILE_FIELD",
  SET_FIELD_ROW_INTERN: "SET_FIELD_ROW_INTERN",
  SET_VALUES_FOR_EDIT_INTERN: "SET_VALUES_FOR_EDIT_INTERN",
  RESET_INTERN: "RESET_INTERN",
  ADD_ROW_TABLE_INTERN: "ADD_ROW_TABLE_INTERN",
  // ADD_INTERN: "ADD_INTERN",
  LIST_INTERN: "LIST_INTERN",
  DELETE_ROW_TABLE_INTERN: "DELETE_ROW_TABLE_INTERN",
  DELETE_INTERN: "DELETE_INTERN",
};

const handlersIntern = {
  // set touched
  [HANDLERS_INTERN.SET_TOUCHED_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_ERRORS_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_INPUT_INTERN]: (state, action) => {
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

  //set profile field
  [HANDLERS_INTERN.SET_PROFILE_FIELD]: (state, action) => {
    const { questionId, newValue } = action.payload;

    const updatedProfile = state.hoSo.map((question) =>
      question.questionId === questionId ? { ...question, answer: newValue } : question
    );

    return {
      ...state,
      hoSo: updatedProfile,
    };
  },

  //set touched profile field
  [HANDLERS_INTERN.SET_TOUCHED_PROFILE]: (state, action) => {
    const { questionId, fieldName, newValue } = action.payload;

    const updatedProfileTouched = state.hoSo.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            touched: {
              ...question.touched,
              [fieldName]: newValue,
            },
          }
        : question
    );
    return {
      ...state,
      hoSo: updatedProfileTouched,
    };
  },

  //set errors profile field
  [HANDLERS_INTERN.SET_ERRORS_PROFILE]: (state, action) => {
    const { questionId, fieldName, newValue } = action.payload;
    const updatedProfileErrors = state.hoSo.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            errors: {
              ...question.errors,
              [fieldName]: newValue,
            },
          }
        : question
    );

    return {
      ...state,
      hoSo: updatedProfileErrors,
    };
  },

  //set input row
  [HANDLERS_INTERN.SET_FIELD_ROW_INTERN]: (state, action) => {
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

  //set touched row
  [HANDLERS_INTERN.SET_TOUCHED_ROW_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_ERRORS_ROW_INTERN]: (state, action) => {
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

  //set value for edit
  [HANDLERS_INTERN.SET_VALUES_FOR_EDIT_INTERN]: (state, action) => {
    const { rowData } = action.payload;
    console.log(rowData.wantToGoes);
    return {
      ...state,
      thongTinCoBan: {
        internId: rowData.abc || 1,
        maHoSo: rowData.profileCode || "",
        maThucTapSinh: rowData.iLaborCode || "",
        ngayNhapHoc:  dayjs(rowData.dateEntrance) || dayjs(),
        ho: rowData.lastName || "",
        tenDem: rowData.middleName || "",
        ten: rowData.firstName || "",
        ngaySinh: dayjs(rowData.birthday) || null,
        quocTich: rowData.nationality || "Việt Nam",
        email: rowData.email || "",
        gioiTinh: rowData.sex || "Nam",
        tinhTrangHonNhan: rowData.marriedStatus || 19,
        trinhDoVanHoa: rowData.educationLevelId || 6,
        maDanToc: rowData.ethnicity || { label: "Kinh", value: 1 },
        tonGiao: rowData.religion || "Không",
        tienTrinhHoSo: rowData.progressProfile || 22,
        maChuongTrinhThamGia: rowData.programId || "",
        ngayDangKy:  dayjs(rowData.dateRegister) || dayjs(),
        soCCCD: rowData.identification || "",
        ngayCapCCCD:  dayjs(rowData.identificationDate) || dayjs(),
        noiCapCCCD: rowData.identificationLocation || "",
        soHoChieu: rowData.passportNumber || "",
        noiCapHoChieu: rowData.passportProvideLocation || "",
        ngayCapHoChieu:  dayjs(rowData.passportProvideDate) || dayjs(),
        ngayHetHanHoChieu:  dayjs(rowData.passportExpiredDate) || dayjs().add(10, "year"),
        soHoSoVisa: rowData.visaNumber || "",
        ngayCapVisa:  dayjs(rowData.visaProvideDate) || dayjs(),
        ngayHetHanVisa:  dayjs(rowData.visaExpiredDate) || dayjs().add(2, "year"),
        ngayNhanTCLT:  dayjs(rowData.visaTclt) || dayjs().add(3, "month"),
        maThanhPho: rowData.nameCity || "",
        maQuan: rowData.nameDistrict || "",
        maPhuong: rowData.nameWard || "",
        diaChiThuongTru: rowData.normallyAddress || "",
        diaChiTamTru: rowData.temporaryAddress || "",
        diaChiNguyenQuan: rowData.domicileAddress || "",
        dienThoai: rowData.mobilePhone || "",
        anhChanDung: rowData.avatar || "",
        anhToanThan: rowData.avatarFullBody || "",
        muonDi: rowData.wantToGoes || [],
        canBoTuyenDung: rowData.employeeName || "",
        kinhNghiem: rowData.listExperiences || [],
        nhomNguon: rowData.supplySourceName || "",
        touched: {},
        errors: {},
      },
      tinhTrangSucKhoe: {
        nhomMau: "",
        canNang: "",
        chieuCao: "",
        uongRuou: "Không",
        hutThuoc: "Không",
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
      hoSo: Profiles,
      daoTao: {
        maLop: "",
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
      },
    };
  },

  // reset form
  [HANDLERS_INTERN.RESET_INTERN]: (state, action) => {
    return {
      ...state,
      thongTinCoBan: {
        selectedPortraitPhoto: "",
        selectedFullBodyPhoto: "",
        internId: 1,
        maHoSo: "",
        maThucTapSinh: "",
        ngayNhapHoc: dayjs(),
        ho: "",
        tenDem: "",
        ten: "",
        ngaySinh: null,
        quocTich: "Việt Nam",
        email: "",
        gioiTinh: "Nam",
        tinhTrangHonNhan: 19,
        trinhDoVanHoa: 6,
        maDanToc: { label: "Kinh", value: 1 },
        tonGiao: "Không",
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
        uongRuou: "Không",
        hutThuoc: "Không",
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
      hoSo: Profiles,
      daoTao: {
        maLop: "",
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
      },
    };
  },

  //add row table
  [HANDLERS_INTERN.ADD_ROW_TABLE_INTERN]: (state, action) => {
    const { tab, newRow } = action.payload;
    return {
      ...state,
      [tab]: [...state[tab], { ...newRow }],
    };
  },

  [HANDLERS_INTERN.LIST_INTERN]: (state, action) => {
    const thucTapSinh = action.payload;

    return {
      ...state,
      thucTapSinh: thucTapSinh,
    };
  },

  //delete row
  [HANDLERS_INTERN.DELETE_ROW_TABLE_INTERN]: (state, action) => {
    const { tab, index } = action.payload;
    const newArray = [...state[tab]];
    newArray.splice(index, 1);
    return {
      ...state,
      [tab]: newArray,
    };
  },

  //delete intern
  [HANDLERS_INTERN.DELETE_INTERN]: (state, action) => {
    return {
      thucTapSinh: [],
    };
  },
};

const reducerIntern = (state, action) =>
  handlersIntern[action.type] ? handlersIntern[action.type](state, action) : state;

export { initialStateIntern, reducerIntern, HANDLERS_INTERN };
