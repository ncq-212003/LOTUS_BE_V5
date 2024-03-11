import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip, styled } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import styles from '../../../style/index.module.scss';

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
    { id: 1, stt: 1, maHocvien: 'HS001', ngayDangKy: '27/10/2023', hoTen: 'Nguyễn Văn A', ngaySinh: '1990-05-15', gioiTinh: 'Nam',loaiHocvien:'TTS', honNhan: 'Đã kết hôn', trangThai: 'Đang thi tuyển' },
    { id: 2, stt: 2, maHocvien: 'HS002', ngayDangKy: '28/10/2023', hoTen: 'Trần Thị B', ngaySinh: '1995-02-20', gioiTinh: 'Nữ',loaiHocvien:'DHS', honNhan: 'Độc thân', trangThai: 'Chưa trúng tuyển' },
    { id: 3, stt: 3, maHocvien: 'HS003', ngayDangKy: '29/10/2023', hoTen: 'Lê Văn C', ngaySinh: '1987-11-10', gioiTinh: 'Nam',loaiHocvien:'DHS', honNhan: 'Đã kết hôn', trangThai: 'Đã trúng tuyển' },
    { id: 4, stt: 4, maHocvien: 'HS004', ngayDangKy: '30/10/2023', hoTen: 'Phạm Thị D', ngaySinh: '1998-09-05', gioiTinh: 'Nữ',loaiHocvien:'TTS', honNhan: 'Độc thân', trangThai: 'Đã nhập học' },
    { id: 5, stt: 5, maHocvien: 'HS005', ngayDangKy: '31/10/2023', hoTen: 'Vũ Văn E', ngaySinh: '2001-03-25', gioiTinh: 'Nam',loaiHocvien:'DHS', honNhan: 'Đã kết hôn', trangThai: 'Đang thi tuyển' },
    { id: 6, stt: 6, maHocvien: 'HS006', ngayDangKy: '01/11/2023', hoTen: 'Nguyễn Thị F', ngaySinh: '1996-07-14', gioiTinh: 'Nữ',loaiHocvien:'TTS', honNhan: 'Độc thân', trangThai: 'Đã trúng tuyển' },
    { id: 7, stt: 7, maHocvien: 'HS007', ngayDangKy: '02/11/2023', hoTen: 'Trần Văn G', ngaySinh: '2000-01-30', gioiTinh: 'Nam',loaiHocvien:'TTS', honNhan: 'Đã kết hôn', trangThai: 'Đã trúng tuyển' },
    { id: 8, stt: 8, maHocvien: 'HS008', ngayDangKy: '03/11/2023', hoTen: 'Lê Thị H', ngaySinh: '1993-04-19', gioiTinh: 'Nữ',loaiHocvien:'DGS', honNhan: 'Độc thân', trangThai: 'Đã nhập học' },
    { id: 9, stt: 9, maHocvien: 'HS009', ngayDangKy: '04/11/2023', hoTen: 'Phạm Văn I', ngaySinh: '1991-08-09', gioiTinh: 'Nam',loaiHocvien:'DHS', honNhan: 'Đã kết hôn', trangThai: 'Đã nhập học' },
    { id: 10, stt: 10, maHocvien: 'HS010', ngayDangKy: '05/11/2023', hoTen: 'Vũ Thị K', ngaySinh: '1997-12-28', gioiTinh: 'Nữ',loaiHocvien:'TTS', honNhan: 'Độc thân', trangThai: 'Chưa trúng tuyển' },
];

export default function ListStudentTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);
    const [activeFilter, setActiveFilter] = React.useState('Tất cả');

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
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

    const handleFilter = (filterType) => {
        let filteredData = rows;

        // Cập nhật trạng thái activeFilter khi người dùng chọn nút
        setActiveFilter(filterType);

        switch (filterType) {
            case 'Tất cả':
                filteredData = rows;
                break;
            case 'Đang tư vấn':
                filteredData = rows.filter(row => row.gioiTinh === 'Nam');
                break;
            case 'Chưa trúng tuyển':
                filteredData = rows.filter(row => row.gioiTinh === 'Nữ');
                break;
            // Thêm các trường hợp lọc khác tại đây
            default:
                filteredData = rows;
                break;
        }
        setFilteredRows(filteredData);
    }

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'maHocvien', headerName: 'Mã học viên', width: 130, },
        { field: 'ngayDangKy', headerName: 'Ngày đăng ký', width: 130 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 180 },
        { field: 'ngaySinh', headerName: 'Ngày sinh', width: 120 },
        { field: 'gioiTinh', headerName: 'Giới tính', width: 100 },
        { field: 'loaiHocvien', headerName: 'Loại', width: 100 },
        { field: 'honNhan', headerName: 'Hôn nhân', width: 100 },
        { field: 'trangThai', headerName: 'Trạng thái', width: 130 },
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
                        openDialogEdit={openDialogEdit}
                        params={params}
                        buttonType="edit" // chỉ hiển thị nút "Chỉnh sửa"
                    />
                    <ActionColumn
                        openDialogEdit={openDialogEdit}
                        params={params}
                        buttonType="delete" // chỉ hiển thị nút "Xóa"
                    />
                </>

            ),
            sortable: false,
            filterable: false,
            resizable: false,
            disableColumnMenu: true,
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
                    label="Nhập tên tìm kiếm"
                    variant="outlined"
                />
                <Button
                    className={styles.btn}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            <Box>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Tất cả')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Tất cả' ? '#1C2536' : '#4b9949',
                    }}
                >Tất cả</BootstrapButton>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Đang thi tuyển')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đang thi tuyển' ? '#1C2536' : '#4b9949',
                    }}
                >Đang thi tuyển</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Chưa trúng tuyển' ? '#1C2536' : '#4b9949',
                    }}
                    onClick={() => handleFilter('Chưa trúng tuyển')}
                >Chưa trúng tuyển</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đã trúng tuyển' ? '#1C2536' : '#4b9949',
                    }}
                    onClick={() => handleFilter('Đã trúng tuyển')}
                >Đã trúng tuyển</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đã nhập học' ? '#1C2536' : '#4b9949',
                    }}
                    onClick={() => handleFilter('Đã nhập học')}
                >Đã nhập học</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Rút / hủy hồ sơ' ? '#1C2536' : '#6366f1',
                    }}
                    onClick={() => handleFilter('Rút / hủy hồ sơ')}
                >Rút / hủy hồ sơ</BootstrapButton>
            </Box>
            <DataGrid
                rows={filteredRows}
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
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            {/* <OverseasStudentEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
            <OverseasStudentDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                id={selectedRow ? selectedRow.id : ""}
            /> */}
        </div>
    );
}
