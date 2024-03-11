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
  Tooltip,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import { useApp } from "src/hooks/use-app";
import {
  HANDLERS_BEFORE_INTERN
} from "src/contexts/reducer/intern/reducer-intern";

export default function TabFamilyRelationship() {
  const tab = "familyRelationShip";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { familyRelationShip } = intern;
  const [openDialogs, setOpenDialogs] = useState({});
  const [activeField, setActiveField] = useState(null);

  const [newRow, setNewRow] = useState({
    HoTen: "",
    NamSinh: "",
    QuanHe: "Không lựa chọn",
    NgheNghiep: "",
    DiaChi: "",
    DiDong: "",
    SongChung: "Không lựa chọn",
    ThuNhap: "",
  });

  const addRow = () => {
    dispatch({
      type: HANDLERS_BEFORE_INTERN.ADD_ROW_TABLE,
      payload: { tab, newRow },
    });
    setNewRow({
      HoTen: "",
      NamSinh: "",
      QuanHe: "",
      NgheNghiep: "",
      DiaChi: "",
      DiDong: "",
      SongChung: "",
      ThuNhap: "",
    });
    setActiveField(null);
    setOpenDialogs(false);
  };

  const deleteRow = (index) => {
    dispatch({
      type: HANDLERS_BEFORE_INTERN.DELETE_ROW_TABLE,
      payload: { tab, index},
    });
  };

  const handleFieldChange = (tab, index, e, fieldName) => {
    const newValue = e.target.value;
    dispatch({
      type: HANDLERS_BEFORE_INTERN.SET_FIELD_ROW,
      payload: { tab, index, fieldName, newValue },
    });
  };

  const handleFieldSelectChange = (tab, index, fieldName, newValue) => {
    dispatch({
      type: HANDLERS_BEFORE_INTERN.SET_FIELD_ROW,
      payload: { tab, index, fieldName, newValue },
    });
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
    const row = familyRelationShip[index];

    switch (activeField) {
      case "HoTen":
        return (
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Họ và tên"
            margin="normal"
            value={row.HoTen}
            onChange={(e) => handleFieldChange(tab, index, e, "HoTen")}
          />
        );
      case "NgheNghiep":
        return (
          <TextField
            fullWidth
            label="Nghề nghiệp"
            margin="normal"
            variant="outlined"
            size="small"
            value={row.NgheNghiep}
            onChange={(e) => handleFieldChange(tab, index, e, "NgheNghiep")}
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
      default:
        return null;
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stt</TableCell>
                    <TableCell align="center">Họ & Tên</TableCell>
                    <TableCell align="center">Năm sinh</TableCell>
                    <TableCell align="center">Quan hệ</TableCell>
                    <TableCell align="center">Nghề nghiệp</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Di động </TableCell>
                    <TableCell align="center">Sống chung</TableCell>
                    <TableCell align="center">Thu nhập</TableCell>
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {familyRelationShip.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.HoTen}
                          onClick={() => openDialogForTextField(index, "HoTen")}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.NamSinh}
                          onChange={(e) => handleFieldChange(tab, index, e, "NamSinh")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(tab, index, "QuanHe", newValue)
                          }
                          value={row.QuanHe}
                          name="QuanHe"
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "Bố", "Mẹ", "Anh", "Chị", "Em"]}
                          renderInput={(params) => <TextField variant="outlined" {...params} />}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.NgheNghiep}
                          onClick={() => openDialogForTextField(index, "NgheNghiep")}
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
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.DiDong}
                          onChange={(e) => handleFieldChange(tab, index, e, "DiDong")}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Autocomplete
                          onChange={(e, newValue) =>
                            handleFieldSelectChange(tab, index, "SongChung", newValue)
                          }
                          value={row.SongChung}
                          name="SongChung"
                          fullWidth
                          size="small"
                          options={["Không lựa chọn", "Có", "Không"]}
                          renderInput={(params) => <TextField variant="outlined" {...params} />}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.ThuNhap}
                          onChange={(e) => handleFieldChange(tab, index, e, "ThuNhap")}
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
            <Tooltip title="Thêm">
              <IconButton onClick={addRow}>
                <Add />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
