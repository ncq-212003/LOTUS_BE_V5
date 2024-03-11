import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from '@mui/material';
import { useApp } from 'src/hooks/use-app';
import { addModuleApi, listModuleApi } from 'src/contexts/api/system/api-module';
import { HANDLERS_MODULE } from 'src/contexts/reducer/system/reducer-module';
import SnackbarAlert from 'src/components/action-notification';

const validationSchema = Yup.object({
    moduleName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    description: Yup.string()
});

const initialValues = {
    moduleName: '',
    description: '',
};

export default function ModuleAdd() {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    moduleSystemId: 1,
                    hashCode: "1",
                    moduleSystemName: values.moduleName,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    description: values.description || "1",
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifedAt: new Date().toISOString(),
                    lastModifedBy: 1,
                    lastModifedByHidden: "1",
                    flag: "1"
                }
                // console.log(formData);

                const response = await addModuleApi(formData)
                console.log(response.status);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    // call api list after add success
                    const res = await listModuleApi();
                    console.log(res.data);
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_MODULE.LIST_MODULE,
                        payload: res.data,
                    });
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                console.log(err);
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: '64px' }}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                    <Box
                        sx={{
                            padding: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
                            Thêm module
                        </Typography>

                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên module"
                            name="moduleName"
                            value={formik.values.moduleName}
                            onChange={formik.handleChange}
                            error={formik.touched.moduleName && Boolean(formik.errors.moduleName)}
                            helperText={formik.touched.moduleName && formik.errors.moduleName}
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Mô tả"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            variant='outlined'
                            multiline
                            rows={3}
                            fullWidth
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
    );
}
