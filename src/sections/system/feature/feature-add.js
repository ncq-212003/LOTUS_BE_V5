import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useApp } from 'src/hooks/use-app';
import { addFeatureApi, listFeatureApi } from 'src/contexts/api/system/api-feature';
import { listModuleApi } from 'src/contexts/api/system/api-module';
import { HANDLERS_FEATURE } from 'src/contexts/reducer/system/reducer-feature';
import SnackbarAlert from 'src/components/action-notification';

const validationSchema = Yup.object({
    module: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
    featureName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    description: Yup.string()
});

const initialValues = {
    module: null,
    featureName: '',
    description: '',
};

export default function FeatureAdd() {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [moduleOption, setModuleOption] = useState([]);


    //List Module
    useEffect(() => {
        const listModuleName = async () => {
            const res = await listModuleApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const modules = res.data.map((md) => ({
                    label: md.moduleSystemName,
                    value: md.moduleSystemId,
                }));
                setModuleOption(modules);
            }
        };
        listModuleName();
    }, []);
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    functionSystemId: 1,
                    hashCode: "1",
                    functionName: values.featureName,
                    moduleSystemId: values.module.value,
                    moduleSystemIdHidden: "1",
                    timeStamp: "1",
                    value: 1,
                    valueHidden: "1",
                    description: values.description,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifedAt: new Date().toISOString(),
                    lastModifedBy: 1,
                    lastModifedByHidden: "1",
                    flag: "1"
                }
                // console.log(formData);

                const response = await addFeatureApi(formData)
                console.log(response.status);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    // call api list after add success
                    const res = await listFeatureApi();
                    console.log(res.data);
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_FEATURE.LIST_FEATURES,
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

    const handleChange = (event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
            formik.setFieldValue('module', newValue);
        } else {
            formik.handleChange(event);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ p: 2, marginTop: '64px' }}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                    <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '6px' }}>
                        <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
                            Thêm chức năng
                        </Typography>
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={moduleOption}
                            getOptionLabel={(option) => option.label}
                            onChange={handleChange}
                            onBlur={() => formik.setFieldTouched('module', true)}
                            value={formik.values.module}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Module"
                                    variant="outlined"
                                    error={formik.touched.module && Boolean(formik.errors.module)}
                                    helperText={formik.touched.module && formik.errors.module}
                                />
                            }
                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên chức năng"
                            name="featureName"
                            value={formik.values.featureName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.featureName && Boolean(formik.errors.featureName)}
                            helperText={formik.touched.featureName && formik.errors.featureName}
                            fullWidth
                            variant="outlined"

                        />
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Mô tả"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
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
        </Box>
    );
}