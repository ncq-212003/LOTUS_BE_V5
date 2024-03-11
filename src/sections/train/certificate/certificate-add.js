import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import {addCertificateApi, listCertificateApi } from "src/contexts/api/train/api-certificate";
import { HANDLERS_CERTIFICATE } from "src/contexts/reducer/train/reducer-certificate";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import SnackbarAlert from "src/components/action-notification";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertificateAdd({ open, onClose}) {
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [state, dispatch] = useApp();

    const validationSchema = Yup.object({
        code: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        certificateName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        companyAprove: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        logo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        certificateField: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        code: '',
        certificateName: '',
        companyAprove: '',
        logo: '',
        certificateField: '',
        description: '',
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    //Upload Img
    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            try {
                const response = await uploadSingleFile("Certificate", file);

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Tải file lên thành công.");
                    setSnackbarOpen(true);

                    const imagePath = getPathFromUrl(response.data);

                    setSelectedFileLogo(file);
                    formik.setFieldValue('logo', imagePath);
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            setSnackbarSeverity("warning");
            setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
            setSnackbarOpen(true);
            setSelectedFileLogo(null);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    certificateId: 1,
                    certificateName: values.certificateName,
                    code: values.code,
                    certificateField: values.certificateField,
                    logo: values.logo,
                    companyAprove: values.companyAprove,
                    description: values.description,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: "1",
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: "1",
                    lastModifiedByHidden: "1",
                    flag: "A"
                }

                const response = await addCertificateApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    //get list data after add
                    const data = await listCertificateApi();
                    dispatch({
                        type: HANDLERS_CERTIFICATE.LIST_CERTIFICATE,
                        payload: data.data,
                    })
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });
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
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Mã chứng chỉ"
                            fullWidth
                            name="code"
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('code', e.target.value)}
                            value={formik.values.code}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên chứng chỉ"
                            fullWidth
                            name="certificateName"
                            error={!!(formik.touched.certificateName && formik.errors.certificateName)}
                            helperText={formik.touched.certificateName && formik.errors.certificateName}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('certificateName', e.target.value)}
                            value={formik.values.certificateName}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên đơn vị cấp"
                            fullWidth
                            name="companyAprove"
                            error={!!(formik.touched.companyAprove && formik.errors.companyAprove)}
                            helperText={formik.touched.companyAprove && formik.errors.companyAprove}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('companyAprove', e.target.value)}
                            value={formik.values.companyAprove}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Chuyên ngành"
                            fullWidth
                            name="certificateField"
                            error={!!(formik.touched.certificateField && formik.errors.certificateField)}
                            helperText={formik.touched.certificateField && formik.errors.certificateField}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('certificateField', e.target.value)}
                            value={formik.values.certificateField}
                        />
                        <Button
                            size="small"
                            component="label"
                            fullWidth
                            sx={{ margin: "4px", marginTop: "14px", border: '1px solid #e5e7eb' }}
                        >
                            {selectedFileLogo ? (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    {`Logo: ${selectedFileLogo.name}`}
                                    <img
                                        src={URL.createObjectURL(selectedFileLogo)}
                                        alt={`Logo-${formik.values.code}`}
                                        style={{ marginLeft: '10px', width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    Upload Logo
                                </>
                            )}
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>

                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Thông Tin Chi Tiết"
                            fullWidth
                            value={formik.values.description}
                            onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
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
                                    '&:hover': {
                                        backgroundColor: '#0c4da2',
                                    },
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
        </Stack>
    );
}
