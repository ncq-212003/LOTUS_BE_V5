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
    IconButton,
    Tooltip,
    DialogActions,
    Dialog,
    DialogContent,
    DialogTitle,
    SvgIcon,
} from "@mui/material";
import {
    Add,
} from '@mui/icons-material';
import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import * as Yup from "yup";
import { actionSetTouchedRow } from "./tab-familyrelationship";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

export function validateFieldRowWorkexperienceDomestical(dispatch, tab, index, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        TuThangNam: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        DenThangNam: Yup.date()
            .typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Vui lòng chọn ngày lớn hơn ngày bắt đầu", function (value) {
                const TuThangNam = this.resolve(Yup.ref("TuThangNam"));
                return dayjs(value).isAfter(TuThangNam);
            }),
        CongViec: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        MucLuong: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        DiaChi: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        CongTy: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        GhiChu: Yup.string().max(4000),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_ROW_OVERSEAS_STUDENT,
                payload: { tab, index, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_ROW_OVERSEAS_STUDENT,
                payload: { tab, index, fieldName, newValue },
            });
        });
}

const fieldDefinitions = {
    TuThangNam: "Từ tháng / năm",
    DenThangNam: "Đến tháng / năm",
    CongViec: 'Công việc',
    MucLuong: 'Mức lương',
    CongTy: 'Công ty',
    DiaChi: 'Địa chỉ',
    GhiChu: 'Ghi chú',
};

