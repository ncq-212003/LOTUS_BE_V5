import React, { useState } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { addSchoolApi, listSchoolApi } from "src/contexts/api/setting/api-school";
import { HANDLERS_SCHOOL } from "src/contexts/reducer/setting/reducer-school";
import SnackbarAlert from "src/components/action-notification";
import { useEffect } from "react";
import { HANDLERS_MARKET } from "src/contexts/reducer/setting/reducer-market";
import { listMarketApi } from "src/contexts/api/setting/api-market";



const validationSchema = Yup.object({
  schoolName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
  market: Yup.object().required('Vui lòng nhập thông tin vào trường này'),
  address: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
  website: Yup.string(),
  email: Yup.string().required('Vui lòng nhập thông tin vào trường này').email('Vui lòng nhập email đúng định dạng'),
  phone: Yup.string()
    .required("Vui lòng nhập thông tin vào trường này")
    .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
    .max(15, "Số điện thoại tối đa là 15 số"),
  description: Yup.string()
});

const initialValues = {
  schoolName: "",
  market: null,
  address: "",
  website: "",
  email: "",
  phone: "",
  description: ""
};

export default function SchoolAdd() {
  const [state, dispatch] = useApp();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [marketOption, setMarketOption] = useState([]);

  // List market
  useEffect(() => {
    const listData = async () => {
      const res = await listMarketApi();
      const markets = res.data.map((m) => ({
        label: m.marketName,
        value: m.marketId,
      }));
      setMarketOption(markets);
    };
    listData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          schoolId: 0,
          marketId: values.market.value,
          marketIdHidden: "1",
          schoolName: values.schoolName,
          address: values.address,
          email: values.email,
          phone: values.phone,
          description: values.description,
          field1: values.website,
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
        // console.log(formData);

        const response = await addSchoolApi(formData)
        console.log(response.status);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          formik.resetForm();

          // call api list after add success
          const res = await listSchoolApi();
          console.log(res.data);
          // dispatch list data
          dispatch({
            type: HANDLERS_SCHOOL.LIST_SCHOOL,
            payload: res.data,
          });
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

  const handleChange = (event, newValue) => {
    if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
      formik.setFieldValue('market', newValue);
    } else {
      formik.handleChange(event);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <TextField
              required
              error={Boolean(formik.touched.schoolName && formik.errors.schoolName)}
              helperText={formik.touched.schoolName && formik.errors.schoolName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.schoolName}
              name="schoolName"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Tên trường học"
              fullWidth
            />
            <Autocomplete
              fullWidth
              size="small"
              sx={{ margin: '4px', marginTop: '12px' }}
              options={marketOption}
              getOptionLabel={(option) => option.label}
              onChange={handleChange}
              onBlur={() => formik.setFieldTouched('market', true)}
              value={formik.values.market}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Thị trường"
                  variant="outlined"
                  error={formik.touched.market && Boolean(formik.errors.market)}
                  helperText={formik.touched.market && formik.errors.market}
                />
              }
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              name="address"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Địa chỉ trường học"
              fullWidth
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Địa chỉ email"
              fullWidth
            />
            <TextField
              error={Boolean(formik.touched.website && formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.website}
              name="website"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Website"
              fullWidth
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Điện thoại"
              fullWidth
            />
            <TextField
              error={Boolean(formik.touched.description && formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              multiline
              name="description"
              variant="outlined"
              sx={{ margin: '4px', marginTop: '12px' }}
              size="small"
              label="Ghi chú"
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                sx={{
                  backgroundColor: "#1C2536",
                }}
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
