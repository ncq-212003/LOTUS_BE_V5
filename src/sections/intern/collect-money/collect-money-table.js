import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditCollectMoney from "./collect-money-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
    {
        id: 1,
        stt: 1,
        dateTime: "11/29/2023 10:03 PM",
        votes: "42",
        content: "Thu tiền ăn ở của thực tập sinh A",
        collectCategories: "Phí ăn ở",
        account: "BIDV",
        money: "2304464",
        internName: "Lê Thị D",
        company: "Cty Bình Dương",
        employeeName: "Phạm Thị Bình",
        payer: "Nguyễn Văn Bảo",
        payerAddress: "Tân tiến Vĩnh tường Vĩnh phúc",
        accompanyingDocument: "Căn cước công dân va hộ chiếu",
        note: "Đã thu tiền từ khách hàng ông mr.Tococo theo hạng mục 'Thu tiền khách hàng a'."
    },
    {
        id: 2,
        stt: 2,
        dateTime: "11/24/2023 10:03 PM",
        votes: "4",
        content: "Các khoản phí liên quan đến quá trình đào tạo và hướng dẫn cho thực tập sinh trước khi họ bắt đầu công việc",
        collectCategories: "Phí đào tạo",
        account: "VietComBank",
        money: "2345",
        internName: "Lê Thị Xuyền",
        company: "Cty Thành Công",
        employeeName: "Nguyễn Văn Công",
        payer: "Trần Quốc Cường",
        payerAddress: "yên Lạc Phú Thọ",
        accompanyingDocument: "Căn cước công dân va hộ chiếu",
        note: "Liên hệ số 098374634"
    },
    {
        id: 3,
        stt: 3,
        dateTime: "11/28/2023 10:03 AM",
        votes: "12",
        content: "Cung cấp bảo hiểm y tế cho thực tập sinh trong thời gian họ làm việc ở quốc gia xuất khẩu.",
        collectCategories: "Bảo hiểm y tế",
        account: "ACB",
        money: "1200000",
        internName: "Nguyễn Văn An",
        company: "Cty An Trạch",
        employeeName: "Trần Thị Lan",
        payer: "Nguyễn Thanh Tuấn",
        payerAddress: "Hà Nội",
        accompanyingDocument: "Hóa đơn số 123456",
        note: "Đến nhà ông khách hàng ABC tại Quận 4"
    },
    {
        id: 4,
        stt: 4,
        dateTime: "08/21/2023 10:03 PM",
        votes: "28",
        content: "Chi phí để hỗ trợ tư pháp hoặc đại diện pháp lý cho thực tập sinh trong quá trình làm việc",
        collectCategories: "Chi phí hỗ trợ tư pháp",
        account: "Techcombank",
        money: "5000000",
        internName: "Trần Văn Bình",
        company: "Cty An Nghĩa",
        employeeName: "Lê Thị Hương",
        payer: "Nguyễn Đình Hoa",
        payerAddress: "Thái Nguyên",
        accompanyingDocument: "Đơn đặt hàng số 789012",
        note: "Để ý hóa đơn"
    },
    {
        id: 5,
        stt: 5,
        dateTime: "11/23/2023 10:03 PM",
        votes: "8",
        content: "Các chi phí hoặc khoản phí liên quan đến việc gửi tiền về quê hương của thực tập sinh",
        collectCategories: "Phí gửi tiền về quê hương",
        account: "VietinBank",
        money: "80000000",
        internName: "Nguyễn Văn Cường",
        company: "Cty An Nghĩa",
        employeeName: "Phạm Thị Mai",
        payer: "Trần Văn Hải",
        payerAddress: "Hồ Chí Minh",
        accompanyingDocument: "Bảng lương tháng 12",
        note: "Chú ý từng nhân viên 1 về thái độ"
    }
];

export default function TableCollectMoney() {
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
        { field: "dateTime", headerName: "Ngày& Giờ", width: 160 },
        { field: "votes", headerName: "Số phiếu", width: 140 },
        { field: "content", headerName: "Nội dung", width: 400 },
        { field: "collectCategories", headerName: "Hạng mục thu", width: 300 },
        { field: "account", headerName: "Tài khoản/ Quỹ", width: 150 },
        { field: "money", headerName: "Số tiền", width: 150 },
        { field: "internName", headerName: "Tên thực tập sinh", width: 200 },
        { field: "company", headerName: "Thu về công ty", width: 150 },
        { field: "employeeName", headerName: "Tên nhân viên", width: 200 },
        { field: "payer", headerName: "Người nộp tiền", width: 200 },
        { field: "payerAddress", headerName: "Địa chỉ người nộp tiền", width: 300 },
        { field: "accompanyingDocument", headerName: "Chứng từ kèm theo(Số hợp đồng/...)", width: 350 },
        { field: "note", headerName: "Ghi chú", width: 350 },
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

            <EditCollectMoney
                openEditCollectMoney={isOpenEditCollectMoney}
                closeEditCollectMoney={handleCloseEditCollectMoney}
                rowData={selectedRow}
            />
        </Stack>
    );
}
