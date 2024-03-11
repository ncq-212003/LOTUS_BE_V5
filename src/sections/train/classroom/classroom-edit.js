import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { useApp } from "src/hooks/use-app";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listClassroomApi, updateClassroomApi } from "src/contexts/api/train/api-classroom";
import { HANDLERS_CLASSROOM } from "src/contexts/reducer/train/reducer-classroom";
import { Save } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";
import { format } from 'date-fns';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClassroomEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { classroom } = state;
    const { classrooms } = classroom;
    const [companyOption, setCompanyOption] = useState([]);
    const [teacherOption, setTeacherOption] = useState([]);
    const [statusOption, setStatusOption] = useState([{ value: '1', label: 'Sắp khai giảng' }, { value: '2', label: 'Đang hoạt động' }, { value: '3', label: 'Đã kết thúc' }]);
    const [classTypeOption, setClassTypeOption] = useState([{ value: '1', label: 'Offline' }, { value: '2', label: 'Online' }])

    //List company
    useEffect(() => {
        const listCompanyName = async () => {
            const res = await listCompanyApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const companies = res.data.map((c) => ({
                    label: c.companyName,
                    value: c.companyId,
                }));
                setCompanyOption(companies);
            }
        };
        listCompanyName();
    }, []);

    //List teacher
    useEffect(() => {
        const listTeacherName = async () => {
            const res = await listEmployeeApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const teachers = res.data.map((t) => ({
                    employeeCode: t.employeeCode,
                    label: t.firstName + " " + t.middleName + " " + t.lastName,
                    value: t.employeeId,
                }));
                setTeacherOption(teachers);
            }
        };
        listTeacherName();
    }, []);

    const initialValues = {
        company: '',
        maLopHoc: '',
        giaoVien: '',
        tenLopHoc: '',
        lopTruong: '',
        phoneLopTruong: '',
        ngayKhaiGiang: new Date(),
        ngayBeGiang: new Date(),
        tienDo: '',
        gioHoc: '',
        loaiLopHoc: '',
        status: '',
        employeeCode: '',
    }

    const validationSchema = Yup.object({
        company: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
        maLopHoc: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        giaoVien: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
        tenLopHoc: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        // lopTruong: Yup.string(),
        // phoneLopTruong: Yup.string()
        //     .matches(
        //         /^(0[1-9][0-9]{8,9}|[+]84[1-9][0-9]{8,9})$/,
        //         'Điện thoại lớp trưởng không hợp lệ. Vui lòng nhập đúng định dạng.'
        //     ),
        // ngayKhaiGiang: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        // ngayBeGiang: Yup.date()
        //     .typeError("Vui lòng nhập đúng định dạng")
        //     .test("is-greater", "Ngày bế giảng phải lớn hơn ngày khai giảng", function (value) {
        //         const ngayKhaiGiang = this.resolve(Yup.ref("ngayKhaiGiang"));
        //         return dayjs(value).isAfter(ngayKhaiGiang);
        //     }),
        // tienDo: Yup.string(),
        // gioHoc: Yup.string(),
        loaiLopHoc: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
        status: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
        employeeCode: Yup.string(),
    });

    const dataEdit = Array.isArray(classrooms) ? classrooms.find(x => x.eClassId == id) : [];

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {

            console.log(values);
            try {
                const formData = {
                    eClassId: 1,
                    className: values.tenLopHoc,
                    companyId: values.company.value,
                    code: code,
                    employeeIdMain: values.giaoVien.value,
                    employeeCode: values.employeeCode,
                    // memberIdMain: values.lopTruong,
                    // memberIdPhone: values.phoneLopTruong,
                    openDate: format(new Date(values.ngayKhaiGiang), 'yyyy/MM/dd'),
                    closeDate: format(new Date(values.ngayBeGiang), 'yyyy/MM/dd'),
                    process: values.tienDo,
                    timeLearning: values.gioHoc,
                    eClassType: values.loaiLopHoc.value,
                    status: values.status.value,
                    description: null,
                    field1: null,
                    field2: null,
                    field3: null,
                    field4: null,
                    field5: null,
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: null,
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: null,
                    flag: "1"
                }

                console.log(formData);

                // const response = await updateClassroomApi(formData)

                // if (response.status === 200) {
                //     setSnackbarSeverity("success");
                //     setSnackbarMessage("Sửa thành công !");
                //     setSnackbarOpen(true);

                //     // call api list after add success
                //     const res = await listClassroomApi();
                //     // dispatch list data
                //     dispatch({
                //         type: HANDLERS_CLASSROOM.LIST_CLASSROOM,
                //         payload: res.data,
                //     });
                // } else {
                //     setSnackbarSeverity("error");
                //     setSnackbarMessage("Có lỗi xảy ra !");
                //     setSnackbarOpen(true);
                // }
            } catch (err) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Sửa thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const fetchClassroomData = async () => {
            try {
                console.log(dataEdit);
                const selectedCompany = companyOption.find((c) => c.value === dataEdit.companyId);
                const selectedTeacher = teacherOption.find((t) => t.value === dataEdit.employeeIdMain);
                const selectedStatus = statusOption.find((s) => s.value === dataEdit.status);
                const selectedclassType = classTypeOption.find((type) => type.value === dataEdit.eClassType);

                formik.setValues({
                    company: selectedCompany || null,
                    maLopHoc: dataEdit.code || null,
                    giaoVien: selectedTeacher || null,
                    tenLopHoc: dataEdit.className || null,
                    // lopTruong: dataEdit.memberIdMain || null,
                    // phoneLopTruong: dataEdit.memberIdPhone || null,
                    ngayKhaiGiang: dataEdit.openDate ? new Date(dataEdit.openDate) : null,
                    ngayBeGiang: dataEdit.closeDate ? new Date(dataEdit.closeDate) : null,
                    tienDo: dataEdit.process || null,
                    gioHoc: dataEdit.timeLearning || null,
                    loaiLopHoc: selectedclassType || null,
                    status: selectedStatus || null,
                    employeeCode: dataEdit.employeeCode,
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchClassroomData();
        }
    }, [open, id]);

    const handleChange = (field, event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
            formik.setFieldValue(field, newValue);

        } else {
            formik.handleChange(event);
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
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
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                                    bgcolor: "#f5f5f5",
                                    padding: "16px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{ marginBottom: '16px' }}
                                >
                                    Thông tin cơ bản
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.maLopHoc && formik.errors.maLopHoc)}
                                    helperText={formik.touched.maLopHoc && formik.errors.maLopHoc}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.maLopHoc}
                                    name="maLopHoc"
                                    required
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    size="small"
                                    label="Mã lớp học"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    options={companyOption}
                                    onChange={(event, newValue) => handleChange('company', event, newValue)}
                                    onBlur={() => formik.setFieldTouched('company', true)}
                                    value={formik.values.company}
                                    renderInput={(params) =>
                                        <TextField
                                            required
                                            {...params}
                                            label="Thuộc công ty"
                                            variant="outlined"
                                            error={formik.touched.company && Boolean(formik.errors.company)}
                                            helperText={formik.touched.company && formik.errors.company}
                                        />
                                    }
                                />
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    options={teacherOption}
                                    onChange={(event, newValue) => handleChange('giaoVien', event, newValue)}
                                    onBlur={() => formik.setFieldTouched('giaoVien', true)}
                                    value={formik.values.giaoVien}
                                    renderInput={(params) =>
                                        <TextField
                                            required
                                            {...params}
                                            label="Giáo viên chủ nhiệm"
                                            variant="outlined"
                                            error={formik.touched.giaoVien && Boolean(formik.errors.giaoVien)}
                                            helperText={formik.touched.giaoVien && formik.errors.giaoVien}
                                        />
                                    }
                                />
                                <TextField
                                    error={!!(formik.touched.tenLopHoc && formik.errors.tenLopHoc)}
                                    helperText={formik.touched.tenLopHoc && formik.errors.tenLopHoc}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tenLopHoc}
                                    name="tenLopHoc"
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    size="small"
                                    label="Tên lớp học"
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <DatePicker
                                        error={!!(formik.touched.ngayKhaiGiang && formik.errors.ngayKhaiGiang)}
                                        helperText={formik.touched.ngayKhaiGiang && formik.errors.ngayKhaiGiang}
                                        onBlur={formik.handleBlur}
                                        onChange={(value) => {
                                            formik.setFieldValue('ngayKhaiGiang', Date.parse(value));
                                        }}
                                        value={formik.values.ngayKhaiGiang}
                                        name="ngayKhaiGiang"
                                        sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                        format="dd/MM/yyyy"
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                variant: 'outlined'
                                            }
                                        }}
                                        label="Ngày khai giảng"
                                    />
                                    <DatePicker
                                        error={!!(formik.touched.ngayBeGiang && formik.errors.ngayBeGiang)}
                                        helperText={formik.touched.ngayBeGiang && formik.errors.ngayBeGiang}
                                        onBlur={formik.handleBlur}
                                        onChange={(value) => {
                                            formik.setFieldValue('ngayBeGiang', Date.parse(value));
                                        }}
                                        value={formik.values.ngayBeGiang}
                                        name="ngayBeGiang"
                                        sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                        format="dd/MM/yyyy"
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                variant: 'outlined'
                                            }
                                        }}
                                        label="Ngày bế giảng"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextField
                                        error={!!(formik.touched.tienDo && formik.errors.tienDo)}
                                        helperText={formik.touched.tienDo && formik.errors.tienDo}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.tienDo}
                                        name="tienDo"
                                        sx={{ margin: '4px', marginTop: '12px' }}
                                        size="small"
                                        label="Tiến độ"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={!!(formik.touched.gioHoc && formik.errors.gioHoc)}
                                        helperText={formik.touched.gioHoc && formik.errors.gioHoc}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.gioHoc}
                                        name="gioHoc"
                                        sx={{ margin: '4px', marginTop: '12px' }}
                                        size="small"
                                        label="Giờ học"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Box>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    options={classTypeOption}
                                    onChange={(event, newValue) => handleChange('loaiLopHoc', event, newValue)}
                                    onBlur={() => formik.setFieldTouched('loaiLopHoc', true)}
                                    value={formik.values.loaiLopHoc}
                                    renderInput={(params) =>
                                        <TextField
                                            required
                                            {...params}
                                            label="Loại lớp học"
                                            variant="outlined"
                                            error={formik.touched.loaiLopHoc && Boolean(formik.errors.loaiLopHoc)}
                                            helperText={formik.touched.loaiLopHoc && formik.errors.loaiLopHoc}
                                        />
                                    }
                                />
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    sx={{ margin: '4px', marginTop: '12px' }}
                                    options={statusOption}
                                    onChange={(event, newValue) => handleChange('status', event, newValue)}
                                    onBlur={() => formik.setFieldTouched('status', true)}
                                    value={formik.values.status}
                                    renderInput={(params) =>
                                        <TextField
                                            required
                                            {...params}
                                            label="Trạng thái"
                                            variant="outlined"
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                            helperText={formik.touched.status && formik.errors.status}
                                        />
                                    }
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        width: '100%',
                                        marginTop: '20px',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={formik.handleSubmit}
                                        startIcon={<Save />}
                                        sx={{
                                            backgroundColor: "#1C2536",
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
    );
}
