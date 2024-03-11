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
        profileCode: "PRDT000001",
        partnerName: "Nghiệp đoàn A",
        collectCategories: "Chi phí hỗ trợ tư pháp",
        money: 5000000,
        paymentMethod: "Tiền mặt",
        account: "",
        dateTime: "11/29/2023 10:03 PM",
        content: "Thu tiền nhận hàng cho khách hàng ông mr.Tococo",
        votes: 42,
        partner: "Lê Thị D",
        employeeName: "Phạm Thị Bình",
        payer: "Nguyễn Văn Bảo",
        payerAddress: "Tân tiến Vĩnh tường Vĩnh phúc",
        accompanyingDocument: "Căn cước công dân va hộ chiếu",
        note: "Đã thu tiền từ khách hàng ông mr.Tococo theo hạng mục 'Thu tiền khách hàng a'."
    },
    {
        id: 2,
        profileCode: "PRDT000002",
        partnerName: "Nghiệp đoàn B",
        collectCategories: "Chi phí vận chuyển",
        money: 1200000,
        paymentMethod: "Chuyển khoản",
        account: "Vietcombank",
        dateTime: "11/30/2023 09:30 AM",
        content: "Chi phí vận chuyển hàng hóa từ nhà máy đến cửa hàng",
        votes: 25,
        partner: "Nguyễn Văn E",
        employeeName: "Trần Văn Dương",
        payer: "Lê Thị Lan",
        payerAddress: "Hà Đông, Hà Nội",
        accompanyingDocument: "Hóa đơn số 987654",
        note: "Chi phí này liên quan đến vận chuyển hàng hóa cho đối tác Nghiệp đoàn B."
    },
    {
        id: 3,
        profileCode: "PRDT000003",
        partnerName: "Công ty XYZ",
        collectCategories: "Chi phí tiếp khách",
        money: 800000,
        paymentMethod: "Thẻ tín dụng",
        account: "Techcombank",
        dateTime: "12/02/2023 03:45 PM",
        content: "Chi phí phục vụ tiệc tiếp khách đối tác",
        votes: 15,
        partner: "Trần Thị An",
        employeeName: "Lê Văn Hùng",
        payer: "Nguyễn Thị Thảo",
        payerAddress: "Quận 1, TP.Hồ Chí Minh",
        accompanyingDocument: "Phiếu đặt tiệc số 246810",
        note: "Chi phí này liên quan đến tiếp khách cho đối tác Công ty XYZ."
    },
    {
        id: 4,
        profileCode: "PRDT000004",
        partnerName: "Công ty ABC",
        collectCategories: "Chi phí năng động hóa nhóm nhân viên",
        money: 1500000,
        paymentMethod: "Chuyển khoản",
        account: "Agribank",
        dateTime: "12/03/2023 02:15 PM",
        content: "Chi phí tổ chức hoạt động nâng cao tinh thần nhóm nhân viên",
        votes: 20,
        partner: "Nguyễn Văn Anh",
        employeeName: "Trần Thị Linh",
        payer: "Lê Văn Đại",
        payerAddress: "Quận 3, TP.Hồ Chí Minh",
        accompanyingDocument: "Biên bản họp số 13579",
        note: "Chi phí này liên quan đến việc tăng cường tinh thần làm việc nhóm."
    },
    {
        id: 5,
        profileCode: "PRDT000005",
        partnerName: "Công ty XYZ",
        collectCategories: "Chi phí du lịch công tác",
        money: 3000000,
        paymentMethod: "Tiền mặt",
        account: "",
        dateTime: "12/04/2023 10:30 AM",
        content: "Chi phí di chuyển và ăn ở khi công tác tại chi nhánh Công ty XYZ",
        votes: 18,
        partner: "Phạm Thị Linh",
        employeeName: "Nguyễn Văn Dũng",
        payer: "Lê Thị Thanh",
        payerAddress: "Hải Phòng",
        accompanyingDocument: "Voucher khách sạn và hóa đơn ăn uống",
        note: "Chi phí này liên quan đến công tác di chuyển và ăn ở khi làm việc tại chi nhánh đối tác."
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
        { field: "id", headerName: "STT", width: 50 },
        { field: "profileCode", headerName: "Mã đối tác", width: 100 },
        { field: "partnerName", headerName: "Tên đối tác", width: 150 },
        { field: "collectCategories", headerName: "Hạng mục thu", width: 300 },
        { field: "money", headerName: "Số tiền", width: 100 },
        { field: "paymentMethod", headerName: "Hình thức thanh toán", width: 150 },
        { field: "account", headerName: "Tài khoản/ Quỹ", width: 150 },
        { field: "dateTime", headerName: "Ngày& Giờ", width: 160 },
        { field: "content", headerName: "Nội dung", width: 400 },
        { field: "votes", headerName: "Số phiếu", width: 80 },
        { field: "employeeName", headerName: "Tên nhân viên", width: 150 },
        { field: "payer", headerName: "Người nộp tiền", width: 150 },
        { field: "payerAddress", headerName: "Địa chỉ người nộp tiền", width: 200 },
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
