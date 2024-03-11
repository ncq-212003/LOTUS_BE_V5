import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { useState } from "react";
import { addEmigrarionGroupApi, listEmigrarionGroupApi } from "src/contexts/api/setting/api-emigration-group";
import { HANDLERS_EMIGRATION_GROUP } from "src/contexts/reducer/setting/reducer-emigration-group";
import ConfirmAlert from "src/components/action-confirm";

const validationSchema = Yup.object({
    emigrationGroup: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
});

const initialValues = {
    emigrationGroup: "",
    description: "",
};

export default function EmigrationGroupAdd() {
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
                    CreatedAt: new Date().toISOString(),
                    Field5: "1",
                    ExitGroupId: "1",
                    Description: values.description,
                    CreatedBy: "1",
                };

                // console.log(formData);
                if (isSaving) {
                    const response = await addEmigrarionGroupApi(formData)
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        formik.resetForm();

                        // call api list after add success
                        const res = await listEmigrarionGroupApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_EMIGRATION_GROUP.LIST_EMIGRATION_GROUP,
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
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

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
                                bgcolor: "#fff",
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
                                error={!!(formik.touched.emigrationGroup && formik.errors.emigrationGroup)}
                                helperText={formik.touched.emigrationGroup && formik.errors.emigrationGroup}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.emigrationGroup}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                name="emigrationGroup"
                                variant="outlined"
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
                                size="small"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Ghi chú"
                                multiline
                                rows={2}
                                fullWidth
                            />
                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: '12px' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#1C2536",
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
