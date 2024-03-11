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
  return dayjs(date);
};

export default function InfoBaseEmployee({ rowData }) {
  const {
    avatar,
    employeeCode,
    departmentValues,
    lastName,
    middleName,
    firstName,
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
              <Grid item xs={12} md={4} lg={4} style={{ marginBottom: "-20px" }}>
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
              <Grid item xs={12} md={8} lg={8}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={employeeCode}
                  name="employeeCode"
                  variant="outlined"
                  fullWidth
                  required
                  label="Mã nhân viên"
                  sx={{ margin: "1px", marginBottom: "15px", marginTop: "10px" }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Mã nhân viên:</span>{employeeCode}
                </Typography>
                <Autocomplete
                  readOnly
                  value={departmentValues}
                  name="department"
                  multiple
                  limitTags={2}
                  id="checkboxes-department"
                  disableCloseOnSelect
                  size="small"
                  sx={{ marginBottom: "17px" }}
                  options={[]}
                  groupBy={(option) => option.companies}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Công ty - Phòng ban" />
                  )}
                />
                <Autocomplete
                  readOnly
                  options={[]}
                  name="role"
                  multiple
                  limitTags={3}
                  disableCloseOnSelect
                  size="small"
                  sx={{ width: "100%" }}
                  groupBy={(option) => option.company + " - " + option.department}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, optionRole, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {optionRole.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Vai trò" />
                  )}
                />
              </Grid>
            </Grid>

            {/* Họ tên */}
            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={lastName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Họ"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={middleName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Tên đệm"
                  name="middleName"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={firstName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Tên"
                  name="firstName"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    readOnly
                    value={formatDate(birthday)}
                    name="birthday"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                      },
                    }}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    readOnly
                    value={formatDate(contractDate)}
                    name="contractDate"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                      },
                    }}
                    label="Ngày ký hợp đồng"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: "-13px" }}>
                <FormLabel>Giới tính</FormLabel>
                <RadioGroup row name="sex" value={sex}>
                  <FormControlLabel value="Nam" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio size="small" />} label="Nữ" />
                </RadioGroup>
              </Grid>
            </Grid>

            <Autocomplete
              readOnly
              value={nationality}
              name="nationality"
              fullWidth
              size="small"
              sx={{ margin: "10px 0" }}
              options={["Việt Nam", "Nhật Bản", "Hàn Quốc", "Úc", "Mỹ"]}
              renderInput={(params) => (
                <TextField {...params} label="Quốc tịch" variant="outlined" />
              )}
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={mobilePhone}
              name="mobilePhone"
              variant="outlined"
              required
              size="small"
              label="Điện thoại di động"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={email}
              name="email"
              variant="outlined"
              required
              sx={{ marginTop: "12px" }}
              size="small"
              label="Email"
              fullWidth
            />

            {/* Trình độ văn hóa */}
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={nameEducation}
              name="educationLevelId"
              fullWidth
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Trình độ văn hóa"
              SelectProps={{ native: true }}
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={marriedStatus}
              name="marriedStatus"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Tình trạng hôn nhân"
              variant="outlined"
              size="small"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={ethnicity}
              name="ethnicity"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Dân tộc"
              variant="outlined"
              size="small"
            />
            <Autocomplete
              readOnly
              value={religion}
              name="religion"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Phật", "Không"]}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Tôn giáo" />
              )}
            />
            <Autocomplete
              readOnly
              value={employeeType}
              name="employeeType"
              fullWidth
              size="small"
              options={["Toàn thời gian", "Bán thời gian"]}
              sx={{ marginTop: "12px" }}
              renderInput={(params) => (
                <TextField {...params} label="Hình thức nhân viên" variant="outlined" />
              )}
            />
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
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={temporaryAddress}
              name="temporaryAddress"
              required
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ tạm trú"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={domicileAddress}
              name="domicileAddress"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ nguyên quán"
              fullWidth
            />
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

            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={identification}
              name="identification"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số CCCD"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="identificationDate"
                value={formatDate(identificationDate)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={identificationLocation}
              name="identificationLocation"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nơi cấp"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={nameCity}
              name="domicileCityId"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tỉnh / TP Nguyên quán"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={nameDistrict}
              name="domicileDistrictId"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Quận / Huyện Nguyên quán"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={nameWard}
              name="domicileWardId"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Xã / Phường Nguyên quán"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={normallyAddress}
              name="normallyAddress"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ thường trú"
              fullWidth
            />
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
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={passportNumber}
              name="passportNumber"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hộ chiếu"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={passportProvideLocation}
              name="passportProvideLocation"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nơi cấp hộ chiếu"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="passportProvideDate"
                value={formatDate(passportProvideDate)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="passwordExpiredDate"
                value={formatDate(passwordExpiredDate)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày hết hạn"
              />
            </LocalizationProvider>
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
            <Typography variant="h6" component="h2">
              Thông tin visa
            </Typography>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={visaNumber}
              name="visaNumber"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hồ sơ"
              fullWidth
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="visaProvideDate"
                value={formatDate(visaProvideDate)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="visaExpiredDate"
                value={formatDate(visaExpiredDate)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày hết hạn"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                readOnly
                name="visaTclt"
                value={formatDate(visaTclt)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày nhận tư cách lưu trú"
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
