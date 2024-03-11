import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Tooltip
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditDebtPayment({ openEditDebtPayment, closeEditDebtPayment }) {

    const handleClose = () => {
        closeEditDebtPayment();
    };

    const validationSchema = Yup.object({
        //khai bao gia trị validate trong này
        // tendiadiem: Yup
        //     .string()
        //     .email('Must be a valid email')
        //     .max(255)
        //     .required('Email is required'),
    });

    const initialValues = {
        tendoitac: "",
        nokidau: "",
        sotientang: "",
        sotiengiam: "",
        nocuoiki: "",
        ghichu: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.Console.log(data)
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditDebtPayment}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa nợ phải chi
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
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
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Stack
                        spacing={3}
                    >
                        <Box
                            sx={{
                                border: "2px solid rgb(224, 224, 224) !important",
                                padding: "5px 10px 15px 5px",
                            }}
                        >
                            <TextField
                                error={!!(formik.touched.tendoitac && formik.errors.tendoitac)}
                                helperText={formik.touched.tendoitac && formik.errors.tendoitac}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tendoitac}
                                name="tendoitac"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên đối tác"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.nokidau && formik.errors.nokidau)}
                                helperText={formik.touched.nokidau && formik.errors.nokidau}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.nokidau}
                                name="nokidau"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nợ kì đầu"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.sotientang && formik.errors.sotientang)}
                                helperText={formik.touched.sotientang && formik.errors.sotientang}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.sotientang}
                                name="sotientang"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số tiền tăng"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.sotiengiam && formik.errors.sotiengiam)}
                                helperText={formik.touched.sotiengiam && formik.errors.sotiengiam}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.sotiengiam}
                                name="sotiengiam"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số tiền giảm"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.nocuoiki && formik.errors.nocuoiki)}
                                helperText={formik.touched.nocuoiki && formik.errors.nocuoiki}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.nocuoiki}
                                name="nocuoiki"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nợ cuối kì"
                                fullWidth
                                variant="outlined"
                            />

                            <TextField
                                error={!!(formik.touched.ghichu && formik.errors.ghichu)}
                                helperText={formik.touched.ghichu && formik.errors.ghichu}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.ghichu}
                                name="ghichu"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                            />
                            <Stack display="flex">
                                <Box marginLeft="auto">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        // onClick={closeAddress}
                                        sx={{
                                            marginTop: "30px",
                                            backgroundColor: "#1C2536",
                                            // width: "150px",
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
}
