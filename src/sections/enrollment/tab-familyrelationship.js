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

const fieldDefinitions = {
    HoTen: "Họ và Tên",
    NamSinh: "Năm Sinh",
    QuanHe: 'Quan hệ',
    NgheNghiep: 'Nghề nghiệp',
    DiaChi: 'Địa chỉ',
    DiDong: 'Di động',
    SongChung: 'Sống chung',
    ThuNhap: 'Thu nhập',
};

export default function TabFamilyRelationship() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({
        Stt: '',
        HoTen: '',
        NamSinh: '',
        QuanHe: 1,
        NgheNghiep: '',
        DiaChi: '',
        DiDong: '',
        SongChung: 1,
        ThuNhap: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedField, setSelectedField] = useState('');
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

    const addRow = () => {
        setRows([...rows, newRow]);
        setNewRow({
            Stt: '',
            HoTen: '',
            NamSinh: '',
            QuanHe: '',
            NgheNghiep: '',
            DiaChi: '',
            DiDong: '',
            SongChung: '',
            ThuNhap: '',
        });
    };

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleFieldChange = (e, fieldName, index) => {
        const updatedRows = [...rows];
        updatedRows[index][fieldName] = e.target.value;
        setRows(updatedRows);
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
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {Object.keys(fieldDefinitions).map((fieldName) => (
                                                <TableCell align="left" key={fieldName}
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
                                                        <>
                                                            {fieldName === "NamSinh" || fieldName === "DiDong" || fieldName === "ThuNhap" ? (
                                                                <TextField
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={row[fieldName]}
                                                                    onChange={(e) => handleFieldChange(e, fieldName, index)}
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
                                    <TextField
                                        label={fieldDefinitions[selectedField]}
                                        variant="outlined"
                                        value={rows[editingIndex][selectedField]}
                                        onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[editingIndex][selectedField] = e.target.value;
                                            setRows(updatedRows);
                                        }}
                                        fullWidth
                                    />
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus
                                    onClick={closeDialog}
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
                                                {fieldName === "QuanHe" || fieldName === "SongChung" ? (
                                                    <TextField
                                                        select
                                                        fullWidth
                                                        label={fieldDefinitions[fieldName]}
                                                        variant="outlined"
                                                        size="small"
                                                        margin="normal"
                                                        SelectProps={{ native: true }}
                                                        value={rows[fieldName]}
                                                        onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
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
                                                        value={rows[editingIndex][fieldName]}
                                                        onChange={(e) => handleFieldChange(e, fieldName, editingIndex)}
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