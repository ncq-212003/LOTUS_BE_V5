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
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { useApp } from "src/hooks/use-app";
import { updateCarApi, listCarApi } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
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

export default function EditCar({ open, onClose, id, onSuccessFile }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [listMainEmployee, setListMainEmployee] = useState([]);
    const [listNameCompany, setListNameCompany] = useState([]);

    const [state, dispatch] = useApp();
    const { car, company } = state;
    const { cars } = car;

    // lấy dữ liệu từ id khi chỉnh sửa 
    const carEdit = Array.isArray(cars) ? cars.find(ca => ca.carId == id) : [];

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    // dùng để gọi hàm khi đã thêm file thành công
    const handleSuccess = (isSuccess) => {
        onSuccessFile(isSuccess)
    }

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

    const handleClose = (isEvent) => {
        formik.resetForm();
        setSelectedFileLogo(null);
        onClose(isEvent);
    };

    const validationSchema = Yup.object({
        tenCongTy: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        tenXe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soGhe: Yup
            .number()
            .positive(' Vui lòng nhập một số lớn hơn 0')
            .typeError('Vui lòng nhập số vào trường này')
            .required('Vui lòng nhập thông tin vào trường này'),
        bienSoXe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        nhanVienPhuTrach: Yup
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
            tenCongTy: "",
            tenXe: "",
            soGhe: "",
            bienSoXe: "",
            nhanVienPhuTrach: "",
            hinhAnh: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    CarId: id,
                    CompanyId: values.tenCongTy,
                    CompanyIdHidden: "1",
                    CarName: values.tenXe,
                    NumberSeats: values.soGhe,
                    CarNumber: values.bienSoXe,
                    NumberSeatsHidden: "1",
                    EmployeeIdMain: values.nhanVienPhuTrach,
                    EmployeeIdMainHidden: "1",
                    Avatar: values.hinhAnh,
                    Description: "Lưu ý khi chọn",
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedByHidden: "1",
                    Flag: "1"
                }
                if (isEditing) {
                    const response = await updateCarApi(formData);
                    if (response.status === 200) {
                        formik.resetForm();
                        setSelectedFileLogo(null);
                        const list = await listCarApi();
                        dispatch({
                            type: HANDLERS_CAR.LIST_CAR,
                            payload: list.data,
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
        }
    })

    useEffect(() => {
        const fetchCarData = () => {
            try {
                formik.setValues({
                    tenCongTy: carEdit.companyId || "",
                    tenXe: carEdit.carName || "",
                    soGhe: carEdit.numberSeats || "",
                    bienSoXe: carEdit.carNumber || "",
                    nhanVienPhuTrach: carEdit.employeeIdMain || "",
                    hinhAnh: carEdit.avatar || ""
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (open && id) {
            fetchCarData();
        }
    }, [open, id])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listCompanyApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listCompany = response.data.map((items) => ({
                    comId: items.companyId,
                    comName: items.companyName
                }))
                setListNameCompany(listCompany);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchDataEmployee = async () => {
            const response = await listEmployeeApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listEmployee = response.data.map((item) => (
                    {
                        emId: item.employeeId,
                        emName: item.lastName + " " + item.middleName + " " + item.firstName
                    }
                ))
                setListMainEmployee(listEmployee);
            }
        }
        fetchDataEmployee();
    }, [])

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa Xe
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
                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listNameCompany}
                            value={listNameCompany.find(option => option.comId === formik.values.tenCongTy) || null}
                            onChange={(_, value) => {
                                formik.setFieldValue('tenCongTy', value ? value.comId : null);
                            }}
                            onBlur={formik.handleBlur('tenCongTy')}
                            getOptionLabel={(option) => option.comName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Thuộc công ty"
                                    name="tenCongTy"
                                    error={formik.touched.tenCongTy && Boolean(formik.errors.tenCongTy)}
                                    helperText={formik.touched.tenCongTy && formik.errors.tenCongTy}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenXe && formik.errors.tenXe)}
                            helperText={formik.touched.tenXe && formik.errors.tenXe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenXe}
                            name="tenXe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Xe"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.soGhe && formik.errors.soGhe)}
                            helperText={formik.touched.soGhe && formik.errors.soGhe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soGhe}
                            name="soGhe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Số ghế"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.bienSoXe && formik.errors.bienSoXe)}
                            helperText={formik.touched.bienSoXe && formik.errors.bienSoXe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.bienSoXe}
                            name="bienSoXe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Biển số xe"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listMainEmployee}
                            value={listMainEmployee.find(option => option.emId === formik.values.nhanVienPhuTrach) || null}
                            onChange={(_, value) => {
                                formik.setFieldValue('nhanVienPhuTrach', value ? value.emId : null);
                            }}
                            onBlur={formik.handleBlur('nhanVienPhuTrach')}
                            getOptionLabel={(option) => option.emName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Phụ trách chính"
                                    name="nhanVienPhuTrach"
                                    error={formik.touched.nhanVienPhuTrach && Boolean(formik.errors.nhanVienPhuTrach)}
                                    helperText={formik.touched.nhanVienPhuTrach && formik.errors.nhanVienPhuTrach}
                                />
                            )}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "11px 29px", fontSize: "14px" }}>
                                Ảnh Xe
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "110px",
                                        height: "135px",
                                    }}
                                    variant="rounded"
                                    src={selectedFileLogo || 'https://lotus.i.tisbase.online' + formik.values.hinhAnh}
                                ></Avatar>
                            </Stack>
                            <Button size="small" component="label" sx={{ marginLeft: "14px" }}>
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
