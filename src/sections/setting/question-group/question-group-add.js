import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { addCQACategoryApi, listCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { HANDLERS_CQACATEGORY } from "src/contexts/reducer/setting/reducer-cqa-category";
import { useApp } from "src/hooks/use-app";
import { useState } from "react";

const validationSchema = Yup.object({
  category: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  order: Yup.number().required("Vui lòng nhập thông tin vào trường này."),
  description: Yup.string(),
});

const initialValues = {
  category: "",
  order: "",
  description: "",
};

export default function QuestionGroupAdd() {
  // context
  const [state, dispatch] = useApp();
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          cqaCategoryId: 1,
          cqaName: values.category,
          orderCategory: values.order,
          orderCategoryHidden: "1",
          description: values.description || "1",
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
          flag: "1",
        };

        // console.log(formData);

        const response = await addCQACategoryApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          formik.resetForm();

          // call api list after add success
          const res = await listCQACategoryApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_CQACATEGORY.LIST_CQACATEGORY,
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <form onSubmit={formik.handleSubmit}>
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
                error={!!(formik.touched.category && formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.category}
                name="category"
                variant="outlined"
                required
                size="small"
                sx={{ margin: "4px", marginBottom: "12px" }}
                label="Tên nhóm câu hỏi"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.order && formik.errors.order)}
                helperText={formik.touched.order && formik.errors.order}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.order}
                required
                name="order"
                variant="outlined"
                size="small"
                sx={{ margin: "4px", marginBottom: "12px" }}
                label="Thứ tự"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                variant="outlined"
                size="small"
                sx={{ margin: "4px", marginBottom: "12px" }}
                label="Ghi chú"
                fullWidth
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1C2536",
                  }}
                  type="submit"
                >
                  Thêm
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
}
