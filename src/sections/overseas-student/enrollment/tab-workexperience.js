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
} from "@mui/material";
import {
    Add,
} from '@mui/icons-material';
import React, { useState } from "react";

export default function TabWorkExperience() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({
        Stt: '',
        TuThangNam: '',
        DenThangNam: '',
        CongViec: '',
        MucLuong: '',
        DiaChi: '',
        CongTy: '',
        GhiChu: '',
    });

    const addRow = () => {
        setRows([...rows, newRow]);
        setNewRow({
            Stt: '',
            TuThangNam: '',
            DenThangNam: '',
            CongViec: '',
            MucLuong: '',
            DiaChi: '',
            CongTy: '',
            GhiChu: '',
        });
    };

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleFieldChange = (e, fieldName) => {
        const updatedNewRow = { ...newRow };
        updatedNewRow[fieldName] = e.target.value;
        setNewRow(updatedNewRow);
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
                                        <TableCell align="center">Công việc</TableCell>
                                        <TableCell align="center">Mức lương</TableCell>
                                        <TableCell align="center">Công ty</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Ghi chú</TableCell>
                                        <TableCell align="center">Xóa</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.TuThangNam}
                                                    onChange={(e) => handleFieldChange(e, "TuThangNam")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.DenThangNam}
                                                    onChange={(e) => handleFieldChange(e, "DenThangNam")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.CongViec}
                                                    onChange={(e) => handleFieldChange(e, "CongViec")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.MucLuong}
                                                    onChange={(e) => handleFieldChange(e, "MucLuong")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.CongTy}
                                                    onChange={(e) => handleFieldChange(e, "CongTy")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.DiaChi}
                                                    onChange={(e) => handleFieldChange(e, "DiaChi")}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    size="small"
                                                    value={row.GhiChu}
                                                    onChange={(e) => handleFieldChange(e, "GhiChu")}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="text" onClick={() => deleteRow(index)}>
                                                    Xóa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};