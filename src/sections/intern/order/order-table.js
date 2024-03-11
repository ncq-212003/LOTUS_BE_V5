import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip, styled } from '@mui/material';
import { Delete, Edit, PersonAdd, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import OrderDetail from 'src/sections/order/detail/order-detail';
import OrderEdit from 'src/sections/order/edit/order-edit';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

// Dữ liệu mẫu
const rows = [
    { id: 1, maDonHang: 'DH012938', stt: 1, tenDonHang: 'Đơn hàng 1', ngayThiTuyen: '01/01/2023', ngayChotHoSo: '15/12/2023', tinhDenLamViec: 'Tỉnh A', nghiepDoan: 'Nghiệp đoàn A', ctyTiepNhan: 'Công ty tiếp nhận A', diaChiLamViec: 'Địa chỉ 1', nganhTuyen: 'Ngành A', soLuongTuyen: 5 },
    { id: 2, maDonHang: 'DH012939', stt: 2, tenDonHang: 'Đơn hàng 2', ngayThiTuyen: '02/01/2023', ngayChotHoSo: '16/12/2023', tinhDenLamViec: 'Tỉnh B', nghiepDoan: 'Nghiệp đoàn B', ctyTiepNhan: 'Công ty tiếp nhận B', diaChiLamViec: 'Địa chỉ 2', nganhTuyen: 'Ngành B', soLuongTuyen: 10 },
    { id: 3, maDonHang: 'DH012940', stt: 3, tenDonHang: 'Đơn hàng 3', ngayThiTuyen: '03/01/2023', ngayChotHoSo: '17/12/2023', tinhDenLamViec: 'Tỉnh C', nghiepDoan: 'Nghiệp đoàn C', ctyTiepNhan: 'Công ty tiếp nhận C', diaChiLamViec: 'Địa chỉ 3', nganhTuyen: 'Ngành C', soLuongTuyen: 8 },
    { id: 4, maDonHang: 'DH012941', stt: 4, tenDonHang: 'Đơn hàng 4', ngayThiTuyen: '04/01/2023', ngayChotHoSo: '18/12/2023', tinhDenLamViec: 'Tỉnh D', nghiepDoan: 'Nghiệp đoàn D', ctyTiepNhan: 'Công ty tiếp nhận D', diaChiLamViec: 'Địa chỉ 4', nganhTuyen: 'Ngành D', soLuongTuyen: 15 },
    { id: 5, maDonHang: 'DH012942', stt: 5, tenDonHang: 'Đơn hàng 5', ngayThiTuyen: '05/01/2023', ngayChotHoSo: '19/12/2023', tinhDenLamViec: 'Tỉnh E', nghiepDoan: 'Nghiệp đoàn E', ctyTiepNhan: 'Công ty tiếp nhận E', diaChiLamViec: 'Địa chỉ 5', nganhTuyen: 'Ngành E', soLuongTuyen: 20 },
    { id: 6, maDonHang: 'DH012943', stt: 6, tenDonHang: 'Đơn hàng 6', ngayThiTuyen: '06/01/2023', ngayChotHoSo: '20/12/2023', tinhDenLamViec: 'Tỉnh F', nghiepDoan: 'Nghiệp đoàn F', ctyTiepNhan: 'Công ty tiếp nhận F', diaChiLamViec: 'Địa chỉ 6', nganhTuyen: 'Ngành F', soLuongTuyen: 12 },
    { id: 7, maDonHang: 'DH012944', stt: 7, tenDonHang: 'Đơn hàng 7', ngayThiTuyen: '07/01/2023', ngayChotHoSo: '21/12/2023', tinhDenLamViec: 'Tỉnh G', nghiepDoan: 'Nghiệp đoàn G', ctyTiepNhan: 'Công ty tiếp nhận G', diaChiLamViec: 'Địa chỉ 7', nganhTuyen: 'Ngành G', soLuongTuyen: 18 },
    { id: 8, maDonHang: 'DH012945', stt: 8, tenDonHang: 'Đơn hàng 8', ngayThiTuyen: '08/01/2023', ngayChotHoSo: '22/12/2023', tinhDenLamViec: 'Tỉnh H', nghiepDoan: 'Nghiệp đoàn H', ctyTiepNhan: 'Công ty tiếp nhận H', diaChiLamViec: 'Địa chỉ 8', nganhTuyen: 'Ngành H', soLuongTuyen: 25 },
    { id: 9, maDonHang: 'DH012946', stt: 9, tenDonHang: 'Đơn hàng 9', ngayThiTuyen: '09/01/2023', ngayChotHoSo: '23/12/2023', tinhDenLamViec: 'Tỉnh I', nghiepDoan: 'Nghiệp đoàn I', ctyTiepNhan: 'Công ty tiếp nhận I', diaChiLamViec: 'Địa chỉ 9', nganhTuyen: 'Ngành I', soLuongTuyen: 30 },
    { id: 10, maDonHang: 'DH012947', stt: 10, tenDonHang: 'Đơn hàng 10', ngayThiTuyen: '10/01/2023', ngayChotHoSo: '24/12/2023', tinhDenLamViec: 'Tỉnh J', nghiepDoan: 'Nghiệp đoàn J', ctyTiepNhan: 'Công ty tiếp nhận J', diaChiLamViec: 'Địa chỉ 10', nganhTuyen: 'Ngành J', soLuongTuyen: 35 },
];

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

export default function OrderTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);
    const [activeFilter, setActiveFilter] = React.useState('Tất cả');
    const router = useRouter();

    const handleSelectTTS = (params) => {
        // Lưu trữ dữ liệu đối tượng vào localStorage
        localStorage.setItem('selectedOrder', JSON.stringify(params.row));

        // Chuyển hướng đến trang OrderSelect
        router.push('/intern/order/select');
    }

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
            case 'Đang tiến cử':
                filteredData = rows.filter(row => row.gioiTinh === 'Nam');
                break;
            case 'Đã tuyển xong':
                filteredData = rows.filter(row => row.gioiTinh === 'Nam');
                break;
            case 'Đã tiến cử':
                filteredData = rows.filter(row => row.gioiTinh === 'Nữ');
                break;
            case 'Đã hủy':
                filteredData = rows.filter(row => row.gioiTinh === 'Nữ');
                break;
            default:
                filteredData = rows;
                break;
        }
        setFilteredRows(filteredData);
    }

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'maDonHang', headerName: 'Mã đơn hàng', width: 120 },
        { field: 'ngayThiTuyen', headerName: 'Ngày thi tuyển', width: 120 },
        { field: 'ngayChotHoSo', headerName: 'Ngày thi tuyển', width: 120 },
        { field: 'nghiepDoan', headerName: 'Nghiệp đoàn', width: 120 },
        { field: 'ctyTiepNhan', headerName: 'Công ty tiếp nhận', width: 150 },
        { field: 'tenDonHang', headerName: 'Tên đơn hàng', width: 150 },
        { field: 'tinhDenLamViec', headerName: 'Tỉnh đến làm việc', width: 150 },
        { field: 'diaChiLamViec', headerName: 'Địa chỉ làm việc', width: 120 },
        { field: 'nganhTuyen', headerName: 'Ngành tuyển', width: 120 },
        { field: 'soLuongTuyen', headerName: 'Số lượng người', width: 120 },
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
                    <Tooltip title="Thêm TTS">
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={(event) => handleSelectTTS(params)}
                        >
                            <PersonAdd />
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
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        ngayChotHoSo: false,
        ngayThiTuyen: false,
    });

    return (
        <div style={{ width: '100%' }}>
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
                    label="Nhập tên đơn hàng tìm kiếm"
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
                    onClick={() => handleFilter('Đang tiến cử')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đang tiến cử' ? '#1C2536' : '#4b9949',
                    }}
                >Đang tiến cử</BootstrapButton>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Đã tuyển xong')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đã tuyển xong' ? '#1C2536' : '#4b9949',
                    }}
                >Đã tuyển xong</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    onClick={() => handleFilter('Đã tiến cử')}
                    sx={{
                        backgroundColor: activeFilter === 'Đã tiến cử' ? '#1C2536' : '#4b9949',
                    }}
                >Đã tiến cử</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đã hủy' ? '#1C2536' : '#6366f1',
                    }}
                    onClick={() => handleFilter('Đã hủy')}
                >Đã hủy</BootstrapButton>
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
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[20, 50]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <OrderEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
            <OrderDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
