import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    DialogActions,
    Autocomplete
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { addRoleApi, listRoleApi } from "src/contexts/api/system/api-role";
import SnackbarAlert from "src/components/action-notification";
import { listDepartmentApi } from "src/contexts/api/company/api-department";
import { addDepartmentRoleApi, findByDepartmentIdApi } from "src/contexts/api/system/api-department-role";
import { HANDLERS_DEPARTMENT_ROLE } from "src/contexts/reducer/system/reducer-department-role";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object({
    department: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
    roleName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    orderRole: Yup.number().required("Vui lòng nhập thông tin vào trường này"),
    description: Yup.string(),
    status: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
});

const initialValues = {
    department: null,
    roleName: "",
    orderRole: 0,
    description: "",
    status: null,
};

const statusOptions = [
    {
        id: 1,
        label: 'Hoạt động ',
    },
    {
        id: 2,
        label: 'Không hoạt động',
    },
]

export default function RoleAdd({ open, onClose, selectedDepartment }) {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [departmentOption, setDepartmentOption] = useState([]);

    //List Department
    useEffect(() => {
        const listDepartmentName = async () => {
            const res = await listDepartmentApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const departments = res.data.map((dp) => ({
                    label: dp.deparmentName,
                    value: dp.departmentId,
                }));
                setDepartmentOption(departments);
            }
        };
        listDepartmentName();
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    roleSystemId: 1,
                    roleName: values.roleName,
                    orderRole: values.orderRole,
                    orderRoleHidden: "1",
                    description: values.description,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: 1,
                    lastModifiedByHidden: "1",
                    flag: "1"
                }

                const response = await addRoleApi(formData)
                if (response.status === 200) {
                    console.log(response.data);

                    const returnValue = response.data.returnValue;

                    console.log(returnValue);

                    const formDataDepartmentRole = {
                        departmentRoleId: 1,
                        departmentId: values.department.value,
                        roleSystemId: returnValue,
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
                        flag: null,
                        roleName: null
                    }

                    const res = await addDepartmentRoleApi(formDataDepartmentRole)
                    if (res.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        // call api list after add success
                        const res = await findByDepartmentIdApi(values.department.value);
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_DEPARTMENT_ROLE.FIND_DEPARTMENT_ROLE_DEPARTMENTID,
                            payload: res.data,
                        });
                        formik.resetForm();
                    } else {
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Có lỗi xảy ra !");
                        setSnackbarOpen(true);
                    }


                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                console.log(err);
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            department: selectedDepartment || null,
        });
    }, [selectedDepartment]);

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
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
            fullWidth
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Thêm vai trò
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3}
                sx={{ p: 2 }}>
                <Grid container
                    spacing={2}
                    margin="none"
                    justifyContent="center">
                    <Grid item
                        xs={12}
                        md={12}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={departmentOption}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => handleChange('department', event, newValue)}
                            onBlur={() => formik.setFieldTouched('department', true)}
                            value={formik.values.department}
                            // defaultValue={selectedDepartment}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Phòng ban"
                                    variant="outlined"
                                    error={formik.touched.department && Boolean(formik.errors.department)}
                                    helperText={formik.touched.department && formik.errors.department}
                                />
                            }
                        />
                        <TextField
                            error={formik.touched.roleName && formik.errors.roleName}
                            helperText={formik.touched.roleName && formik.errors.roleName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.roleName}
                            name="roleName"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên vai trò"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            error={formik.touched.orderRole && formik.errors.orderRole}
                            helperText={formik.touched.orderRole && formik.errors.orderRole}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.orderRole}
                            name="orderRole"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Thứ tự vai trò"
                            fullWidth
                            variant="outlined"
                        />
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={statusOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => handleChange('status', event, newValue)}
                            onBlur={() => formik.setFieldTouched('status', true)}
                            value={formik.values.status}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Trạng thái"
                                    variant="outlined"
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                    helperText={formik.touched.status && formik.errors.status}
                                />
                            }
                        />
                        <TextField
                            error={formik.touched.description && formik.errors.description}
                            helperText={formik.touched.description && formik.errors.description}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            name="description"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button autoFocus
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Lưu
                </Button>
            </DialogActions>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
    );
}