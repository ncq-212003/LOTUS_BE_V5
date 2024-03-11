import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_COUNTRY } from "src/contexts/reducer/setting/reducer-country";
import { addCountryApi, listCountryApi } from "src/contexts/api/setting/api-country";
import { useApp } from "src/hooks/use-app";
import ConfirmAlert from "src/components/action-confirm";

export default function CountryAdd() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    //Alert Confirm
    const [isDialogSave, setIsDialogSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleModelOpen = () => {
        setIsDialogSave(true);
    };

    const handleModelClose = () => {
        setIsDialogSave(false);
    };

    // khi người dùng ấn thoát
    const handleCancelSave = () => {
        handleModelClose();
    }

    // khi người dùng xác định lưu 
    const handleConfirmSave = () => {
        setIsSaving(true);
        handleModelClose();
        formik.handleSubmit();
    }
    //end

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        tenQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        maQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        tenQuocGia: "",
        maQuocGia: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    returnValue: 0,
                    countryId: 1,
                    name: values.tenQuocGia,
                    code: values.maQuocGia
                }
                if (isSaving) {
                    const response = await addCountryApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);
                        formik.resetForm();
                        const res = await listCountryApi();
                        dispatch({
                            type: HANDLERS_COUNTRY.LIST_COUNTRY,
                            payload: res.data
                        })
                        setIsSaving(false);
                    } else {
                        setIsSaving(false);
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Có lỗi xảy ra !");
                        setSnackbarOpen(true);
                    }
                } else {
                    handleModelOpen();
                }
            } catch (err) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    sm={12}
                    md={12}
                    xs={12}
                >
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>

                        <TextField
                            error={!!(formik.touched.tenQuocGia && formik.errors.tenQuocGia)}
                            helperText={formik.touched.tenQuocGia && formik.errors.tenQuocGia}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenQuocGia}
                            name="tenQuocGia"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên quốc gia"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.maQuocGia && formik.errors.maQuocGia)}
                            helperText={formik.touched.maQuocGia && formik.errors.maQuocGia}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maQuocGia}
                            name="maQuocGia"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Mã quốc gia"
                            fullWidth
                            variant="outlined"
                        />
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
                                sx={{
                                    backgroundColor: '#1C2536',
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Thêm
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

            <ConfirmAlert
                onOpen={isDialogSave}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </Stack>
    );
}
