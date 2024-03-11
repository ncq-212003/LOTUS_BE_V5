import dayjs from "dayjs";
import LotusClient, { UploadSingleImage } from "../lotus-api";

export const addStudentApi = async (studentData) => {
  const {
    thongTinCoBan,
    tinhTrangSucKhoe,
    nguyenVongTrungTuyen,
    daoTao,
    quanHeGiaDinh,
    quaTrinhHocTap,
    kinhNghiemTrongNuoc,
    kinhNghiemNgoaiNuoc,
    ghiChuChung,
  } = studentData;
  // console.log(
  //   thongTinCoBan,
  //   tinhTrangSucKhoe,
  //   nguyenVongTrungTuyen,
  //   daoTao,
  //   quanHeGiaDinh,
  //   quaTrinhHocTap,
  //   kinhNghiemTrongNuoc,
  //   kinhNghiemNgoaiNuoc,
  //   ghiChuChung
  // );

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
  const listCommonInfoFamily = quanHeGiaDinh.map((family, index) => {
    return {
      CommonInfoFamilyId: 1,
      ObjCode: null,
      ObjType: null,
      FirstName: family.HoTen,
      MiddleName: null,
      LastName: null,
      Birthday: family.NamSinh,
      Relationship: family.QuanHe,
      Job: family.NgheNghiep,
      Address: family.DiaChi,
      Mobile: family.DiDong,
      IsLiveEachother: family.SongChung === "Có" ? true : false,
      Income: parseInt(family.ThuNhap.replace(/\./g, ''), 10),
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
      Salary: parseInt(x.MucLuong.replace(/\./g, ''), 10),
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
      Salary: parseInt(x.MucLuong.replace(/\./g, ''), 10),
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
    returnValue: 0,
    iStudentId: 1, // đổi thành intern
    marketId: marketId,
    profileCode: thongTinCoBan.maHoSo,
    iStudentCode: thongTinCoBan.maHocSinh,
    dateRegister: dateRegister,
    dateEntrance: dateEntrance,
    commonStatusId: 1,
    balance: 0,
    field1: "1",
    field2: "1",
    field3: "1",
    field4: "1",
    field5: "1",
    timeStamp: "1",
    createdAt: new Date().toISOString(),
    createdBy: 1,
    lastModifedAt: new Date().toISOString(),
    lastModifedBy: 1,
    flag: "1",
    firstName: thongTinCoBan.ten,
    middleName: thongTinCoBan.tenDem,
    lastName: thongTinCoBan.ho,
    email: thongTinCoBan.email,
    sex: thongTinCoBan.gioiTinh,
    birthday: birthday,
    marriedStatus: thongTinCoBan.tinhTrangHonNhan,
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
    employeeRecruitmentId: thongTinCoBan.canBoTuyenDung.value,
    progressProfile: thongTinCoBan.tienTrinhHoSo,
    programId: '1',
    listPassExperience: JSON.stringify(experience),
    supplySourceId: thongTinCoBan.nhomNguon.value,
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
    eClassId: daoTao.danhSachLopId.value,
    listCommonInfoFamily: JSON.stringify(listCommonInfoFamily),
    listStudyProgress: JSON.stringify(listStudyProgress),
    listExperienceVietNam: JSON.stringify(listExperienceVietNam),
    listExperienceOverSea: JSON.stringify(listExperienceOverSea),
    description: ghiChuChung.ghiChu,
    schoolWishId: nguyenVongTrungTuyen.muonVaoTruongId.value,
    schoolPassId: nguyenVongTrungTuyen.truongTrungTuyenId.value,
    majorId: nguyenVongTrungTuyen.chuyenNganhHocId.value,
    numYear: nguyenVongTrungTuyen.soHocKy,
    educationLevelId: thongTinCoBan.trinhDoVanHoa,
    educationLevelWishId: nguyenVongTrungTuyen.capHoc,
    versionId: 0,
    EmployeeCode: '1',
    ListWishMarketId: JSON.stringify(listWishMarket),
  };

  // console.log('formData: ', formData);
  try {
    const response = await LotusClient.post("/Student/insert", formData);
    return response;
  } catch (error) {
    return error;
  }
};

// export const updateStudentApi = async (studentData) => {
//   const {
//     thongTinCoBan,
//     tinhTrangSucKhoe,
//     nguyenVongTrungTuyen,
//     daoTao,
//     quanHeGiaDinh,
//     quaTrinhHocTap,
//     kinhNghiemTrongNuoc,
//     kinhNghiemNgoaiNuoc,
//     ghiChuChung,
//   } = studentData;
//   console.log(
//     thongTinCoBan,
//     tinhTrangSucKhoe,
//     nguyenVongTrungTuyen,
//     daoTao,
//     quanHeGiaDinh,
//     quaTrinhHocTap,
//     kinhNghiemTrongNuoc,
//     kinhNghiemNgoaiNuoc,
//     ghiChuChung
//   );

//   const dateRegister = dayjs(thongTinCoBan.ngayDangKy).format("YYYY-MM-DD");
//   const dateEntrance = dayjs(thongTinCoBan.ngayNhapHoc).format("YYYY-MM-DD");
//   const birthday = dayjs(thongTinCoBan.ngaySinh).format("YYYY-MM-DD");
//   const identificationDate = dayjs(thongTinCoBan.ngayCapCCCD).format("YYYY-MM-DD");
//   const passportProvideDate = dayjs(thongTinCoBan.ngayCapHoChieu).format("YYYY-MM-DD");
//   const passwordExpiredDate = dayjs(thongTinCoBan.ngayHetHanHoChieu).format("YYYY-MM-DD");
//   const visaProvideDate = dayjs(thongTinCoBan.ngayCapVisa).format("YYYY-MM-DD");
//   const visaExpiredDate = dayjs(thongTinCoBan.ngayHetHanVisa).format("YYYY-MM-DD");
//   const visaTclt = dayjs(thongTinCoBan.ngayNhanTCLT).format("YYYY-MM-DD");

//   const formData = {
//     returnValue: 0,
//     iStudentId: thongTinCoBan.studentId, // đổi thành intern
//     marketId: 1,
//     profileCode: thongTinCoBan.maHoSo,
//     iStudentCode: thongTinCoBan.maHocSinh,
//     dateRegister: dateRegister,
//     dateEntrance: dateEntrance,
//     commonStatusId: 1,
//     balance: 0,
//     field1: "1",
//     field2: "1",
//     field3: "1",
//     field4: "1",
//     field5: "1",
//     timeStamp: "1",
//     createdAt: new Date().toISOString(),
//     createdBy: 1,
//     lastModifedAt: new Date().toISOString(),
//     lastModifedBy: 1,
//     flag: "1",
//     firstName: thongTinCoBan.ten,
//     middleName: thongTinCoBan.tenDem,
//     lastName: thongTinCoBan.ten,
//     email: thongTinCoBan.email,
//     sex: thongTinCoBan.gioiTinh,
//     birthday: birthday,
//     marriedStatus: thongTinCoBan.tinhTrangHonNhan,
//     ethnicity: thongTinCoBan.maDanToc.label,
//     religion: thongTinCoBan.tonGiao,
//     identification: thongTinCoBan.soCCCD,
//     identificationDate: identificationDate,
//     identificationLocation: thongTinCoBan.noiCapCCCD.label,
//     passportNumber: thongTinCoBan.ngayCapHoChieu,
//     passportProvideLocation: thongTinCoBan.noiCapHoChieu.value,
//     passportProvideDate: passportProvideDate,
//     passwordExpiredDate: passwordExpiredDate,
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
//     supplySourceId: thongTinCoBan.nhomNguon.value,
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
//     listProfile: null,
//     listCommonInfoFamily: null,
//     listStudyProgress: null,
//     listExperienceVietNam: null,
//     listExperienceOverSea: null,
//     description: ghiChuChung.ghiChu,
//   };

//   console.log(formData);
//   // try {
//   //   const response = await LotusClient.put("/Intern/update", formData);
//   //   return response;
//   // } catch (error) {
//   //   return error;
//   // }
// };

export const listStudentApi = async () => {
  try {
    const response = await LotusClient.get("/Student/all?sortByExpression=createdAt%20desc");
    return response;
  } catch (error) {
    return error;
  }
};

export const findStudentByIdApi = async (studentId) => {
  try {
    const response = await LotusClient.get(`/Student/${studentId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const countStudentApi = async () => {
  try {
    const response = await LotusClient.get("/Student/by/count");
    return response;
  } catch (error) {
    return error;
  }
};

export const listStudentPaginationApi = async (pageIndex, pageSize) => {
  try {
    const response = await LotusClient.get(`/Student/by/${pageIndex}/${pageSize}`);
    return response;
  } catch (error) {
    return error;
  }
};