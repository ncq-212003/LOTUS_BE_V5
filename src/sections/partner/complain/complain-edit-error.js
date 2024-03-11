import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Typography,
    FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { useApp } from "src/hooks/use-app";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditComplainError({ openEdit, closeEdit, rowData }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [statusName, setStatusName] = useState('');

    const [state, dispatch] = useApp();
    const { car, company } = state;
    const { cars } = car;
    const { companies } = company;

    // lấy dữ liệu từ id khi chỉnh sửa 
    const carEdit = Array.isArray(cars[0]) ? cars[0].find(ca => ca.carId == rowData?.id) : [];

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        closeEdit();
    };

    const [unionOptions, setUnionOptions] = useState([
        { id: 1, name: "Nghiệp đoàn 1" },
        { id: 2, name: "Nghiệp đoàn 2" },
        { id: 3, name: "Nghiệp đoàn 3" },
        { id: 4, name: "Nghiệp đoàn 4" },
        { id: 5, name: "Nghiệp đoàn 5" }
    ]);

    const [person, setPerson] = useState([
        { id: 1, name: "Nguyễn Văn Thành" },
        { id: 2, name: "Phạm Quốc Tuấn" },
        { id: 3, name: "Nguyễn Hoàng Nam" },
        { id: 4, name: "Trần Xuân Diệu" },
        { id: 5, name: "Minh Hải Phượng" }
    ]);

    const [companyOptions, setCompanyOptions] = useState(
        [
            { id: 1, name: "Công ty Mitsubishi Group" },
            { id: 2, name: "Công ty Sumitomo Group" },
            { id: 3, name: "Công ty Sharp Corporation" },
            { id: 4, name: "Công ty Panasonic Corporation" },
        ]
    )

    const [customers, setCustomers] = useState([
        { id: 1, name: "Nguyễn Công Quyết" },
        { id: 2, name: "Nguyễn Chính Nghĩa" },
        { id: 3, name: "Đinh Văn Thắng" },
        { id: 4, name: "Phạm Văn Thái" },
        { id: 5, name: "Nguyễn Duy Dự" },
        { id: 6, name: "Nguyễn Anh Tú" }
    ]);

    const validationSchema = Yup.object({
        nghiepDoan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        hoVaTen: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        loiPhatSinh: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        congTyTiepNhan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        phuongAnXuLy: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ketQua: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        nguoiXuLy: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ghiChu: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        trangThai: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });
    const formik = useFormik({
        initialValues: {
            nghiepDoan: rowData?.nghiepDoan || "",
            hoVaTen: "",
            loiPhatSinh: "",
            congTyTiepNhan: "",
            ngayTiepNhan: "",
            phuongAnXuLy: "",
            ketQua: "",
            nguoiXuLy: "",
            ghiChu: "",
            trangThai: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                console.log("checkk values", values)
                setSnackbarSeverity("success");
                setSnackbarMessage("Chỉnh sửa dữ liệu thành công !");
                setSnackbarOpen(true);
                formik.resetForm();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    useEffect(() => {
        const fetchDataComPlain = () => {
            try {
                formik.setValues({
                    nghiepDoan: "",
                    hoVaTen: "",
                    loiPhatSinh: "",
                    congTyTiepNhan: "",
                    ngayTiepNhan: "",
                    phuongAnXuLy: "",
                    ketQua: "",
                    nguoiXuLy: "",
                    ghiChu: "",
                    trangThai: "",
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
    })

    useEffect(() => {
        const checkValue = () => {
            if (rowData?.trangThai === "Đã xong") {
                setStatusName('Xử lý lại')
            } else {
                setStatusName('Hoàn thành')
            }
        }
        checkValue();
    }, [rowData?.trangThai])

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEdit}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Cập nhật kết quả xử lý
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <SvgIcon fontSize="inherit">
                    <XCircleIcon />
                </SvgIcon>
            </IconButton>
            <DialogContent dividers>
                <Box sx={{ typography: "body1" }}>
                    <Grid container>
                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={unionOptions}
                            value={unionOptions.find((item) => item.id === formik.values.nghiepDoan) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('nghiepDoan', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Nghiệp đoàn"
                                    name="nghiepDoan"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nghiepDoan && Boolean(formik.errors.nghiepDoan)}
                                    helperText={formik.touched.nghiepDoan && formik.errors.nghiepDoan}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={customers}
                            value={customers.find((item) => item.id === formik.values.hoVaTen) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('hoVaTen', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Họ và tên"
                                    name="hoVaTen"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.hoVaTen && Boolean(formik.errors.hoVaTen)}
                                    helperText={formik.touched.hoVaTen && formik.errors.hoVaTen}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={companyOptions}
                            value={companyOptions.find((item) => item.id === formik.values.congTyTiepNhan) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('congTyTiepNhan', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Công ty tiếp nhận"
                                    name="congTyTiepNhan"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.congTyTiepNhan && Boolean(formik.errors.congTyTiepNhan)}
                                    helperText={formik.touched.congTyTiepNhan && formik.errors.congTyTiepNhan}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.loiPhatSinh && formik.errors.loiPhatSinh)}
                            helperText={formik.touched.loiPhatSinh && formik.errors.loiPhatSinh}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.loiPhatSinh}
                            name="loiPhatSinh"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Lỗi phát sinh"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.phuongAnXuLy && formik.errors.phuongAnXuLy)}
                            helperText={formik.touched.phuongAnXuLy && formik.errors.phuongAnXuLy}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phuongAnXuLy}
                            name="phuongAnXuLy"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Phương án xử lý"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.ketQua && formik.errors.ketQua)}
                            helperText={formik.touched.ketQua && formik.errors.ketQua}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ketQua}
                            name="ketQua"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Kết quả xử lý"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // disableFuture
                                label="Ngày tiếp nhận"
                                ampm={false} // 
                                format="DD/MM/YYYY"
                                onBlur={formik.handleBlur}
                                value={formik.values.ngayTiepNhan}
                                sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                                onChange={(value) => {
                                    // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                                    formik.setFieldValue("ngayTiepNhan", value);
                                }}
                                slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        onBlur: formik.handleBlur,
                                        error: !!(formik.touched.ngayTiepNhan && formik.errors.ngayTiepNhan),
                                        helperText: formik.touched.ngayTiepNhan && formik.errors.ngayTiepNhan,
                                    },
                                }}
                            />
                        </LocalizationProvider>

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={person}
                            value={person.find((item) => item.id === formik.values.nguoiXuLy) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('nguoiXuLy', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Người xử lý"
                                    name="nguoiXuLy"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nguoiXuLy && Boolean(formik.errors.nguoiXuLy)}
                                    helperText={formik.touched.nguoiXuLy && formik.errors.nguoiXuLy}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ghiChu}
                            name="ghiChu"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                margin: "12px 10px 0px 10px",
                            }}
                        >
                            <Typography component="legend" sx={{ fontWeight: "700", fontSize: "14px" }}>Trạng thái:</Typography>
                            <Typography component="legend" sx={{ fontWeight: "600", fontSize: "14px" }}>{rowData?.trangThai}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            // onClick={closeAddress}
                            onClick={formik.handleSubmit}
                            sx={{
                                marginTop: "24px",
                                backgroundColor: "#1C2536",
                            }}
                        >
                            {statusName}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </BootstrapDialog>
    );
}
