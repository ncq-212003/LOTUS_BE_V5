import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  program: "",
  description: "",
};

export default function ParticipationProgramAdd() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);

        console.log(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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
              <Box
                sx={{
                  paddingBottom: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={!!(formik.touched.program && formik.errors.program)}
                  helperText={formik.touched.program && formik.errors.program}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.program}
                  name="program"
                  variant="outlined"
                  required
                  size="small"
                  sx={{ marginRight: "10px" }}
                  label="Chương trình"
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
                  sx={{ marginRight: "10px" }}
                  label="Ghi chú"
                  fullWidth
                />
              </Box>
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
    </Stack>
  );
}
