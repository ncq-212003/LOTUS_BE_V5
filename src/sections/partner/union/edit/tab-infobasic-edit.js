import React, { useState, useEffect } from "react";
import MultiLanguageComponent from "../multilanguage";
import { TextField, Grid, Stack, Box, Autocomplete, Checkbox, Avatar, Button, Typography, FormHelperText, } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union"
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import SnackbarAlert from "src/components/action-notification";
import { GenerateApi } from "src/contexts/api/random-api";
import { getPathFromUrl } from "src/components/functions";
import { uploadAvatar } from "src/contexts/api/partner/api-union";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { listProcessApi } from "src/contexts/api/schedule/api-process";
import { findRegionByMarketIdApi } from "src/contexts/api/setting/api-region";


export function actionSetTouched(dispatch, tab, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_UNION.SET_TOUCHED_UNION,
        payload: { tab, fieldName, value },
    });
}

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        selectedFile: Yup.string(),
        avatar: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        tenNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        syndicateNameOtherLang: Yup.string(),
        diaChiWebsite: Yup
            .string(),
        // .required("Vui lòng nhập thông tin vào trường này"),
        tinhTrangTrinhCuc: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoCapPhep: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        nhanVienChamSoc: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        ghiChu: Yup.string(),
        maSoHopDong: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        ngayKyHopDong: Yup
            .date()
            .typeError("Vui lòng nhập đúng định dạng")
            .required("Vui lòng nhập thông tin vào trường này"),
        troCapThangDau: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiCapDaoTao: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        thiTruong: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        thanhPho: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        syndicateAddressOtherLang: Yup.string(),
        soDienThoai: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        fax: Yup
            .string(),
        // .required("Vui lòng nhập thông tin vào trường này"),
        hoTenNguoiDaiDien: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        personRepresentOtherLang: Yup.string(),
        chucVu: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiQuanLy: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        });
}

//Ảnh
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

