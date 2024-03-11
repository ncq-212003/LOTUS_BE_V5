import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_PROCESS } from "src/contexts/reducer/schedule/reducer-process";
import { addProcessApi, listProcessApi } from "src/contexts/api/schedule/api-process";
import SnackbarAlert from "src/components/action-notification";
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

export const AddProcess = (props) => {
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [state, dispatch] = useApp();
  const { process } = state;

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

  const initialValues = {
    tieuDeTienTrinh: "",
    tienDo: "",
    mauSac: "",
    hinhAnh: "",
    ghiChu: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          ProcessId: 1,
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

        if (isSaving) {
          const response = await addProcessApi(formData);
          if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);
            formik.resetForm();
            setSelectedFileLogo(null);
            // call lại listProcess 
            const listProcess = await listProcessApi();
            dispatch({
              type: HANDLERS_PROCESS.LIST_PROCESS,
              payload: listProcess.data
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
              options={["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]}
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
              <Typography variant="b" component="b" sx={{ margin: "14px 14px 14px 20px" }}>
                Ảnh icons
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    width: "120px",
                    height: "160px",
                  }}
                  variant="rounded"
                  // src={formik.values.hinhAnh}
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
