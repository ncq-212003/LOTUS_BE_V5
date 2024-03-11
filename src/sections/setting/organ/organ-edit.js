import React, { useEffect } from 'react';
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
    MenuItem,
    Autocomplete,
} from '@mui/material';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_ORGAN } from 'src/contexts/reducer/setting/reducer-organ';
import { listOrganApi, updateOrganApi } from 'src/contexts/api/setting/api-organ';
import SnackbarAlert from 'src/components/action-notification';
import { useState } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrganEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { organ } = state;
    const { organs } = organ;

    const typeOptions = [
        {
            id: 1,
            label: 'Hộ chiếu',
        },
        {
            id: 2,
            label: 'Căn cước công dân',
        }
    ]

    const initialValues = {
        organName: '',
        documentType: null,
        address: '',
        description: '',
    };

    const validationSchema = Yup.object({
        organName: Yup.string().required('Tên cơ quan là bắt buộc'),
        documentType: Yup.object().required('Loại giấy tờ là bắt buộc '),
        address: Yup.string(),
        description: Yup.string(),
    });

    const dataEdit = Array.isArray(organs) ? organs.find(x => x.officeId == id) : [];

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            console.log(values);
            try {
                const formData = {
                    officeId: id,
                    officeName: values.organName,
                    locationId: 1,
                    locationIdHidden: "1",
                    address: values.address,
                    type: values.documentType.label,
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
                    flag: "1"
                }

                const response = await updateOrganApi(formData)

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listOrganApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_ORGAN.LIST_ORGAN,
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
        const fetchDormitoryData = async () => {
            try {
                const selectedType = typeOptions.find((type) => type.label === dataEdit.type);
                formik.setValues({
                    organName: dataEdit.officeName,
                    documentType: selectedType || null,
                    address: dataEdit.address,
                    description: dataEdit.description,
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchDormitoryData();
        }
    }, [open, id]);

    const handleChange = (field, event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
            formik.setFieldValue(field, newValue);

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
                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Tên cơ quan"
                            name="organName"
                            value={formik.values.organName}
                            onChange={formik.handleChange}
                            error={formik.touched.organName && Boolean(formik.errors.organName)}
                            helperText={formik.touched.organName && formik.errors.organName}
                            variant='outlined'
                            fullWidth
                        />
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={typeOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => handleChange('documentType', event, newValue)}
                            onBlur={() => formik.setFieldTouched('documentType', true)}
                            value={formik.values.documentType}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Loại giấy tờ"
                                    variant="outlined"
                                    error={formik.touched.documentType && Boolean(formik.errors.documentType)}
                                    helperText={formik.touched.documentType && formik.errors.documentType}
                                />
                            }
                        />

                        <TextField
                            required
                            sx={{ margin: '4px', marginTop: '12px' }}
                            size="small"
                            label="Địa chỉ"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
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
