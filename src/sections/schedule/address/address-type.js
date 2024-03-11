import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const TypeAddress = ({ openType, closeType }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const closeDialog = () => {
    closeType();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    tenLoai: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    tenLoai: "",
    ghiChu: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(values)
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm thành công !");
        setSnackbarOpen(true);
        formik.resetForm();
        // return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openType}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Loại địa điểm
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="inherit">
            <XCircleIcon />
          </SvgIcon>
        </IconButton>
        <DialogContent dividers>
          <Grid container>
            <TextField
              error={!!(formik.touched.tenLoai && formik.errors.tenLoai)}
              helperText={formik.touched.tenLoai && formik.errors.tenLoai}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenLoai}
              name="tenLoai"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên loại"
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
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Box style={{ marginTop: "20px" }}>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{
                width: "130px",
                backgroundColor: "#1C2536",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              Lưu
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};
