import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listAirPortApi } from "src/contexts/api/setting/api-airport";
import { Save } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

export default function EditFlightSchedules({ openEdit, closeEdit, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listMainEmployee, setListMainEmployee] = useState([]);
    const [listAirPorts, setListAirPorts] = useState([]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        closeEdit();
    };

    const validationSchema = Yup.object({
        hoVaTen: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayBay: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayDen: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này')
            .test(
                'is-ngayDen-greater-than-ngayBay',
                'Ngày đến dự kiến phải lớn hơn ngày bay dự kiến.',
                function (ngayDen) {
                    const { ngayBay } = this.parent;
                    return ngayDen >= ngayBay;
                }
            ),
        nguoiPhuTrach: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        sanBayDi: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        sanBayDen: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            hoVaTen: "",
            ngayBay: "",
            ngayDen: "",
            nguoiPhuTrach: "",
            sanBayDi: "",
            sanBayDen: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                console.log("checkkk values", values)
                setSnackbarSeverity("success");
                setSnackbarMessage("Sửa thành công.");
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
        const fetchDataEmployee = async () => {
            const response = await listEmployeeApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listEmployee = response.data.map((item) => (
                    {
                        emId: item.employeeId,
                        emName: item.lastName + " " + item.middleName + " " + item.firstName
                    }
                ))
                setListMainEmployee(listEmployee);
            }
        }
        fetchDataEmployee();
    }, [])

    useEffect(() => {
        const fetchDataAirPort = async () => {
            const response = await listAirPortApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listAirPort = response.data.map((items) => ({
                    airId: items.airportId,
                    airName: items.airportName
                }))
                setListAirPorts(listAirPort)
            }
        }
        fetchDataAirPort();
    }, [])

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEdit}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa lịch bay
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
                    <Grid container spacing={1}>
                        <Grid item xs={9} sm={9} md={9} lg={10} xl={10}>
                            <TextField
                                error={!!(formik.touched.hoVaTen && formik.errors.hoVaTen)}
                                helperText={formik.touched.hoVaTen && formik.errors.hoVaTen}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.hoVaTen}
                                name="hoVaTen"
                                // sx={{ marginTop: "12px" }}
                                size="small"
                                label="Họ và tên/ Mã TTS"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
                            <Button
                                sx={{
                                    // margin: "3px 0 20px 20px",
                                    backgroundColor: "#1C2536",
                                    color: "white",
                                }}
                                size="small"
                                variant="contained"
                            >
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>

                    <DatePicker
                        onChange={(value) => {
                            formik.setFieldValue('ngayBay', Date.parse(value));
                        }}
                        value={formik.values.ngayBay}
                        name="ngayBay"
                        sx={{ width: "100%", marginTop: "12px" }}
                        format="dd/MM/yyyy"
                        slotProps={{
                            textField: {
                                size: 'small',
                                variant: 'outlined',
                                onBlur: formik.handleBlur,
                                error: !!(formik.touched.ngayBay && formik.errors.ngayBay),
                                helperText: formik.touched.ngayBay && formik.errors.ngayBay,
                            }
                        }}
                        label="Ngày bay dự kiến"
                    />

                    <DatePicker
                        onChange={(value) => {
                            formik.setFieldValue('ngayDen', Date.parse(value));
                        }}
                        value={formik.values.ngayDen}
                        name="ngayDen"
                        sx={{ width: "100%", marginTop: "12px" }}
                        format="dd/MM/yyyy"
                        slotProps={{
                            textField: {
                                size: 'small',
                                variant: 'outlined',
                                onBlur: formik.handleBlur,
                                error: !!(formik.touched.ngayDen && formik.errors.ngayDen),
                                helperText: formik.touched.ngayDen && formik.errors.ngayDen,
                            }
                        }}
                        label="Ngày đến dự kiến"
                    />
                    <Autocomplete
                        sx={{ marginTop: "12px" }}
                        fullWidth
                        size="small"
                        options={listMainEmployee}
                        value={listMainEmployee.find(option => option.emId === formik.values.nguoiPhuTrach) || null}
                        onChange={(_, value) => {
                            formik.setFieldValue('nguoiPhuTrach', value ? value.emId : null);
                        }}
                        onBlur={formik.handleBlur('nguoiPhuTrach')}
                        getOptionLabel={(option) => option.emName}
                        renderInput={(params) => (
                            <TextField
                                variant="outlined"
                                {...params}
                                label="Người phụ trách"
                                name="nguoiPhuTrach"
                                error={formik.touched.nguoiPhuTrach && Boolean(formik.errors.nguoiPhuTrach)}
                                helperText={formik.touched.nguoiPhuTrach && formik.errors.nguoiPhuTrach}
                            />
                        )}
                    />

                    <Autocomplete
                        sx={{ marginTop: "12px" }}
                        fullWidth
                        size="small"
                        options={listAirPorts}
                        value={listAirPorts.find((item) => item.airId === formik.values.sanBayDi) || null}
                        onChange={(_, newValue) => {
                            formik.setFieldValue('sanBayDi', newValue ? newValue.airId : null);
                        }}
                        getOptionLabel={(option) => option.airName}
                        renderInput={(params) => (
                            <TextField
                                variant="outlined"
                                {...params}
                                label="Sân bay đi"
                                name="sanBayDi"
                                onBlur={formik.handleBlur}
                                error={formik.touched.sanBayDi && Boolean(formik.errors.sanBayDi)}
                                helperText={formik.touched.sanBayDi && formik.errors.sanBayDi}
                            />
                        )}
                    />

                    <Autocomplete
                        sx={{ marginTop: "12px" }}
                        fullWidth
                        size="small"
                        options={listAirPorts}
                        value={listAirPorts.find((item) => item.airId === formik.values.sanBayDen) || null}
                        onChange={(_, newValue) => {
                            formik.setFieldValue('sanBayDen', newValue ? newValue.airId : null);
                        }}
                        getOptionLabel={(option) => option.airName}
                        renderInput={(params) => (
                            <TextField
                                variant="outlined"
                                {...params}
                                label="Sân bay đến"
                                name="sanBayDen"
                                onBlur={formik.handleBlur}
                                error={formik.touched.sanBayDen && Boolean(formik.errors.sanBayDen)}
                                helperText={formik.touched.sanBayDen && formik.errors.sanBayDen}
                            />
                        )}
                    />
                    {/* </Grid> */}
                    {/* <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={formik.handleSubmit}
                            variant="contained"
                            sx={{
                                width: "130px",
                                backgroundColor: "#1C2536",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        >
                            Lưu
                        </Button>
                    </Box> */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            width: '100%',
                            marginTop: '20px'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={formik.handleSubmit}
                            startIcon={<Save />}
                            sx={{
                                backgroundColor: '#1C2536',
                            }}

                        >
                            Lưu
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
