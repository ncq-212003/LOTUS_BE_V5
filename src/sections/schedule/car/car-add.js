import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { addCarApi, listCarApi, } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import ConfirmAlert from "src/components/action-confirm";

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

export const AddCar = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [listMainEmployee, setListMainEmployee] = useState([]);
  const [listNameCompany, setListNameCompany] = useState([]);
  // api 
  const [state, dispatch] = useApp();
  const { car } = state;
  const { cars } = car;

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


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        try {
          const response = await uploadSingleFile("Process", file);
          if (response.status === 200) {
            const image = getPathFromUrl(response.data);
            setSelectedFileLogo(URL.createObjectURL(file));
            setSnackbarSeverity("success");
            setSnackbarMessage("Tải file lên thành công.");
            setSnackbarOpen(true);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

  const initialValues = {
    tenCongTy: "",
    tenXe: "",
    soGhe: "",
    bienSoXe: "",
    nhanVienPhuTrach: "",
    hinhAnh: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          CarId: "1",
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
        if (isSaving) {
          const response = await addCarApi(formData);
          if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);
            formik.resetForm();
            setSelectedFileLogo(null);
            const listData = await listCarApi();
            dispatch({
              type: HANDLERS_CAR.LIST_CAR,
              payload: listData.data
            })
            setIsSaving(false);
          } else {
            setIsSaving(false);
            setSnackbarSeverity("error");
            setSnackbarMessage("Có lỗi xảy ra !");
            setSnackbarOpen(true);
          }
        } else {
          handleModelOpen();
        }
      } catch (err) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  // Danh sách công ty
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

  // Danh sách nhân viên
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
            {/* <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "16px" }}
            >
              Thông tin cơ bản
            </Typography> */}

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
              <Typography variant="b" component="b" sx={{ margin: "14px 14px 14px 30px" }}>
                Ảnh Xe
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    width: "120px",
                    height: "160px",
                  }}
                  variant="rounded"
                  src={selectedFileLogo}
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

      <ConfirmAlert
        onOpen={isDialogSave}
        onClose={handleModelClose}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </Stack>
  );
};
