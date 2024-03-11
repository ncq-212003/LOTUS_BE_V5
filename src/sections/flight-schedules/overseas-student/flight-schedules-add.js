import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, FormHelperText } from "@mui/material";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import { format } from 'date-fns';
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listAirPortApi } from "src/contexts/api/setting/api-airport";

export const AddFlightSchedules = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listMainEmployee, setListMainEmployee] = useState([]);
    const [listAirPorts, setListAirPorts] = useState([]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        hoVaTen: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayBay: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayDen: Yup
            .number()
            .required('Vui lòng nhập thông tin vào trường này')
            .test(
                'is-ngayDen-greater-than-ngayBay',
                'Ngày đến dự kiến phải lớn hơn ngày bay dự kiến.',
                function (ngayDen) {
                    const { ngayBay } = this.parent;
                    return ngayDen >= ngayBay;
                }
            ),
        nguoiPhuTrach: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        sanBayDi: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        sanBayDen: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const initialValues = {
        hoVaTen: "",
        ngayBay: "",
        ngayDen: "",
        nguoiPhuTrach: "",
        sanBayDi: "",
        sanBayDen: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                console.log("checkkk values", values)
                console.log("checkk values:", format(new Date(values.ngayBay), 'yyyy/MM/dd'))
                setSnackbarSeverity("success");
                setSnackbarMessage("Thêm thành công ");
                setSnackbarOpen(true);
                formik.resetForm();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

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

    useEffect(() => {
        const fetchDataAirPort = async () => {
            const response = await listAirPortApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listAirPort = response.data.map((items) => ({
                    airId: items.airportId,
                    airName: items.airportName
                }))
                setListAirPorts(listAirPort)
            }
        }
        fetchDataAirPort();
    }, [])

    return (
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
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={9} sm={9.6} md={10.5} lg={10.5} xl={11}>
                                <TextField
                                    error={!!(formik.touched.hoVaTen && formik.errors.hoVaTen)}
                                    helperText={formik.touched.hoVaTen && formik.errors.hoVaTen}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.hoVaTen}
                                    name="hoVaTen"
                                    // sx={{ marginTop: "12px" }}
                                    size="small"
                                    label="Họ và tên/ Mã DHS"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={3} sm={2.4} md={1.5} lg={1.5} xl={1}>
                                <Button
                                    sx={{
                                        // margin: "3px 0 20px 20px",
                                        backgroundColor: "#1C2536",
                                        color: "white",
                                    }}
                                    size="small"
                                    variant="contained"
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>

                        <DatePicker
                            onChange={(value) => {
                                formik.setFieldValue('ngayBay', Date.parse(value));
                            }}
                            value={formik.values.ngayBay}
                            name="ngayBay"
                            sx={{ width: "100%", marginTop: "12px" }}
                            format="dd/MM/yyyy"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined',
                                    onBlur: formik.handleBlur,
                                    error: !!(formik.touched.ngayBay && formik.errors.ngayBay),
                                    helperText: formik.touched.ngayBay && formik.errors.ngayBay,
                                }
                            }}
                            label="Ngày bay dự kiến"
                        />

                        <DatePicker
                            onChange={(value) => {
                                formik.setFieldValue('ngayDen', Date.parse(value));
                            }}
                            value={formik.values.ngayDen}
                            name="ngayDen"
                            sx={{ width: "100%", marginTop: "12px" }}
                            format="dd/MM/yyyy"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    variant: 'outlined',
                                    onBlur: formik.handleBlur,
                                    error: !!(formik.touched.ngayDen && formik.errors.ngayDen),
                                    helperText: formik.touched.ngayDen && formik.errors.ngayDen,
                                }
                            }}
                            label="Ngày đến dự kiến"
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listMainEmployee}
                            value={listMainEmployee.find(option => option.emId === formik.values.nguoiPhuTrach) || null}
                            onChange={(_, value) => {
                                formik.setFieldValue('nguoiPhuTrach', value ? value.emId : null);
                            }}
                            onBlur={formik.handleBlur('nguoiPhuTrach')}
                            getOptionLabel={(option) => option.emName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Người phụ trách"
                                    name="nguoiPhuTrach"
                                    error={formik.touched.nguoiPhuTrach && Boolean(formik.errors.nguoiPhuTrach)}
                                    helperText={formik.touched.nguoiPhuTrach && formik.errors.nguoiPhuTrach}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listAirPorts}
                            value={listAirPorts.find((item) => item.airId === formik.values.sanBayDi) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('sanBayDi', newValue ? newValue.airId : null);
                            }}
                            getOptionLabel={(option) => option.airName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Sân bay đi"
                                    name="sanBayDi"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sanBayDi && Boolean(formik.errors.sanBayDi)}
                                    helperText={formik.touched.sanBayDi && formik.errors.sanBayDi}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listAirPorts}
                            value={listAirPorts.find((item) => item.airId === formik.values.sanBayDen) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('sanBayDen', newValue ? newValue.airId : null);
                            }}
                            getOptionLabel={(option) => option.airName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Sân bay đến"
                                    name="sanBayDen"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sanBayDen && Boolean(formik.errors.sanBayDen)}
                                    helperText={formik.touched.sanBayDen && formik.errors.sanBayDen}
                                />
                            )}
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
                                    // width: "100px",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
};
