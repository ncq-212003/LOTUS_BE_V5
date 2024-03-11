import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditCollectMoney from "src/sections/partner/collect-money/collect-money-edit";
import ActionColumn from "src/components/action-column ";


const rows = [
    { id: 1, stt: 1, categoryGroup: 'Học Phí', categoryName: 'Học phí cơ sở', descriptions: 'Phí để tham gia vào chương trình học tại trường' },
    { id: 2, stt: 2, categoryGroup: 'Học Phí', categoryName: 'Phí đăng ký và nhập học', descriptions: 'Một lần thanh toán khi đăng ký và bắt đầu khóa học' },
    { id: 3, stt: 3, categoryGroup: 'Chi Phí Sống', categoryName: 'Chỗ ở', descriptions: 'Phí thuê nhà hoặc ký túc xá' },
    { id: 4, stt: 4, categoryGroup: 'Chi Phí Sống', categoryName: 'Ăn uống', descriptions: 'Chi phí thức ăn hàng ngày' },
    { id: 5, stt: 5, categoryGroup: 'Bảo Hiểm', categoryName: 'Bảo hiểm y tế', descriptions: 'Phí bảo hiểm sức khỏe' },
    { id: 6, stt: 6, categoryGroup: 'Bảo Hiểm', categoryName: 'Bảo hiểm du lịch', descriptions: 'Bảo hiểm cho các chuyến đi du lịch' },
    { id: 7, stt: 7, categoryGroup: 'Vật Dụng Học Tập', categoryName: 'Sách giáo trình', descriptions: 'Chi phí mua sách và tài liệu học tập' },
    { id: 8, stt: 8, categoryGroup: 'Vật Dụng Học Tập', categoryName: 'Vật dụng học tập', descriptions: 'Bút, giấy, máy tính xách tay, v.v.' },
    { id: 9, stt: 9, categoryGroup: 'Chương Trình Giải Trí và Văn Hóa', categoryName: 'Du lịch và giải trí', descriptions: 'Chi phí cho các chuyến du lịch và hoạt động giải trí' },
    { id: 10, stt: 10, categoryGroup: 'Chương Trình Giải Trí và Văn Hóa', categoryName: 'Sự kiện văn hóa', descriptions: 'Chi phí tham gia các sự kiện văn hóa, hội thảo, v.v.' },
];

export default function RevenueExpenditureTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditCollectMoney, setIsOpenCollectMoney] = useState(false);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditCollectMoney = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenCollectMoney(true);
    }

    const handleCloseEditCollectMoney = () => {
        setIsOpenCollectMoney(false);
    }

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "categoryGroup", headerName: "Nhóm hạng mục", width: 160 },
        { field: "categoryName", headerName: "Tên hạng mục", width: 140 },
        { field: "descriptions", headerName: "Ghi chú", flex: 1 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditCollectMoney}
                    params={params}
                />
            ),
        },
    ];

    return (
        <Stack
            spacing={1}
            sx={{
                margin: "10px 0px",
            }}
        >
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
            <Box style={{ width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={handleViewDetail}
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
            </Box>

            <ModalDetail
                open={isModalDetailOpen}
                onClose={handleCloseDetail}
                rowData={selectedRow}
                columns={columns}
            />

            {/* <EditCollectMoney
                openEditCollectMoney={isOpenEditCollectMoney}
                closeEditCollectMoney={handleCloseEditCollectMoney}
                rowData={selectedRow}
            /> */}
        </Stack>
    );
}
