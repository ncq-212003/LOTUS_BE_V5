import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import { listSupplySourceApi } from "src/contexts/api/partner/api-supplySource";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { listSupplyTypeApi } from "src/contexts/api/setting/api-supply-type";

const useSupplySourceOption = () => {
  const [supplySourceTypeOption, setSupplySourceTypeOption] = useState([]);
  const [supplySourceOption, setSupplySourceOption] = useState([]);

  //listSupplySourceType
  useEffect(() => {
    const listSupplySourceType = async () => {
      const res = await listSupplyTypeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const supplySouceTypes = res.data.map((sst) => ({
          supplySourceTypeName: sst.supplySourceTypeName,
          supplySourceTypeId: sst.supplySourceTypeId,
        }));
        setSupplySourceTypeOption(supplySouceTypes);
      }
    };
    listSupplySourceType();
  }, []);

  //listSupplySource
  useEffect(() => {
    const listSupplySource = async () => {
      const res = await listSupplySourceApi();
      const cityOptions = await fetchCities();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const supplySources = res.data.map((ss) => ({
          value: ss.supplySourceId,
          label:
            ss.supplySourceTypeId === 2
              ? cityOptions.find((city) => city.value === ss.locationId)?.label
              : ss.supplySourceTypeId === 1
              ? ss.fullName
              : supplySourceTypeOption.find(
                  (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                )?.supplySourceTypeName,
          typeSupply:
            ss.supplySourceTypeId === 1 || ss.supplySourceTypeId === 2
              ? supplySourceTypeOption.find(
                  (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                )?.supplySourceTypeName
              : "Khác",
        }));
        setSupplySourceOption(supplySources);
      }
    };
    listSupplySource();
  }, [supplySourceTypeOption]);

  const optionsForSupplySource = supplySourceOption.map((option) => ({
    typeSupply: option.typeSupply,
    ...option,
  }));

  return optionsForSupplySource
    .filter((option) => option.value !== 6)
    .sort((a, b) => (a.typeSupply > b.typeSupply ? 1 : -1));
};

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export default function TabInfoBasic({ rowData }) {
  const {
    profileCode,
    iLaborCode,
    dateEntrance,
    lastName,
    middleName,
    firstName,
    birthday,
    sex,
    nationality,
    email,
    marriedStatus,
    educationLevelId,
    ethnicity,
    religion,
    progressProfile,
    programId,
    dateRegister,
    identification,
    identificationDate,
    identificationLocation,
    passportNumber,
    passportProvideLocation,
    passportProvideDate,
    passportExpiredDate,
    visaNumber,
    visaProvideDate,
    visaExpiredDate,
    visaTclt,
    domicileCityId,
    domicileDistrictId,
    domicileWardId,
    normallyAddress,
    mobilePhone,
    temporaryAddress,
    domicileAddress,
    avatar,
    avatarFullBody,
    listWishMarketId,
    employeeRecruitmentId,
    listPassExperience,
    supplySourceId,
  } = rowData;

  // console.log(rowData);

  const [nameCity, setNameCity] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [nameEducation, setNameEducation] = useState("");
  const [employeeRecruitmentName, setEmployeeRecruitmentName] = useState([]);
  const [profileProgressName, setProfileProgressName] = useState([]);
  const supplySource = useSupplySourceOption();

  // list location
  useEffect(() => {
    const updateListLocation = async () => {
      const cities = await fetchCities();
      const districts = await fetchDistricts(domicileCityId);
      const wards = await fetchWards(domicileDistrictId);

      setNameCity(cities.find((city) => city.value === domicileCityId)?.label);
      setNameDistrict(districts.find((district) => district.value === domicileDistrictId)?.label);
      setNameWard(wards.find((ward) => ward.value === domicileWardId)?.label);
    };
    updateListLocation();
  }, [rowData]);

  //list educationLevel
  useEffect(() => {
    const listEducation = async () => {
      const res = await listEducationLevelApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const educationLevels = res.data.map((edu) => ({
          educationLevelName: edu.name,
          educationLevelId: edu.educationLevelId,
        }));
        setNameEducation(
          educationLevels.find((edu) => edu.educationLevelId === educationLevelId)
            ?.educationLevelName
        );
      }
    };
    listEducation();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          employeeName: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          employeeId: employee.employeeId,
        }));
        setEmployeeRecruitmentName(
          employees.find((emp) => emp.employeeId === employeeRecruitmentId)?.employeeName
        );
      }
    };
    listEmployeeName();
  }, []);

  //listProfileProgress
  useEffect(() => {
    const listData = async () => {
      const res = await listStatusByAliasApi("tien-do-ho-so");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.statusName,
          value: com.commonStatusId,
        }));
        setProfileProgressName(data.find(progress=>progress.value === progressProfile)?.label);
      }
    };
    listData();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Thông tin cơ bản
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Mã hồ sơ:</span> {profileCode}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Mã thực tập sinh:</span> {iLaborCode}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Ngày nhập học:</span>{" "}
                {formatDate(dateEntrance)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Họ:</span> {lastName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tên đệm:</span> {middleName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tên:</span> {firstName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày sinh:</span> {formatDate(birthday)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Giới tính:</span> {sex}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Quốc tịch:</span> {nationality}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Điện thoại di động:</span> {mobilePhone}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Email:</span> {email}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Tình trạng hôn nhân:</span> {marriedStatus}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Trình độ văn hóa:</span> {nameEducation}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Dân tộc:</span> {ethnicity}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Tôn giáo:</span> {religion}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Tiến độ hồ sơ:</span> {profileProgressName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Chương trình tham gia:</span> {programId}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Ngày đăng ký:</span> {formatDate(dateRegister)}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Hộ chiếu
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Số hộ chiếu:</span> {passportNumber}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Nơi cấp hộ chiếu:</span>{" "}
                {passportProvideLocation}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày cấp:</span>{" "}
                {formatDate(passportProvideDate)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span>{" "}
                {formatDate(passportExpiredDate)}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px", marginTop: "16px" }}
                textAlign="center"
              >
                Thông tin visa
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Số hồ sơ:</span> {visaNumber}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày cấp:</span> {formatDate(visaProvideDate)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span>{" "}
                {formatDate(visaExpiredDate)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày nhận TCLT:</span> {formatDate(visaTclt)}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Căn cước công dân
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Số CCCD:</span> {identification}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Nơi cấp:</span> {identificationLocation}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày cấp:</span>{" "}
                {formatDate(identificationDate)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Tỉnh, thành phố:</span> {nameCity}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Quận / huyện:</span> {nameDistrict}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Xã / phường:</span> {nameWard}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Địa chỉ thường trú:</span> {normallyAddress}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Địa chỉ
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Địa chỉ tạm trú:</span> {temporaryAddress}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Địa chỉ nguyên quán:</span> {domicileAddress}
                XYZ
              </Typography>
              <Box
                sx={{
                  margin: "20px 0px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                    Ảnh chân dung
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{
                        width: "120px",
                        height: "160px",
                      }}
                      variant="rounded"
                      src={"https://lotus.i.tisbase.online" + avatar}
                    ></Avatar>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                    Ảnh toàn thân
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{
                        width: "120px",
                        height: "160px",
                      }}
                      variant="rounded"
                      src={"https://lotus.i.tisbase.online" + avatarFullBody}
                    ></Avatar>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Thông tin nộp hồ sơ
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Muốn đi:</span>{" "}
                {JSON.parse(listWishMarketId)
                  .map((wtg) => wtg.wishMarket)
                  .join(", ")}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Cán bộ tuyển dụng:</span>{" "}
                {employeeRecruitmentName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Kinh nghiệm:</span>{" "}
                {JSON.parse(listPassExperience)
                  .map((exp) => exp.job)
                  .join(", ")}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>Nhóm nguồn cung ứng:</span>{" "}
                {supplySource.find((supply) => supply.value === supplySourceId)?.label}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
