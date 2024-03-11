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
    Typography,
} from "@mui/material";
import {
    Add,
} from '@mui/icons-material';
import React, { useState } from "react";

export default function TabWorkExperienceInternationally() {
    const [rows, setRows] = useState([
        {
            TuThangNam: '01/2018',
            DenThangNam: '12/2020',
            CongViec: 'Lập trình viên',
            MucLuong: '20,000,000 VND',
            CongTy: 'Công ty ABC',
            DiaChi: 'Tokyo, Nhật Bản',
            GhiChu: 'Khách hàng rất vui',
        },
        {
            TuThangNam: '06/2015',
            DenThangNam: '12/2017',
            CongViec: 'Chuyên viên marketing',
            MucLuong: '15,000,000 VND',
            CongTy: 'Công ty XYZ',
            DiaChi: 'New York, Hoa Kỳ',
            GhiChu: 'Khách hàng rất vui',
        },
    ]);

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
                                        <TableCell align="center">Mức lương</TableCell>
                                        <TableCell align="center">Công ty</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Ghi chú</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.TuThangNam}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.DenThangNam}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.CongViec}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.MucLuong}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.CongTy}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.DiaChi}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>{row.GhiChu}</Typography>
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