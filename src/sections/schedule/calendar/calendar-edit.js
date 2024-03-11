import { Stack, TextField, Button, Autocomplete, Grid, FormGroup, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Switch from "@mui/material/Switch";
import { Checkbox, FormControlLabel } from "@mui/material";
import { AddressTableCalendar } from "../address/address-table-calendar";
import { AddPresentCalendar } from "../present/present-add-calendar";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { EditTypeCalander } from "./calendar-type-table-calendar";
import { TypeCalendarNew } from "./calendar-type";
import { AddAdressCalendar } from "../address/address-add-calendar";
import { PresentTableCalendar } from "../present/present-table-calendar";
import { DateTimePicker } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { format } from 'date-fns';
import { useFormik } from "formik";
import * as Yup from "yup";
import ArticleIcon from '@mui/icons-material/Article';
import { listUnionApi } from "src/contexts/api/partner/api-union";
import { listCompanyReceivingApi } from "src/contexts/api/partner/api-company-receiving";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listPresentApi } from "src/contexts/api/schedule/api-present";
import { listCarApi } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listDepartmentApi } from "src/contexts/api/company/api-department";
import SnackbarAlert from "src/components/action-notification";
import { listAddressApi } from "src/contexts/api/schedule/api-address";
import ConfirmAlert from "src/components/action-confirm";
import { useRouter } from 'next/router';
import { Save } from "@mui/icons-material";

const DepartmentOption = () => {
    const [listNameCompany, setListNameCompany] = useState([]);
    const [listNameDepartment, setListNameDepartment] = useState([]);

    // Danh sách công ty 
    useEffect(() => {
        const fetchData = async () => {
            const response = await listCompanyApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listCompany = response.data.map((items) => ({
                    companyId: items.companyId,
                    companyName: items.companyName
                }))
                setListNameCompany(listCompany);
            }
        }
        fetchData()
    }, [])

    // Danh sách phòng ban
    useEffect(() => {
        const fetchData = async () => {
            const response = await listDepartmentApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listDepartment = response.data.map((items) => ({
                    departmentId: items.departmentId,
                    deparmentName: items.deparmentName,
                    companyByName: listNameCompany.find(com => com.companyId == items.companyId)?.companyName
                }))
                setListNameDepartment(listDepartment);
            }
        }
        fetchData()
    }, [listNameCompany])

    const optionsForDepartment = listNameDepartment.map((option) => ({
        companies: option.companyByName,
        ...option,
    }));

    return optionsForDepartment.sort((a, b) => (a.companies > b.companies ? 1 : -1));
};

