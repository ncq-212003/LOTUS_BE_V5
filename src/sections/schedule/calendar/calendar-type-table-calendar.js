import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  SvgIcon,
  DialogActions,
  styled,
  Tooltip,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DialogContent from "@mui/material/DialogContent";
import InfoRecord from "src/components/info-record";
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

export const EditTypeCalander = (props) => {
  const { openEditCalendar, closeEditCalendar } = props;
  const [openBoots, setOpenBoots] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [rows, setRows] = useState([
    { stt: "1", tenlich: "Lịch họp công ty" },
    { stt: "2", tenlich: "Lịch gặp mặt đối tác" },
    { stt: "3", tenlich: "Lịch ăn nhà hàng" },
    { stt: "4", tenlich: "Lịch sự kiện đặc biệt" },
    { stt: "5", tenlich: "Lịch đón khách sân bay" },
  ]);

  const handleClose = () => {
    closeEditCalendar(false);
  };

  const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleCloseBoots = () => {
    setOpenBoots(false);
  };

  const handleButtonClick = (event, row) => {
    setOpenBoots(true);
    setSelectedRow(row);
  };

  const validationSchema = Yup.object({
    tenlich: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenlich: selectedRow?.tenlich || "",
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log("value", values)
        const rowIndex = rows.findIndex((row) => row.id === selectedRow.id);
        if (rowIndex !== -1) {
          const updatedRows = [...rows];
          updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...values };
          setRows(updatedRows);
        }
        alert("thanh cong")
        handleCloseBoots();
        return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <BootstrapDialog
        open={openEditCalendar}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Danh sách loại lịch
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
        <DialogContent dividers sx={{ width: '100%' }}>
          <Box sx={{ typography: "body1", padding: "2px" }}>
            <Box sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: "1.5px solid rgb(224, 224, 224) !important",
                }}
                fullWidth
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                      <TableCell width={50}>Stt</TableCell>
                      <TableCell align="center" width={200}>Tên lịch</TableCell>
                      <TableCell align="center" width={150}>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((items, index) => (
                      <TableRow key={index}>
                        <TableCell>{items.stt}</TableCell>
                        <TableCell>{items.tenlich}</TableCell>
                        <TableCell align="center" >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Tooltip title="Chỉnh sửa thông tin">
                              <IconButton aria-label="Chỉnh sửa" style={{ color: "#1C2536" }} onClick={(event) => handleButtonClick(event, items)}>
                                <CreateIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton aria-label="Xóa" style={{ color: "#1C2536" }} onClick={() => handleDelete(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: '#e3e6e6'
          }}
        >
          <InfoRecord />
        </DialogActions>
      </BootstrapDialog>

      {/* Tạo 1 Boots để nhập dữ liệu khi thay đổi */}

      <BootstrapDialog
        onClose={handleCloseBoots}
        open={openBoots}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Thông tin cần chỉnh sửa
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseBoots}
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
            error={!!(formik.touched.tenlich && formik.errors.tenlich)}
            helperText={formik.touched.tenlich && formik.errors.tenlich}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tenlich}
            name="tenlich"
            sx={{ margin: "4px", marginTop: "12px" }}
            size="small"
            label="Tên lịch"
            fullWidth
            variant="outlined"
          />
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
    </>
  );
};