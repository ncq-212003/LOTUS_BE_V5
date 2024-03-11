import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import Autocomplete from "@mui/material/Autocomplete";
import { addNotificationApi, listNotificationApi } from "src/contexts/api/company/api-notification";
import { HANDLERS_NOTIFICATION } from "src/contexts/reducer/company/reducer-notification";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationAdd() {
    const [snackbarSeverity, setSnackbarSeverity] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
        // context
    const [state, dispatch] = useApp();
    const priorityOptions = ['Cao', 'Trung bình', 'Thấp'];

    const validationSchema = Yup.object({
        title: Yup.string().max(100).required('Vui lòng nhập thông tin vào trường này'),
        messageContent: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        createdBy: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        // createdAt: Yup.date()
        //     .required('Vui lòng nhập ngày thông báo')
        //     .min(new Date(), 'Ngày thông báo phải từ ngày hôm nay trở đi')
        //     .typeError("Vui lòng nhập đúng định dạng"),
        priority: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        title: '',
        messageContent: '',
        createdBy: '',
        // createdAt: '',
        priority: '',
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
                    messageId: 1,
                    title: values.title,
                    messageContent: values.messageContent,
                    priority: values.priority,
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
                    lastModifiedBy: 1,
                    lastModifiedByHidden: "1",
                    flag: "A"
                }

                const response = await addNotificationApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    //get list data after add
                    const data = await listNotificationApi();
                    dispatch({
                        type: HANDLERS_NOTIFICATION.LIST_NOTIFICATION,
                        payload: data.data,
                    })
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
                            label="Tiêu đề"
                            fullWidth
                            name="title"
                            error={!!(formik.touched.title && formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('title', e.target.value)}
                            value={formik.values.title}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            variant="outlined"
                            size="small"
                            label="Nội dung"
                            fullWidth
                            name="messageContent"
                            error={!!(formik.touched.messageContent && formik.errors.messageContent)}
                            helperText={formik.touched.messageContent && formik.errors.messageContent}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('messageContent', e.target.value)}
                            value={formik.values.messageContent}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Người tạo thông báo"
                            fullWidth
                            name="createdBy"
                            error={!!(formik.touched.createdBy && formik.errors.createdBy)}
                            helperText={formik.touched.createdBy && formik.errors.createdBy}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('createdBy', e.target.value)}
                            value={formik.values.createdBy}
                        />
                        <Autocomplete
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={priorityOptions}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Mức độ"
                                    error={!!(formik.touched.priority && formik.errors.priority)}
                                    helperText={formik.touched.priority && formik.errors.priority}
                                />
                            )}
                            value={formik.values.priority}
                            onChange={(event, newValue) => {
                                // Ensure newValue is a string before setting it
                                const priorityValue = newValue ? newValue.toString() : '';
                                formik.setFieldValue('priority', priorityValue);
                            }}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Thông Tin Chi Tiết"
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
