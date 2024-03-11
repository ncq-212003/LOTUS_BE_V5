import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
    {
        id: 1,
        stt: 1,
        programName: "Đào tạo nhân viên",
        programCode: "PROMO10OFF",
        startDate: "11/27/2023",
        endDate: "11/30/2023",
        revenueitem: "Doanh số bán hàng",
        expenseitem: "Chi phí nhân sự",
        note: "Ghi chú 1",
    },
    {
        id: 2,
        stt: 2,
        programName: "Tư vấn và chăm sóc khách hàng",
        programCode: "VIPMEMBER",
        startDate: "11/28/2023",
        endDate: "11/29/2023",
        revenueitem: "Doanh thu bán sản phẩm",
        expenseitem: "Chi phí marketing",
        note: "Ghi chú 2",
    },
    {
        id: 3,
        stt: 3,
        programName: "Mở rộng thị trường",
        programCode: "PARTNER20",
        startDate: "11/29/2023",
        endDate: "11/30/2023",
        revenueitem: "Doanh thu từ đầu tư",
        expenseitem: "Chi phí thuê văn phòng",
        note: "Ghi chú 3",
    },
    {
        id: 4,
        stt: 4,
        programName: "Hợp tác với các doanh nghiệp khác",
        programCode: "LOYALTYPOINTS",
        startDate: "10/12/2023",
        endDate: "10/15/2023",
        revenueitem: "Phát triển cơ sở hạ tầng",
        expenseitem: "Chi phí đầu tư cơ sở hạ tầng",
        note: "Ghi chú 4",
    },
    {
        id: 5,
        stt: 5,
        programName: "Quảng bá công ty",
        programCode: "CUSTOMIZED20",
        startDate: "02/29/2023",
        endDate: "03/30/2023",
        revenueitem: "doanh thu quảng cáo",
        expenseitem: "Chi phí thuê ca sĩ",
        note: "Ghi chú 5",
    }
];

export default function ProgramTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditProgram, setIsOpenEditProgram] = useState(false);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditProgram = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenEditProgram(true);
    }

    const handleCloseEditProgram = () => {
        setIsOpenEditProgram(false);
    }

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "programName", headerName: "Tên chương trình", width: 300 },
        { field: "programCode", headerName: "Mã chương trình", width: 170 },
        { field: "startDate", headerName: "Ngày bắt đầu", width: 130 },
        { field: "endDate", headerName: "Ngày kết thúc", width: 130 },
        { field: "revenueitem", headerName: "Mục thu", width: 200 },
        { field: "expenseitem", headerName: "Mục chi", width: 200 },
        { field: "note", headerName: "Ghi chú", width: 150 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditProgram}
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
        </Stack>
    );
}
