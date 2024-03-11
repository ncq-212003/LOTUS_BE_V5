import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useApp } from "src/hooks/use-app";
import { Typography } from "@mui/material";
import { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import { useEffect } from "react";
import { useState } from "react";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export default function InfoBaseEmployee({ rowData }) {
  const {
    avatar,
    employeeCode,
    departmentValues,
    employeeName,
    birthday,
    contractDate,
    sex,
    nationality,
    mobilePhone,
    educationLevelId,
    marriedStatus,
    ethnicity,
    religion,
    employeeType,
    email,
    identification,
    identificationDate,
    identificationLocation,
    domicileCityId,
    domicileDistrictId,
    domicileWardId,
    normallyAddress,
    temporaryAddress,
    domicileAddress,
    passportProvideLocation,
    passportNumber,
    passportProvideDate,
    passwordExpiredDate,
    visaNumber,
    visaProvideDate,
    visaExpiredDate,
    visaTclt,
  } = rowData;
  console.log(rowData);
  const [nameCity, setNameCity] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [nameEducation, setNameEducation] = useState("");

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
        // console.log(educationLevels);
        setNameEducation(
          educationLevels.find((edu) => edu.educationLevelId === educationLevelId)
            ?.educationLevelName
        );
      }
    };
    listEducation();
  }, []);

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
          {/* Thông tin cơ bản */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4} style={{ marginBottom: "20px" }}>
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
              </Grid>
            </Grid>

            {/* Họ tên */}

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Mã nhân viên:</span>
              {employeeCode}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Công ty - Phòng ban:</span>{" "}
              <ul>
                {departmentValues.map((dep, index) => (
                  <li key={index}>
                    {dep.company} - {dep.label}
                  </li>
                ))}
              </ul>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Vai trò:</span> Trưởng phòng
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Họ & Tên:</span> {employeeName}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày sinh:</span> {formatDate(birthday)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày ký hợp đồng:</span>{" "}
              {formatDate(contractDate)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Giới tính:</span> {sex}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Quốc tịch:</span> {nationality}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Điện thoại di động:</span> {mobilePhone}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Email:</span> {email}
            </Typography>

            {/* Trình độ văn hóa */}
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Trình độ văn hóa:</span> {nameEducation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Dân tộc:</span> {ethnicity}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tôn giáo:</span> {religion}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Hình thức nhân viên:</span> {employeeType}
            </Typography>
          </Box>

          {/* Address */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Địa chỉ
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Địa chỉ tạm chú:</span> {temporaryAddress}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Địa chỉ nguyên quán:</span> {domicileAddress}
            </Typography>
          </Box>
        </Grid>

        <Grid item sm={12} md={6} xs={12}>
          {/* CCCD */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Căn cước công dân
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Số CCCD:</span> {identification}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày cấp:</span> {formatDate(identificationDate)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Nơi cấp:</span> {identificationLocation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Tỉnh / TP Nguyên quán:</span> {nameCity}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Quận / Huyện Nguyên quán:</span> {nameDistrict}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Xã / Phường Nguyên quán:</span> {nameWard}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Địa chỉ thường trú:</span> {normallyAddress}
            </Typography>
          </Box>

          {/* Hộ chiếu */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Hộ chiếu
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Số hộ chiếu:</span> {passportNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Nơi cấp hộ chiếu:</span>{" "}
              {passportProvideLocation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày cấp:</span>{" "}
              {formatDate(passportProvideDate)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span>{" "}
              {formatDate(passwordExpiredDate)}
            </Typography>
          </Box>

          {/* Visa */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2"  sx={{ marginBottom: "16px" }}>
              Thông tin visa
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Số hồ sơ:</span> {visaNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span>{" "}
              {formatDate(visaProvideDate)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span>{" "}
              {formatDate(visaExpiredDate)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Ngày hết hạn:</span> {formatDate(visaTclt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
