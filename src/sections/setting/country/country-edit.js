import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_COUNTRY } from "src/contexts/reducer/setting/reducer-country";
import { updateCountryApi, listCountryApi } from "src/contexts/api/setting/api-country";
import SnackbarAlert from "src/components/action-notification";
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

export default function EditCountry({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { country } = state;
    const { countrys } = country;
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

    const countryEdit = Array.isArray(countrys) ? countrys.find(air => air.countryId == id) : []

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const validationSchema = Yup.object({
        tenQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        maQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tenQuocGia: "",
            maQuocGia: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    returnValue: 0,
                    countryId: 1,
                    name: values.tenQuocGia,
                    code: values.maQuocGia
                }

                if (isEditing) {
                    const response = await updateCountryApi(formData);
                    if (response.statusText === "OK") {
                        formik.resetForm();
                        const listData = await listCountryApi();
                        dispatch({
                            type: HANDLERS_COUNTRY.LIST_COUNTRY,
                            payload: listData.data
                        })
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
        }
    })

    useEffect(() => {
        const fetchCountryData = () => {
            try {
                formik.setValues({
                    tenQuocGia: countryEdit.name,
                    maQuocGia: countryEdit.code,
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (open && id) {
            fetchCountryData();
        }
    }, [open, id])

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa thông tin
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
                <Box sx={{ typography: "body1" }}>
                    <Grid container>
                        <TextField
                            error={!!(formik.touched.tenQuocGia && formik.errors.tenQuocGia)}
                            helperText={formik.touched.tenQuocGia && formik.errors.tenQuocGia}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenQuocGia}
                            name="tenQuocGia"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên quốc gia"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.maQuocGia && formik.errors.maQuocGia)}
                            helperText={formik.touched.maQuocGia && formik.errors.maQuocGia}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maQuocGia}
                            name="maQuocGia"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Mã quốc gia"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
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
                            startIcon={<Save />}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
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
