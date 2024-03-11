import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { Save } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const HandleComplain = (props) => {
  const { openComplain, closeComplain, waitingListUser, handleDeleteUser, handleComplainUser } = props;
  const [openAddError, setOpenAddError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const currentDate = dayjs();

  const initialValues = {
    ngayTiepNhan: currentDate,
    loiPhatSinh: "",
    phuongAnXuLy: "",
    nguoiXuLy: "",
    ghiChu: "",
    submit: null
  };

  const validationSchema = Yup.object({
    ngayTiepNhan: Yup
      .date()
      .required('Vui lòng nhập thông tin vào trường này'),
    loiPhatSinh: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    phuongAnXuLy: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    nguoiXuLy: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    ghiChu: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log("kiểm tra dữ liệu thêm khiếu nại:", values)
        setSnackbarSeverity("success");
        setSnackbarMessage("Dữ liệu đã được thêm thành công.");
        setSnackbarOpen(true);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  // Close 
  const closeDialog = () => {
    closeComplain();
  };

  const handleClick = (event) => {
    setOpenAddError(true)
  };

  const handleClose = () => {
    setOpenAddError(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const [persons, setPersons] = useState([
    { id: 1, name: "Trần Thị Hương" },
    { id: 2, name: "Lê Văn Đức" },
    { id: 3, name: "Phạm Thị Lan" },
    { id: 4, name: "Nguyễn Văn An" },
    { id: 5, name: "Vũ Thị Hằng" },
    { id: 6, name: "Hoàng Minh Thiện" }
  ])

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openComplain}
        fullWidth
        // maxWidth="xl"
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Xử lý thông tin khiếu nại
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
          <Box sx={{ typography: "body1" }}>
            <TableContainer
              sx={{
                border: "1px solid rgb(224, 224, 224) !important",
              }}
              fullWidth
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                  <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={50}>STT</TableCell>
                    <TableCell align="left">Tên</TableCell>
                    <TableCell align="left">Ngày sinh</TableCell>
                    <TableCell align="left">Giới tính</TableCell>
                    <TableCell align="left">Số điện thoại</TableCell>
                    <TableCell align="left">Công ty tiếp nhận </TableCell>
                    <TableCell align="left">Nghiệp đoàn </TableCell>
                    <TableCell align="left">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waitingListUser.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.name}</TableCell>
                      <TableCell>{items.dateofbirth}</TableCell>
                      <TableCell>{items.gender}</TableCell>
                      <TableCell>{items.phone}</TableCell>
                      <TableCell>{items.company}</TableCell>
                      <TableCell>{items.union}</TableCell>
                      <TableCell align="left">
                        <Typography>
                          <Tooltip title="Chi tiết">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                // handleViewDetail(params);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Thêm khiếu nại">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={handleClick}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={() => handleDeleteUser(items)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer >
          </Box>
        </DialogContent>

        {/* Tạo thêm lỗi và xử lý lỗi để nhập dữ liệu khi thay đổi */}
        <div>
          <BootstrapDialog
            onClose={handleClose}
            open={openAddError}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
              Thêm nội dung khiếu nại
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
              <Box sx={{ typography: "body1" }}>
                <div style={{ padding: '10px' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // disableFuture
                      label="Ngày tiếp nhận"
                      ampm={false} // 
                      format="DD/MM/YYYY"
                      onBlur={formik.handleBlur}
                      value={formik.values.ngayTiepNhan}
                      sx={{ width: "100%", margin: "4px 0px 0px 0px " }}
                      onChange={(value) => {
                        // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                        formik.setFieldValue("ngayTiepNhan", value);
                      }}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          onBlur: formik.handleBlur,
                          error: !!(formik.touched.ngayTiepNhan && formik.errors.ngayTiepNhan),
                          helperText: formik.touched.ngayTiepNhan && formik.errors.ngayTiepNhan,
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    error={!!(formik.touched.loiPhatSinh && formik.errors.loiPhatSinh)}
                    helperText={formik.touched.loiPhatSinh && formik.errors.loiPhatSinh}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.loiPhatSinh}
                    name="loiPhatSinh"
                    sx={{ marginTop: "12px" }}
                    size="small"
                    label="Lỗi phát sinh"
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                  />

                  <TextField
                    error={!!(formik.touched.phuongAnXuLy && formik.errors.phuongAnXuLy)}
                    helperText={formik.touched.phuongAnXuLy && formik.errors.phuongAnXuLy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phuongAnXuLy}
                    name="phuongAnXuLy"
                    multiline
                    rows={2}
                    sx={{ marginTop: "12px" }}
                    size="small"
                    label="Phương án xử lý"
                    fullWidth
                    variant="outlined"
                  />

                  <Autocomplete
                    name="nguoiXuLy"
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={persons}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => formik.setFieldValue('nguoiXuLy', newValue?.id || '')}
                    value={persons.find(per => per.id === formik.values.nguoiXuLy) || null}
                    renderInput={(params) => (
                      <TextField
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.nguoiXuLy && formik.errors.nguoiXuLy)}
                        helperText={formik.touched.nguoiXuLy && formik.errors.nguoiXuLy}
                        {...params}
                        label="Người xử lý"
                        variant="outlined"
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
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                  />
                </div>
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
                    onClick={formik.handleSubmit}
                    startIcon={<Save />}
                    sx={{
                      backgroundColor: '#1C2536',
                    }}

                  >
                    Lưu
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <SnackbarAlert
              open={snackbarOpen}
              message={snackbarMessage}
              severity={snackbarSeverity}
              onClose={handleCloseSnackbar}
            />
          </BootstrapDialog>
        </div>
      </BootstrapDialog>
    </>
  );
};
