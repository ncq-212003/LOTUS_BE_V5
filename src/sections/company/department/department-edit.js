/* eslint-disable react-hooks/exhaustive-deps */
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
    Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import { listDepartmentApi, updateDepartmentApi } from "src/contexts/api/company/api-department";
import { HANDLERS_DEPARMENT } from "src/contexts/reducer/company/reducer-department";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DepartmentEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [companyNameOption, setCompanyNameOption] = useState([]);
    const [employeeNameMain, setEmployeeNameMain] = useState([]);
    const [state, dispatch] = useApp();
    const { department } = state;
    const { departments } = department;

    const dataEdit = Array.isArray(departments) ? departments.find((x) => x.departmentId == id) : [];
    const companyName = companyNameOption.find((x) => x.value === dataEdit?.companyId);
    const employeeMainName = employeeNameMain.find((em) => em.value === dataEdit?.employeeIdMain);

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

    //listCompanyName
    useEffect(() => {
        const listCompanyName = async () => {
            const res = await listCompanyApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const companies = res.data.map((com) => ({
                    label: com.companyName,
                    value: com.companyId,
                }));
                setCompanyNameOption(companies);
            }
        };
        listCompanyName();
    }, []);

    //listEmployeeName
    useEffect(() => {
        const listEmployeeName = async () => {
            const res = await listEmployeeApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const employees = res.data.map((employee) => ({
                    label: employee.lastName + " " + employee.middleName + " " + employee.firstName,
                    value: employee.employeeId,
                }));
                setEmployeeNameMain(employees);
            }
        };
        listEmployeeName();
    }, []);

    const validationSchema = Yup.object({
        departmentName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        BriefCode: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        deskPhone: Yup.string()
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
            .max(15, "Số điện thoại tối đa là 15 số"),
        mainPersonInCharge: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
    });

    const formik = useFormik({
        initialValues: {
            company: "",
            departmentName: "",
            BriefCode: "",
            deskPhone: "",
            mainPersonInCharge: "",
            status: "Hoạt động",
            description: "",
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    EmployeeIdMain: values.mainPersonInCharge.value,
                    Telephone: values.deskPhone,
                    BriefCode: values.BriefCode,
                    BranchIdHidden: 1,
                    DeparmentName: values.departmentName,
                    LastModifedByHidden: "1",
                    CreatedByHidden: "1",
                    EmployeeIdMainHidden: values.mainPersonInCharge.value,
                    Flag: "1",
                    DepartmentId: id,
                    Status: values.status,
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: "1",
                    CompanyId: values.company.value,
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: dataEdit.createdAt,
                    Field5: "1",
                    LastModifedAt: new Date().toISOString(),
                    Description: values.description,
                    BranchId: 1,
                    CreatedBy: "1",
                    LastModifedBy: "1",
                };

                console.log(formData);

                if (isEditing) {
                    const response = await updateDepartmentApi(formData);
                    if (response.status === 200) {
                        // call api list after add success
                        const res = await listDepartmentApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_DEPARMENT.LIST_DEPARTMENT,
                            payload: res.data,
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
                setSnackbarSeverity("error");
                setSnackbarMessage("Sửa thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    company: companyName || "",
                    departmentName: dataEdit.deparmentName,
                    BriefCode: dataEdit.briefCode,
                    deskPhone: dataEdit.telephone,
                    mainPersonInCharge: employeeMainName,
                    status: dataEdit.status,
                    description: dataEdit.description,
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchCompanyData();
        }
    }, [open, id]);

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
                <Toolbar>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        SỬA THÔNG TIN
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose(false)}
                        aria-label="close">
                        <SvgIcon fontSize="small"
                        >
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3}
                sx={{ p: 2 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack
                        spacing={3}
                        sx={{
                            margin: "20px 0",
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: "#f5f5f5",
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                            }}
                        >
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                                <Grid item sm={12} xs={12} md={6}>
                                    <Autocomplete
                                        error={!!(formik.touched.company && formik.errors.company)}
                                        helperText={formik.touched.company && formik.errors.company}
                                        onBlur={formik.handleBlur}
                                        onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                                        value={formik.values.company}
                                        name="company"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                        disablePortal
                                        options={companyNameOption}
                                        renderInput={(params) => (
                                            <TextField variant="outlined" {...params} label="Công ty" />
                                        )}
                                    />

                                    <TextField
                                        error={!!(formik.touched.departmentName && formik.errors.departmentName)}
                                        helperText={formik.touched.departmentName && formik.errors.departmentName}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.departmentName}
                                        name="departmentName"
                                        required
                                        fullWidth
                                        label="Tên phòng ban "
                                        variant="outlined"
                                        size="small"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                    />
                                    <TextField
                                        error={!!(formik.touched.BriefCode && formik.errors.BriefCode)}
                                        helperText={formik.touched.BriefCode && formik.errors.BriefCode}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.BriefCode}
                                        name="BriefCode"
                                        required
                                        fullWidth
                                        label="Mã phòng ban "
                                        variant="outlined"
                                        size="small"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                    />
                                </Grid>

                                <Grid item sm={12} xs={12} md={6}>
                                    <TextField
                                        error={!!(formik.touched.deskPhone && formik.errors.deskPhone)}
                                        helperText={formik.touched.deskPhone && formik.errors.deskPhone}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.deskPhone}
                                        name="deskPhone"
                                        required
                                        fullWidth
                                        label="Số điện thoại bàn "
                                        variant="outlined"
                                        size="small"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                    />
                                    <Autocomplete
                                        onBlur={formik.handleBlur}
                                        onChange={(event, newValue) =>
                                            formik.setFieldValue("mainPersonInCharge", newValue)
                                        }
                                        value={formik.values.mainPersonInCharge}
                                        name="mainPersonInCharge"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        options={employeeNameMain}
                                        fullWidth
                                        size="small"
                                        renderInput={(params) => (
                                            <TextField
                                                variant="outlined"
                                                {...params}
                                                label="Người phụ trách chính"
                                                error={
                                                    !!(formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge)
                                                }
                                                helperText={
                                                    formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge
                                                }
                                            />
                                        )}
                                    />
                                    <TextField
                                        error={!!(formik.touched.status && formik.errors.status)}
                                        helperText={formik.touched.status && formik.errors.status}
                                        onBlur={formik.handleBlur}
                                        onChange={(event) => {
                                            formik.handleChange(event);
                                        }}
                                        value={formik.values.status}
                                        name="status"
                                        fullWidth
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        label="Trạng thái"
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                    >
                                        <option value="Hoạt động">Hoạt động</option>
                                        <option value="Dừng hoạt động">Dừng hoạt động</option>
                                    </TextField>
                                    {/* <Autocomplete
                    error={!!(formik.touched.status && formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    onBlur={formik.handleBlur}
                    onChange={(event, newValue) => formik.setFieldValue("status", newValue)}
                    value={formik.values.status}
                    name="status"
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    fullWidth
                    disablePortal
                    options={aspectOption}
                    renderInput={(params) => (
                      <TextField variant="outlined"
                        {...params}
                        label="Tình trạng" />
                    )}
                  /> */}
                                    <TextField
                                        error={!!(formik.touched.description && formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        name="description"
                                        fullWidth
                                        label="Mô tả "
                                        variant="outlined"
                                        size="small"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#1C2536",
                                    }}
                                    type="submit"
                                    startIcon={<Save />}
                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Box>
                    </Stack>
                </form>
            </Stack>
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
        </Dialog>
    );
}
