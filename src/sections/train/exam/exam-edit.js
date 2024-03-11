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
    Tooltip,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel } from "@mui/material";

const documentNumber = [
    { id: 1, title: "LotusBT01" },
    { id: 2, title: "LotusBT02" },
    { id: 3, title: "LotusBT03" },
    { id: 4, title: "LotusBT04" },
];
const career = [
    { id: 1, title: "Y Tế" },
    { id: 2, title: "Xây dựng và công trình" },
    { id: 3, title: "Công nghiệp chế biến" },
    { id: 4, title: "Dịch vụ khách sạn và nhà hàng" },
    { id: 5, title: "Nông nghiệp" },
];

const ExamType = [
    { id: 1, title: "Trắc nghiệm" },
    { id: 2, title: "Tự Luận" },
    { id: 3, title: "Trực tiếp" },
];

const ExamStatus = [
    { id: 1, title: "Chưa Bắt Đầu" },
    { id: 2, title: "Đang Diễn Ra" },
    { id: 3, title: "Đã Kết Thúc" },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditExam({ openEditExam, closeEditExam, rowData }) {
    const handleClose = () => {
        closeEditExam();
    };

    const validationSchema = Yup.object({
        soTaiLieu: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tenBaiThi: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        nganhNghe: Yup
            .array()
            .min(1, 'Vui lòng chọn ít nhất một ngành nghề')
            .required('VUi lòng chọn thông tin vào trường này'),
        thoiGianThi: Yup
            .number()
            .typeError('Vui lòng nhập một số')
            .positive('Thời gian thi phải là số lớn hơn 0')
            .required('Vui lòng nhập thông tin vào trường này'),
        loaiBaiThi: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        trangThaiBaiThi: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        soTaiLieu: "",
        tenBaiThi: "",
        nganhNghe: [], //ngành nghề
        note: "",
        thoiGianThi: "",
        loaiBaiThi: "",
        trangThaiBaiThi: "",
        ghiChu: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                alert("cập nhạt thành ocng")
                console.log("value", data)
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    const handleFindIdByName = (field, value) => {
        formik.setFieldValue(field, value ? value.id : null)
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditExam}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa bài kiểm tra
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
                    <Box
                        sx={{
                            border: "2px solid rgb(224, 224, 224) !important",
                            padding: "10px 10px 15px 10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "10px" }}
                        >
                            Thông tin cần sửa
                        </Typography>
                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={documentNumber}
                            value={documentNumber.find(option => option.id === formik.values.soTaiLieu) || null}
                            onChange={(event, value) => handleFindIdByName('soTaiLieu', value)}
                            onBlur={formik.handleBlur('soTaiLieu')}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Số tài liệu"
                                    name="soTaiLieu"
                                    error={formik.touched.soTaiLieu && Boolean(formik.errors.soTaiLieu)}
                                    helperText={formik.touched.soTaiLieu && formik.errors.soTaiLieu}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenBaiThi && formik.errors.tenBaiThi)}
                            helperText={formik.touched.tenBaiThi && formik.errors.tenBaiThi}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenBaiThi}
                            name="tenBaiThi"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên bài thi"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValues) => {
                                const selectedTitles = newValues.map((value) => value.title);
                                formik.setFieldValue("nganhNghe", selectedTitles);
                            }}
                            name="nganhNghe"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            multiple
                            id="checkboxes-tags-demo"
                            fullWidth
                            size="small"
                            options={Array.isArray(career) ? career : []}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    error={!!(formik.touched.nganhNghe && formik.errors.nganhNghe)}
                                    helperText={formik.touched.nganhNghe && formik.errors.nganhNghe}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Ngành nghề"
                                    variant="outlined"
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.thoiGianThi && formik.errors.thoiGianThi)}
                            helperText={formik.touched.thoiGianThi && formik.errors.thoiGianThi}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.thoiGianThi}
                            name="thoiGianThi"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Thời gian thi(phút)"
                            fullWidth
                            variant="outlined"
                        />


                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={ExamType}
                            value={ExamType.find(option => option.id === formik.values.loaiBaiThi) || null}
                            onChange={(event, value) => handleFindIdByName('loaiBaiThi', value)}
                            onBlur={formik.handleBlur('loaiBaiThi')}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Loại bài thi"
                                    name="loaiBaiThi"
                                    error={formik.touched.loaiBaiThi && Boolean(formik.errors.loaiBaiThi)}
                                    helperText={formik.touched.loaiBaiThi && formik.errors.loaiBaiThi}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={ExamStatus}
                            value={ExamStatus.find(option => option.id === formik.values.trangThaiBaiThi) || null}
                            onChange={(event, value) => handleFindIdByName('trangThaiBaiThi', value)}
                            onBlur={formik.handleBlur('trangThaiBaiThi')}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Trạng thái bài thi"
                                    name="trangThaiBaiThi"
                                    error={formik.touched.trangThaiBaiThi && Boolean(formik.errors.trangThaiBaiThi)}
                                    helperText={formik.touched.trangThaiBaiThi && formik.errors.trangThaiBaiThi}
                                />
                            )}
                        />


                        <TextField
                            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ghiChu}
                            name="ghiChu"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            multiline
                            rows={2}
                            fullWidth
                            variant="outlined"
                        />

                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginTop: "30px",
                                        backgroundColor: "#1C2536",
                                        width: "100px",
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
}
