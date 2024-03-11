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
  Tooltip,
  IconButton,
  DialogContent,
  DialogTitle,
  SvgIcon,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

const fieldDefinitions = {
  HoTen: "Họ và Tên",
  NamSinh: "Năm Sinh",
  QuanHe: "Quan hệ",
  NgheNghiep: "Nghề nghiệp",
  DiaChi: "Địa chỉ",
  DiDong: "Di động",
  SongChung: "Sống chung",
  ThuNhap: "Thu nhập",
};

export default function _INTERNTabFamilyRelationship() {
  const tab = "quanHeGiaDinh";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { quanHeGiaDinh } = intern;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const openDetailDialog = (index) => {
    setEditingIndex(index);
    setDetailDialogOpen(true);
  };

  const openDialog = (fieldName, index) => {
    setSelectedField(fieldName);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setEditingIndex(null);
    setIsDialogOpen(false);
    setDetailDialogOpen(false);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsDialogOpen(false);
    // Khôi phục giá trị trước khi chỉnh sửa
    if (editingIndex !== null && selectedField) {
        dispatch({
            type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
            payload: { tab, index: editingIndex, fieldName: selectedField, newValue: '' },
        });
    }
};

  const [newRow, setNewRow] = useState({
    HoTen: "",
    NamSinh: "",
    QuanHe: "Bố",
    NgheNghiep: "",
    DiaChi: "",
    DiDong: "",
    SongChung: "Không",
    ThuNhap: "",
  });

  const addRow = () => {
    dispatch({
      type: HANDLERS_INTERN.ADD_ROW_TABLE_INTERN,
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
  };

  const deleteRow = (index) => {
    dispatch({
      type: HANDLERS_INTERN.DELETE_ROW_TABLE_INTERN,
      payload: { tab, index },
    });
  };

  const handleFieldChange = (index, e, fieldName) => {
    const newValue = e.target.value;
    dispatch({
      type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
      payload: { tab, index, fieldName, newValue },
    });
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  sx={{
                    cursor: "pointer",
                  }}
                >
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
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quanHeGiaDinh.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {Object.keys(fieldDefinitions).map((fieldName) => (
                        <TableCell
                          align="left"
                          key={fieldName}
                          sx={{
                            padding: "0 4px",
                          }}
                        >
                          {fieldName === "QuanHe" || fieldName === "SongChung" ? (
                            <TextField
                              select
                              variant="outlined"
                              size="small"
                              SelectProps={{ native: true }}
                              value={row[fieldName]}
                              sx={{ width: "80px" }}
                              onChange={(e) => handleFieldChange(index, e, fieldName)}
                            >
                              {fieldName === "QuanHe" ? (
                                <>
                                  <option value="Bố">Bố</option>
                                  <option value="Mẹ">Mẹ</option>
                                  <option value="Anh">Anh</option>
                                  <option value="Em">Em</option>
                                  <option value="Chị">Chị</option>
                                </>
                              ) : (
                                <>
                                  <option value="Có">Có</option>
                                  <option value="Không">Không</option>
                                </>
                              )}
                            </TextField>
                          ) : (
                            <>
                              {fieldName === "NamSinh" ||
                              fieldName === "DiDong" ||
                              fieldName === "ThuNhap" ? (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={row[fieldName]}
                                  onChange={(e) => handleFieldChange(index, e, fieldName)}
                                />
                              ) : (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={row[fieldName]}
                                  onClick={() => openDialog(fieldName, index)}
                                />
                              )}
                            </>
                          )}
                        </TableCell>
                      ))}
                      <TableCell
                        align="right"
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Button variant="text" onClick={() => deleteRow(index)}>
                          Xóa
                        </Button>
                        <Button variant="text" onClick={() => openDetailDialog(index)}>
                          Nhập
                        </Button>
                      </TableCell>
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
            {/* Nhập theo field */}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
              <DialogContent
                sx={{
                  minWidth: "300px",
                }}
              >
                {selectedField && editingIndex !== null && (
                  <TextField
                    label={fieldDefinitions[selectedField]}
                    size="small"
                    variant="outlined"
                    value={quanHeGiaDinh[editingIndex][selectedField]}
                    onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
                    fullWidth
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={handleCancel}
                  variant="contained"
                  sx={{ background: "#1C2536" }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  autoFocus
                  onClick={closeDialog}
                  variant="contained"
                  sx={{ background: "#1C2536" }}
                >
                  Lưu
                </Button>
              </DialogActions>
            </Dialog>
            {/* Nhập full */}
            <Dialog open={detailDialogOpen} onClose={closeDialog}>
              <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
                Nhập chi tiết
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <SvgIcon fontSize="inherit">
                  <XCircleIcon />
                </SvgIcon>
              </IconButton>
              <DialogContent>
                {editingIndex !== null && (
                  <>
                    {Object.keys(fieldDefinitions).map((fieldName) => (
                      <>
                        {fieldName === "QuanHe" || fieldName === "SongChung" ? (
                          <TextField
                            select
                            fullWidth
                            label={fieldDefinitions[fieldName]}
                            variant="outlined"
                            size="small"
                            margin="normal"
                            SelectProps={{ native: true }}
                            value={quanHeGiaDinh[fieldName]}
                            onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                          >
                            {fieldName === "QuanHe" ? (
                              <>
                                <option value={1}>Bố</option>
                                <option value={2}>Mẹ</option>
                                <option value={3}>Anh</option>
                                <option value={4}>Em</option>
                                <option value={5}>Chị</option>
                              </>
                            ) : (
                              <>
                                <option value={1}>Có</option>
                                <option value={2}>Không</option>
                              </>
                            )}
                          </TextField>
                        ) : (
                          <TextField
                            key={fieldName}
                            label={fieldDefinitions[fieldName]}
                            variant="outlined"
                            value={quanHeGiaDinh[editingIndex][fieldName]}
                            onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                            fullWidth
                            margin="normal"
                            size="small"
                          />
                        )}
                      </>
                    ))}
                  </>
                )}
              </DialogContent>
              <DialogActions
                sx={{
                  backgroundColor: "#e3e6e6",
                }}
              >
                <Button
                  autoFocus
                  onClick={closeDialog}
                  variant="contained"
                  sx={{ background: "#1C2536" }}
                >
                  Lưu
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
