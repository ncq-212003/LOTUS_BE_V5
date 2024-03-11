import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import { useRouter } from "next/navigation";
import TeacherEdit from './teacher-edit';
import ActionColumn from 'src/components/action-column ';

const rows = [
    { id: 1, stt: 1, congTy: 'Công ty ABC', hoTen: 'Nguyễn Thị Mỹ', diaChi: '123 Đường ABC, Quận XYZ', dienThoaiDiDong: '0987654321', trangThai: 'Hoạt động', chuyenNganh: 'Toán học', truongTotNghiep: 'Trường A / 2010', diaChiTruong: '456 Đường XYZ, TP HCM' },
    { id: 2, stt: 2, congTy: 'Công ty XYZ', hoTen: 'Lê Văn Đức', diaChi: '456 Đường XYZ, Quận LMN', dienThoaiDiDong: '0123456789', trangThai: 'Đã nghỉ', chuyenNganh: 'Văn học', truongTotNghiep: 'Trường B / 2005', diaChiTruong: '789 Đường LMN, Hà Nội' },
    // Thêm các hàng dữ liệu khác ở đây
];

export default function TeacherTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const router = useRouter();
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const handleAddDetail = (params) => {
        router.push("/train/list-teacher/add");
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
        { field: 'congTy', headerName: 'Thuộc công ty', width: 150 },
        { field: 'hoTen', headerName: 'Họ tên', width: 200 },
        { field: 'diaChi', headerName: 'Địa chỉ', width: 200 },
        { field: 'dienThoaiDiDong', headerName: 'Điện thoại di động', width: 150 },
        { field: 'trangThai', headerName: 'Trạng thái', width: 150 },
        { field: 'chuyenNganh', headerName: 'Chuyên ngành', width: 150 },
        { field: 'truongTotNghiep', headerName: 'Trường tốt nghiệp / Năm', width: 200 },
        { field: 'diaChiTruong', headerName: 'Địa chỉ trường', width: 200 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <Tooltip title="Thêm thông tin chuyên môn">
                        <IconButton color="black"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleAddDetail(params);
                            }}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                    />
                </>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        truongTotNghiep: false,
        dienThoaiDiDong: false,
        chuyenNganh: false,
        diaChiTruong: false,
    });

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

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
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <TeacherEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
