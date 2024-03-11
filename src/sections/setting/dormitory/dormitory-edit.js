import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_DORMITORY } from "src/contexts/reducer/setting/reducer-dormitory";
import { listDormitoryApi, updateDormitoryApi } from "src/contexts/api/setting/api-dormitory";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import SnackbarAlert from "src/components/action-notification";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DormitoryEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { dormitory } = state;
    const { dormitories } = dormitory;
    const [companyOption, setCompanyOption] = useState([])

    const statusOptions = [
        {
            value: '1',
            label: 'Đang mở',
        },
        {
            value: '2',
            label: 'Đã đóng',
        },
        {
            value: '3',
            label: 'Chưa mở',
        },
    ]
    //List Company
    useEffect(() => {
        const listCompanyName = async () => {
            const res = await listCompanyApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const companies = res.data.map((com) => ({
                    label: com.companyName,
                    value: com.companyId,
                }));
                setCompanyOption(companies);
            }
        };
        listCompanyName();
    }, []);

    const validationSchema = Yup.object({
        congTy: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
        maKtx: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        tenKtx: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        trangThai: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
    });

    const initialValues = {
        congTy: null,
        maKtx: "",
        tenKtx: "",
        diaChi: "",
        trangThai: null,
    };

    const dataEdit = Array.isArray(dormitories) ? dormitories.find(x => x.dormitoryId == id) : [];
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    dormitoryId: id,
                    code: values.maKtx,
                    dormitoryName: values.tenKtx,
                    companyId: values.congTy.value,
                    companyIdHidden: "1",
                    address: values.diaChi,
                    status: values.trangThai.label,
                    description: "string",
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: 1,
                    lastModifiedByHidden: "1",
                    flag: "1"
                }

                const response = await updateDormitoryApi(formData)

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listDormitoryApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_DORMITORY.LIST_DORMITORY,
                        payload: res.data,
                    });
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Sửa thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const fetchDormitoryData = async () => {
            try {
                const selectedCompany = companyOption.find((company) => company.value === dataEdit.companyId);
                const selectedStatus = statusOptions.find((status) => status.label === dataEdit.status);
                console.log(selectedStatus);
                formik.setValues({
                    congTy: selectedCompany || null,
                    maKtx: dataEdit.code || '',
                    tenKtx: dataEdit.dormitoryName,
                    diaChi: dataEdit.address || '',
                    trangThai: selectedStatus || null,
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchDormitoryData();
        }
    }, [open, id]);

    const handleChange = (field, event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
            formik.setFieldValue(field, newValue);

        } else {
            formik.handleChange(event);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} xs={12}>
                        <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '6px' }}>
                            <Autocomplete
                                fullWidth
                                size="small"
                                sx={{ margin: '4px', marginTop: '12px' }}
                                options={companyOption}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => handleChange('congTy', event, newValue)}
                                onBlur={() => formik.setFieldTouched('congTy', true)}
                                value={formik.values.congTy}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Công ty"
                                        variant="outlined"
                                        error={formik.touched.congTy && Boolean(formik.errors.congTy)}
                                        helperText={formik.touched.congTy && formik.errors.congTy}
                                    />
                                }
                            />
                            <TextField
                                required
                                sx={{ margin: '4px', marginTop: '12px' }}
                                size="small"
                                label="Mã khu KTX"
                                name="maKtx"
                                value={formik.values.maKtx}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.maKtx && Boolean(formik.errors.maKtx)}
                                helperText={formik.touched.maKtx && formik.errors.maKtx}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                sx={{ margin: '4px', marginTop: '12px' }}
                                size="small"
                                label="Tên khu KTX"
                                name="tenKtx"
                                value={formik.values.tenKtx}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tenKtx && Boolean(formik.errors.tenKtx)}
                                helperText={formik.touched.tenKtx && formik.errors.tenKtx}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                sx={{ margin: '4px', marginTop: '12px' }}
                                size="small"
                                label="Địa chỉ"
                                name="diaChi"
                                value={formik.values.diaChi}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.diaChi && Boolean(formik.errors.diaChi)}
                                helperText={formik.touched.diaChi && formik.errors.diaChi}
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                fullWidth
                                size="small"
                                sx={{ margin: '4px', marginTop: '12px' }}
                                options={statusOptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => handleChange('trangThai', event, newValue)}
                                onBlur={() => formik.setFieldTouched('trangThai', true)}
                                value={formik.values.trangThai}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Trạng thái"
                                        variant="outlined"
                                        error={formik.touched.trangThai && Boolean(formik.errors.trangThai)}
                                        helperText={formik.touched.trangThai && formik.errors.trangThai}
                                    />
                                }
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    width: '100%',
                                    marginTop: '20px',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        backgroundColor: '#1C2536',
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Box>
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
        </Dialog>
    );
}
