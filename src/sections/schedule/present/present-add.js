import { Stack, TextField, Button, Autocomplete, Grid, Box, Typography, FormHelperText } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { addPresentApi, listPresentApi } from "src/contexts/api/schedule/api-present";
import { HANDLERS_PRESENT } from "src/contexts/reducer/schedule/reducer-present";
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

export const AddPresent = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [state, dispatch] = useApp();
  const { present } = state;

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
          const response = await uploadSingleFile("Present", file);
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
    tenQuaTang: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    hinhAnh: Yup
      .mixed()
      .test('required', 'Vui lòng chọn một hình ảnh', function (value) {
        return !!value;
      }),
  });

  const initialValues = {
    tenQuaTang: "",
    ghiChu: "",
    hinhAnh: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          PresentId: 1,
          PresentName: values.tenQuaTang,
          PresentGroup: "Nhóm quà tặng",
          Price: 0,
          Description: values.ghiChu,
          Field1: values.hinhAnh,
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
        // Thêm đoạn này ở phần này giúp em để hiển thị alert "isSaving"  
        if (isSaving) {
          const response = await addPresentApi(formData);
          if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);
            formik.resetForm();
            setSelectedFileLogo(null);
            const listData = await listPresentApi();
            dispatch({
              type: HANDLERS_PRESENT.LIST_PRESENT,
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
              error={!!(formik.touched.tenQuaTang && formik.errors.tenQuaTang)}
              helperText={formik.touched.tenQuaTang && formik.errors.tenQuaTang}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenQuaTang}
              name="tenQuaTang"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Tên quà tặng"
              fullWidth
              variant="outlined"
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
              fullWidth
              variant="outlined"
              multiline
              rows={2}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="b" component="b" sx={{ margin: "14px" }}>
                Ảnh quà tặng
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
