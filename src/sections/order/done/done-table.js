import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip, styled } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import OrderEdit from '../edit/order-edit';
import OrderDetail from '../detail/order-detail';

// Dữ liệu mẫu
const rows = [
    { id: 1, stt: 1, tenDonHang: 'Đơn hàng 1', ngayThiTuyen: '01/01/2023', tinhDenLamViec: 'Tỉnh A', nghiepDoan: 'Nghiệp đoàn A', xiNghiepTiepNhan: 'Xí nghiệp A', diaChiLamViec: 'Địa chỉ 1', nganhTuyen: 'Ngành A' },
    { id: 2, stt: 2, tenDonHang: 'Đơn hàng 2', ngayThiTuyen: '02/01/2023', tinhDenLamViec: 'Tỉnh B', nghiepDoan: 'Nghiệp đoàn B', xiNghiepTiepNhan: 'Xí nghiệp B', diaChiLamViec: 'Địa chỉ 2', nganhTuyen: 'Ngành B' },
    { id: 3, stt: 3, tenDonHang: 'Đơn hàng 3', ngayThiTuyen: '03/01/2023', tinhDenLamViec: 'Tỉnh C', nghiepDoan: 'Nghiệp đoàn C', xiNghiepTiepNhan: 'Xí nghiệp C', diaChiLamViec: 'Địa chỉ 3', nganhTuyen: 'Ngành C' },
    { id: 4, stt: 4, tenDonHang: 'Đơn hàng 4', ngayThiTuyen: '04/01/2023', tinhDenLamViec: 'Tỉnh D', nghiepDoan: 'Nghiệp đoàn D', xiNghiepTiepNhan: 'Xí nghiệp D', diaChiLamViec: 'Địa chỉ 4', nganhTuyen: 'Ngành D' },
    { id: 5, stt: 5, tenDonHang: 'Đơn hàng 5', ngayThiTuyen: '05/01/2023', tinhDenLamViec: 'Tỉnh E', nghiepDoan: 'Nghiệp đoàn E', xiNghiepTiepNhan: 'Xí nghiệp E', diaChiLamViec: 'Địa chỉ 5', nganhTuyen: 'Ngành E' },
    { id: 6, stt: 6, tenDonHang: 'Đơn hàng 6', ngayThiTuyen: '06/01/2023', tinhDenLamViec: 'Tỉnh F', nghiepDoan: 'Nghiệp đoàn F', xiNghiepTiepNhan: 'Xí nghiệp F', diaChiLamViec: 'Địa chỉ 6', nganhTuyen: 'Ngành F' },
    { id: 7, stt: 7, tenDonHang: 'Đơn hàng 7', ngayThiTuyen: '07/01/2023', tinhDenLamViec: 'Tỉnh G', nghiepDoan: 'Nghiệp đoàn G', xiNghiepTiepNhan: 'Xí nghiệp G', diaChiLamViec: 'Địa chỉ 7', nganhTuyen: 'Ngành G' },
    { id: 8, stt: 8, tenDonHang: 'Đơn hàng 8', ngayThiTuyen: '08/01/2023', tinhDenLamViec: 'Tỉnh H', nghiepDoan: 'Nghiệp đoàn H', xiNghiepTiepNhan: 'Xí nghiệp H', diaChiLamViec: 'Địa chỉ 8', nganhTuyen: 'Ngành H' },
    { id: 9, stt: 9, tenDonHang: 'Đơn hàng 9', ngayThiTuyen: '09/01/2023', tinhDenLamViec: 'Tỉnh I', nghiepDoan: 'Nghiệp đoàn I', xiNghiepTiepNhan: 'Xí nghiệp I', diaChiLamViec: 'Địa chỉ 9', nganhTuyen: 'Ngành I' },
    { id: 10, stt: 10, tenDonHang: 'Đơn hàng 10', ngayThiTuyen: '10/01/2023', tinhDenLamViec: 'Tỉnh J', nghiepDoan: 'Nghiệp đoàn J', xiNghiepTiepNhan: 'Xí nghiệp J', diaChiLamViec: 'Địa chỉ 10', nganhTuyen: 'Ngành J' },
];

export default function DoneTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);

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

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'ngayThiTuyen', headerName: 'Ngày thi tuyển', width: 120 },
        { field: 'nghiepDoan', headerName: 'Nghiệp đoàn', width: 120 },
        { field: 'xiNghiepTiepNhan', headerName: 'Xí nghiệp tiếp nhận', width: 150 },
        { field: 'tenDonHang', headerName: 'Tên đơn hàng', width: 150 },
        { field: 'tinhDenLamViec', headerName: 'Tỉnh đến làm việc', width: 150 },
        { field: 'diaChiLamViec', headerName: 'Địa chỉ làm việc', width: 120 },
        { field: 'nganhTuyen', headerName: 'Ngành tuyển', width: 120 },
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
        }
    ];

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
                pageSizeOptions={[5, 10]}
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
