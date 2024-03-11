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
    Typography,
    FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import { HANDLERS_PROCESS } from "src/contexts/reducer/schedule/reducer-process";
import { updateProcessApi, listProcessApi } from "src/contexts/api/schedule/api-process";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
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

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function EditFormProcess({ openEditFormProcess, closeEditFormProcess, id, onSuccessFile }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);

    const [state, dispatch] = useApp();
    const { process } = state;
    const { processes } = process;
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

    // dùng để gọi hàm khi đã thêm file thành công
    const handleSuccess = (isSuccess) => {
        onSuccessFile(isSuccess)
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                try {
                    const response = await uploadSingleFile("Process", file);
                    if (response.status === 200) {
                        const image = getPathFromUrl(response.data);
                        setSelectedFileLogo(URL.createObjectURL(file));
                        handleSuccess(true); // thay hàm gọi file thành công tại đây
                        formik.setFieldValue('hinhAnh', image);
                        formik.setFieldError('hinhAnh', ''); // Xóa lỗi file
                    }
                } catch (error) {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                }
            } else {
                formik.setFieldError('hinhAnh', 'File đã chọn không phải là hình ảnh.');
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
            }
        }
    };

    // lấy dữ liệu biến id bên bảng 
    const processEdit = Array.isArray(processes) ? processes.find(pro => pro.processId == id) : [];

    const colorOptions = [
        { id: 1, label: 'Red', color: 'Red' },
        { id: 2, label: 'Blue', color: 'Blue' },
        { id: 3, label: 'Green', color: 'Green' },
        { id: 4, label: 'Yellow', color: 'Yellow' },
        { id: 5, label: 'Orange', color: 'Orange' },
        { id: 6, label: 'Purple', color: 'Purple' },
        { id: 7, label: 'Magenta', color: 'Magenta' },
        { id: 8, label: 'Cyan', color: 'Cyan' },
        { id: 9, label: 'Pink', color: 'Pink' },
        { id: 10, label: 'Brown', color: 'Brown' },
        { id: 11, label: 'Gray', color: 'Gray' },
        { id: 12, label: 'Black', color: 'Black' }
    ];

    const handleClose = (isEvent) => {
        formik.resetForm();
        setSelectedFileLogo(null);
        closeEditFormProcess(isEvent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        tieuDeTienTrinh: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tienDo: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        mauSac: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        hinhAnh: Yup
            .mixed()
            .test('required', 'Vui lòng chọn một hình ảnh', function (value) {
                return !!value;
            }),
    });

    const formik = useFormik({
        initialValues: {
            tieuDeTienTrinh: "",
            tienDo: "",
            mauSac: "",
            hinhAnh: "",
            ghiChu: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    ProcessId: id,
                    ProcessTitle: values.tieuDeTienTrinh,
                    ProcessNumber: values.tienDo,
                    ProcessNumberHidden: "1",
                    Color: values.mauSac,
                    Icon: values.hinhAnh, // sau thay thanh link hinh anh
                    Description: values.ghiChu || "Tiến độ phải hoàn thành đúng với mục tiêu đã đề ra",
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedBy: 1,
                    LastModifedByHidden: "1",
                    Flag: "1"
                }

                if (isEditing) {
                    const response = await updateProcessApi(formData);
                    if (response.status === 200) {
                        formik.resetForm();
                        setSelectedFileLogo(null);
                        const res = await listProcessApi();
                        dispatch({
                            type: HANDLERS_PROCESS.LIST_PROCESS,
                            payload: res.data
                        })
                        setSelectedFileLogo(null);
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

    // xét giá trị ban đầu cho hàm
    useEffect(() => {
        const fetchProcessData = async () => {
            try {
                formik.setValues({
                    tieuDeTienTrinh: processEdit.processTitle || "",
                    tienDo: processEdit.processNumber || "",
                    mauSac: processEdit.color || "",
                    hinhAnh: processEdit.icon || "",
                    ghiChu: processEdit.description || "",
                })
            } catch (error) {
                console.log("Error :", error);
            }
        }
        if (openEditFormProcess && id) {
            fetchProcessData();
        }
    }, [openEditFormProcess, id])

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={openEditFormProcess}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa tiến trình
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
                            error={!!(formik.touched.tieuDeTienTrinh && formik.errors.tieuDeTienTrinh)}
                            helperText={formik.touched.tieuDeTienTrinh && formik.errors.tieuDeTienTrinh}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tieuDeTienTrinh}
                            name="tieuDeTienTrinh"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tiêu đề"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => {
                                const displayValue = newValue || ''; // Giá trị hiển thị trên ô input
                                const numericValue = displayValue.replace('%', ''); // Giá trị không có %
                                formik.setFieldValue("tienDo", numericValue); // Lưu giá trị không có % vào formik
                            }}
                            value={formik.values.tienDo ? `${formik.values.tienDo}%` : ''}
                            name="tienDo"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["0%", "10%", "20%", "30%", "40%", "60%", "70%", "90%", "100%"]}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.tienDo && formik.errors.tienDo)}
                                    helperText={formik.touched.tienDo && formik.errors.tienDo}
                                    {...params}
                                    label="Tiến độ"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Autocomplete
                            id="color-select-demo"
                            fullWidth
                            sx={{ marginTop: "12px" }}
                            size="small"
                            options={colorOptions}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            value={colorOptions.find((option) => option.label === formik.values.mauSac) || null}
                            onChange={(event, value) => formik.setFieldValue('mauSac', value ? value.label : '')}
                            renderOption={(props, option) => (
                                <Box
                                    component="li"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        '& > div': {
                                            display: 'flex',
                                            alignItems: 'center',
                                            mr: 2,
                                            flexShrink: 0,
                                        },
                                    }}
                                    {...props}
                                >
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            backgroundColor: option.color,
                                        }}
                                    />
                                    <span>{option.label}</span>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.mauSac && formik.errors.mauSac)}
                                    helperText={formik.touched.mauSac && formik.errors.mauSac}
                                    {...params}
                                    variant="outlined"
                                    label="Màu sắc"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
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
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            multiline
                            rows={2}
                            fullWidth
                            variant="outlined"
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "12px 25px", fontSize: "14px" }}>
                                Ảnh icons
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "115px",
                                        height: "135px",
                                    }}
                                    variant="rounded"
                                    src={selectedFileLogo || 'https://lotus.i.tisbase.online' + formik.values.hinhAnh}
                                ></Avatar>
                            </Stack>
                            <Button size="small" component="label" sx={{ marginLeft: "12px" }}>
                                Tải ảnh lên
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <FormHelperText sx={{ color: 'red' }}>
                                {formik.touched.hinhAnh && formik.errors.hinhAnh}
                            </FormHelperText>
                        </Box>
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
                            onClick={formik.handleSubmit}
                            startIcon={<Save />}
                            sx={{
                                backgroundColor: '#1C2536',
                            }}

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
