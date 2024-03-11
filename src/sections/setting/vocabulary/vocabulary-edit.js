/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Button,
    Dialog,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    styled
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import { listStatusApi, updateStatusApi } from "src/contexts/api/setting/api-status";
import { HANDLERS_STATUS } from "src/contexts/reducer/setting/reducer-status";
import { listVocabularyApi, updateVocabularyApi } from "src/contexts/api/setting/api-vocabulary";
import { HANDLERS_VOCABULARY } from "src/contexts/reducer/setting/reducer-vocabulary";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function StatusEdit({ open, onClose, id }) {
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // context
    const [state, dispatch] = useApp();
    const { vocabulary } = state;
    const { vocabularies } = vocabulary;

    //Alert Confirm Edit
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleModelOpen = () => {
        setIsEditDialog(true);
    };

    const handleModelClose = () => {
        setIsEditDialog(false);
    };

    // khi người dùng ấn thoát
    const handleCancelSave = () => {
        handleModelClose();
    }

    // khi người dùng xác định lưu 
    const handleConfirmSave = () => {
        setIsEditing(true);
        handleModelClose();
        formik.handleSubmit();
    }
    //end

    const dataEdit = Array.isArray(vocabularies) ? vocabularies.find(x => x.vocalbularyId == id) : [];

    const validationSchema = Yup.object({
        tuGoc: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        translate: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        Means: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        Description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    });

    const initialValues = {
        tuGoc: '',
        translate: 'Nhật',
        Means: '',
        Description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    CreatedByHidden: "1",
                    Language: values.translate.trim(),
                    Flag: "1",
                    VocalbularyId: id,
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: new Date().toISOString(),
                    Field5: "1",
                    Description: values.Description.trim(),
                    VocalbularyRoot: values.tuGoc.trim(),
                    VocalbularyTranslate: values.Means.trim(),
                    CreatedBy: "1",
                };

                // console.log(formData);
                if (isEditing) {
                    const response = await updateVocabularyApi(formData);
                    if (response.status === 200) {
                        // call api list after add success
                        const res = await listVocabularyApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_VOCABULARY.LIST_VOCABULARY,
                            payload: res.data,
                        });

                        handleClose(true);
                        setIsEditing(false);
                    } else {
                        setIsEditing(false);
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Có lỗi xảy ra !");
                        setSnackbarOpen(true);
                    }
                } else {
                    handleModelOpen();
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
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    tuGoc: dataEdit.vocalbularyRoot || '',
                    translate: dataEdit.language || 'Nhật',
                    Means: dataEdit.vocalbularyTranslate || '',
                    Description: dataEdit.description || "",
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchCompanyData();
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
            <DialogContent dividers>
                <TextField
                    error={formik.touched.tuGoc && Boolean(formik.errors.tuGoc)}
                    helperText={formik.touched.tuGoc && formik.errors.tuGoc}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.tuGoc}
                    name="tuGoc"
                    required
                    sx={{ marginTop: "18px" }}
                    size="small"
                    label="Từ dịch"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    error={formik.touched.translate && Boolean(formik.errors.translate)}
                    helperText={formik.touched.translate && formik.errors.translate}
                    onBlur={formik.handleBlur}
                    onChange={(event) => {
                        formik.handleChange(event);
                    }}
                    value={formik.values.translate}
                    name="translate"
                    required
                    sx={{ marginTop: "18px" }}
                    size="small"
                    label="Dịch sang"
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    variant="outlined"
                >
                    <option value="Việt">Việt</option>
                    <option value="Nhật">Nhật</option>
                    <option value="Hàn">Hàn</option>
                    <option value="Anh">Anh</option>
                </TextField>
                <TextField
                    error={formik.touched.Means && Boolean(formik.errors.Means)}
                    helperText={formik.touched.Means && formik.errors.Means}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Means}
                    name="Means"
                    required
                    sx={{ marginTop: "18px" }}
                    size="small"
                    label="Nghĩa"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    error={formik.touched.Description && Boolean(formik.errors.Description)}
                    helperText={formik.touched.Description && formik.errors.Description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    multiline
                    rows={2}
                    value={formik.values.Description}
                    name="Description"
                    sx={{ marginTop: "18px" }}
                    size="small"
                    label="Ghi chú"
                    fullWidth
                    variant="outlined"
                    required
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
            <EditConfirmAlert
                onOpen={isEditDialog}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </BootstrapDialog>
    );
}
