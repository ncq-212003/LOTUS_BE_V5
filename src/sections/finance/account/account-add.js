import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Stack,
    TextField,
    Autocomplete,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import SnackbarAlert from "src/components/action-notification";
import { listPaymentTypeApi } from 'src/contexts/api/setting/api-payment-type';
import { GenerateApi } from 'src/contexts/api/random-api';

export const PaymentAccount = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listNameCompany, setListNameCompany] = useState([]);
    const [listNamePayMent, setListNamePayment] = useState([]);
    const [numberRandom, setNumberRandom] = useState([]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    console.log("checkkk kkkk", numberRandom)
    // sử dụng formik để validate dữ liệu
    const validationSchema = Yup.object({
        chuTaiKhoan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soTaiKhoan: Yup
            .number()
            .typeError('Số tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        maTaiKhoan: Yup
            .number()
            .typeError('Mã tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        tenCongTy: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        hinhThucThanhToan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soDuBatDau: Yup
            .number()
            .typeError('Số dư phải là một số')
            .positive('Số dư phải là số lớn hơn 0')
            .nullable()
            .default(null)
            .transform((originalValue, originalObject) => {
                return originalValue === undefined ? null : originalValue;
            }),
    });

    const initialValues = {
        chuTaiKhoan: "",
        soTaiKhoan: "",
        maTaiKhoan: "",
        tenCongTy: "",
        hinhThucThanhToan: "",
        soDuBatDau: "",
        ghiChu: "",
        systemCode: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                setSnackbarSeverity("success");
                setSnackbarMessage("Thêm thành công !");
                setSnackbarOpen(true);
                console.log(data);
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })
    // end

    useEffect(() => {
        const fetchData = async () => {
            const response = await listCompanyApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listCompany = response.data.map((items) => ({
                    comId: items.companyId,
                    comName: items.companyName
                }))
                setListNameCompany(listCompany);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchPaymentTypeData = async () => {
            const response = await listPaymentTypeApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listPaymentType = response.data.map((items) => ({
                    payId: items.paymentTypeId,
                    payName: items.paymentTypeName
                }))
                setListNamePayment(listPaymentType);
            }
        }
        fetchPaymentTypeData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GenerateApi("TK", "number");
                if (response.status === 200) {
                    setNumberRandom(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                >
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <TextField
                            error={!!(formik.touched.chuTaiKhoan && formik.errors.chuTaiKhoan)}
                            helperText={formik.touched.chuTaiKhoan && formik.errors.chuTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.chuTaiKhoan}
                            name="chuTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Chủ tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.soTaiKhoan && formik.errors.soTaiKhoan)}
                            helperText={formik.touched.soTaiKhoan && formik.errors.soTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soTaiKhoan}
                            name="soTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.maTaiKhoan && formik.errors.maTaiKhoan)}
                            helperText={formik.touched.maTaiKhoan && formik.errors.maTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maTaiKhoan}
                            name="maTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listNameCompany}
                            value={listNameCompany.find(option => option.comId === formik.values.tenCongTy) || null}
                            onChange={(_, value) => {
                                formik.setFieldValue('tenCongTy', value ? value.comId : null);
                            }}
                            onBlur={formik.handleBlur('tenCongTy')}
                            getOptionLabel={(option) => option.comName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Thuộc công ty"
                                    name="tenCongTy"
                                    error={formik.touched.tenCongTy && Boolean(formik.errors.tenCongTy)}
                                    helperText={formik.touched.tenCongTy && formik.errors.tenCongTy}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listNamePayMent}
                            value={listNamePayMent.find(option => option.payId === formik.values.hinhThucThanhToan) || null}
                            onChange={(_, value) => {
                                formik.setFieldValue('hinhThucThanhToan', value ? value.payId : null);
                            }}
                            onBlur={formik.handleBlur('hinhThucThanhToan')}
                            getOptionLabel={(option) => option.payName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Hình thức thanh toán"
                                    name="hinhThucThanhToan"
                                    error={formik.touched.hinhThucThanhToan && Boolean(formik.errors.hinhThucThanhToan)}
                                    helperText={formik.touched.hinhThucThanhToan && formik.errors.hinhThucThanhToan}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.soDuBatDau && formik.errors.soDuBatDau)}
                            helperText={formik.touched.soDuBatDau && formik.errors.soDuBatDau}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soDuBatDau}
                            name="soDuBatDau"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số dư bắt đầu"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ghiChu}
                            name="ghiChu"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />

                        <TextField
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            InputProps={{
                                readOnly: true, // Prevents user input
                            }}
                            value={formik.values.systemCode = numberRandom}
                            name="systemCode"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã hệ thống"
                            fullWidth
                            variant="outlined"
                        />
                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        marginTop: "30px",
                                        backgroundColor: "#1C2536",
                                        // width: "100px",
                                    }}
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Stack>
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
};
