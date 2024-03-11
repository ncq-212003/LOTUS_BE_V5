import {
  Box,
  Grid,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useApp } from "src/hooks/use-app";
import { addRowTableIntern, deleteRowTableIntern, setFieldRowIntern } from "src/contexts/reducer/intern/reducer-intern";

export default function TabStudyProcess() {
  const tab = "studyProcess";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { studyProcess } = intern;
  const [openDialogs, setOpenDialogs] = useState({});
  const [activeField, setActiveField] = useState(null);

  const [newRow, setNewRow] = useState({
    TuThangNam: "",
    DenThangNam: "",
    CapHoc: "",
    TenTruong: "",
    DiaChi: "",
    ChuyenNganh: "",
    GhiChu: "",
  });

  const addRow = () => {
    dispatch(addRowTableIntern(tab, newRow));
    setNewRow({
      TuThangNam: "",
      DenThangNam: "",
      CapHoc: "",
      TenTruong: "",
      DiaChi: "",
      ChuyenNganh: "",
      GhiChu: "",
    });
    setActiveField(null);
    setOpenDialogs(false);
  };

  const deleteRow = (index) => {
    dispatch(deleteRowTableIntern("studyProcess", index));
  };

  const handleFieldChange = (tab, index, e, fieldName) => {
    dispatch(setFieldRowIntern(tab, index, fieldName, e.target.value));
  };

  const handleFieldSelectChange = (tab, index, fieldName, newValue) => {
    dispatch(setFieldRowIntern(tab, index, fieldName, newValue));
  };

  const openDialogForTextField = (index, fieldName) => {
    setActiveField(fieldName);
    setOpenDialogs({ ...openDialogs, [index]: true });
  };

  const closeDialog = (index) => {
    const newOpenDialogs = { ...openDialogs };
    delete newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const renderDialogContent = (index) => {
    const row = studyProcess[index];

    switch (activeField) {
      case "TenTruong":
        return (
          <TextField
            fullWidth
            label="Tên trường"
            margin="normal"
            variant="outlined"
            size="small"
            value={row.TenTruong}
            onChange={(e) => handleFieldChange(tab, index, e, "TenTruong")}
          />
        );
      case "DiaChi":
        return (
          <TextField
            fullWidth
            label="Địa chỉ"
            margin="normal"
            variant="outlined"
            size="small"
            value={row.DiaChi}
            onChange={(e) => handleFieldChange(tab, index, e, "DiaChi")}
          />
        );
      case "GhiChu":
        return (
          <TextField
            fullWidth
            label="Ghi chú"
            multiline
            margin="normal"
            variant="outlined"
            size="small"
            value={row.GhiChu}
            onChange={(e) => handleFieldChange(tab, index, e, "GhiChu")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Button variant="text" onClick={addRow}>
              <Add />
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stt</TableCell>
                    <TableCell align="center">Từ tháng / năm</TableCell>
                    <TableCell align="center">Đến tháng / năm</TableCell>
                    <TableCell align="center">Cấp học</TableCell>
                    <TableCell align="center">Tên trường</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Chuyên ngành</TableCell>
                    <TableCell align="center">Ghi chú</TableCell>
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studyProcess.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <DatePicker
                          format="MM/yyyy"
                          //   onChange={(value) => handleChangeDate(value, "fromMonthYear")}
                          //   value={fromMonthYear}
                          name="fromMonthYear"
                          sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                          slotProps={{
                            textField: {
                              size: "small",
                              variant: "outlined",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <DatePicker
                          format="MM/yyyy"
                          //   onChange={(value) => handleChangeDate(value, "toMonthYear")}
                          //   value={toMonthYear}
                          name="toMonthYear"
                          sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                          slotProps={{
                            textField: {
                              size: "small",
                              variant: "outlined",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(tab, index, "CapHoc", newValue)
                          }
                          value={row.CapHoc}
                          name="CapHoc"
                          sx={{ margin: "4px", marginTop: "12px" }}
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "Du học nghề", "Đại học", "Thạc sĩ"]}
                          renderInput={(params) => (
                            <TextField variant="outlined" {...params}/>
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.TenTruong}
                          onClick={() => openDialogForTextField(index, "TenTruong")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.DiaChi}
                          onClick={() => openDialogForTextField(index, "DiaChi")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(tab, index, "ChuyenNganh", newValue)
                          }
                          value={row.ChuyenNganh}
                          name="ChuyenNganh"
                          sx={{ margin: "4px", marginTop: "12px" }}
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "IT", "Cơ khí"]}
                          renderInput={(params) => (
                            <TextField variant="outlined" {...params}/>
                          )}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.DiaChi}
                          onClick={() => openDialogForTextField(index, "GhiChu")}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="text" onClick={() => deleteRow(index)}>
                          Xóa
                        </Button>
                      </TableCell>
                      <Dialog open={openDialogs[index]} onClose={() => closeDialog(index)}>
                        <Box sx={{ margin: "10px", width: "300px", height: "100px" }}>
                          {renderDialogContent(index)}
                        </Box>
                        <DialogActions>
                          <Button
                            onClick={() => closeDialog(index)}
                            variant="contained"
                            sx={{
                              backgroundColor: "#1C2536",
                            }}
                          >
                            Hủy bỏ
                          </Button>
                          <Button
                            onClick={() => closeDialog(index)}
                            variant="contained"
                            sx={{
                              backgroundColor: "#1C2536",
                            }}
                          >
                            Lưu
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
