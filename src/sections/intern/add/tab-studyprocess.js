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
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import * as Yup from "yup";
import { actionSetTouchedRow } from "./tab-familyrelationship";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { useEffect } from "react";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";
import { listMajorApi } from "src/contexts/api/setting/api-major";

export function validateFieldRowStudyProcess(dispatch, tab, index, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    TuThangNam: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    DenThangNam: Yup.date()
      .typeError("Vui lòng nhập đúng định dạng")
      .test("is-greater", "Vui lòng chọn ngày lớn hơn ngày bắt đầu", function (value) {
        const TuThangNam = this.resolve(Yup.ref("TuThangNam"));
        return dayjs(value).isAfter(TuThangNam);
      }),
    CapHoc: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    TenTruong: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    DiaChi: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    ChuyenNganh: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    GhiChu: Yup.string(),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch({
        type: HANDLERS_INTERN.SET_ERRORS_ROW_INTERN,
        payload: { tab, index, fieldName, newValue },
      });
    })
    .catch((error) => {
      newValue = error.message;
      dispatch({
        type: HANDLERS_INTERN.SET_ERRORS_ROW_INTERN,
        payload: { tab, index, fieldName, newValue },
      });
    });
}

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
  const [majorOption, setMarjorOption] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);

  const [newRow, setNewRow] = useState({
    TuThangNam: dayjs(),
    DenThangNam: dayjs(),
    CapHoc: 1,
    TenTruong: "",
    DiaChi: "",
    ChuyenNganh: 3,
    GhiChu: "",
    touched: {},
    errors: {},
  });

  //listMajorOption
  useEffect(() => {
    const listData = async () => {
      const res = await listMajorApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.majorName,
          value: com.majorId,
        }));
        setMarjorOption(data);
      }
    };
    listData();
  }, []);

  //listEducationLevel
  useEffect(() => {
    const listEducationLevelOption = async () => {
      const res = await listEducationLevelApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const edutcationLevels = res.data.map((com) => ({
          label: com.name,
          value: com.educationLevelId,
        }));
        setEducationLevel(edutcationLevels);
      }
    };
    listEducationLevelOption();
  }, []);

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

  const deleteRow = (index) => {
    dispatch({
      type: HANDLERS_INTERN.DELETE_ROW_TABLE_INTERN,
      payload: { tab, index },
    });
  };

  const addRow = () => {
    dispatch({
      type: HANDLERS_INTERN.ADD_ROW_TABLE_INTERN,
      payload: { tab, newRow },
    });
    setNewRow({
      TuThangNam: dayjs(),
      DenThangNam: dayjs(),
      CapHoc: 1,
      TenTruong: "",
      DiaChi: "",
      ChuyenNganh: 3,
      GhiChu: "",
      touched: {},
      errors: {},
    });
  };

  const handleFieldChange = (index, e, fieldName) => {
    actionSetTouchedRow(dispatch, tab, index, fieldName);

    const fieldValue = e.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
        payload: { tab, index, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
        payload: { tab, index, fieldName, newValue },
      });
    }

    validateFieldRowStudyProcess(dispatch, tab, index, fieldName, newValue);
  };

  const handleChangeDate = (index, e, fieldName) => {
    actionSetTouchedRow(dispatch, tab, index, fieldName);

    // const format = dayjs(value).format("DD/MM/YYYY");
    const newValue = e.target.value;
    dispatch({
      type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
      payload: { tab, index, fieldName, newValue },
    });

    validateFieldRowStudyProcess(dispatch, tab, index, fieldName, newValue);
  };

  const handleBlur = (index, fieldName) => {
    actionSetTouchedRow(dispatch, tab, index, fieldName);
  };

  const handleBlurFieldChange = (index, e, fieldName) => {
    actionSetTouchedRow(dispatch, tab, index, fieldName);

    const fieldValue = e.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }

    dispatch({
      type: HANDLERS_INTERN.SET_FIELD_ROW_INTERN,
      payload: { tab, index, fieldName, newValue },
    });

    validateFieldRowStudyProcess(dispatch, tab, index, fieldName, newValue);
  };

  // useEffect(() => {
  //   // This useEffect sets the initial values for certain fields in each row
  //   quaTrinhHocTap.forEach((row, index) => {
  //     Object.keys(fieldDefinitions).forEach((fieldName) => {
  //       if (fieldName === "TenTruong" || fieldName === "DiaChi" || fieldName === "GhiChu") {
  //         console.log("fieldName: " + fieldName);
  //         console.log("row[fieldName]: " + row[fieldName]);
  //         document.querySelector(`[name='${fieldName}']`).value = row[fieldName];
  //       }
  //     });
  //   });

  //   // Additional useEffect for handling the selectedField in the dialog
  // }, [quaTrinhHocTap, selectedField, editingIndex]);

  // useEffect(() => {
  //   if (selectedField && editingIndex !== null) {
  //     document.querySelector(`[name='${selectedField}']`).value =
  //       quaTrinhHocTap[editingIndex][selectedField];
  //   }
  // }, [quaTrinhHocTap, selectedField, editingIndex]);

  useEffect(() => {
    // This useEffect sets the initial values for certain fields in each row
    quaTrinhHocTap.forEach(
      (row, index) => {
        Object.keys(fieldDefinitions).forEach((fieldName) => {
          if (fieldName === "TenTruong" || fieldName === "DiaChi" || fieldName === "GhiChu") {
            document.querySelector(`[name='${fieldName}']`).value = row[fieldName];
          }
        });
      },
      [quaTrinhHocTap]
    ); // Run this useEffect whenever quaTrinhHocTap changes

    // Additional useEffect for handling the selectedField in the dialog
    if (selectedField && editingIndex !== null) {
      console.log(document.getElementsByClassName(selectedField).value);
      document.getElementsByClassName(selectedField).value =
        quaTrinhHocTap[editingIndex][selectedField];
    }
  }, [quaTrinhHocTap, selectedField, editingIndex]);

  return (
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
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                            <DatePicker
                              onBlur={() => handleBlur(index, fieldName)}
                              format="MM/YYYY"
                              value={row[fieldName]}
                              onChange={(date) =>
                                handleChangeDate(index, { target: { value: date } }, fieldName)
                              }
                              slotProps={{
                                textField: {
                                  size: "small",
                                  variant: "outlined",
                                  error: !!(row.touched[fieldName] && row.errors[fieldName]),
                                  helperText: row.touched[fieldName] && row.errors[fieldName],
                                },
                              }}
                            />
                          </LocalizationProvider>
                        ) : (
                          <>
                            {fieldName === "CapHoc" || fieldName === "ChuyenNganh" ? (
                              <TextField
                                select
                                variant="outlined"
                                size="small"
                                SelectProps={{ native: true }}
                                value={row[fieldName]}
                                sx={{ width: "130px" }}
                                onChange={(e) => handleFieldChange(index, e, fieldName)}
                              >
                                {fieldName === "CapHoc" ? (
                                  <>
                                    {educationLevel.map((level) => (
                                      <option key={level} value={level.value}>
                                        {level.label}
                                      </option>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {majorOption.map((level) => (
                                      <option key={level} value={level.value}>
                                        {level.label}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </TextField>
                            ) : (
                              <TextField
                                error={!!(row.touched[fieldName] && row.errors[fieldName])}
                                helperText={row.touched[fieldName] && row.errors[fieldName]}
                                variant="outlined"
                                size="small"
                                name={fieldName}
                                // value={row[fieldName]}
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
                      className={selectedField}
                      // value={quaTrinhHocTap[editingIndex][selectedField]}
                      // onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
                      onBlur={(e) => handleBlurFieldChange(editingIndex, e, selectedField)}
                      fullWidth
                    />
                  ) : (
                    <TextField
                      label={fieldDefinitions[selectedField]}
                      size="small"
                      variant="outlined"
                      className={selectedField}
                      // value={quaTrinhHocTap[editingIndex][selectedField]}
                      // onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
                      onBlur={(e) => handleBlurFieldChange(editingIndex, e, selectedField)}
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
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              adapterLocale={"en-gb"}
                            >
                              <DatePicker
                                onBlur={() => handleBlur(editingIndex, fieldName)}
                                format="MM/YYYY"
                                value={quaTrinhHocTap[editingIndex][fieldName]}
                                onChange={(date) =>
                                  handleChangeDate(
                                    editingIndex,
                                    { target: { value: date } },
                                    fieldName
                                  )
                                }
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    variant: "outlined",
                                    error: !!(
                                      quaTrinhHocTap[editingIndex].touched[fieldName] &&
                                      quaTrinhHocTap[editingIndex].errors[fieldName]
                                    ),
                                    helperText:
                                      quaTrinhHocTap[editingIndex].touched[fieldName] &&
                                      quaTrinhHocTap[editingIndex].errors[fieldName],
                                  },
                                }}
                                label={fieldDefinitions[fieldName]}
                                sx={{
                                  width: "100%",
                                  margin: "16px 0 8px 0",
                                }}
                              />
                            </LocalizationProvider>
                          ) : (
                            <>
                              {fieldName === "CapHoc" || fieldName === "ChuyenNganh" ? (
                                <TextField
                                  select
                                  label={fieldDefinitions[fieldName]}
                                  variant="outlined"
                                  size="small"
                                  SelectProps={{ native: true }}
                                  value={quaTrinhHocTap[editingIndex][fieldName]}
                                  margin="normal"
                                  fullWidth
                                  onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
                                >
                                  {fieldName === "CapHoc" ? (
                                    <>
                                      {educationLevel.map((level) => (
                                        <option key={level} value={level.value}>
                                          {level.label}
                                        </option>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {majorOption.map((level) => (
                                        <option key={level} value={level.value}>
                                          {level.label}
                                        </option>
                                      ))}
                                    </>
                                  )}
                                </TextField>
                              ) : (
                                <TextField
                                  error={
                                    !!(
                                      quaTrinhHocTap[editingIndex].touched[fieldName] &&
                                      quaTrinhHocTap[editingIndex].errors[fieldName]
                                    )
                                  }
                                  helperText={
                                    quaTrinhHocTap[editingIndex].touched[fieldName] &&
                                    quaTrinhHocTap[editingIndex].errors[fieldName]
                                  }
                                  onBlur={() => handleBlur(editingIndex, fieldName)}
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
  );
}
