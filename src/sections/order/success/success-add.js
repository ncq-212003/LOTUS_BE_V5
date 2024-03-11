
import React, { useState, } from "react";
import Slide from "@mui/material/Slide";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Button,
} from "@mui/material";

const columns = [
    {
        field: 'stt',
        headerName: 'STT',
        width: 70
    },
    {
        field: 'maHoSo',
        headerName: 'Mã hồ sơ',
        width: 130
    },
    {
        field: 'ngayDangKy',
        headerName: 'Ngày đăng ký',
        width: 130
    },
    {
        field: 'hoTen',
        headerName: 'Họ và tên',
        width: 200,
    },
    {
        field: 'ngaySinh',
        headerName: 'Ngày sinh',
        width: 120,
    },
    {
        field: 'gioiTinh',
        headerName: 'Giới tính',
        width: 100,
    },
    {
        field: 'honNhan',
        headerName: 'Hôn nhân',
        width: 100,
    },
];

const rows = [
    { id: 1, stt: 1, maHoSo: 'HS001', ngayDangKy: '2023-10-27', hoTen: 'Nguyễn Văn A', ngaySinh: '1990-05-15', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 2, stt: 2, maHoSo: 'HS002', ngayDangKy: '2023-10-28', hoTen: 'Trần Thị B', ngaySinh: '1995-02-20', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 3, stt: 3, maHoSo: 'HS003', ngayDangKy: '2023-10-29', hoTen: 'Lê Văn C', ngaySinh: '1987-11-10', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 4, stt: 4, maHoSo: 'HS004', ngayDangKy: '2023-10-30', hoTen: 'Phạm Thị D', ngaySinh: '1998-09-05', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 5, stt: 5, maHoSo: 'HS005', ngayDangKy: '2023-10-31', hoTen: 'Vũ Văn E', ngaySinh: '2001-03-25', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 6, stt: 6, maHoSo: 'HS006', ngayDangKy: '2023-11-01', hoTen: 'Nguyễn Thị F', ngaySinh: '1996-07-14', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 7, stt: 7, maHoSo: 'HS007', ngayDangKy: '2023-11-02', hoTen: 'Trần Văn G', ngaySinh: '2000-01-30', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 8, stt: 8, maHoSo: 'HS008', ngayDangKy: '2023-11-03', hoTen: 'Lê Thị H', ngaySinh: '1993-04-19', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 9, stt: 9, maHoSo: 'HS009', ngayDangKy: '2023-11-04', hoTen: 'Phạm Văn I', ngaySinh: '1991-08-09', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 10, stt: 10, maHoSo: 'HS010', ngayDangKy: '2023-11-05', hoTen: 'Vũ Thị K', ngaySinh: '1997-12-28', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
];

export default function SuccessAdd() {

    return (
        <Stack spacing={3}
            sx={{ p: 2, marginTop: "64px" }}>
            <Box
                sx={{
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            >
                <Autocomplete
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    options={['Không lựa chọn']}
                    renderInput={(params) => <TextField {...params} label="Danh sách đơn hàng" variant="outlined"/>}
                />
                <Typography
                    sx={{
                        margin: '12px 0'
                    }}
                    variant="h6"
                >
                    Học viên
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        sx={{ margin: "12px 0px", width: '50%' }}
                        size="small"
                        label="Nhập nội dung tìm kiếm"
                        variant="outlined"
                    />
                    <Button
                        sx={{
                            margin: '8px',
                            backgroundColor: '#1C2536',
                            color: 'white'
                        }}
                        size='small'
                        variant="contained"
                    >Tìm kiếm</Button>
                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{
                        borderColor: 'rgb(224, 224, 224)',
                        '& .MuiDataGrid-row': {
                            border: '0.1px solid rgb(224, 224, 224) !important',
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        width: '100%',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1C2536',
                        }}
                    >
                        Thêm
                    </Button>
                </Box>
            </Box>
        </Stack>
    );
}