import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AppBar, Autocomplete, Box, Button, Dialog, DialogActions, Grid, IconButton, Slide, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/system';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_FEATURE } from 'src/contexts/reducer/system/reducer-feature';
import { listFeatureApi, updateFeatureApi } from 'src/contexts/api/system/api-feature';
import SnackbarAlert from 'src/components/action-notification';
import { listModuleApi } from 'src/contexts/api/system/api-module';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeatureEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { feature } = state;
    const { features } = feature;
    const [moduleOption, setModuleOption] = useState([])

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
                console.log(modules);
            }
        };
        listModuleName();
    }, []);

    const validationSchema = Yup.object({
        module: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
        featureName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        description: Yup.string(),
    });

    const dataEdit = Array.isArray(features) ? features.find(x => x.functionSystemId == id) : [];

    const formik = useFormik({
        initialValues: {
            module: null,
            featureName: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    functionSystemId: id,
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

                const response = await updateFeatureApi(formData)

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listFeatureApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_FEATURE.LIST_FEATURE,
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
        const fetchFeatureData = async () => {
            try {
                const selectedModule = moduleOption.find((module) => module.value === id);
                formik.setValues({
                    module: selectedModule || null,
                    featureName: dataEdit.functionName || '',
                    description: dataEdit.description || '',
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchFeatureData();
        }
    }, [open, id]);

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

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Sửa thông tin
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2 }}>
                <Grid container spacing={2} margin="none" justifyContent="center">
                    <Grid item sm={12} md={12} xs={12}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={moduleOption}
                            getOptionLabel={(option) => option.label}
                            onChange={handleChange}
                            onBlur={() => formik.setFieldTouched('module', true)}
                            value={formik.values.module}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Module"
                                    variant="outlined"
                                    error={formik.touched.module && Boolean(formik.errors.module)}
                                    helperText={formik.touched.module && formik.errors.module}
                                />
                            )}
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
                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
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
        </Dialog>
    );
}
