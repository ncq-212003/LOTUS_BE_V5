import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    TextField,
    SvgIcon,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Dialog,
    Button,
    Avatar,
    styled,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import SnackbarAlert from "src/components/action-notification";
import { useFormik } from "formik";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import { Save, CloudUpload } from "@mui/icons-material";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import { editCertificateApi, listCertificateApi } from "src/contexts/api/train/api-certificate";
import { HANDLERS_CERTIFICATE } from "src/contexts/reducer/train/reducer-certificate";

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CertificateEdit({ open, onClose, id }) {
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { certificate } = state;
    const { certificates } = certificate;

    const dataEdit = Array.isArray(certificates) ? certificates.find(x => x.certificateId == id) : [];
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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    certificateId: dataEdit.certificateId || '',
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
                };

                const response = await editCertificateApi(formData);
                if (response.status === 200) {
                    formik.resetForm();

                    // call api list after add success
                    const res = await listCertificateApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_CERTIFICATE.LIST_CERTIFICATE,
                        payload: res.data,
                    });
                    handleClose(true);
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });
    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    code: dataEdit.code || '',
                    certificateName: dataEdit.certificateName || '',
                    companyAprove: dataEdit.companyAprove || '',
                    logo: dataEdit.logo || '',
                    certificateField: dataEdit.certificateField || '',
                    description: dataEdit.description || '',
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchCertificateData();
        }
    }, [open, id]);


    const handleClose = () => {
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => handleClose(false)}
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
            <DialogContent dividers sx={{ overflowX: "hidden !important" }}>
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
                <Button size="small"
                    component="label"
                    fullWidth
                    name="logo"
                    sx={{ margin: "4px", marginTop: "14px" }}>
                    {selectedFileLogo ? (
                        <>
                            <CloudUpload sx={{ marginRight: 1 }} />
                            {`Logo: ${selectedFileLogo.name}`}
                        </>
                    ) : (
                        <>
                            <CloudUpload sx={{ marginRight: 1 }} />
                            Thay logo
                        </>
                    )}
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Avatar
                        src={'https://lotus.i.tisbase.online' + formik.values.logo}
                        alt="Avatar"
                        sx={{ width: 40, height: 40, textAlign: 'center', marginLeft: '15px' }}
                    >Logo</Avatar>
                </Button>

                <TextField
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Thông Tin Chi Tiết"
                    fullWidth
                    name="description"
                    value={formik.values.description}
                    onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <Button autoFocus
                    onClick={formik.submitForm}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                    startIcon={<Save />}
                >
                    Lưu
                </Button>
            </DialogActions>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </BootstrapDialog>
    );
}
