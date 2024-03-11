import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip, styled } from '@mui/material';
import { Autorenew, Delete, Edit, Visibility } from '@mui/icons-material';
import ActionColumn from 'src/components/action-column ';
import OverseasStudentDetail from '../detail/overseas-student-detail';
import EnrollmentAdd from './enrollment-add';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#4b9949',
    borderRadius: '1px',
    '&:hover': {
        backgroundColor: '#4b9949',
        borderColor: '#4b9949',
        boxShadow: 'none',
    },
    '&:focus': {
        boxShadow: 'none',
        backgroundColor: '#1C2536',
    },
});

const rows = [
    { id: 1, stt: 1, maHoSo: 'HS001', ngayDangKy: '27/10/2023', hoTen: 'Nguyễn Văn A', ngaySinh: '1990-05-15', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 2, stt: 2, maHoSo: 'HS002', ngayDangKy: '28/10/2023', hoTen: 'Trần Thị B', ngaySinh: '1995-02-20', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 3, stt: 3, maHoSo: 'HS003', ngayDangKy: '29/10/2023', hoTen: 'Lê Văn C', ngaySinh: '1987-11-10', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 4, stt: 4, maHoSo: 'HS004', ngayDangKy: '30/10/2023', hoTen: 'Phạm Thị D', ngaySinh: '1998-09-05', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 5, stt: 5, maHoSo: 'HS005', ngayDangKy: '31/10/2023', hoTen: 'Vũ Văn E', ngaySinh: '2001-03-25', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 6, stt: 6, maHoSo: 'HS006', ngayDangKy: '01/11/2023', hoTen: 'Nguyễn Thị F', ngaySinh: '1996-07-14', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 7, stt: 7, maHoSo: 'HS007', ngayDangKy: '02/11/2023', hoTen: 'Trần Văn G', ngaySinh: '2000-01-30', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 8, stt: 8, maHoSo: 'HS008', ngayDangKy: '03/11/2023', hoTen: 'Lê Thị H', ngaySinh: '1993-04-19', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
    { id: 9, stt: 9, maHoSo: 'HS009', ngayDangKy: '04/11/2023', hoTen: 'Phạm Văn I', ngaySinh: '1991-08-09', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
    { id: 10, stt: 10, maHoSo: 'HS010', ngayDangKy: '05/11/2023', hoTen: 'Vũ Thị K', ngaySinh: '1997-12-28', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
];

export default function EnrollmentTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogAddOpen, setisDialogAddOpen] = React.useState(false);
    const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);

    const openDialogAdd = (params) => {
        setSelectedRow(params.row);
        setisDialogAddOpen(true);
    };

    const closeDialogAdd = () => {
        setisDialogAddOpen(false);
    };

    const openDialogDetail = (params) => {
        setSelectedRow(params.row);
        setisDialogDetailOpen(true);
    };

    const closeDialogDetail = () => {
        setisDialogDetailOpen(false);
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'ngayDangKy', headerName: 'Ngày đăng ký', width: 130 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 200 },
        { field: 'ngaySinh', headerName: 'Ngày sinh', width: 120 },
        { field: 'gioiTinh', headerName: 'Giới tính', width: 100 },
        { field: 'honNhan', headerName: 'Hôn nhân', width: 100 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <Tooltip title="Chi tiết">
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialogDetail(params);
                            }}
                        >
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogAdd={openDialogAdd}
                        params={params}
                        buttonType="delete"
                    />
                    <Tooltip title="Chuẩn hóa thông tin">
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialogAdd(params);
                            }}
                        >
                            <Autorenew />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        dienThoaiLopTruong: false,
        tienDo: false,
        gioHoc: false,
        loaiPhongHoc: false,
        phongHoc: false,
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
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
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <OverseasStudentDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                id={selectedRow ? selectedRow.id : ""}
            />
            <EnrollmentAdd
                open={isDialogAddOpen}
                onClose={closeDialogAdd}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
