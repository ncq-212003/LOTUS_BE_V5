import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  Checkbox,
  Autocomplete,
  Button,
  Avatar,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useApp } from "src/hooks/use-app";
import { setInputIntern } from "src/contexts/reducer/intern/reducer-intern";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function TabInfoBasic() {
  const [selectedPortraitPhoto, setSelectedPortraitPhoto] = useState(null);
  const [selectedFullBodyPhoto, setSelectedFullBodyPhoto] = useState(null);
  const tab = "infoBasic";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { infoBasic } = intern;
  const {
    profileCode,
    registrationDate,
    lastName,
    middleName,
    firstName,
    dob,
    gender,
    marriageStatus,
    educationalLevel,
    ethnic,
    religion,
    documentProgress,
    participationProgram,
    citizenIdentification,
    dateRangeCCCD,
    issuedCCCDBy,
    issuanceOfPassport,
    passport,
    dateRangeHC,
    expirationDateHC,
    street,
    cityId,
    districtId,
    wardId,
    address,
    phone,
    deskPhone,
    portraitPhoto,
    fullBodyPhoto,
    wantToGo,
    recruitmentOfficer,
    experience,
    sourceGroup,
  } = infoBasic;

  const handlePortraitPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setInputIntern(tab, "portraitPhoto", file));
        setSelectedPortraitPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullBodyPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setInputIntern(tab, "fullBodyPhoto", file));
        setSelectedFullBodyPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event, fieldName) => {
    dispatch(setInputIntern(tab, fieldName, event.target.value));
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch(setInputIntern(tab, fieldName, newValue));
  };

  const handleChangeDate = (value, fieldName) => {
    const formattedDate = dayjs(value).format("YYYY-MM-DD");
    dispatch(setInputIntern(tab, fieldName, formattedDate));
  };

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
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin cơ bản
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  onChange={(event) => handleChange(event, "profileCode")}
                  value={profileCode}
                  name="profileCode"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Mã hồ sơ"
                  fullWidth
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "registrationDate")}
                  value={registrationDate}
                  name="registrationDate"
                  sx={{ width: "100%", margin: "4px", marginTop: "12px", maxHeight: "47px" }}
                  label="Ngày đăng ký"
                  renderInput={(params) => <TextField variant="outlined" {...params} />}
                />
              </LocalizationProvider>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "lastName")}
                    value={lastName}
                    name="lastName"
                    variant="outlined"
                    required
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    label="Họ"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "middleName")}
                    value={middleName}
                    name="middleName"
                    variant="outlined"
                    required
                    sx={{ margin: "2px", marginTop: "12px" }}
                    size="small"
                    label="Tên đệm"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "firstName")}
                    value={firstName}
                    name="firstName"
                    variant="outlined"
                    required
                    sx={{ margin: "2px", marginTop: "12px" }}
                    size="small"
                    label="Tên"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "dob")}
                  value={dob}
                  name="dob"
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày sinh"
                />
              </LocalizationProvider>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormLabel sx={{ margin: "10px 10px 0 6px" }}>Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={gender}
                  onChange={(event) => handleChange(event, "gender")}
                  sx={{ margin: "2px 0 0 0" }}
                >
                  <FormControlLabel value="male" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio size="small" />} label="Nữ" />
                </RadioGroup>
              </Box>
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "marriageStatus", newValue)
                }
                value={marriageStatus}
                name="marriageStatus"
                sx={{ margin: "4px", marginTop: "6px" }}
                fullWidth
                size="small"
                options={marriageStatusOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Tình trạng hôn nhân" variant="outlined" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "educationalLevel", newValue)
                }
                sx={{ margin: "4px", marginTop: "12px" }}
                value={educationalLevel}
                name="educationalLevel"
                fullWidth
                size="small"
                options={educationalLevelOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Trình độ văn hóa" variant="outlined" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "ethnic", newValue)}
                value={ethnic}
                name="ethnic"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Kinh", "Hmooong"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Dân tộc" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "religion", newValue)}
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
              <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
                <TextField
                  onChange={(event) => handleChange(event, "documentProgress")}
                  value={documentProgress}
                  name="documentProgress"
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Tiến độ hồ sơ"
                />
              </FormControl>
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "participationProgram", newValue)
                }
                value={participationProgram}
                name="participationProgram"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "TTS", "CT khác"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chương trình tham gia" />
                )}
              />
            </Box>
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
                onChange={(event) => handleChange(event, "citizenIdentification")}
                value={citizenIdentification}
                name="citizenIdentification"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số CCCD"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "dateRangeCCCD")}
                  value={dateRangeCCCD}
                  name="dateRangeCCCD"
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
                onChange={(event) => handleChange(event, "issuedCCCDBy")}
                value={issuedCCCDBy}
                name="issuedCCCDBy"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Nơi cấp"
                fullWidth
              />
            </Box>
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
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "issuanceOfPassport", newValue)
                }
                value={issuanceOfPassport}
                name="issuanceOfPassport"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Cục CS XNC"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nơi cấp hộ chiếu" />
                )}
              />
              <TextField
                onChange={(event) => handleChange(event, "passport")}
                value={passport}
                name="passport"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số hộ chiếu"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "dateRangeHC")}
                  value={dateRangeHC}
                  name="dateRangeHC"
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
                  onChange={(value) => handleChangeDate(value, "expirationDateHC")}
                  value={expirationDateHC}
                  name="expirationDateHC"
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
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Địa chỉ
              </Typography>
              <TextField
                onChange={(event) => handleChange(event, "street")}
                value={street}
                name="street"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số nhà, đường phố/Thôn"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "cityId", newValue)}
                  value={cityId}
                  name="cityId"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Tỉnh, thành phố" />
                  )}
                />
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "districtId", newValue)}
                  value={districtId}
                  name="districtId"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Quận / huyện" />
                  )}
                />
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "wardId", newValue)}
                  value={wardId}
                  name="wardId"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Xã phường" />
                  )}
                />
              </Box>
              <TextField
                onChange={(event) => handleChange(event, "address")}
                value={address}
                name="address"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ nơi ở"
                fullWidth
              />
              <TextField
                onChange={(event) => handleChange(event, "phone")}
                value={phone}
                name="phone"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Điện thoại di động"
                fullWidth
              />
              <TextField
                onChange={(event) => handleChange(event, "deskPhone")}
                value={deskPhone}
                name="deskPhone"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="ĐT cố định"
                fullWidth
              />
              <Box
                sx={{
                  margin: "20px 60px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
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
                      src={selectedPortraitPhoto}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handlePortraitPhotoChange} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
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
                      src={selectedFullBodyPhoto}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handleFullBodyPhotoChange} />
                  </Button>
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
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin nộp hồ sơ
              </Typography>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "wantToGo", newValue)}
                value={wantToGo}
                name="wantToGo"
                multiple
                limitTags={3}
                options={[
                  { value: 2, label: "Nhật" },
                  { value: 2, label: "Hàn" },
                ]}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
                getOptionLabel={(option) => option.label}
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
                  <TextField variant="outlined" {...params} label="Muốn đi" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "recruitmentOfficer", newValue)
                }
                value={recruitmentOfficer}
                name="recruitmentOfficer"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Tú", "Nghĩa"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Cán bộ tuyển dụng" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "experience", newValue)}
                value={experience}
                name="experience"
                multiple
                limitTags={3}
                options={[
                  { value: 1, label: "Cắt, Mài, Đánh bóng" },
                  { value: 2, label: "Cơ điện" },
                  { value: 3, label: "Hàn xì" },
                  { value: 4, label: "May mặc" },
                ]}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
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
                  <TextField variant="outlined" {...params} label="Kinh nghiệm" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "sourceGroup", newValue)}
                value={sourceGroup}
                name="sourceGroup"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Nguồn dài hạn", "Chỉ thi tuyển"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nhóm nguồn" />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

const marriageStatusOptions = [
  { value: 1, label: "Chưa kết hôn" },
  { value: 2, label: "Sống chung chưa kết hôn" },
  { value: 3, label: "Đang có vợ/chồng" },
  { value: 4, label: "Góa" },
  { value: 5, label: "Ly thân và ly hôn" },
];

const educationalLevelOptions = [
  { value: 1, label: "Cấp 1" },
  { value: 2, label: "Cấp 2" },
  { value: 3, label: "Cấp 3" },
  { value: 4, label: "Đại học" },
  { value: 5, label: "Cao đẳng" },
];
