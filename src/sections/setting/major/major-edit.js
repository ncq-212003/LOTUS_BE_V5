import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { Save } from "@mui/icons-material";
import {
    TextField,
    SvgIcon,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    styled,
} from "@mui/material";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { editMajorApi, listMajorApi } from "src/contexts/api/setting/api-major";
import { HANDLERS_MAJOR } from "src/contexts/reducer/setting/reducer-major";

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

export default function MajorEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { major } = state;
    const { majors } = major;

    const dataEdit = Array.isArray(majors) ? majors.find(x => x.majorId == id) : [];

    const validationSchema = Yup.object({
        majorName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        timeTraining: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        // avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này')
    });

    const initialValues = {
        majorName: '',
        timeTraining: '',
        description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    majorId: dataEdit.majorId || '',
                    majorName: values.majorName,
                    timeTraining: values.timeTraining,
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
                };

                const response = await editMajorApi(formData);

                if (response.status === 200) {
                    formik.resetForm();

                    // call api list after add success
                    const res = await listMajorApi();

                    // dispatch list data
                    dispatch({
                        type: HANDLERS_MAJOR.LIST_MAJOR,
                        payload: res.data,
                    });
                    handleClose(true)
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

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        const fetchMajorData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    majorId: dataEdit.majorId || '',
                    majorName: dataEdit.majorName || '',
                    timeTraining: dataEdit.timeTraining || '',
                    description: dataEdit.description || '',
                });
            } catch (error) {
                console.error("Error fetching major data:", error);
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchMajorData();
        }
    }, [open, id]);

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
                    label="Tên chuyên ngành"
                    fullWidth
                    name="majorName"
                    error={!!(formik.touched.majorName && formik.errors.majorName)}
                    helperText={formik.touched.majorName && formik.errors.majorName}
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue('majorName', e.target.value)}
                    value={formik.values.majorName}
                />
                <TextField
                    required
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Thời gian đào tạo"
                    fullWidth
                    name="timeTraining"
                    error={!!(formik.touched.timeTraining && formik.errors.timeTraining)}
                    helperText={formik.touched.timeTraining && formik.errors.timeTraining}
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue('timeTraining', e.target.value)}
                    value={formik.values.timeTraining}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                <DatePicker
                                    error={!!(formik.touched.tranningTime && formik.errors.tranningTime)}
                                    helperText={formik.touched.tranningTime && formik.errors.tranningTime}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        const formattedDate = dayjs(value).format("YYYY-MM-DD");
                                        formik.setFieldValue("tranningTime", formattedDate);
                                    }}
                                    value={formik.values.tranningTime}
                                    name="tranningTime"
                                    sx={{ width: "100%" }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            variant: "outlined",
                                        },
                                    }}
                                    label="Thời gian đào tạo"
                                />
                            </LocalizationProvider> */}
                <TextField
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    variant="outlined"
                    label="Giới Thiệu Chi Tiết"
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
