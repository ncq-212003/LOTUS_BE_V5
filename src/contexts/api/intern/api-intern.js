import dayjs from "dayjs";
import LotusClient, { UploadSingleImage } from "../lotus-api";

export const addInternApi = async (internData) => {
  const {
    thongTinCoBan,
    tinhTrangSucKhoe,
    daoTao,
    quanHeGiaDinh,
    quaTrinhHocTap,
    kinhNghiemTrongNuoc,
    kinhNghiemNgoaiNuoc,
    hoSo,
    ghiChuChung,
  } = internData;
  console.log(thongTinCoBan.trinhDoVanHoa);

  const marketId = JSON.parse(window.sessionStorage.getItem("market"))
    ? JSON.parse(window.sessionStorage.getItem("market")).marketId
    : { marketId: 30 };

  const experience = thongTinCoBan.kinhNghiem.map((exp, i) => {
    return {
      id: exp.value,
      code: exp.code,
      market: exp.marketId,
      job: exp.label,
    };
  });

  const listWishMarket = thongTinCoBan.muonDi.map((exp, i) => {
    return {
      id: exp.value,
      wishMarket: exp.label,
    };
  });

  const listProfile = hoSo.map((profile, index) => {
    return {
      questionId: profile.questionId,
      questionName: profile.questionName,
      marketId: marketId,
      type: profile.type,
      category: profile.category,
      options: profile.options,
      answer: profile.answer,
      position: profile.position,
      required: profile.required,
    };
  });

  const listCommonInfoFamily = quanHeGiaDinh.map((family, index) => {
    return {
      CommonInfoFamilyId: 1,
      ObjCode: null,
      ObjType: null,
      FirstName: "John Doe",
      MiddleName: null,
      LastName: null,
      Birthday: family.NgaySinh,
      Relationship: family.QuanHe,
      Job: family.NgheNghiep,
      Address: family.DiaChi,
      Mobile: family.DiDong,
      IsLiveEachother: family.SongChung === "Có" ? true : false,
      Income: parseInt(family.ThuNhap.replace(/\./g, ""), 10),
      Description: null,
      Field1: null,
      Field2: null,
      Field3: null,
      Field4: null,
      Field5: null,
      TimeStamp: null,
      CreatedAt: null,
      CreatedBy: null,
      LastModifedAt: null,
      LastModifedBy: null,
      Flag: null,
    };
  });

  const listStudyProgress = quaTrinhHocTap.map((study, index) => {
    return {
      ObjCode: "SampleObjCode1",
      ObjType: "SampleObjType1",
      StudyFrom: dayjs(study.TuThangNam).format("YYYY-MM-DD"),
      StudyTo: dayjs(study.DenThangNam).format("YYYY-MM-DD"),
      LevelStudyId: study.CapHoc,
      SchoolName: study.TenTruong,
      Address: study.DiaChi,
      MajorField: study.ChuyenNganh,
      Description: study.GhiChu,
    };
  });

  const listExperienceVietNam = kinhNghiemTrongNuoc.map((x, index) => {
    return {
      ObjCode: "SampleObjCode1",
      ObjType: "SampleObjType1",
      IsLocalCompany: true,
      WorkingFrom: dayjs(x.TuThangNam).format("YYYY-MM-DD"),
      WorkingTo: dayjs(x.DenThangNam).format("YYYY-MM-DD"),
      Job: x.CongViec,
      Salary: parseInt(x.MucLuong.replace(/\./g, ""), 10),
      Company: x.CongTy,
      Address: x.DiaChi,
      Description: x.GhiChu,
    };
  });

  const listExperienceOverSea = kinhNghiemNgoaiNuoc.map((x, index) => {
    return {
      ObjCode: "SampleObjCode1",
      ObjType: "SampleObjType1",
      IsLocalCompany: false,
      WorkingFrom: dayjs(x.TuThangNam).format("YYYY-MM-DD"),
      WorkingTo: dayjs(x.DenThangNam).format("YYYY-MM-DD"),
      Job: x.CongViec,
      Salary: parseInt(x.MucLuong.replace(/\./g, ""), 10),
      Company: x.CongTy,
      Address: x.DiaChi,
      Description: x.GhiChu,
    };
  });

  const dateRegister = dayjs(thongTinCoBan.ngayDangKy).format("YYYY-MM-DD");
  const dateEntrance = dayjs(thongTinCoBan.ngayNhapHoc).format("YYYY-MM-DD");
  const birthday = dayjs(thongTinCoBan.ngaySinh).format("YYYY-MM-DD");
  const identificationDate = dayjs(thongTinCoBan.ngayCapCCCD).format("YYYY-MM-DD");
  const passportProvideDate = dayjs(thongTinCoBan.ngayCapHoChieu).format("YYYY-MM-DD");
  const passportExpiredDate = dayjs(thongTinCoBan.ngayHetHanHoChieu).format("YYYY-MM-DD");
  const visaProvideDate = dayjs(thongTinCoBan.ngayCapVisa).format("YYYY-MM-DD");
  const visaExpiredDate = dayjs(thongTinCoBan.ngayHetHanVisa).format("YYYY-MM-DD");
  const visaTclt = dayjs(thongTinCoBan.ngayNhanTCLT).format("YYYY-MM-DD");

  const formData = {
    listWishMarketId: JSON.stringify(listWishMarket),
    employeeRecruitmentId: thongTinCoBan.canBoTuyenDung.value,
    employeeCode: thongTinCoBan.canBoTuyenDung.employeeCode,
    listPassExperience: JSON.stringify(experience),
    supplySourceId: thongTinCoBan.nhomNguon.value,
    returnValue: 0,
    ILaborId: 1,
    marketId: marketId,
    profileCode: thongTinCoBan.maHoSo,
    ILaborCode: thongTinCoBan.maThucTapSinh,
    dateRegister: dateRegister,
    dateEntrance: dateEntrance,
    commonStatusId: 40,
    progressProfile: parseInt(thongTinCoBan.tienTrinhHoSo),
    programId: 1,
    balance: 0,
    field1: "1",
    field2: "1",
    field3: "1",
    field4: "1",
    field5: "1",
    timeStamp: "1",
    createdAt: "2024-01-12T08:42:59.297",
    createdBy: 1,
    lastModifedAt: "2024-01-12T08:42:59.297",
    lastModifedBy: 1,
    flag: "1",
    firstName: thongTinCoBan.ten,
    middleName: thongTinCoBan.tenDem,
    lastName: thongTinCoBan.ho,
    email: thongTinCoBan.email,
    sex: thongTinCoBan.gioiTinh,
    birthday: birthday,
    marriedStatus: thongTinCoBan.tinhTrangHonNhan,
    educationLevelId: thongTinCoBan.trinhDoVanHoa,
    ethnicity: thongTinCoBan.maDanToc.label,
    religion: thongTinCoBan.tonGiao,
    identification: thongTinCoBan.soCCCD,
    identificationDate: identificationDate,
    identificationLocation: thongTinCoBan.noiCapCCCD.label,
    passportNumber: thongTinCoBan.soHoChieu,
    passportProvideLocation: thongTinCoBan.noiCapHoChieu.label,
    passportProvideDate: passportProvideDate,
    passportExpiredDate: passportExpiredDate,
    domicileCityId: thongTinCoBan.maThanhPho.value,
    domicileDistrictId: thongTinCoBan.maQuan.value,
    domicileWardId: thongTinCoBan.maPhuong.value,
    normallyAddress: thongTinCoBan.diaChiThuongTru,
    temporaryAddress: thongTinCoBan.diaChiTamTru,
    domicileAddress: thongTinCoBan.diaChiNguyenQuan,
    telephone: "0",
    mobilePhone: thongTinCoBan.dienThoai,
    avatar: thongTinCoBan.anhChanDung,
    avatarFullBody: thongTinCoBan.anhToanThan,
    visaNumber: thongTinCoBan.soHoSoVisa,
    visaProvideDate: visaProvideDate,
    visaExpiredDate: visaExpiredDate,
    visaTclt: visaTclt,
    nationality: thongTinCoBan.quocTich,
    bmi: tinhTrangSucKhoe.canNang / (tinhTrangSucKhoe.chieuCao * tinhTrangSucKhoe.chieuCao),
    groupBlood: tinhTrangSucKhoe.nhomMau,
    height: tinhTrangSucKhoe.chieuCao,
    weight: tinhTrangSucKhoe.canNang,
    isDrinkWine: tinhTrangSucKhoe.isDrinkWine === "Có" ? true : false,
    isSmoke: tinhTrangSucKhoe.isSmoke === "Có" ? true : false,
    eyeSightRight: tinhTrangSucKhoe.thiLucPhai,
    eyeSightLeft: tinhTrangSucKhoe.thiLucTrai,
    strongHand: tinhTrangSucKhoe.tayThuan,
    colorBlindness: tinhTrangSucKhoe.muMau,
    sweatyHands: tinhTrangSucKhoe.moHoiTay,
    afraidHeight: tinhTrangSucKhoe.soDoCao,
    haveTatoo: tinhTrangSucKhoe.coHinhXam,
    detailTatoo: tinhTrangSucKhoe.chiTietHinhXam,
    versionId: 0,
    eClassId: daoTao.maLop.value,
    listProfile: JSON.stringify(listProfile),
    listCommonInfoFamily: JSON.stringify(listCommonInfoFamily),
    listStudyProgress: JSON.stringify(listStudyProgress),
    listExperienceVietNam: JSON.stringify(listExperienceVietNam),
    listExperienceOverSea: JSON.stringify(listExperienceOverSea),
    description: ghiChuChung.ghiChu,
  };

  console.log(formData);
  try {
    const response = await LotusClient.post("/Labor/insert", formData);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

// export const updateInternApi = async (internData) => {
//   const {
//     thongTinCoBan,
//     tinhTrangSucKhoe,
//     daoTao,
//     quanHeGiaDinh,
//     quaTrinhHocTap,
//     kinhNghiemTrongNuoc,
//     kinhNghiemNgoaiNuoc,
//     hoSo,
//     ghiChuChung,
//   } = internData;
//   console.log(
//     thongTinCoBan,
//     tinhTrangSucKhoe,
//     daoTao,
//     quanHeGiaDinh,
//     quaTrinhHocTap,
//     kinhNghiemTrongNuoc,
//     kinhNghiemNgoaiNuoc,
//     hoSo,
//     ghiChuChung
//   );

//   const dateRegister = dayjs(thongTinCoBan.ngayDangKy).format("YYYY-MM-DD");
//   const dateEntrance = dayjs(thongTinCoBan.ngayNhapHoc).format("YYYY-MM-DD");
//   const birthday = dayjs(thongTinCoBan.ngaySinh).format("YYYY-MM-DD");
//   const identificationDate = dayjs(thongTinCoBan.ngayCapCCCD).format("YYYY-MM-DD");
//   const passportProvideDate = dayjs(thongTinCoBan.ngayCapHoChieu).format("YYYY-MM-DD");
//   const passportExpiredDate = dayjs(thongTinCoBan.ngayHetHanHoChieu).format("YYYY-MM-DD");
//   const visaProvideDate = dayjs(thongTinCoBan.ngayCapVisa).format("YYYY-MM-DD");
//   const visaExpiredDate = dayjs(thongTinCoBan.ngayHetHanVisa).format("YYYY-MM-DD");
//   const visaTclt = dayjs(thongTinCoBan.ngayNhanTCLT).format("YYYY-MM-DD");
//     console.log(thongTinCoBan.trinhDoVanHoa);
//   const formData = {
//     returnValue: 0,
//     iStudentId: thongTinCoBan.internId,
//     marketId: 1,
//     profileCode: thongTinCoBan.maHoSo,
//     iStudentCode: thongTinCoBan.maThucTapSinh,
//     dateRegister: dateRegister,
//     dateEntrance: dateEntrance,
//     commonStatusId: 40,
//     balance: 0,
//     field1: "1",
//     field2: "1",
//     field3: "1",
//     field4: "1",
//     field5: "1",
//     timeStamp: "1",
//     createdAt: "2024-01-12T08:42:59.297",
//     createdBy: 1,
//     lastModifedAt: "2024-01-12T08:42:59.297",
//     lastModifedBy: 1,
//     flag: "1",
//     firstName: thongTinCoBan.ten,
//     middleName: thongTinCoBan.tenDem,
//     lastName: thongTinCoBan.ten,
//     email: thongTinCoBan.email,
//     sex: thongTinCoBan.gioiTinh,
//     birthday: birthday,
//     marriedStatus: thongTinCoBan.tinhTrangHonNhan,
//     educationLevelId: thongTinCoBan.trinhDoVanHoa,
//     ethnicity: thongTinCoBan.maDanToc.label,
//     religion: thongTinCoBan.tonGiao,
//     identification: thongTinCoBan.soCCCD,
//     identificationDate: identificationDate,
//     identificationLocation: thongTinCoBan.noiCapCCCD.label,
//     passportNumber: thongTinCoBan.soHoChieu,
//     passportProvideLocation: thongTinCoBan.noiCapHoChieu,
//     passportProvideDate: passportProvideDate,
//     passportExpiredDate: passportExpiredDate,
//     domicileCityId: thongTinCoBan.maThanhPho.value,
//     domicileDistrictId: thongTinCoBan.maQuan.value,
//     domicileWardId: thongTinCoBan.maPhuong.value,
//     normallyAddress: thongTinCoBan.diaChiThuongTru,
//     temporaryAddress: thongTinCoBan.diaChiTamTru,
//     domicileAddress: thongTinCoBan.diaChiNguyenQuan,
//     telephone: "0",
//     mobilePhone: thongTinCoBan.dienThoai,
//     avatar: thongTinCoBan.anhChanDung,
//     avatarFullBody: thongTinCoBan.anhToanThan,
//     visaNumber: thongTinCoBan.soHoSoVisa,
//     visaProvideDate: visaProvideDate,
//     visaExpiredDate: visaExpiredDate,
//     visaTclt: visaTclt,
//     nationality: thongTinCoBan.quocTich,
//     employeeId: thongTinCoBan.canBoTuyenDung,
//     submitProfileCommonStatusId: thongTinCoBan.tienTrinhHoSo,
//     experience: thongTinCoBan.kinhNghiem, // cái này chưa làm xong
//     supplySourceId: thongTinCoBan.nhomNguon,
//     bmi: tinhTrangSucKhoe.canNang / (tinhTrangSucKhoe.chieuCao * tinhTrangSucKhoe.chieuCao),
//     groupBlood: tinhTrangSucKhoe.nhomMau,
//     height: tinhTrangSucKhoe.chieuCao,
//     weight: tinhTrangSucKhoe.canNang,
//     isDrinkWine: tinhTrangSucKhoe.isDrinkWine === "Có" ? true : false,
//     isSmoke: tinhTrangSucKhoe.isSmoke === "Có" ? true : false,
//     eyeSightRight: tinhTrangSucKhoe.thiLucPhai,
//     eyeSightLeft: tinhTrangSucKhoe.thiLucTrai,
//     strongHand: tinhTrangSucKhoe.tayThuan,
//     colorBlindness: tinhTrangSucKhoe.muMau,
//     sweatyHands: tinhTrangSucKhoe.moHoiTay,
//     afraidHeight: tinhTrangSucKhoe.soDoCao,
//     haveTatoo: tinhTrangSucKhoe.coHinhXam,
//     detailTatoo: tinhTrangSucKhoe.chiTietHinhXam,
//     eClassId: daoTao.maLop,
//     listProfile: null,
//     listCommonInfoFamily: null,
//     listStudyProgress: null,
//     listExperienceVietNam: null,
//     listExperienceOverSea: null,
//     description: ghiChuChung.ghiChu || "1",
//   };

//   console.log(formData);
//   // try {
//   //   const response = await LotusClient.put("/Intern/update", formData);
//   //   return response;
//   // } catch (error) {
//   //   return error;
//   // }
// };

export const listInternApi = async () => {
  try {
    const response = await LotusClient.get("/Labor/all?sortByExpression=createdAt%20desc");
    return response;
  } catch (error) {
    return error;
  }
};

export const findInternByIdApi = async (internId) => {
  try {
    const response = await LotusClient.get(`/Intern/${internId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const countInternApi = async () => {
  try {
    const response = await LotusClient.get("/Labor/by/count");
    return response;
  } catch (error) {
    return error;
  }
};

export const listInternPaginationApi = async (pageIndex, pageSize) => {
  try {
    const response = await LotusClient.get(`/Labor/by/${pageIndex}/${pageSize}`);
    return response;
  } catch (error) {
    return error;
  }
};