export default function TabInfoBasicEdit() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const tab = "basicInfo";
    const [state, dispatch] = useApp();
    const { union } = state;
    const { basicInfo } = union;
    let {
        selectedFile,
        avatar,
        maSoNghiepDoan,
        tenNghiepDoan,
        syndicateNameOtherLang,
        diaChiWebsite,
        tinhTrangTrinhCuc,
        maSoCapPhep,
        nhanVienChamSoc,
        ghiChu,
        maSoHopDong,
        ngayKyHopDong,
        troCapThangDau,
        phiCapDaoTao,
        thiTruong,
        thanhPho,
        diaChi,
        syndicateAddressOtherLang,
        soDienThoai,
        fax,
        hoTenNguoiDaiDien,
        personRepresentOtherLang,
        chucVu,
        phiQuanLy,
        touched,
        errors,
    } = basicInfo;
    const [employeeOption, setEmployeeOption] = useState([]);
    const [marketOption, setMarketOption] = useState([]);
    const [positionOption, setPositionOption] = useState([]);
    const [marketSelected, setMarketSelected] = useState(null);
    const [statusAprove, setStatusAprove] = useState(false);
    //Chọn nhiều ngôn ngữ
    const [tenNghiepDoanValues, setTenNghiepDoanValues] = useState([]);
    const [diaChiValues, setdiaChiValues] = useState([]);
    const [hoTenNguoiDaiDienValues, setHoTenNguoiDaiDienValues] = useState([]);


    //Random ND
    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi('ND', 'Number');
            const fieldName = 'maSoNghiepDoan'
            const newValue = res.data
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        };

        getRandom();
    }, []);


    //List statusAprove
    const submissionStatusOptions = [
        { value: 1, label: "Được cấp phép" },
        { value: 2, label: "Chưa được cấp phép" }
    ];

    //List employee 
    useEffect(() => {
        const listEmployeeName = async () => {
            const res = await listEmployeeApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const employees = res.data.map((e) => ({
                    label: e.lastName + " " + e.middleName + " " + e.firstName,
                    value: e.employeeId,
                }));
                setEmployeeOption(employees);
            }
        };
        listEmployeeName();
    }, []);

    // List market
    useEffect(() => {
        const listMarket = async () => {
            const res = await listMarketApi();
            const markets = res.data.map((m) => ({
                label: m.marketName,
                value: m.marketId,
            }));
            setMarketOption(markets);
        };
        listMarket();
    }, []);


    // List position
    useEffect(() => {
        const listPosition = async (marketSelected) => {
            if (marketSelected) {
                const res = await findRegionByMarketIdApi(marketSelected);
                console.log(res);
                const postions = res.data.map((m) => ({
                    label: m.positionName,
                    value: m.positionId,
                }));
                setPositionOption(postions);
            }
        };
        listPosition(marketSelected);
    }, [marketSelected]);


    //Hanle 
    const handleChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        console.log(fieldName);

        const fieldValue = event.target.value;
        console.log(fieldValue);

        console.log(formatCurrency(fieldValue));

        let newValue;
        if (fieldValue.length >= 0) {
            if (fieldName == 'phiQuanLy' || fieldName == 'troCapThangDau' || fieldName == 'phiCapDaoTao') {
                newValue = formatCurrency(fieldValue);
            } else {
                newValue = fieldValue;
            }

            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        }

        validateFieldInfobasic(dispatch, tab, fieldName, fieldValue);
    };

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);
        let newValue;
        if (newValueSelect !== null) {
            if (fieldName === 'thiTruong') {
                setMarketSelected(newValueSelect.value);
                dispatch({
                    type: HANDLERS_UNION.SET_INPUT_UNION,
                    payload: { tab, fieldName: 'thanhPho', newValue: "" },
                });
            }
            if (fieldName === 'tinhTrangTrinhCuc') {
                setStatusAprove(newValueSelect.label === "Được cấp phép");
            }

            newValue = newValueSelect;
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        }
        validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    };

    const handleChangeDate = (value, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
        const newValue = value;
        const format = dayjs(value).format("DD/MM/YYYY");

        dispatch({
            type: HANDLERS_UNION.SET_INPUT_UNION,
            payload: { tab, fieldName, newValue },
        });

        validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    };

    const handleFileAvtChange = async (event) => {
        const file = event.target.files[0];

        if (file != null) {
            let newValue = file.name;
            let fieldName = "avatar";

            actionSetTouched(dispatch, tab, fieldName);

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                const response = await uploadAvatar("Syndicate", file)
                if (response.status === 200) {
                    newValue = getPathFromUrl(response.data, response);
                    reader.onload = (e) => {
                        console.log(newValue);
                        dispatch({
                            type: HANDLERS_UNION.SET_INPUT_UNION,
                            payload: { tab, fieldName, newValue },
                        });

                        newValue = e.target.result;
                        fieldName = "selectedFile";
                        dispatch({
                            type: HANDLERS_UNION.SET_INPUT_UNION,
                            payload: { tab, fieldName, newValue },
                        });
                    }

                    reader.readAsDataURL(file);
                } else {
                    console.log(response);
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                    newValue = null;
                };
            } else {
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
                setSelectedFile(null);
            }
            validateFieldInfobasic(dispatch, tab, fieldName, newValue);

        }
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Định dạng tiền tệ
    const formatCurrency = (value) => {
        // Loại bỏ tất cả các ký tự không phải số
        const numericValue = value.replace(/[^0-9]/g, "");

        // Chuyển đổi thành số
        const parsedValue = parseFloat(numericValue);

        // Kiểm tra xem giá trị có phải là một số hợp lệ không
        if (isNaN(parsedValue)) {
            return "";
        }

        // Định dạng thành tiền tệ
        // return parsedValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return parsedValue.toLocaleString("vi-VN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };


    return (
        <Stack spacing={2}
            sx={{ p: 2 }}>
            <Grid container
                spacing={2}>
                <Grid item
                    xs={12}
                    md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>
                        <Grid container
                            spacing={2}
                        >
                            <Grid
                                item
                                container
                            >
                                <Grid item
                                    xs={12}
                                    md={3}
                                    lg={3}
                                    style={{ marginBottom: "-20px" }}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "120px",
                                            }}
                                            variant="rounded"
                                            src={"https://lotus.i.tisbase.online" + avatar || selectedFile}
                                        ></Avatar>
                                    </Stack>
                                    <Button sx={{ width: "120px" }} component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileAvtChange}
                                            onBlur={() => handleBlur("avatar")}
                                        />
                                    </Button>
                                    {touched.avatar && errors.avatar && (
                                        <FormHelperText sx={{ color: "red" }}>{errors.avatar}</FormHelperText>
                                    )}

                                </Grid>
                                <Grid item
                                    container
                                    xs={12}
                                    md={9}
                                    lg={9}
                                >
                                    <Grid item xs={12} md={12} lg={12}>
                                        <TextField
                                            error={!!(touched.maSoNghiepDoan && errors.maSoNghiepDoan)}
                                            helperText={touched.maSoNghiepDoan && errors.maSoNghiepDoan}
                                            onBlur={() => handleBlur("maSoNghiepDoan")}
                                            onChange={(event) => handleChange(event, "maSoNghiepDoan")}
                                            value={maSoNghiepDoan}
                                            name="maSoNghiepDoan"
                                            required
                                            variant="outlined"
                                            size="small"
                                            label="Mã số nghiệp đoàn"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <TextField
                                            error={!!(touched.tenNghiepDoan && errors.tenNghiepDoan)}
                                            helperText={touched.tenNghiepDoan && errors.tenNghiepDoan}
                                            onBlur={() => handleBlur("tenNghiepDoan")}
                                            onChange={(event) => handleChange(event, "tenNghiepDoan")}
                                            value={tenNghiepDoan}
                                            name="tenNghiepDoan"
                                            required
                                            variant="outlined"
                                            size="small"
                                            label="Tên nghiệp đoàn"
                                            fullWidth
                                        />
                                        <MultiLanguageComponent
                                            inputValues={tenNghiepDoanValues}
                                            setInputValues={setTenNghiepDoanValues}
                                            label="Tên nghiệp đoàn"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    error={!!(touched.diaChiWebsite && errors.diaChiWebsite)}
                                    helperText={touched.diaChiWebsite && errors.diaChiWebsite}
                                    onBlur={() => handleBlur("diaChiWebsite")}
                                    onChange={(event) => handleChange(event, "diaChiWebsite")}
                                    value={diaChiWebsite}
                                    name="diaChiWebsite"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Địa chỉ website"
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <Autocomplete
                                    onBlur={() => handleBlur("tinhTrangTrinhCuc")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "tinhTrangTrinhCuc", newValue)
                                    }
                                    value={tinhTrangTrinhCuc}
                                    name="tinhTrangTrinhCuc"
                                    fullWidth
                                    size="small"
                                    options={submissionStatusOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Tình trạng trình cục"
                                            error={!!(touched.tinhTrangTrinhCuc && errors.tinhTrangTrinhCuc)}
                                            helperText={touched.tinhTrangTrinhCuc && errors.tinhTrangTrinhCuc}
                                        />
                                    )}
                                />
                            </Grid>
                            {statusAprove && (
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={!!(touched.maSoCapPhep && errors.maSoCapPhep)}
                                        helperText={touched.maSoCapPhep && errors.maSoCapPhep}
                                        onBlur={() => handleBlur("maSoCapPhep")}
                                        onChange={(event) => handleChange(event, "maSoCapPhep")}
                                        value={maSoCapPhep}
                                        name="maSoCapPhep"
                                        required
                                        variant="outlined"
                                        size="small"
                                        label="Mã số cấp phép"
                                        fullWidth
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("nhanVienChamSoc")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "nhanVienChamSoc", newValue)
                                    }
                                    value={nhanVienChamSoc}
                                    name="nhanVienChamSoc"
                                    fullWidth
                                    size="small"
                                    options={employeeOption}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Nhân viên chăm sóc"
                                            error={!!(touched.nhanVienChamSoc && errors.nhanVienChamSoc)}
                                            helperText={touched.nhanVienChamSoc && errors.nhanVienChamSoc}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    required
                                    name="ghiChu"
                                    onChange={(event) => handleChange(event, "ghiChu")}
                                    variant="outlined"
                                    size="small"
                                    value={ghiChu}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Hợp đồng
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.maSoHopDong && errors.maSoHopDong)}
                                    helperText={touched.maSoHopDong && errors.maSoHopDong}
                                    onBlur={() => handleBlur("maSoHopDong")}
                                    onChange={(event) => handleChange(event, "maSoHopDong")}
                                    value={maSoHopDong}
                                    name="maSoHopDong"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số hợp đồng"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                    <DatePicker
                                        onBlur={() => handleBlur("ngayKyHopDong")}
                                        onChange={(value) => handleChangeDate(value, "ngayKyHopDong")}
                                        name="ngayKyHopDong"
                                        value={ngayKyHopDong}
                                        sx={{ width: "100%" }}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                variant: "outlined",
                                                error: !!(touched.ngayKyHopDong && errors.ngayKyHopDong),
                                                helperText: touched.ngayKyHopDong && errors.ngayKyHopDong,
                                            },
                                        }}
                                        label="Ngày ký hợp đồng"
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí hỗ trợ thực tập sinh / người lao động
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.troCapThangDau && errors.troCapThangDau)}
                                    helperText={touched.troCapThangDau && errors.troCapThangDau}
                                    onBlur={() => handleBlur("troCapThangDau")}
                                    onChange={(event) => handleChange(event, "troCapThangDau")}
                                    value={troCapThangDau}
                                    name="troCapThangDau"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Trợ cấp tháng đầu"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.phiCapDaoTao && errors.phiCapDaoTao)}
                                    helperText={touched.phiCapDaoTao && errors.phiCapDaoTao}
                                    onBlur={() => handleBlur("phiCapDaoTao")}
                                    onChange={(event) => handleChange(event, "phiCapDaoTao")}
                                    value={phiCapDaoTao}
                                    name="phiCapDaoTao"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Phí cấp đào tạo"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Địa chỉ nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("thiTruong")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "thiTruong", newValue)
                                    }
                                    value={thiTruong}
                                    name="thiTruong"
                                    fullWidth
                                    size="small"
                                    options={marketOption}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Thị trường"
                                            error={!!(touched.thiTruong && errors.thiTruong)}
                                            helperText={touched.thiTruong && errors.thiTruong}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("thanhPho")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "thanhPho", newValue)
                                    }
                                    value={thanhPho}
                                    name="thanhPho"
                                    fullWidth
                                    size="small"
                                    options={positionOption}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Thuộc tỉnh / Thành phố"
                                            error={!!(touched.thanhPho && errors.thanhPho)}
                                            helperText={touched.thanhPho && errors.thanhPho}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.diaChi && errors.diaChi)}
                                    helperText={touched.diaChi && errors.diaChi}
                                    onBlur={() => handleBlur("diaChi")}
                                    onChange={(event) => handleChange(event, "diaChi")}
                                    value={diaChi}
                                    name="diaChi"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Địa chỉ"
                                    fullWidth
                                />

                                <MultiLanguageComponent
                                    inputValues={diaChiValues}
                                    setInputValues={setdiaChiValues}
                                    label="Địa chỉ"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.soDienThoai && errors.soDienThoai)}
                                    helperText={touched.soDienThoai && errors.soDienThoai}
                                    onBlur={() => handleBlur("soDienThoai")}
                                    onChange={(event) => handleChange(event, "soDienThoai")}
                                    value={soDienThoai}
                                    name="soDienThoai"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số điện thoại"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.fax && errors.fax)}
                                    helperText={touched.fax && errors.fax}
                                    onBlur={() => handleBlur("fax")}
                                    onChange={(event) => handleChange(event, "fax")}
                                    value={fax}
                                    name="fax"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số fax"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Đại diện nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.hoTenNguoiDaiDien && errors.hoTenNguoiDaiDien)}
                                    helperText={touched.hoTenNguoiDaiDien && errors.hoTenNguoiDaiDien}
                                    onBlur={() => handleBlur("hoTenNguoiDaiDien")}
                                    onChange={(event) => handleChange(event, "hoTenNguoiDaiDien")}
                                    value={hoTenNguoiDaiDien}
                                    name="hoTenNguoiDaiDien"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Họ và tên người đại diện"
                                    fullWidth
                                />
                                <MultiLanguageComponent
                                    inputValues={hoTenNguoiDaiDienValues}
                                    setInputValues={setHoTenNguoiDaiDienValues}
                                    label="Họ và tên người đại diện"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.chucVu && errors.chucVu)}
                                    helperText={touched.chucVu && errors.chucVu}
                                    onBlur={() => handleBlur("chucVu")}
                                    onChange={(event) => handleChange(event, "chucVu")}
                                    value={chucVu}
                                    name="chucVu"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Chức vụ"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí quản lý
                        </Typography>
                        <TextField
                            error={!!(touched.phiQuanLy && errors.phiQuanLy)}
                            helperText={touched.phiQuanLy && errors.phiQuanLy}
                            onBlur={() => handleBlur("phiQuanLy")}
                            onChange={(event) => handleChange(event, "phiQuanLy")}
                            value={phiQuanLy}
                            name="phiQuanLy"
                            required
                            variant="outlined"
                            size="small"
                            label="Phí quản lý"
                            fullWidth
                        />
                    </Box>
                </Grid>
            </Grid>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
}

