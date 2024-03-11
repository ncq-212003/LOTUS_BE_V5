import React, { useState } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Button,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addMenuApi, listMenuApi } from "src/contexts/api/setting/api-menu";
import { HANDLERS_MENU } from "src/contexts/reducer/setting/reducer-menu";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import ConfirmAlert from "src/components/action-confirm";

const validationSchema = Yup.object({
    // parentId: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuName: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuOrder: Yup.number().typeError("Vui lòng nhập số trường này."),
    menuIcon: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuLink: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
});

const initialValues = {
    menuName: '',
    parentId: '',
    menuOrder: '',
    menuIcon: '',
    menuLink: '',
    description: '',
};

export default function MenuAdd() {
    // state
    const [parentNameOption, setParentNameOption] = useState([]);
    // context
    const [state, dispatch] = useApp();
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    //Alert Confirm
    const [isDialogSave, setIsDialogSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleModelOpen = () => {
        setIsDialogSave(true);
    };

    const handleModelClose = () => {
        setIsDialogSave(false);
    };

    // khi người dùng ấn thoát
    const handleCancelSave = () => {
        handleModelClose();
    }

    // khi người dùng xác định lưu 
    const handleConfirmSave = () => {
        setIsSaving(true);
        handleModelClose();
        formik.handleSubmit();
    }
    //end
    // list parentName
    useEffect(() => {
        const listParentName = async () => {
            const res = await listMenuApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const parent = res.data.map((com) => ({
                    label: com.sMenuName,
                    value: com.sMenuId,
                }));
                setParentNameOption(parent);
            }
        };
        listParentName();
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    SParentIdHidden: values.parentId?.value || "0",
                    CreatedByHidden: "1",
                    SMenuIcon: values.menuIcon.trim(),
                    SMenuLink: values.menuLink.trim(),
                    Flag: "1",
                    SMenuId: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: values.menuOrder.trim(),
                    SParentId: values.parentId?.value || "0",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: new Date().toISOString(),
                    Field5: "1",
                    Description: values.description.trim(),
                    SMenuName: values.menuName.trim(),
                    CreatedBy: "1",
                };
                // commit
                // console.log(formData);
                if (isSaving) {
                    const response = await addMenuApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        formik.resetForm();

                        // call api list after add success
                        const res = await listMenuApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_MENU.LIST_MENU,
                            payload: res.data,
                        });
                        setIsSaving(false);
                    } else {
                        setIsSaving(false);
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Có lỗi xảy ra !");
                        setSnackbarOpen(true);
                    }
                } else {
                    handleModelOpen();
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

    const handleAutocompleteChange = (event, value) => {
        formik.setFieldValue('parentId', value);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} xs={12}>
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
                                Thông tin
                            </Typography>
                            <TextField
                                error={formik.touched.menuName && Boolean(formik.errors.menuName)}
                                helperText={formik.touched.menuName && formik.errors.menuName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.menuName}
                                name="menuName"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                options={parentNameOption}
                                value={formik.values.parentId}
                                onChange={handleAutocompleteChange}
                                onBlur={() => formik.setFieldTouched('parentId', true)}
                                sx={{ margin: "4px", marginTop: "12px", marginRight: '0px' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Thuộc menu cha"
                                        variant="outlined"
                                        size="small"
                                        error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                                        helperText={formik.touched.parentId && formik.errors.parentId}
                                    />
                                )}
                            />
                            <TextField
                                error={formik.touched.menuOrder && Boolean(formik.errors.menuOrder)}
                                helperText={formik.touched.menuOrder && formik.errors.menuOrder}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.menuOrder}
                                name="menuOrder"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Thứ tự hiển thị"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={formik.touched.menuIcon && Boolean(formik.errors.menuIcon)}
                                helperText={formik.touched.menuIcon && formik.errors.menuIcon}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.menuIcon}
                                name="menuIcon"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Biểu tượng hiển thị"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={formik.touched.menuLink && Boolean(formik.errors.menuLink)}
                                helperText={formik.touched.menuLink && formik.errors.menuLink}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.menuLink}
                                name="menuLink"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ liên kết"
                                required
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                multiline
                                rows={2}
                                value={formik.values.description}
                                name="description"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
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
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
            <ConfirmAlert
                onOpen={isDialogSave}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </Stack>
    );
}
