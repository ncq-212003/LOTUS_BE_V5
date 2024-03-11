import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, SvgIcon } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TableEveryoneCalendar } from "./calendar-everyone-table";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { Search } from '@mui/icons-material';

export const EveryoneCalendar = () => {
  // const [selectedValue, setSelectedValue] = useState("");
  // const [selectedDate, setSelectedDate] = useState();
  const [selectedFormik, setSelectedFormik] = useState();
  const [listNameEmployee, setListNameEmployee] = useState([]);

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
        setListNameEmployee(listEmployee);
      }
    }
    fetchDataEmployee();
  }, [])

  const validationSchema = Yup.object({
    nhanVien: Yup
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
  });

  const initialValues = {
    nhanVien: "",
    ngayBatDau: '',
    ngayKetThuc: '',
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(values)
        setSelectedFormik(values.nhanVien)
        formik.resetForm();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <>
      <Stack spacing={3} sx={{ p: 2, marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={listNameEmployee}
                value={listNameEmployee.find(option => option.emId === formik.values.nhanVien) || null}
                onChange={(_, value) => {
                  formik.setFieldValue('nhanVien', value ? value.emId : null);
                }}
                onBlur={formik.handleBlur('nhanVien')}
                getOptionLabel={(option) => option.emName}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Tên nhân viên"
                    name="nhanVien"
                    error={formik.touched.nhanVien && Boolean(formik.errors.nhanVien)}
                    helperText={formik.touched.nhanVien && formik.errors.nhanVien}
                  />
                )}
              />
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
              <Box style={{ marginTop: "20px" }}>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <Search />
                    </SvgIcon>
                  )}
                  onClick={formik.handleSubmit}
                  variant="contained"
                  sx={{
                    // width: "160px",
                    backgroundColor: "#1C2536 !important",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  Tìm kiếm
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <TableEveryoneCalendar
          // valueEmployee={selectedValue}
          // valueDate={selectDate}
          employeeName={selectedFormik}
        />
      </Stack>
    </>
  );
};
