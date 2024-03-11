/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    Button,
    Dialog,
    IconButton,
    DialogActions,
    styled,
    DialogTitle,
    DialogContent,
    TextField
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { useState } from "react";
import { useEffect } from "react";
import SnackbarAlert from "src/components/action-notification";
import { listEmigrarionGroupApi, updateEmigrarionGroupApi } from "src/contexts/api/setting/api-emigration-group";
import { HANDLERS_EMIGRATION_GROUP } from "src/contexts/reducer/setting/reducer-emigration-group";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const validationSchema = Yup.object({
    emigrationGroup: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
});

const initialValues = {
    emigrationGroup: "",
    description: "",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EmigrationGroupEdit({ open, onClose, id }) {
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // context
    const [state, dispatch] = useApp();
    const { emigrationGroup } = state;
    const { emigrationGroups } = emigrationGroup;

    const dataEdit = Array.isArray(emigrationGroups) ? emigrationGroups.find(x => x.exitGroupId == id) : [];

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    CreatedByHidden: "1",
                    ExitGroupName: values.emigrationGroup,
                    Flag: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: dataEdit.createdAt,
                    Field5: "1",
                    ExitGroupId: id,
                    Description: values.description,
                    CreatedBy: "1",
                };

                // console.log(formData);
                if (isEditing) {
                    const response = await updateEmigrarionGroupApi(formData);
                    if (response.status === 200) {
                        // call api list after add success
                        const res = await listEmigrarionGroupApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_EMIGRATION_GROUP.LIST_EMIGRATION_GROUP,
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

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    emigrationGroup: dataEdit.exitGroupName || "",
                    description: dataEdit.description || "",
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
                    error={!!(formik.touched.emigrationGroup && formik.errors.emigrationGroup)}
                    helperText={formik.touched.emigrationGroup && formik.errors.emigrationGroup}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.emigrationGroup}
                    name="emigrationGroup"
                    variant="outlined"
                    sx={{ marginTop: '18px' }}
                    required
                    size="small"
                    label="Nhóm xuất cảnh"
                    fullWidth
                />
                <TextField
                    error={!!(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    name="description"
                    variant="outlined"
                    sx={{ marginTop: '18px' }}
                    size="small"
                    label="Ghi chú"
                    multiline
                    rows={2}
                    fullWidth
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
