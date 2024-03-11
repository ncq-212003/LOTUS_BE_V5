import React, { useState } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { addStatusApi, listStatusApi } from "src/contexts/api/setting/api-status";
import { HANDLERS_STATUS } from "src/contexts/reducer/setting/reducer-status";
import { addVocabularyApi, listVocabularyApi } from "src/contexts/api/setting/api-vocabulary";
import { HANDLERS_VOCABULARY } from "src/contexts/reducer/setting/reducer-vocabulary";
import ConfirmAlert from "src/components/action-confirm";

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

export default function VocabularyAdd() {
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
                    Language: values.translate.trim(),
                    Flag: "1",
                    VocalbularyId: "1",
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

                if (isSaving) {
                    const response = await addVocabularyApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        formik.resetForm();

                        // call api list after add success
                        const res = await listVocabularyApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_VOCABULARY.LIST_VOCABULARY,
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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Stack
            spacing={3}
            sx={{ p: 2, marginTop: "64px" }}
        >
            <form
                onSubmit={formik.handleSubmit}
            >
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
                                Thông tin
                            </Typography>
                            <TextField
                                error={formik.touched.tuGoc && Boolean(formik.errors.tuGoc)}
                                helperText={formik.touched.tuGoc && formik.errors.tuGoc}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tuGoc}
                                name="tuGoc"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
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
                                sx={{ margin: "4px", marginTop: "12px" }}
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
                                sx={{ margin: "4px", marginTop: "12px" }}
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
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
                                required
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