export default function TabWorkExperienceDomestically() {
    const [newRow, setNewRow] = useState({
        TuThangNam: dayjs(),
        DenThangNam: dayjs(),
        CongViec: '',
        MucLuong: '',
        DiaChi: '',
        CongTy: '',
        GhiChu: '',
        touched: {},
        errors: {},
    });
    const tab = "kinhNghiemTrongNuoc";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { kinhNghiemTrongNuoc } = overseasStudent;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedField, setSelectedField] = useState('');
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    // format vnd
    const [formattedThuNhap, setFormattedThuNhap] = useState('');

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
                type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
                payload: { tab, index: editingIndex, fieldName: selectedField, newValue: '' },
            });
        }
    };

    const addRow = () => {
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.ADD_ROW_TABLE_OVERSEAS_STUDENT,
            payload: { tab, newRow },
        });
        setNewRow({
            TuThangNam: dayjs(),
            DenThangNam: dayjs(),
            CongViec: '',
            MucLuong: '',
            DiaChi: '',
            CongTy: '',
            GhiChu: '',
            touched: {},
            errors: {},
        });
    };

    const deleteRow = (index) => {
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.DELETE_ROW_TABLE_OVERSEAS_STUDENT,
            payload: { tab, index },
        });
    };

    const handleFieldChange = (e, fieldName, index) => {
        actionSetTouchedRow(dispatch, tab, index, fieldName);

        const fieldValue = e.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
                payload: { tab, index, fieldName, newValue },
            });

            // format tiền tệ
            if (fieldName === 'MucLuong') {
                newValue = formatCurrency(fieldValue);
                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
                    payload: { tab, index, fieldName, newValue },
                });
            }
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
                payload: { tab, index, fieldName, newValue },
            });
        }

        validateFieldRowWorkexperienceDomestical(dispatch, tab, index, fieldName, newValue);
    };

    const handleChangeDate = (index, e, fieldName) => {
        actionSetTouchedRow(dispatch, tab, index, fieldName);

        // const format = dayjs(value).format("DD/MM/YYYY");
        const newValue = e.target.value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
            payload: { tab, index, fieldName, newValue },
        });

        validateFieldRowWorkexperienceDomestical(dispatch, tab, index, fieldName, newValue);
    };

    const handleBlur = (index, fieldName) => {
        const value = true;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_ROW_OVERSEAS_STUDENT,
            payload: { tab, index, fieldName, value },
        });
    };

    const formatCurrency = (value) => {
        // Loại bỏ tất cả các ký tự không phải số
        const numericValue = value.replace(/[^0-9]/g, '');

        // Chuyển đổi thành số
        const parsedValue = parseFloat(numericValue);

        // Kiểm tra xem giá trị có phải là một số hợp lệ không
        if (isNaN(parsedValue)) {
            return '';
        }

        // Định dạng thành tiền tệ
        // return parsedValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return parsedValue.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={12}
                        xs={12}
                    >
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>Stt</TableCell>
                                        <TableCell align="center">Từ tháng / năm</TableCell>
                                        <TableCell align="center">Đến tháng / năm</TableCell>
                                        <TableCell align="center">Công việc</TableCell>
                                        <TableCell align="center">Mức lương (VND)</TableCell>
                                        <TableCell align="center">Công ty</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Ghi chú</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {kinhNghiemTrongNuoc.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {Object.keys(fieldDefinitions).map((fieldName) => (
                                                <TableCell align="left" key={fieldName}
                                                    sx={{
                                                        padding: '0 4px'
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
                                                            {fieldName === "MucLuong" ? (
                                                                <TextField
                                                                    error={!!(row.touched[fieldName] && row.errors[fieldName])}
                                                                    helperText={row.touched[fieldName] && row.errors[fieldName]}
                                                                    onBlur={() => handleBlur(index, fieldName)}
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={row[fieldName]}
                                                                    onChange={(e) => handleFieldChange(e, fieldName, index)}
                                                                />
                                                            ) : (
                                                                <TextField
                                                                    error={!!(row.touched[fieldName] && row.errors[fieldName])}
                                                                    helperText={row.touched[fieldName] && row.errors[fieldName]}
                                                                    onBlur={() => handleBlur(index, fieldName)}
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
                                                    display: 'flex',
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
                            <IconButton
                                onClick={addRow} >
                                <Add />
                            </IconButton>
                        </Tooltip>
                        {/* Nhập theo field */}
                        <Dialog open={isDialogOpen} onClose={closeDialog}>
                            <DialogContent
                                sx={{
                                    minWidth: '300px'
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
                                                value={kinhNghiemTrongNuoc[editingIndex][selectedField]}
                                                onChange={(e) => handleFieldChange(e, selectedField, editingIndex)}
                                                fullWidth
                                            />
                                        ) : (
                                            <TextField
                                                label={fieldDefinitions[selectedField]}
                                                variant="outlined"
                                                value={kinhNghiemTrongNuoc[editingIndex][selectedField]}
                                                onChange={(e) => handleFieldChange(e, selectedField, editingIndex)}
                                                fullWidth
                                            />
                                        )}
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus
                                    onClick={handleCancel}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button autoFocus
                                    onClick={closeDialog}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* Nhập full */}
                        <Dialog open={detailDialogOpen} onClose={closeDialog}>
                            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                                Nhập chi tiết
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
                                                        value={kinhNghiemTrongNuoc[editingIndex][fieldName]}
                                                        onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
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
                                                                    value={kinhNghiemTrongNuoc[editingIndex][fieldName]}
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
                                                                                kinhNghiemTrongNuoc[editingIndex].touched[fieldName] &&
                                                                                kinhNghiemTrongNuoc[editingIndex].errors[fieldName]
                                                                            ),
                                                                            helperText:
                                                                                kinhNghiemTrongNuoc[editingIndex].touched[fieldName] &&
                                                                                kinhNghiemTrongNuoc[editingIndex].errors[fieldName],
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
                                                            <TextField
                                                                error={
                                                                    !!(
                                                                        kinhNghiemTrongNuoc[editingIndex].touched[fieldName] &&
                                                                        kinhNghiemTrongNuoc[editingIndex].errors[fieldName]
                                                                    )
                                                                }
                                                                helperText={
                                                                    kinhNghiemTrongNuoc[editingIndex].touched[fieldName] &&
                                                                    kinhNghiemTrongNuoc[editingIndex].errors[fieldName]
                                                                }
                                                                onBlur={() => handleBlur(editingIndex, fieldName)}
                                                                key={fieldName}
                                                                label={fieldName === "MucLuong" ? "Mức lương (VND)" : fieldDefinitions[fieldName]}
                                                                variant="outlined"
                                                                value={kinhNghiemTrongNuoc[editingIndex][fieldName]}
                                                                onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
                                                                fullWidth
                                                                margin="normal"
                                                                size="small"
                                                            />
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
                                    backgroundColor: '#e3e6e6'
                                }}
                            >
                                <Button autoFocus
                                    onClick={closeDialog}
                                    variant="contained"
                                    sx={{ background: '#1C2536' }}
                                >
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};