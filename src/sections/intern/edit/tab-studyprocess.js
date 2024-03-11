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
import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { DatePicker } from "@mui/x-date-pickers";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

const fieldDefinitions = {
  TuThangNam: "Từ tháng / năm",
  DenThangNam: "Đến tháng / năm",
  CapHoc: "Cấp học",
  TenTruong: "Tên trường",
  DiaChi: "Địa chỉ",
  ChuyenNganh: "Chuyên ngành",
  GhiChu: "Ghi chú",
};

export default function TabStudyProcess() {
  const tab = "quaTrinhHocTap";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { quaTrinhHocTap } = intern;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const [newRow, setNewRow] = useState({
    TuThangNam: new Date(),
    DenThangNam: new Date(),
    CapHoc: "Cao đẳng",
    TenTruong: "",
    DiaChi: "",
    ChuyenNganh: "Không",
    GhiChu: "",
  });

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
        payload: { tab, index: editingIndex, fieldName: selectedField, newValue: "" },
      });
    }
  };

  const addRow = () => {
    dispatch({
      type: HANDLERS_INTERN.ADD_ROW_TABLE_INTERN,
      payload: { tab, newRow },
    });
    setNewRow({
      TuThangNam: new Date(),
      DenThangNam: new Date(),
      CapHoc: "",
      TenTruong: "",
      DiaChi: "",
      ChuyenNganh: "",
      GhiChu: "",
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
        <Grid container spacing={2}>
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
                    <TableCell align="center">Từ tháng / năm</TableCell>
                    <TableCell align="center">Đến tháng / năm</TableCell>
                    <TableCell align="center">Cấp học</TableCell>
                    <TableCell align="center">Tên trường</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Chuyên ngành</TableCell>
                    <TableCell align="center">Ghi chú</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quaTrinhHocTap.map((row, index) => (
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
                          {fieldName === "TuThangNam" || fieldName === "DenThangNam" ? (
                            <DatePicker
                              format="MM/yyyy"
                              value={row[fieldName]}
                              onChange={(date) =>
                                handleFieldChange(
                                  editingIndex,
                                  { target: { value: date } },
                                  fieldName
                                )
                              }
                              slotProps={{
                                textField: {
                                  size: "small",
                                  variant: "outlined",
                                },
                              }}
                            />
                          ) : (
                            <>
                              {fieldName === "CapHoc" || fieldName === "ChuyenNganh" ? (
                                <TextField
                                  select
                                  variant="outlined"
                                  size="small"
                                  SelectProps={{ native: true }}
                                  value={row[fieldName]}
                                  sx={{ width: "80px" }}
                                  onChange={(e) => handleFieldChange(index, e, fieldName)}
                                >
                                  {fieldName === "CapHoc" ? (
                                    <>
                                      <option value="Cao đẳng">Cao đẳng</option>
                                      <option value="Trung cấp nghề">Trung cấp nghề</option>
                                      <option value="THCS">THCS</option>
                                      <option value="THPT">THPT</option>
                                      <option value="Đại học">Đại học</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="Không lựa chọn">Không lựa chọn</option>
                                      <option value="IT">IT</option>
                                      <option value="Cơ điện">Cơ điện</option>
                                      <option value="May mặc">May mặc</option>
                                    </>
                                  )}
                                </TextField>
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
                  <>
                    {selectedField === "GhiChu" ? (
                      <TextField
                        multiline
                        rows={2}
                        label={fieldDefinitions[selectedField]}
                        variant="outlined"
                        value={quaTrinhHocTap[editingIndex][selectedField]}
                        onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
                        fullWidth
                      />
                    ) : (
                      <TextField
                        label={fieldDefinitions[selectedField]}
                        size="small"
                        variant="outlined"
                        value={quaTrinhHocTap[editingIndex][selectedField]}
                        onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
                        fullWidth
                      />
                    )}
                  </>
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
                        {fieldName === "GhiChu" ? (
                          <TextField
                            multiline
                            rows={2}
                            key={fieldName}
                            label={fieldDefinitions[fieldName]}
                            variant="outlined"
                            value={quaTrinhHocTap[editingIndex][fieldName]}
                            onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                            fullWidth
                            margin="normal"
                            size="small"
                          />
                        ) : (
                          <>
                            {fieldName === "TuThangNam" || fieldName === "DenThangNam" ? (
                              <DatePicker
                                format="MM/yyyy"
                                value={quaTrinhHocTap[editingIndex][fieldName]}
                                onChange={(date) =>
                                  handleFieldChange(
                                    editingIndex,
                                    { target: { value: date } },
                                    fieldName
                                  )
                                }
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    variant: "outlined",
                                  },
                                }}
                                label={fieldDefinitions[fieldName]}
                                sx={{
                                  width: "100%",
                                  margin: "16px 0 8px 0",
                                }}
                              />
                            ) : (
                              <>
                                {fieldName === "CapHoc" || fieldName === "ChuyenNganh" ? (
                                  <TextField
                                    select
                                    label={fieldDefinitions[fieldName]}
                                    variant="outlined"
                                    size="small"
                                    SelectProps={{ native: true }}
                                    value={quaTrinhHocTap[fieldName]}
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                                  >
                                    {fieldName === "CapHoc" ? (
                                      <>
                                        <option value="Cao đẳng">Cao đẳng</option>
                                        <option value="Trung cấp nghề">Trung cấp nghề</option>
                                        <option value="THCS">THCS</option>
                                        <option value="THPT">THPT</option>
                                        <option value="Đại học">Đại học</option>
                                      </>
                                    ) : (
                                      <>
                                        <option value="Không lựa chọn">Không lựa chọn</option>
                                        <option value="IT">IT</option>
                                        <option value="Cơ điện">Cơ điện</option>
                                        <option value="May mặc">May mặc</option>
                                      </>
                                    )}
                                  </TextField>
                                ) : (
                                  <TextField
                                    key={fieldName}
                                    label={fieldDefinitions[fieldName]}
                                    variant="outlined"
                                    value={quaTrinhHocTap[editingIndex][fieldName]}
                                    onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                  />
                                )}
                              </>
                            )}
                          </>
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
