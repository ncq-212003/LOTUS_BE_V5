import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { useFormik } from "formik";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const TypeCalendarNew = ({ openTypeCalendar, closeTypeCalendar, onAddCalendarType }) => {
  const handleClose = () => {
    closeTypeCalendar();
  };

  const formik = useFormik({
    initialValues: {
      calendarName: "",
      submit: null,
    },
    validationSchema: Yup.object({
      calendarName: Yup
        .string()
        .required('Vui lòng nhập thông tin vào trường này'),
    }),
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
      try {
        const data = JSON.stringify(values);
        onAddCalendarType(values.calendarName);
        console.log(values)
        formik.resetForm();
        handleClose();
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
        onClose={handleClose}
        open={openTypeCalendar}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Thêm loại lịch
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <TextField
            error={!!(formik.touched.calendarName && formik.errors.calendarName)}
            helperText={formik.touched.calendarName && formik.errors.calendarName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.calendarName}
            name="calendarName"
            sx={{ margin: "4px", marginTop: "12px" }}
            size="small"
            label="Tên lịch mới"
            fullWidth
            variant="outlined"
          />
          {/* <Box style={{ marginTop: "20px" }}>
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
          </Box> */}
          <Stack display="flex">
            <Box marginLeft="auto">
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                sx={{
                  marginTop: "30px",
                  backgroundColor: "#1C2536",
                  // width: "100px",
                }}
              >
                Thêm
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
