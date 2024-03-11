/* eslint-disable react/jsx-max-props-per-line */
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useFormik } from "formik";
import * as Yup from "yup";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

export default function InfoBaseEmployee() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [state, dispatch] = useApp();
    const tab = "basicInfo";
    const { employee } = state;
    const { basicInfo } = employee;
    const {
        avatar,
        employeeId,
        employeeCode,
        deparment,
        role,
        citizenIdentity,
        issuedBy,
        dateRange,
        lastName,
        middleName,
        firstName,
        city,
        district,
        ward,
        address,
        email,
        phone,
        deskPhone,
        contractSigningDate,
        dob,
        gender,
        educationalLevel,
        marriageStatus,
        description,
        loginName,
        password,
        confirmPassword,
        status,
    } = basicInfo;

    const [deparmentM, setDepartmentM] = useState([]);
    const [roleM, setRoleM] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (event, fieldName) => {
        const newValue = event.target.value;
        dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeSelect = (event, fieldName, newValue) => {
        dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeDate = (value, fieldName) => {
        // const newValue = dayjs(value).format("YYYY-MM-DD");
        const newValue = value;
        dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleFileChange = (event) => {
        const newValue = event.target.files[0];
        const fieldName = "avatar";
        if (newValue) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch({
                    type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
                    payload: { tab, fieldName, newValue },
                });
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(newValue);
        }
    };

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const filteredOptions = optionCompanyDepartmentRole.filter((optionRole) =>
        deparmentM.includes(optionRole.departmentId)
    );

    const findLabelByValue = (value) => {
        const selectedOption = optionCompanyDepartment.find((option) => option.value === value);
        return selectedOption ? selectedOption.label : ""; // Trả về nhãn nếu tìm thấy hoặc chuỗi trống nếu không tìm thấy
    };

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

                        <Grid container spacing={2} style={{ marginBottom: "-20px" }}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar
                                        sx={{
                                            width: "120px",
                                            height: "160px",
                                        }}
                                        variant="rounded"
                                        src={selectedFile}
                                    ></Avatar>
                                </Stack>
                                <Button sx={{ marginBottom: "10px", width: "120px" }} component="label">
                                    Tải ảnh
                                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <TextField
                                    onChange={(event) => handleChange(event, "employeeCode")}
                                    value={employeeCode}
                                    name="employeeCode"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    label="Mã nhân viên"
                                    sx={{ margin: "1px", marginBottom: "15px" }}
                                />
                                <Autocomplete
                                    onChange={(event, newValue) => {
                                        setDepartmentM(newValue.map((option) => option.value));
                                    }}
                                    name="deparment"
                                    multiple
                                    limitTags={2}
                                    id="checkboxes-department"
                                    disableCloseOnSelect
                                    size="small"
                                    sx={{ marginBottom: "17px" }}
                                    options={optionCompanyDepartment}
                                    groupBy={(option) => option.company}
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
                                    options={filteredOptions}
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
                                    onChange={(event) => handleChange(event, "lastName")}
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
                                    onChange={(event) => handleChange(event, "middleName")}
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
                                    onChange={(event) => handleChange(event, "firstName")}
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
                                        onChange={(value) => handleChangeDate(value, "dob")}
                                        value={dob}
                                        name="dob"
                                        required
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
                                        onChange={(value) => handleChangeDate(value, "contractSigningDate")}
                                        value={contractSigningDate}
                                        name="contractSigningDate"
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
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={gender}
                                    onChange={(event) => handleChange(event, "gender")}
                                >
                                    <FormControlLabel value="male" control={<Radio size="small" />} label="Nam" />
                                    <FormControlLabel value="female" control={<Radio size="small" />} label="Nữ" />
                                </RadioGroup>
                            </Grid>
                        </Grid>

                        <Autocomplete
                            // onChange={(event, newValue) =>
                            //   handleChangeSelect(event, "educationalLevel", newValue)
                            // }
                            value="Việt Nam"
                            // name="educationalLevel"
                            fullWidth
                            size="small"
                            sx={{ margin: "10px 0" }}
                            options={["Việt Nam", "Nhật Bản", "Hàn Quốc", "Úc", "Mỹ"]}
                            renderInput={(params) => (
                                <TextField {...params} label="Quốc tịch" variant="outlined" />
                            )}
                        />
                        <TextField
                            onChange={(event) => handleChange(event, "phone")}
                            value={phone}
                            name="phone"
                            variant="outlined"
                            required
                            size="small"
                            label="Điện thoại di động"
                            fullWidth
                        />
                        <TextField
                            onChange={(event) => handleChange(event, "email")}
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
                        <Autocomplete
                            onChange={(event, newValue) =>
                                handleChangeSelect(event, "educationalLevel", newValue)
                            }
                            value={educationalLevel}
                            name="educationalLevel"
                            fullWidth
                            size="small"
                            sx={{ marginTop: "12px" }}
                            options={educationalLevelOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Trình độ văn hóa" variant="outlined" />
                            )}
                        />
                        <Autocomplete
                            onChange={(event, newValue) => handleChangeSelect(event, "marriageStatus", newValue)}
                            value={marriageStatus}
                            name="marriageStatus"
                            fullWidth
                            size="small"
                            options={marriageStatusOptions}
                            sx={{ marginTop: "12px" }}
                            renderInput={(params) => (
                                <TextField {...params} label="Tình trạng hôn nhân" variant="outlined" />
                            )}
                        />
                        <Autocomplete
                            onChange={(event, newValue) => handleChangeSelect(event, "marriageStatus", newValue)}
                            value="Toàn thời gian"
                            name="marriageStatus"
                            fullWidth
                            size="small"
                            options={["Toàn thời gian", "Bán thời gian"]}
                            sx={{ marginTop: "12px" }}
                            renderInput={(params) => (
                                <TextField {...params} label="Hình thức nhân viên" variant="outlined" />
                            )}
                        />
                        <TextField
                            onChange={(event) => handleChange(event, "email")}
                            value={email}
                            name="email"
                            variant="outlined"
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Hình thức nhân viên"
                            fullWidth
                        />
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
                            Căn cước công dân
                        </Typography>

                        <TextField
                            onChange={(event) => handleChange(event, "citizenIdentity")}
                            value={citizenIdentity}
                            name="citizenIdentity"
                            variant="outlined"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số CCCD"
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                            <DatePicker
                                onChange={(value) => handleChangeDate(value, "dateRange")}
                                name="dateRange"
                                value={dateRange}
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
                            onChange={(event) => handleChange(event, "issuedBy")}
                            value={issuedBy}
                            name="issuedBy"
                            variant="outlined"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Nơi cấp"
                            fullWidth
                        />
                        <Autocomplete
                            onChange={(event, newValue) => handleChangeSelect(event, "city", newValue)}
                            value={city}
                            name="city"
                            fullWidth
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            options={cityOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Tỉnh /TP Nguyên quán" variant="outlined" />
                            )}
                        />
                        <Autocomplete
                            onChange={(event, newValue) => handleChangeSelect(event, "district", newValue)}
                            value={district}
                            name="district"
                            fullWidth
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            options={districtOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Quận /Huyện Nguyên quán" variant="outlined" />
                            )}
                        />
                        <Autocomplete
                            onChange={(event, newValue) => handleChangeSelect(event, "ward", newValue)}
                            value={ward}
                            name="ward"
                            fullWidth
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            options={wardOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Xã / Phường Nguyên quán" variant="outlined" />
                            )}
                        />
                        <TextField
                            onChange={(event) => handleChange(event, "issuedBy")}
                            value={issuedBy}
                            name="issuedBy"
                            variant="outlined"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Địa chỉ thường trú"
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
                            Địa chỉ
                        </Typography>
                        <TextField
                            onChange={(event) => handleChange(event, "address")}
                            value={address}
                            name="address"
                            required
                            variant="outlined"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Địa chỉ tạm trú"
                            fullWidth
                        />
                        <TextField
                            onChange={(event) => handleChange(event, "issuedBy")}
                            value={issuedBy}
                            name="issuedBy"
                            variant="outlined"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Địa chỉ nguyên quán"
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
                        <Autocomplete
                            // onChange={(event, newValue) => handleChangeSelect(event, "noiCapHoChieu", newValue)}
                            // value={noiCapHoChieu}
                            // name="noiCapHoChieu"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["Không lựa chọn", "Cục CS XNC"]}
                            renderInput={(params) => (
                                <TextField variant="outlined" {...params} label="Nơi cấp hộ chiếu" />
                            )}
                        />
                        <TextField
                            // onChange={(event) => handleChange(event, "soHoChieu")}
                            // value={soHoChieu}
                            // name="soHoChieu"
                            variant="outlined"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số hộ chiếu"
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                            <DatePicker
                                // onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                                // name="ngayCapHoChieu"
                                // value={ngayCapHoChieu}
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
                                // onChange={(value) => handleChangeDate(value, "ngayHetHanHoChieu")}
                                // name="ngayHetHanHoChieu"
                                // value={dayjs(ngayCapHoChieu).add(10, "year")}
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
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000} // Tự động ẩn sau 2 giây
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Vị trí ở góc dưới bên phải
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

