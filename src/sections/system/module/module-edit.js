import React, { useEffect, useState } from 'react';
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
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    SvgIcon,
    DialogActions,
} from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_MODULE } from 'src/contexts/reducer/system/reducer-module';
import SnackbarAlert from 'src/components/action-notification';
import { listModuleApi, updateModuleApi } from 'src/contexts/api/system/api-module';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModuleEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { module } = state;
    const { modules } = module;

    const dataEdit = Array.isArray(modules) ? modules.find(x => x.moduleSystemId == id) : [];

    const validationSchema = Yup.object({
        moduleName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        description: Yup.string()
    });

    const initialValues = {
        moduleName: '',
        description: ''
    };
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    moduleSystemId: id,
                    hashCode: "1",
                    moduleSystemName: values.moduleName,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    description: values.description,
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifedAt: new Date().toISOString(),
                    lastModifedBy: 1,
                    lastModifedByHidden: "1",
                    flag: "1"
                }

                const response = await updateModuleApi(formData)

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listModuleApi();
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
        const fetchModuleData = async () => {
            try {
                formik.setValues({
                    moduleName: dataEdit.moduleSystemName || '',
                    description: dataEdit.description || '',
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchModuleData();
        }
    }, [open, id]);


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
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên module"
                            name="moduleName"
                            value={formik.values.moduleName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.moduleName && Boolean(formik.errors.moduleName)}
                            helperText={formik.touched.moduleName && formik.errors.moduleName}
                            variant='outlined'
                            fullWidth
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
                            variant='outlined'
                            multiline
                            rows={3}
                            fullWidth
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
