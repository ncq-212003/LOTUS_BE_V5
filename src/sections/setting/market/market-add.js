import React, { useState, useEffect } from "react";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import { useApp } from "src/hooks/use-app";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import * as Yup from "yup";
import { addMarketApi, listMarketApi } from "src/contexts/api/setting/api-market";
import { HANDLERS_MARKET } from "src/contexts/reducer/setting/reducer-market";
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

export default function MarketAdd() {
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [state, dispatch] = useApp();
    const validationSchema = Yup.object({
        field1: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        marketName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        field1:'',
        marketName: '',
        avatar: '',
        description: '',
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
      
        if (file && file.type.startsWith('image/')) {
          try {
            const response = await uploadSingleFile("Market", file);
      
            if (response.status === 200) {
              setSnackbarSeverity("success");
              setSnackbarMessage("Tải file lên thành công.");
              setSnackbarOpen(true);
      
              const imagePath = getPathFromUrl(response.data);
      
              setSelectedFileLogo(file);
              formik.setFieldValue('avatar', imagePath); 
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
                    marketId: 1,
                    marketName: values.marketName,
                    avatar: values.avatar,
                    status: "Đang hoạt động",
                    description: values.description,
                    isVisible: "1",
                    field1: values.field1,
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    createdAt: "06/06/2002",
                    createBy: 1,
                    createByHidden: "1",
                    lastModifedAt: "06/06/2002",
                    lastModifedBy: 1,
                    lastModifedByHidden: "1",
                    flag: "A"
                }

                const response = await addMarketApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    //get list data after add
                    const data = await listMarketApi();
                    dispatch({
                        type: HANDLERS_MARKET.LIST_MARKET,
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
                            label="Mã Nước"
                            fullWidth
                            name="field1"
                            error={!!(formik.touched.field1 && formik.errors.field1)}
                            helperText={formik.touched.field1 && formik.errors.field1}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('field1', e.target.value)}
                            value={formik.values.field1}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên Nước"
                            fullWidth
                            name="marketName"
                            error={!!(formik.touched.marketName && formik.errors.marketName)}
                            helperText={formik.touched.marketName && formik.errors.marketName}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('marketName', e.target.value)}
                            value={formik.values.marketName}
                        />
                        <Button size="small"
                            component="label"
                            fullWidth
                            name="avatar"
                            sx={{ margin: "4px", marginTop: "14px", border: '1px solid #e5e7eb' }}>
                            {selectedFileLogo ? (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    {`avatar: ${selectedFileLogo.name}`}
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    Upload Avatar
                                </>
                            )}
                            <VisuallyHiddenInput type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Trạng thái"
                            fullWidth
                            name="status"
                            error={!!(formik.touched.status && formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('status', e.target.value)}
                            value={formik.values.status}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Giới Thiệu Chi Tiết"
                            name="description"
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