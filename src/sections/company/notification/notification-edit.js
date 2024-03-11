import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import {
    TextField,
    SvgIcon,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Autocomplete,
    styled,
} from "@mui/material";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { Save } from "@mui/icons-material";
import { editNotificationApi, listNotificationApi } from "src/contexts/api/company/api-notification";
import { HANDLERS_NOTIFICATION } from "src/contexts/reducer/company/reducer-notification";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function NotificationEdit({ open, onClose, id }) {
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // state
    const [state, dispatch] = useApp();
    const { notification } = state;
    const { notifications } = notification;

    const notificationEdit = Array.isArray(notifications) ? notifications.find(x => x.messageId == id) : [];

    const validationSchema = Yup.object({
        title: Yup.string().max(100).required('Vui lòng nhập thông tin vào trường này'),
        messageContent: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        createdBy: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        // ngaythongbao: Yup.date()
        //     .required('Vui lòng nhập ngày thông báo')
        //     .min(new Date(), 'Ngày thông báo phải từ ngày hôm nay trở đi')
        //     .typeError("Vui lòng nhập đúng định dạng"),
        priority: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        title: '',
        messageContent: '',
        createdBy: '',
        ngaythongbao: null,
        priority: '',
        description: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    messageId: id,
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
                };

                const response = await editNotificationApi(formData);
                if (response.status === 200) {
                    // setSnackbarSeverity("success");
                    // setSnackbarMessage("Sửa thành công !");
                    // setSnackbarOpen(true);
                    // call api list after add success
                    const res = await listNotificationApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_NOTIFICATION.LIST_NOTIFICATION,
                        payload: res.data,
                    });

                    handleClose(true);
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                formik.setValues({
                    title: notificationEdit.title || "",
                    messageContent: notificationEdit.messageContent || "",
                    createdBy: notificationEdit.createdBy || "",
                    ngaythongbao: notificationEdit.ngaythongbao || null,
                    priority: notificationEdit.priority || "",
                    description: notificationEdit.description || ""
                });
            }
            catch (error) {
                console.error("Error fetching company data:", error);
            }
        }
        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchNotificationData();
        }
    }, [open, id]);
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => handleClose(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <SvgIcon fontSize="inherit">
                    <XCircleIcon />
                </SvgIcon>
            </IconButton>
            <DialogContent dividers sx={{ overflowX: "hidden !important" }}>
                <TextField
                    required
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Tiêu đề"
                    fullWidth
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    sx={{ margin: "4px", marginTop: "12px" }}
                    variant="outlined"
                    size="small"
                    label="Nội dung"
                    fullWidth
                    name="messageContent"
                    value={formik.values.messageContent}
                    onChange={formik.handleChange}
                    error={formik.touched.messageContent && Boolean(formik.errors.messageContent)}
                    helperText={formik.touched.messageContent && formik.errors.messageContent}
                />
                <TextField
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Người tạo thông báo"
                    fullWidth
                    name="createdBy"
                    value={formik.values.createdBy}
                    onChange={formik.handleChange}
                    error={formik.touched.createdBy && Boolean(formik.errors.createdBy)}
                    helperText={formik.touched.createdBy && formik.errors.createdBy}
                />
                <Autocomplete
                    required
                    sx={{ margin: "4px", marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={['Ưu tiên cao', 'Bình thường', 'Ưu tiên thấp']}
                    renderInput={(params) => <TextField {...params} label="Mức độ" />}
                    name="priority"
                    value={formik.values.priority}
                    onChange={(_, newValue) => formik.setFieldValue('priority', newValue)}
                    error={formik.touched.priority && Boolean(formik.errors.priority)}
                    helperText={formik.touched.priority && formik.errors.priority}
                />
                <TextField
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Mô tả"
                    fullWidth
                    value={formik.values.description}
                    onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <Button autoFocus
                    onClick={formik.submitForm}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                    startIcon={<Save />}
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
        </BootstrapDialog>
    );
}
