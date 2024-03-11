import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Stack,
  Box,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import { useApp } from 'src/hooks/use-app';
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import styles from '../../../style/index.module.scss';
import { listRoomApi } from "src/contexts/api/setting/api-room";
import { addItemApi, listItemApi } from "src/contexts/api/setting/api-item";
import { HANDLERS_ITEM } from "src/contexts/reducer/setting/reducer-item";

export default function ItemAdd() {
  const [ClassroomOptions, setClassroomOptions] = useState([]);
  // context
  const [state, dispatch] = useApp();
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const listData = async () => {
      const res = await listRoomApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.dormitoryRoomColumn,
          value: com.dormitoryId,
        }));
        setClassroomOptions(data);
      }
    };
    listData();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    name: Yup.object()
      .shape({
        value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    code: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    assetName: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    code: "",
    assetName: "",
    name: null,
    description: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          assetId: 0,
          assetName: values.assetName,
          code: values.code,
          name: values.name ? values.name.label : '',
          description: values.description,
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          timeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: "1",
          createdByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: "1",
          LastModifiedByHidden: "1",
          Description: values.description.trim(),
          Flag: "A"
        };
        console.log(formData)
        const response = await addItemApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          // call api list after add success
          const res = await listItemApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_ITEM.LIST_ITEM,
            payload: res.data,
          });
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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
            <Autocomplete
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("name", newValue)}
              value={formik.values.name}
              name="name"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={ClassroomOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params}
                  label="Tên phòng"
                  variant="outlined" />
              )}
            />
            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              variant="outlined"
              size="small"
              label="Mã tài sản vật dụng"
              name="code"
              fullWidth
              error={!!(formik.touched.code && formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('code', value.target.value);
              }}
              value={formik.values.code}
            />
            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              variant="outlined"
              label="Tên tài sản vật dụng"
              name="assetName"
              fullWidth
              error={!!(formik.touched.assetName && formik.errors.assetName)}
              helperText={formik.touched.assetName && formik.errors.assetName}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('assetName', value.target.value);
              }}
              value={formik.values.assetName}
            />
            <TextField
              error={!!(formik.touched.description && formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{ margin: "4px", marginTop: "12px" }}
              value={formik.values.description}
              name="description"
              variant="outlined"
              size="small"
              label="Ghi chú"
              fullWidth
              multiline
              rows={2}
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
                className={styles.btn}
                variant="contained"
                sx={{
                  backgroundColor: '#1C2536',
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
