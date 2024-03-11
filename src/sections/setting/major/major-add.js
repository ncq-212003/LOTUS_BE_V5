import * as React from "react";
import { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addMajorApi, listMajorApi } from "src/contexts/api/setting/api-major";
import { HANDLERS_MAJOR } from "src/contexts/reducer/setting/reducer-major";

export default function MajorAdd() {
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [state,dispatch] = useApp();
  const validationSchema = Yup.object({
    majorName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    timeTraining: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    // avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này')
  });

  const initialValues = {
    majorName: '',
    timeTraining: '',
    description: '',
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
        try {
            const formData = {
                majorId: 1,
                majorName: values.majorName,
                timeTraining: values.timeTraining,
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
                flag: "A"
            }

            const response = await addMajorApi(formData)
            if (response.status === 200) {
                setSnackbarSeverity("success");
                setSnackbarMessage("Thêm thành công !");
                setSnackbarOpen(true);

                formik.resetForm();

                //get list data after add
                const data = await listMajorApi();
                dispatch({
                    type: HANDLERS_MAJOR.LIST_MAJOR,
                    payload: data.data,
                })
            } else {
                setSnackbarSeverity("error");
                setSnackbarMessage("Có lỗi xảy ra !");
                setSnackbarOpen(true);
            }
        } catch (err) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Thêm thất bại !");
            setSnackbarOpen(true);
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    },
});

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
            <TextField
              error={!!(formik.touched.majorName && formik.errors.majorName)}
              helperText={formik.touched.majorName && formik.errors.majorName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.majorName}
              size="small"
              name="majorName"
              variant="outlined"
              required
              sx={{ width: "100%", marginBottom: "15px" }}
              label="Tên chuyên ngành"
            />
            <TextField
              error={!!(formik.touched.timeTraining && formik.errors.timeTraining)}
              helperText={formik.touched.timeTraining && formik.errors.timeTraining}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.timeTraining}
              name="timeTraining"
              size="small"
              variant="outlined"
              required
              sx={{ width: "100%", marginBottom: "15px" }}
              label="Thời gian đào tạo"
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                error={!!(formik.touched.tranningTime && formik.errors.tranningTime)}
                helperText={formik.touched.tranningTime && formik.errors.tranningTime}
                onBlur={formik.handleBlur}
                onChange={(value) => {
                  const formattedDate = dayjs(value).format("YYYY-MM-DD");
                  formik.setFieldValue("tranningTime", formattedDate);
                }}
                value={formik.values.tranningTime}
                name="tranningTime"
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Thời gian đào tạo"
              />
            </LocalizationProvider> */}
            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              variant="outlined"
              label="Giới Thiệu Chi Tiết"
              name="description"
              fullWidth
              value={formik.values.description}
              onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: "12px",
                  backgroundColor: "#1C2536",
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
}
