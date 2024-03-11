import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    MenuItem,
    Autocomplete,
} from '@mui/material';
import { useApp } from 'src/hooks/use-app';
import { addOrganApi, listOrganApi } from 'src/contexts/api/setting/api-organ';
import { HANDLERS_ORGAN } from 'src/contexts/reducer/setting/reducer-organ';
import SnackbarAlert from 'src/components/action-notification';
import { useState } from 'react';

const validationSchema = Yup.object({
    organName: Yup.string().required('Tên cơ quan là bắt buộc'),
    documentType: Yup.object().required('Loại giấy tờ là bắt buộc '),
    address: Yup.string(),
    description: Yup.string(),
});

const initialValues = {
    organName: '',
    documentType: null,
    address: '',
    description: '',
};

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

export default function OrganAdd() {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    officeId: 1,
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

                const response = await addOrganApi(formData)
                console.log(response.status);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    // call api list after add success
                    const res = await listOrganApi();
                    console.log(res.data);
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
