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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    Dialog,
    DialogContent,
    DialogActions,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

export function actionSetTouchedRow(dispatch, tab, index, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_ROW_OVERSEAS_STUDENT,
        payload: { tab, index, fieldName, value },
    });
}

export function validateFieldRowFamilyRelationShip(dispatch, tab, index, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        HoTen: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        // NamSinh: Yup.string().max(4000)
        //     .required("Vui lòng nhập thông tin vào trường này")
        //     .matches(/^\d{4}$/, "Vui lòng nhập năm sinh đúng định dạng (4 chữ số)"),
        NamSinh: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        QuanHe: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        NgheNghiep: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        DiaChi: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        DiDong: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại").max(15, "Số điện thoại tối đa là 15 số"),
        SongChung: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ThuNhap: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này"),
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
    HoTen: "Họ và Tên",
    NamSinh: "Ngày Sinh",
    QuanHe: 'Quan hệ',
    NgheNghiep: 'Nghề nghiệp',
    DiaChi: 'Địa chỉ',
    DiDong: 'Di động',
    SongChung: 'Sống chung',
    ThuNhap: 'Thu nhập',
};

export default function TabFamilyRelationship() {
    const [newRow, setNewRow] = useState({
        HoTen: '',
        NamSinh: '',
        QuanHe: "Bố",
        NgheNghiep: '',
        DiaChi: '',
        DiDong: '',
        SongChung: "Có",
        ThuNhap: '',
        touched: {},
        errors: {},
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedField, setSelectedField] = useState('');
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    // context
    const tab = "quanHeGiaDinh";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { quanHeGiaDinh } = overseasStudent;

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
            HoTen: '',
            NamSinh: '',
            QuanHe: "Bố",
            NgheNghiep: '',
            DiaChi: '',
            DiDong: '',
            SongChung: "Có",
            ThuNhap: '',
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

            // Định dạng giá trị tiền tệ khi nhập liệu vào trường "ThuNhap"
            if (fieldName === "ThuNhap") {
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

        validateFieldRowFamilyRelationShip(dispatch, tab, index, fieldName, newValue);
    };

    const handleChangeDate = (index, e, fieldName) => {
        actionSetTouchedRow(dispatch, tab, index, fieldName);

        // const format = dayjs(value).format("DD/MM/YYYY");
        const newValue = e.target.value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT,
            payload: { tab, index, fieldName, newValue },
        });

        validateFieldRowFamilyRelationShip(dispatch, tab, index, fieldName, newValue);
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
                        <TableContainer
                            component={Paper}>
                            <Table>
                                <TableHead
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>Stt</TableCell>
                                        <TableCell align="center">Họ & Tên</TableCell>
                                        <TableCell align="center">Ngày sinh</TableCell>
                                        <TableCell align="center">Quan hệ</TableCell>
                                        <TableCell align="center">Nghề nghiệp</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Di động </TableCell>
                                        <TableCell align="center">Sống chung</TableCell>
                                        <TableCell align="center">Thu nhập (VND)</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quanHeGiaDinh.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {Object.keys(fieldDefinitions).map((fieldName) => (
                                                <TableCell align="left"
                                                    key={fieldName}
                                                    sx={{
                                                        padding: '0 4px'
                                                    }}
                                                >
                                                    {fieldName === "QuanHe" || fieldName === "SongChung" ? (
                                                        <TextField
                                                            select
                                                            variant="outlined"
                                                            size="small"
                                                            SelectProps={{ native: true }}
                                                            value={row[fieldName]}
                                                            sx={{ width: '80px' }}
                                                            onChange={(e) => handleFieldChange(e, fieldName, index)}
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
                                                            {fieldName === "NamSinh" ? (
                                                                <>
                                                                    <LocalizationProvider
                                                                        dateAdapter={AdapterDayjs}
                                                                        adapterLocale={"en-gb"}
                                                                    >
                                                                        <DatePicker
                                                                            onBlur={() => handleBlur(index, fieldName)}
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
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {fieldName === "DiDong" || fieldName === "ThuNhap" ? (
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
                                                <Button variant="text"
                                                    onClick={() => deleteRow(index)}>
                                                    Xóa
                                                </Button>
                                                <Button variant="text"
                                                    onClick={() => openDetailDialog(index)}>
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
                        <Dialog open={isDialogOpen}
                            onClose={closeDialog}>
                            <DialogContent
                                sx={{
                                    minWidth: '300px'
                                }}
                            >
                                {selectedField && editingIndex !== null && (
                                    <TextField
                                        label={fieldDefinitions[selectedField]}
                                        variant="outlined"
                                        value={quanHeGiaDinh[editingIndex][selectedField]}
                                        onChange={(e) => handleFieldChange(e, selectedField, editingIndex)}
                                        fullWidth
                                    />
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
                        <Dialog open={detailDialogOpen}
                            onClose={closeDialog}>
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
                                                        onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
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
                                                        {fieldName === "NamSinh" ? (
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                                adapterLocale={"en-gb"}
                                                            >
                                                                <DatePicker
                                                                    onBlur={() => handleBlur(editingIndex, fieldName)}
                                                                    value={quanHeGiaDinh[editingIndex][fieldName]}
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
                                                                                quanHeGiaDinh[editingIndex].touched[fieldName] &&
                                                                                quanHeGiaDinh[editingIndex].errors[fieldName]
                                                                            ),
                                                                            helperText:
                                                                                quanHeGiaDinh[editingIndex].touched[fieldName] &&
                                                                                quanHeGiaDinh[editingIndex].errors[fieldName],
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
                                                                        quanHeGiaDinh[editingIndex].touched[fieldName] &&
                                                                        quanHeGiaDinh[editingIndex].errors[fieldName]
                                                                    )
                                                                }
                                                                helperText={
                                                                    quanHeGiaDinh[editingIndex].touched[fieldName] &&
                                                                    quanHeGiaDinh[editingIndex].errors[fieldName]
                                                                }
                                                                onBlur={() => handleBlur(editingIndex, fieldName)}
                                                                key={fieldName}
                                                                label={fieldName === "ThuNhap" ? "Thu nhập (VND)" : fieldDefinitions[fieldName]}
                                                                variant="outlined"
                                                                value={quanHeGiaDinh[editingIndex][fieldName]}
                                                                // value={quanHeGiaDinh[editingIndex][fieldName]}
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