import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Typography,
    Button
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProfessionApi, listProfessionApi } from "src/contexts/api/setting/api-profession";
import { HANDLERS_PROFESSION } from "src/contexts/reducer/setting/reducer-profession";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfessionAdd() {
    const [snackbarSeverity, setSnackbarSeverity] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [state, dispatch] = useApp();
    const history = useHistory();

    const validationSchema = Yup.object({
        code: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        jobName: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        fieldMarket: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const initialValues = {
        code: '',
        jobName: '',
        fieldMarket: '',
        description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    jobId: "1",
                    marketId: "1         ",
                    jobName: values.jobName,
                    code: values.code,
                    fieldMarket: values.fieldMarket,
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
                    flag: "E"
                }

                const response = await addProfessionApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    //get list data after add
                    const data = await listProfessionApi();
                    dispatch({
                        type: HANDLERS_PROFESSION.LIST_PROFESSION,
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
                            label="Mã Ngành Nghề"
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
                            label="Tên Ngành Nghề"
                            name="jobName"
                            fullWidth
                            error={!!(formik.touched.jobName && formik.errors.jobName)}
                            helperText={formik.touched.jobName && formik.errors.jobName}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('jobName', e.target.value)}
                            value={formik.values.jobName}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Loại Ngành Nghề"
                            name="fieldMarket"
                            fullWidth
                            error={!!(formik.touched.fieldMarket && formik.errors.fieldMarket)}
                            helperText={formik.touched.fieldMarket && formik.errors.fieldMarket}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('fieldMarket', e.target.value)}
                            value={formik.values.fieldMarket}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Thông Tin Khác"
                            name="description"  // <-- Corrected
                            fullWidth
                            value={formik.values.description}  // <-- Corrected
                            onChange={(e) => formik.setFieldValue('description', e.target.value)}  // <-- Corrected
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
        </Stack>
    );
}