const optionCompanyDepartment = [
    { value: 1, company: "Công ty Apple", label: "Phòng nhân sự" },
    { value: 2, company: "Công ty Apple", label: "Phòng kế toán" },
    { value: 3, company: "Công ty Apple", label: "Phòng công nghệ & truyền thông" },
    { value: 4, company: "Công ty Samsung", label: "Phòng tài chính" },
    { value: 5, company: "Công ty Samsung", label: "Phòng chăm sóc khách hàng" },
    { value: 6, company: "Công ty Samsung", label: "Phòng hành chính" },
];

const optionCompanyDepartmentRole = [
    {
        value: 1,
        company: "Công ty Apple",
        department: "Phòng nhân sự",
        label: "Quản trị",
        departmentId: 1,
    },
    {
        value: 2,
        company: "Công ty Apple",
        department: "Phòng nhân sự",
        label: "Giáo viên",
        departmentId: 1,
    },
    {
        value: 3,
        company: "Công ty Apple",
        department: "Phòng nhân sự",
        label: "Cộng tác viên",
        departmentId: 1,
    },
    {
        value: 5,
        company: "Công ty Apple",
        department: "Phòng kế toán",
        label: "Quản trị",
        departmentId: 2,
    },
    {
        value: 6,
        company: "Công ty Apple",
        department: "Phòng kế toán",
        label: "Giáo viên",
        departmentId: 2,
    },
    {
        value: 7,
        company: "Công ty Apple",
        department: "Phòng kế toán",
        label: "Cộng tác viên",
        departmentId: 2,
    },
    {
        value: 8,
        company: "Công ty Apple",
        department: "Phòng kế toán",
        label: "Nhân viên",
        departmentId: 2,
    },
    {
        value: 4,
        company: "Công ty Apple",
        department: "Phòng công nghệ & truyền thông",
        label: "Nhân viên",
        departmentId: 3,
    },
    {
        value: 9,
        company: "Công ty Samsung",
        department: "Phòng tài chính",
        label: "Quản trị",
        departmentId: 4,
    },
    {
        value: 10,
        company: "Công ty Samsung",
        department: "Phòng tài chính",
        label: "Giáo viên",
        departmentId: 4,
    },
    {
        value: 11,
        company: "Công ty Samsung",
        department: "Phòng tài chính",
        label: "Cán bộ tuyển dụng",
        departmentId: 4,
    },
    {
        value: 12,
        company: "Công ty Samsung",
        department: "Phòng chăm sóc khách hàng",
        label: "Nhân viên",
        departmentId: 5,
    },
];

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
