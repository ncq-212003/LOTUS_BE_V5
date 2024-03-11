import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Visibility } from '@mui/icons-material';
import EditPaymentMoney from "./edit-payment-money";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
    {
        id: 1,
        stt: 1,
        dateTime: "02-09-2023",
        votes: "42",
        content: "Chi tiền nhận hàng cho khách hàng ông mr.Tococo",
        expenseCategories: "Chi tiền khách hàng a",
        account: "BIDV",
        money: "2304464",
        overseasName: "Lê Thị D",
        company: "Cty Bình Dương",
        employeeName: "Phạm Thị Bình",
        recipient: "Nguyễn Văn Bảo",
        recipientAddress: "Tân tiến Vĩnh tường Vĩnh phúc",
        accompanyingDocument: "Căn cước công dân va hộ chiếu",
        note: "Để ý kỹ hóa đơn"
    },
    {
        id: 2,
        stt: 2,
        dateTime: "04-10-2023",
        votes: "4",
        content: "Chi tiền lấy hàng kho quận Tân Bình cho bà Lan",
        expenseCategories: "Chi tiền khách hàng b",
        account: "VietComBank",
        money: "2345",
        overseasName: "Lê Thị Xuyền",
        company: "Cty Thành Công",
        employeeName: "Nguyễn Văn Công",
        recipient: "Trần Quốc Cường",
        recipientAddress: "yên Lạc Phú Thọ",
        accompanyingDocument: "Căn cước công dân va hộ chiếu",
        note: "Chú ý địa chỉ khách hàng"
    },
    {
        id: 3,
        stt: 3,
        dateTime: "15-11-2023",
        votes: "12",
        content: "Chi tiền thanh toán hóa đơn điện cho công ty ABC",
        expenseCategories: "Chi tiền khách hàng c",
        account: "ACB",
        money: "1200000",
        overseasName: "Nguyễn Văn An",
        company: "Cty An Trạch",
        employeeName: "Trần Thị Lan",
        recipient: "Nguyễn Thanh Tuấn",
        recipientAddress: "Hà Nội",
        accompanyingDocument: "Hóa đơn số 123456",
        note: "Đọc kỹ hạng mục giá điện"
    },
    {
        id: 4,
        stt: 4,
        dateTime: "20-12-2023",
        votes: "28",
        content: "Chi tiền mua vật liệu xây dựng tại cửa hàng XYZ",
        expenseCategories: "Chi tiền khách hàng d",
        account: "Techcombank",
        money: "5000000",
        overseasName: "Trần Văn Bình",
        company: "Cty An Trạch",
        employeeName: "Lê Thị Hương",
        recipient: "Nguyễn Đình Hoa",
        recipientAddress: "Thái Nguyên",
        accompanyingDocument: "Đơn đặt hàng số 789012",
        note: "Lấy hóa đơn mang về "
    },
    {
        id: 5,
        stt: 5,
        dateTime: "07-01-2024",
        votes: "8",
        content: "Chi tiền lương tháng 12 cho nhân viên",
        expenseCategories: "Chi tiền khách hàng g",
        account: "VietinBank",
        money: "80000000",
        overseasName: "Nguyễn Văn Cường",
        company: "Cty An Nghĩa",
        employeeName: "Phạm Thị Mai",
        recipient: "Trần Văn Hải",
        recipientAddress: "Hồ Chí Minh",
        accompanyingDocument: "Bảng lương tháng 12",
        note: "Lương thưởng đầy đủ cho nhân viên"
    }
];

export default function TablePaymentMoney() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditPaymentMoney, setIsOpenPaymentMoney] = useState(false);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditPaymentMoney = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenPaymentMoney(true);
    }

    const handleCloseEditPaymentMoney = () => {
        setIsOpenPaymentMoney(false);
    }

    const columns = [
        { field: "stt", headerName: "Stt", width: 70 },
        { field: "dateTime", headerName: "Ngày& Giờ", width: 160 },
        { field: "votes", headerName: "Số phiếu", width: 140 },
        { field: "content", headerName: "Nội dung", width: 400 },
        { field: "expenseCategories", headerName: "Hạng mục chi", width: 300 },
        { field: "account", headerName: "Tài khoản/Quỹ", width: 150 },
        { field: "money", headerName: "Số tiền", width: 150 },
        { field: "overseasName", headerName: "Tên du học sinh", width: 200 },
        { field: "company", headerName: "Chi tiền từ công ty", width: 150 },
        { field: "employeeName", headerName: "Tên nhân viên", width: 200 },
        { field: "recipient", headerName: "Người nhận tiền", width: 200 },
        { field: "recipientAddress", headerName: "Địa chỉ người nhận tiền", width: 300 },
        { field: "accompanyingDocument", headerName: "Chứng từ kèm theo(Số hợp đồng/...)", width: 350 },
        { field: "note", headerName: "Ghi chú", width: 350 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditPaymentMoney}
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
            <EditPaymentMoney
                openEditPaymentMoney={isOpenEditPaymentMoney}
                closeEditPaymentMoney={handleCloseEditPaymentMoney}
                rowData={selectedRow}
            />
        </Stack>
    );
}
