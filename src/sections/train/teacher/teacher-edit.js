import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import Slide from "@mui/material/Slide";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object({

});

const initialValues = {
    additionalFields: [
        {
            major: "",
            school: "",
            address: "",
        },
    ],
};

export default function TeacherEdit({ open, onClose, id }) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);

                console.log(values);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const addTextField = () => {
        const newField = {
            major: "",
            school: "",
            address: "",
        };

        formik.setFieldValue(
            "additionalFields",
            [...formik.values.additionalFields, newField],
            true
        );
    };

    const removeTextField = (index) => {
        const updatedFields = [...formik.values.additionalFields];
        updatedFields.splice(index, 1);
        formik.setFieldValue("additionalFields", updatedFields);
    };

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: "#1C2536" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleAdd}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} xs={12}>
                            <Box
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    padding: "16px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                                        Chuyên môn
                                    </Typography>
                                    <Button variant="outlined" onClick={addTextField}>
                                        Thêm
                                    </Button>
                                </Box>
                                {/* Thêm TextField ở đây */}
                                {formik.values.additionalFields.map((field, index) => (
                                    <Box key={index} sx={{ marginBottom: "16px" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography variant="b" component="b">
                                                Trường {index + 1}
                                            </Typography>
                                            <Button sx={{ color: "red" }} onClick={() => removeTextField(index)}>
                                                Xóa
                                            </Button>
                                        </Box>
                                        <TextField
                                            label="Chuyên ngành"
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ margin: "4px", marginTop: "12px" }}
                                            name={`additionalFields[${index}].major`}
                                            value={field.major}
                                            onChange={formik.handleChange}
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TextField
                                                label="Trường tốt nghiệp / năm"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                sx={{ margin: "4px", marginTop: "12px" }}
                                                name={`additionalFields[${index}].school`}
                                                value={field.school}
                                                onChange={formik.handleChange}
                                            />
                                            <TextField
                                                label="Địa chỉ trường"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                sx={{ margin: "4px", marginTop: "12px" }}
                                                name={`additionalFields[${index}].address`}
                                                value={field.address}
                                                onChange={formik.handleChange}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
        </Dialog>
    );
}
