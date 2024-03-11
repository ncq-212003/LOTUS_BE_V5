import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip, Typography, styled } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import styles from '../../../style/index.module.scss';
import { display } from '@mui/system';

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
    { id: 1, stt: 1, maMonhoc: 'EMA 3062', tenMonhoc: 'Nguyễn Văn A', diem: '9.5', chiTiet: '', trangThai: 'Đạt' },
    { id: 2, stt: 2, maMonhoc: 'EMA 3062', tenMonhoc: 'Trần Thị B', diem: '9.5', chiTiet:'', trangThai: 'Chưa đạt' },
    { id: 3, stt: 3, maMonhoc: 'EMA 3062', tenMonhoc: 'Lê Văn C', diem: '9.5', chiTiet: '', trangThai: 'Chưa đạt' },
    { id: 4, stt: 4, maMonhoc: 'EMA 3062', tenMonhoc: 'Phạm Thị D', diem: '9.5', chiTiet:'', trangThai: 'Đạt' },
    { id: 5, stt: 5, maMonhoc: 'EMA 3062', tenMonhoc: 'Vũ Văn E', diem: '9.5', chiTiet: '', trangThai: 'Chưa đạt' },
    { id: 6, stt: 6, maMonhoc: 'EMA 3062', tenMonhoc: 'Nguyễn Thị F', diem: '9.5', chiTiet:'', trangThai: 'Chưa đạt' },
    { id: 7, stt: 7, maMonhoc: 'EMA 3062', tenMonhoc: 'Trần Văn G', diem: '9.5', chiTiet: '', trangThai: 'Chưa đạt' },
    { id: 8, stt: 8, maMonhoc: 'EMA 3062', tenMonhoc: 'Lê Thị H', diem: '9.5', chiTiet:'', trangThai: 'Đạt' },
    { id: 9, stt: 9, maMonhoc: 'EMA 3062', tenMonhoc: 'Phạm Văn I', diem: '9.5', chiTiet: '', trangThai: 'Đạt' },
    { id: 10, stt: 10, maMonhoc: 'EMA 3062', tenMonhoc: 'Vũ Thị K', diem: '9.5', chiTiet:'', trangThai: 'Chưa đạt' },
];

export default function ReportStudyTable() {
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
        { field: 'maMonhoc', headerName: 'Mã môn học', width: 130, },
        { field: 'tenMonhoc', headerName: 'Tên môn học', width: 180 },
        { field: 'diem', headerName: 'Điểm', width: 120 },
        {field: 'chiTiet',headerName:'Chi tiết', width:150},
        { field: 'trangThai', headerName: 'Trạng thái', width: 100 },
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
                    label="Tên/ Mã học viên"
                    variant="outlined"
                />
                <Button
                    className={styles.btn}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            {/* <Box>
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
            </Box> */}
            <Box
                sx={{
                    display:'flex',
                    justifyContent:'start',
                    margin:'10px'
                }}
            >
                <ul>
                    <li>Mã học viên:DHS1156</li>
                    <li>Tên học viên:Đinh Văn Thắng </li>
                    <li>Lớp:Đinh Văn Thắng </li>
                    <li>GVCN:Đinh Văn Thắng </li>
                </ul>
                <ul>
                    <li>Số điện thoại:0338014536</li>
                    <li>Email:lotus.winddd@gmail.com</li>
                    <li>Trạng thái:Active</li>
                </ul>
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