export const EditCalendar = (rowData) => {
    const [isCalendar, setisCalendar] = useState(false);
    const [isTypeCalendarNew, setIsTypeCalendarNew] = useState(false);
    const [IsPresent, setIsPresent] = useState(false);
    const [IsEditPresent, setIsEditPresent] = useState(false);
    const [IsEditAddress, setEditIsAddress] = useState(false);
    const [IsAddressPb, setIsAddressPb] = useState(false);
    const [typeNumber, setTypeNumber] = useState(0);
    const [typeAddress, setTypeAddress] = useState(null);
    const [valueNoidung, setValueNoidung] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const router = useRouter();
    const { id } = router.query; // lấy dữ liệu sau thay vào api
    // Dữ liệu call api '
    const [listNameUnion, setListNameUnion] = useState([]);
    const [listCompanyReceiving, setListCompanyReceiving] = useState([]);
    const [listMainEmployee, setListMainEmployee] = useState([]);
    const [listNamePresent, setListNamePresent] = useState([]);
    const [listNameCar, setListNameCar] = useState([]);
    const optionsForDepartment = DepartmentOption();
    const [optionPlace, setOptionPlace] = useState([]);

    //open edit calendar
    const openEditCalendar = () => {
        setisCalendar(true);
    };

    const closeEditCalendar = () => {
        setisCalendar(false);
    };

    const openTypeCalendarNew = () => {
        setIsTypeCalendarNew(true);
    };

    const closeTypeCalendarNew = () => {
        setIsTypeCalendarNew(false);
    };

    const addCalendarType = (newLabel) => {
        const newOption = {
            id: typeCalendarOptions.length + 1,
            label: newLabel,
        };
        setTypeCalendarOptions((prevOptions) => [...prevOptions, newOption]);
    };

    //end open edit calendar

    //open edit present
    const openPresent = () => {
        setIsPresent(true);
    };

    const closePresent = (isEvent) => {
        if (isEvent) {
            setIsPresent(false);
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);
        } else {
            setIsPresent(false);
        }
    };

    const openEditPresent = () => {
        setIsEditPresent(true);
    };

    const closeEditPresent = () => {
        setIsEditPresent(false);
    };

    //open edit address
    const openEditAddress = () => {
        setEditIsAddress(true);
    };

    const closeEditAddress = () => {
        setEditIsAddress(false);
    };

    const openAddressPb = () => {
        setIsAddressPb(true);
    };

    const closeAddressPb = () => {
        setIsAddressPb(false);
    };
    //end open edit address
    const switchStyle = {
        color: '#1C2536', // Màu khi chưa được chọn (xám)
    };

    // Open 
    const [customers, setCustomers] = useState([
        { id: 1, name: "Nguyễn Công Quyết" },
        { id: 2, name: "Nguyễn Chính Nghĩa" },
        { id: 3, name: "Đinh Văn Thắng" },
        { id: 4, name: "Phạm Văn Thái" },
        { id: 5, name: "Nguyễn Duy Dự" },
        { id: 6, name: "Nguyễn Anh Tú" }
    ]);

    const [typeCalendarOptions, setTypeCalendarOptions] = useState([
        { id: 1, name: "Lịch đón khách sân bay" },
        { id: 2, name: "Lịch nhà hàng" },
        { id: 3, name: "Lịch đón khách" },
        { id: 4, name: "Lịch họp công ty" },
        { id: 5, name: "Lịch khác" },
    ]);


    const [progress, setProgress] = useState([
        { id: 1, label: "0%" },
        { id: 2, label: "10%" },
        { id: 3, label: "20%" },
        { id: 4, label: "30%" },
        { id: 5, label: "40%" },
        { id: 6, label: "50%" },
        { id: 7, label: "60%" },
        { id: 8, label: "70%" },
        { id: 9, label: "80%" },
        { id: 10, label: "90%" },
        { id: 11, label: "100%" }
    ])

    const [priorityLevel, setPriorityLevel] = useState([
        { id: 1, label: "Cao" },
        { id: 2, label: "Trung Bình" },
        { id: 3, label: "Thấp" },
    ])

    //end
    useEffect(() => {
        const renderComponent = (typeNumber) => {
            switch (typeNumber) {
                case 1:
                    setTypeAddress('Danh sách sân bay')
                    break;
                case 2:
                    setTypeAddress('Danh sách nhà hàng')
                    break;
                case 3:
                    setTypeAddress('Địa điểm')
                    break;
                case 4:
                    setTypeAddress('Danh sách phòng họp')
                    break;
                default:
                    setTypeAddress('Địa điểm')
            }
        };
        renderComponent(typeNumber);
    }, [typeNumber])

    // const getPlainText = (html) => {
    //   const tempDiv = document.createElement("div");
    //   tempDiv.innerHTML = html;
    //   return tempDiv.innerText;
    // };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    const validationSchema = Yup.object({
        tieuDe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        loaiLich: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        nghiepDoan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        congTyTiepNhan: Yup
            .array()
            .min(1, ' Vui lòng chọn ít nhất một công ty')
            .required('Vui lòng nhập thông tin vào trường này'),
        congTyPhongBan: Yup
            .array()
            .min(1, 'Vui lòng chọn ít nhất một phòng ban')
            .required('Vui lòng nhập thông tin vào trường này'),
        khachHang: Yup
            .array()
            .min(1, 'Vui lòng chọn ít nhất một khách hàng')
            .required('Vui lòng nhập thông tin vào trường này'),
        diaDiem: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayBatDau: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayKetThuc: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này')
            .test(
                'is-ngayBatDau-greater-than-ngayKetThuc',
                'Ngày kết thúc phải lớn hơn ngày bắt đầu .',
                function (ngayKetThuc) {
                    const { ngayBatDau } = this.parent;
                    return ngayKetThuc >= ngayBatDau;
                }
            ),
        nhanVienThamGia: Yup
            .array()
            .min(1, 'Vui lòng chọn ít nhất một nhân viên')
            .required('Vui lòng nhập thông tin vào trường này'),
        nhanVienPhuTrach: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        // quaTang: Yup
        //   .array()
        //   .min(1, 'Chọn ít nhất một quà tặng')
        //   .required('Quà tặng không được để trống'),
        // xe: Yup
        //   .array()
        //   .min(1, 'Chọn ít nhất một xe')
        //   .required('Xe không được để trống'),
        tienDo: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        mucDoUuTien: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cheDoRiengTu: false,
            tieuDe: rowData?.tieuDe || "",
            noiDungCongViec: rowData?.noiDungCongViec || "",
            loaiLich: rowData?.loaiLich || "",
            nghiepDoan: rowData?.nghiepDoan || "",
            congTyTiepNhan: rowData?.congTyTiepNhan || "",
            congTyPhongBan: [],
            khachHang: [],
            diaDiem: rowData?.diaDiem || "",
            ngayBatDau: "",
            ngayKetThuc: "",
            nhanVienThamGia: [],
            nhanVienPhuTrach: rowData?.nhanVienPhuTrach || "",
            quaTang: rowData?.quaTang || [],
            xe: rowData?.xe || [],
            tienDo: rowData?.tienDo || "",
            mucDoUuTien: rowData?.mucDoUuTien || "",
            gmail: true,
            sms: false,
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.log("check value", values)
                setSnackbarSeverity("success");
                setSnackbarMessage("Sửa thành công !");
                setSnackbarOpen(true);
                // handleClose();
                // handleSave();
                formik.resetForm();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    // List danh sách địa điểm theo id
    const filteredOptions = optionPlace.filter((item) => item.placeType === typeNumber);

    // Lấy danh sách nghiệp đoàn
    useEffect(() => {
        const fetchUnionData = async () => {
            try {
                const response = await listUnionApi();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const listUnion = response.data.map((items) => ({
                        unionId: items.syndicateId,
                        unionName: items.syndicateName
                    }))
                    setListNameUnion(listUnion);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchUnionData();
    }, [])

    // danh sách công ty tiếp nhận 
    useEffect(() => {
        const fetchCompanyReceiving = async () => {
            try {
                const response = await listCompanyReceivingApi();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const listCompany = response.data.map((items) => ({
                        companyReceivingId: items.companyId,
                        companyReceivingName: items.companyName
                    }))
                    setListCompanyReceiving(listCompany);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchCompanyReceiving();
    }, [])

    // danh sách nhân viên 
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

    // danh sách quà tặng
    useEffect(() => {
        const fetchPresentData = async () => {
            try {
                const response = await listPresentApi();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const listPresent = response.data.map((items) => ({
                        presentId: items.presentId,
                        presentName: items.presentName
                    }))
                    setListNamePresent(listPresent);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPresentData();
    }, [])

    // danh sách xe 
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await listCarApi();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const listCar = response.data.map((items) => ({
                        carId: items.carId,
                        carName: items.carName
                    }))
                    setListNameCar(listCar);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchCarData();
    }, [])

    // danh sách địa điểm

    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                const response = await listAddressApi();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const listPlace = response.data.map((items) => ({
                        placeId: items.placeId,
                        placeName: items.placeName,
                        placeType: parseInt(items.type)
                    }))
                    setOptionPlace(listPlace);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPlaceData();
    }, [])
    // end


    // Check khi file ảnh hoặc logo khi được thêm thành công
    const handleSnackbarOnFileUpload = (isCheck) => {
        if (isCheck) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Tải file lên thành công.");
            setSnackbarOpen(true);
        }
    }

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

    return (
        <>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            style={switchStyle}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name="cheDoRiengTu"
                                            checked={formik.values.cheDoRiengTu}
                                        />}
                                        label="Chế độ riêng tư"
                                    />
                                </FormGroup>
                            </Box>
                            <Grid container>
                                <TextField
                                    error={!!(formik.touched.tieuDe && formik.errors.tieuDe)}
                                    helperText={formik.touched.tieuDe && formik.errors.tieuDe}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tieuDe}
                                    name="tieuDe"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tiêu đề công  việc"
                                    fullWidth
                                    variant="outlined"
                                />

                                <Box style={{ width: "100%" }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontSize: "12.5px", color: "#6C737F", margin: "12px 12px 12px 15px" }}>
                                        Nội dung công việc
                                    </Typography>
                                    <ReactQuill
                                        style={{
                                            height: "100px ",
                                            margin: "12px 4px 50px 4px",
                                            borderRadius: "8px",
                                        }}
                                        onChange={(v) => formik.setFieldValue('noiDungCongViec', v)}
                                        value={formik.values.noiDungCongViec}
                                        name="noiDungCongViec"
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, false] }],
                                                ["bold", "italic", "underline"],
                                                ["image", "code-block"],
                                            ],
                                        }}
                                        theme="snow"
                                    />
                                </Box>
                                <Grid container >
                                    <Grid item xs={9.5} sm={10.2} md={10.8} lg={11} xl={11}>
                                        <Autocomplete
                                            sx={{ margin: "4px", marginTop: "12px", width: "99%" }}
                                            fullWidth
                                            size="small"
                                            value={typeCalendarOptions.find(option => option.id === formik.values.loaiLich) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("loaiLich", newValue ? newValue.id : null)
                                                setTypeNumber(newValue.id || null)
                                            }}
                                            onBlur={formik.handleBlur('loaiLich')}
                                            options={typeCalendarOptions}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => (
                                                <TextField
                                                    variant="outlined"
                                                    {...params}
                                                    label="Loại lịch"
                                                    name="loaiLich"
                                                    error={formik.touched.loaiLich && Boolean(formik.errors.loaiLich)}
                                                    helperText={formik.touched.loaiLich && formik.errors.loaiLich}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5} sm={1.8} md={1.2} lg={1} xl={1}>
                                        <Box style={{ marginTop: '10px', display: "flex" }}>
                                            <Tooltip title="Thêm">
                                                <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openTypeCalendarNew}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Danh sách">
                                                <IconButton aria-label="list" style={{ color: "#000000" }} onClick={openEditCalendar}>
                                                    <ArticleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={listNameUnion}
                                    value={listNameUnion.find(option => option.unionId === formik.values.nghiepDoan) || null}
                                    onChange={(_, value) => {
                                        formik.setFieldValue('nghiepDoan', value ? value.unionId : null);
                                    }}
                                    onBlur={formik.handleBlur('nghiepDoan')}
                                    getOptionLabel={(option) => option.unionName}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Nghiệp đoàn"
                                            name="nghiepDoan"
                                            error={formik.touched.nghiepDoan && Boolean(formik.errors.nghiepDoan)}
                                            helperText={formik.touched.nghiepDoan && formik.errors.nghiepDoan}
                                        />
                                    )}
                                />

                                <Autocomplete
                                    multiple
                                    size="small"
                                    fullWidth
                                    options={listCompanyReceiving}
                                    value={listCompanyReceiving.filter((option) => formik.values.congTyTiepNhan.includes(option.companyReceivingId))}
                                    limitTags={5}
                                    disableCloseOnSelect
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    getOptionLabel={(option) => option.companyReceivingName}
                                    onChange={(_, newValue) => {
                                        const selectedNames = newValue.map((option) => option.companyReceivingId);
                                        formik.setFieldValue('congTyTiepNhan', selectedNames);
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.companyReceivingName}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.congTyTiepNhan && formik.errors.congTyTiepNhan)}
                                            helperText={formik.touched.congTyTiepNhan && formik.errors.congTyTiepNhan}
                                            {...params}
                                            label="Công ty tiếp nhận"
                                            variant="outlined"
                                        />
                                    )}
                                />

                                <Autocomplete
                                    onChange={(_, newValue) => {
                                        formik.setFieldValue('congTyPhongBan', newValue.map(option => option.departmentId));
                                    }}
                                    name="department"
                                    multiple
                                    limitTags={4}
                                    id="checkboxes-department"
                                    disableCloseOnSelect
                                    size="small"
                                    sx={{ margin: "4px", marginTop: "12px", width: "100%" }}
                                    options={optionsForDepartment}
                                    value={optionsForDepartment.filter((option) => formik.values.congTyPhongBan.includes(option.departmentId))}
                                    groupBy={(option) => option.companies}
                                    getOptionLabel={(option) => option.deparmentName}
                                    isOptionEqualToValue={(option, value) => option.departmentId === value.departmentId}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.deparmentName}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Công ty - Phòng ban"
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.congTyPhongBan && formik.errors.congTyPhongBan)}
                                            helperText={formik.touched.congTyPhongBan && formik.errors.congTyPhongBan}
                                        />
                                    )}
                                />

                                <Autocomplete
                                    multiple
                                    size="small"
                                    fullWidth
                                    options={customers}
                                    limitTags={5}
                                    disableCloseOnSelect
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    value={customers.filter((option) => formik.values.khachHang.includes(option.id))}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(_, newValue) => {
                                        const selectedNames = newValue.map((option) => option.id);
                                        formik.setFieldValue('khachHang', selectedNames);
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.khachHang && formik.errors.khachHang)}
                                            helperText={formik.touched.khachHang && formik.errors.khachHang}
                                            {...params}
                                            label="Khách hàng"
                                            variant="outlined"
                                        />
                                    )}
                                />

                                <Grid container >
                                    <Grid item xs={9.5} sm={10.2} md={10.8} lg={11} xl={11}>
                                        <Autocomplete
                                            sx={{ margin: "4px", marginTop: "12px", width: "99%" }}
                                            fullWidth
                                            size="small"
                                            options={filteredOptions}
                                            value={filteredOptions.find((item) => item.placeId === formik.values.diaDiem) || null}
                                            onChange={(_, newValue) => {
                                                formik.setFieldValue('diaDiem', newValue ? newValue.placeId : null);
                                            }}
                                            getOptionLabel={(option) => option.placeName}
                                            renderInput={(params) => (
                                                <TextField
                                                    variant="outlined"
                                                    {...params}
                                                    label={typeAddress}
                                                    name="diaDiem"
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.diaDiem && Boolean(formik.errors.diaDiem)}
                                                    helperText={formik.touched.diaDiem && formik.errors.diaDiem}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5} sm={1.8} md={1.2} lg={1} xl={1}>
                                        <Box style={{ marginTop: '10px', display: "flex" }}>
                                            <Tooltip title="Thêm">
                                                <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openAddressPb}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Danh sách">
                                                <IconButton aria-label="Danh sách" style={{ color: "#000000" }} onClick={openEditAddress}>
                                                    <ArticleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box style={{ width: "100%", margin: "4px", marginTop: "12px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={12} md={6} >
                                            <DateTimePicker
                                                onChange={(value) => {
                                                    formik.setFieldValue('ngayBatDau', Date.parse(value));
                                                }}
                                                value={formik.values.ngayBatDau}
                                                name="ngayBatDau"
                                                sx={{ width: "100%" }}
                                                format="dd/MM/yyyy HH:mm"
                                                slotProps={{
                                                    textField: {
                                                        size: 'small',
                                                        variant: 'outlined',
                                                        onBlur: formik.handleBlur,
                                                        error: !!(formik.touched.ngayBatDau && formik.errors.ngayBatDau),
                                                        helperText: formik.touched.ngayBatDau && formik.errors.ngayBatDau,
                                                    }
                                                }}
                                                label="Ngày bắt đầu"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DateTimePicker
                                                onChange={(value) => {
                                                    formik.setFieldValue('ngayKetThuc', Date.parse(value));
                                                }}
                                                value={formik.values.ngayKetThuc}
                                                name="ngayKetThuc"
                                                sx={{ width: "100%" }}
                                                format="dd/MM/yyyy HH:mm"
                                                slotProps={{
                                                    textField: {
                                                        size: 'small',
                                                        variant: 'outlined',
                                                        onBlur: formik.handleBlur,
                                                        error: !!(formik.touched.ngayKetThuc && formik.errors.ngayKetThuc),
                                                        helperText: formik.touched.ngayKetThuc && formik.errors.ngayKetThuc,
                                                    }
                                                }}
                                                label="Ngày kết thúc"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Autocomplete
                                    multiple
                                    size="small"
                                    fullWidth
                                    options={listMainEmployee}
                                    limitTags={5}
                                    disableCloseOnSelect
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    getOptionLabel={(option) => option.emName}
                                    value={listMainEmployee.filter((option) => formik.values.nhanVienThamGia.includes(option.emId))}
                                    onChange={(event, newValue) => {
                                        const selectedNames = newValue.map((option) => option.emId);
                                        formik.setFieldValue('nhanVienThamGia', selectedNames);
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.emName}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.nhanVienThamGia && formik.errors.nhanVienThamGia)}
                                            helperText={formik.touched.nhanVienThamGia && formik.errors.nhanVienThamGia}
                                            {...params}
                                            label="Nhân viên tham gia"
                                            variant="outlined"
                                        />
                                    )}
                                />

                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
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
                                            label="Nhân viên phụ trách"
                                            name="nhanVienPhuTrach"
                                            error={formik.touched.nhanVienPhuTrach && Boolean(formik.errors.nhanVienPhuTrach)}
                                            helperText={formik.touched.nhanVienPhuTrach && formik.errors.nhanVienPhuTrach}
                                        />
                                    )}
                                />

                                <Grid container  >
                                    <Grid item xs={9.5} sm={10.2} md={10.8} lg={11} xl={11}>
                                        <Autocomplete
                                            multiple
                                            size="small"
                                            fullWidth
                                            options={listNamePresent}
                                            value={listNamePresent.filter((option) => formik.values.quaTang.includes(option.presentId))}
                                            limitTags={5}
                                            disableCloseOnSelect
                                            sx={{ margin: "4px", marginTop: "12px", width: "99%" }}
                                            getOptionLabel={(option) => option.presentName}
                                            onChange={(event, newValue) => {
                                                const selectedNames = newValue.map((option) => option.presentId);
                                                formik.setFieldValue('quaTang', selectedNames);
                                            }}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.presentName}
                                                </li>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    onBlur={formik.handleBlur}
                                                    error={!!(formik.touched.quaTang && formik.errors.quaTang)}
                                                    helperText={formik.touched.quaTang && formik.errors.quaTang}
                                                    {...params}
                                                    label="Quà tặng"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5} sm={1.8} md={1.2} lg={1} xl={1}>
                                        <Box style={{ marginTop: '10px', display: "flex" }}>
                                            <Tooltip title="Thêm">
                                                <IconButton aria-label="add" style={{ color: "#000000" }} onClick={openPresent}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Danh sách">
                                                <IconButton aria-label="Danh sách" style={{ color: "#000000" }} onClick={openEditPresent}>
                                                    <ArticleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Autocomplete
                                    multiple
                                    size="small"
                                    fullWidth
                                    options={listNameCar}
                                    value={listNameCar.filter((option) => formik.values.xe.includes(option.carId))}
                                    limitTags={5}
                                    disableCloseOnSelect
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    getOptionLabel={(option) => option.carName}
                                    onChange={(event, newValue) => {
                                        const selectedNames = newValue.map((option) => option.carId);
                                        formik.setFieldValue('xe', selectedNames);
                                    }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.carName}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.xe && formik.errors.xe)}
                                            helperText={formik.touched.xe && formik.errors.xe}
                                            {...params}
                                            label="Xe"
                                            variant="outlined"
                                        />
                                    )}
                                />

                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={progress}
                                    value={progress.find(option => option.id === formik.values.tienDo) || null}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue("tienDo", newValue ? newValue.id : null)
                                    }}
                                    onBlur={formik.handleBlur('tienDo')}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Tiến độ"
                                            name="tienDo"
                                            error={formik.touched.tienDo && Boolean(formik.errors.tienDo)}
                                            helperText={formik.touched.tienDo && formik.errors.tienDo}
                                        />
                                    )}
                                />

                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={priorityLevel}
                                    value={priorityLevel.find(option => option.id === formik.values.mucDoUuTien) || null}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue("mucDoUuTien", newValue ? newValue.id : null)
                                    }}
                                    onBlur={formik.handleBlur('mucDoUuTien')}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Mức độ ưu tiên"
                                            name="mucDoUuTien"
                                            error={formik.touched.mucDoUuTien && Boolean(formik.errors.mucDoUuTien)}
                                            helperText={formik.touched.mucDoUuTien && formik.errors.mucDoUuTien}
                                        />
                                    )}
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',

                                    }}
                                >
                                    <Typography component="legend" variant="h6" gutterBottom sx={{ fontSize: "13px", color: "#6C737F", margin: "14px 12px 12px 15px" }}> Nhận thông báo qua:</Typography>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch
                                                style={switchStyle}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                name="gmail"
                                                checked={formik.values.gmail}
                                            />}
                                            label="Gmail"
                                        />
                                    </FormGroup>
                                </Box>
                            </Grid>
                            <Stack display="flex">
                                <Box marginLeft="auto">
                                    <Button
                                        variant="contained"
                                        onClick={formik.handleSubmit}
                                        startIcon={<Save />}
                                        sx={{
                                            marginTop: "10px",
                                            backgroundColor: "#1C2536",
                                            width: "100px",
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>

            {/* Open popups in the calendar */}
            < EditTypeCalander openEditCalendar={isCalendar} closeEditCalendar={closeEditCalendar} />
            <TypeCalendarNew openTypeCalendar={isTypeCalendarNew} closeTypeCalendar={closeTypeCalendarNew} onAddCalendarType={addCalendarType} />
            <AddPresentCalendar openPresent={IsPresent} closePresent={closePresent} onSuccessFile={handleSnackbarOnFileUpload} />
            <PresentTableCalendar openEditPresent={IsEditPresent} closeEditPresent={closeEditPresent} />
            <AddressTableCalendar openEditAdress={IsEditAddress} closeEditAdress={closeEditAddress} />
            <AddAdressCalendar openAddCalendar={IsAddressPb} closeAddCalendar={closeAddressPb} />
            {/* Close popups in the calendar */}
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
        </>
    );
};


