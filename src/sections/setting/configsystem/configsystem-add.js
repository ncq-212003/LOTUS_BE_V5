import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";
import styles from '../../../style/index.module.scss';
import { useFormik } from "formik";
import SnackbarAlert from "src/components/action-notification";
import * as Yup from "yup";
import { addConfigSystemApi, listConfigSystemApi } from "src/contexts/api/setting/api-configsystem";
import { HANDLERS_CONFIGSYSTEM } from "src/contexts/reducer/setting/reducer-configsystem";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SystemAdd() {
    const [valueGroup, setvalueGroup] = useState(null)
    const [snackbarSeverity, setSnackbarSeverity] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const validationSchema = Yup.object({
        configName: Yup.string().max(10).required('Vui lòng nhập thông tin vào trường này'),
        configAlias: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        configKey: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        configValue: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        configGroup: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        configName: '',
        configAlias: '',
        configKey: '',
        configValue: '',
        configGroup: '',
        description: ''
    };
    
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    configSystemId: 0,
                    configName: values.configName,
                    configAlias: values.configAlias,
                    configKey: values.configKey,
                    configValue: values.configValue,
                    configGroup: values.configGroup,
                    description: values.description,
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
                    flag: "A"
                }

                const response = await addConfigSystemApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    //get list data after add
                    const data = await listConfigSystemApi();
                    dispatch({
                        type: HANDLERS_CONFIGSYSTEM.LIST_CONFIGSYSTEM,
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
                            label="Tên Cấu Hình"
                            fullWidth
                            name="configName"
                            error={!!(formik.touched.configName && formik.errors.configName)}
                            helperText={formik.touched.configName && formik.errors.configName}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('configName', e.target.value)}
                            value={formik.values.configName}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Alias"
                            fullWidth
                            name="configAlias"
                            error={!!(formik.touched.configAlias && formik.errors.configAlias)}
                            helperText={formik.touched.configAlias && formik.errors.configAlias}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('configAlias', e.target.value)}
                            value={formik.values.configAlias}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Key"
                            fullWidth
                            name="configKey"
                            error={!!(formik.touched.configKey && formik.errors.configKey)}
                            helperText={formik.touched.configKey && formik.errors.configKey}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('configKey', e.target.value)}
                            value={formik.values.configKey}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Value"
                            fullWidth
                            name="configValue"
                            error={!!(formik.touched.configValue && formik.errors.configValue)}
                            helperText={formik.touched.configValue && formik.errors.configValue}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('configValue', e.target.value)}
                            value={formik.values.configValue}
                        />
                        <Autocomplete
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={['Nhật Bản', 'Hàn Quốc', 'Việt Nam']}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Group"
                                    error={!!(formik.touched.configGroup && formik.errors.configGroup)}
                                    helperText={formik.touched.configGroup && formik.errors.configGroup}
                                />
                            )}
                            value={valueGroup}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('configGroup', newValue);
                                setvalueGroup(newValue);
                            }}
                        />
                        <TextField
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            variant="outlined"
                            label="Mô Tả Chi Tiết"
                            fullWidth
                            name="description"
                            value={formik.values.description}
                            onChange={(e) => formik.setFieldValue('description', e.target.value)}
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
                                className={styles.btn}
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
