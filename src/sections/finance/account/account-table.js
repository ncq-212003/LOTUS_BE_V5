import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Autocomplete, Avatar, Box, Button, Checkbox, Grid, IconButton, SvgIcon, TextField, Tooltip, Stack, styled } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Search, Visibility } from '@mui/icons-material';
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import EditPaymentAccount from "./account-edit";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const rows = [
    {
        id: 1,
        stt: 1,
        accountOwner: "Phạm Văn Minh",
        accountNumber: "2345678945743",
        accountCode: "758763485634",
        company: "Cty An Nghĩa",
        paymentOptions: "Vietcombank",
        moneyStarts: "230000",
        note: "Chuyên cung cấp dịch vụ ngân hàng thương mại và tài chính cho doanh nghiệp và cá nhân.",
        systemCode: "34567546567",
    },
    {
        id: 2,
        stt: 2,
        paymentOptions: "BIDV",
        accountOwner: "Phạm Văn Bảo",
        accountCode: "87534757344",
        company: "Cty Bình An",
        accountNumber: "456084445434",
        moneyStarts: "2300000",
        note: "Chuyên về dịch vụ ngân hàng đầu tư và hỗ trợ phát triển kinh tế",
        systemCode: "38573845357",
    },
    {
        id: 3,
        stt: 3,
        accountOwner: "Nguyễn Quốc An",
        accountNumber: "566749545450",
        accountCode: "874504754",
        company: "Cty An Trạch",
        paymentOptions: "VietinBank",
        moneyStarts: "5647454",
        note: "Cung cấp nhiều dịch vụ ngân hàng, từ tài chính doanh nghiệp đến ngân hàng cá nhân",
        systemCode: "847578653465",
    },
    {
        id: 4,
        stt: 4,
        accountOwner: "Nguyễn Quốc Tuyển",
        accountNumber: "84764555833",
        accountCode: "9753467534",
        company: "Cty Thành Công",
        paymentOptions: "Momo",
        moneyStarts: "937644",
        note: "Ứng dụng thanh toán điện tử số 1 Việt Nam",
        systemCode: "534785436",
    },
    {
        id: 5,
        stt: 5,
        accountOwner: "Trần Quốc Cường",
        accountNumber: "45678945487",
        accountCode: "454375437",
        company: "Cty Bình Dương",
        paymentOptions: "VNPay",
        moneyStarts: "45743",
        note: "Ví VNPAY là ví điện tử hàng đầu dành cho gia đình tại Việt Nam ứng dụng công nghệ hiện đại, đột phá trong lĩnh vực thanh toán điện tử",
        systemCode: "85347534",
    },
];

const filterOptions = [
    'Công ty',
    'Hình thức thanh toán',
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

export default function TableAccount() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditPaymentAccount, setIsOpenEditPaymentAccount] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleViewDetail = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    const handleOpenEditPaymentAccount = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsOpenEditPaymentAccount(true);
    }

    const handleCloseEditPaymentAccount = () => {
        setIsOpenEditPaymentAccount(false);
    }

    const handleFilter = (filterType) => {
        let filteredData = rows;

        // Cập nhật trạng thái activeFilter khi người dùng chọn nút
        setActiveFilter(filterType);

        switch (filterType) {
            case 'Tất cả':
                filteredData = rows;
                break;
            case 'Đang xử lý':
                filteredData = rows.filter(row => row.trangThai === 'Đang xử lý');
                break;
            case 'Đã xong':
                filteredData = rows.filter(row => row.trangThai === 'Đã xong');
                break;
            default:
                filteredData = rows;
                break;
        }
        setFilteredRows(filteredData);
    }

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "accountOwner", headerName: "Chủ tài khoản", width: 200 },
        { field: "accountNumber", headerName: "Số tài khoản", width: 200 },
        { field: "accountCode", headerName: "Mã tài khoản", width: 200 },
        { field: "company", headerName: "Thuộc công ty", width: 200 },
        { field: "paymentOptions", headerName: "Hình thức thanh toán", width: 200 },
        { field: "moneyStarts", headerName: "Số dư bắt đầu", width: 200 },
        { field: "note", headerName: "Ghi chú", width: 300 },
        { field: "systemCode", headerName: "Mã hệ thống", width: 200 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditPaymentAccount}
                    params={params}
                />
            ),
        },
    ]

    const handleChangeSelectFilter = (event, newValues) => {
        setSelectedFilters(newValues);
    };

    const renderFilterComponent = () => {
        return selectedFilters.map((filter) => {
            switch (filter) {
                case 'Công ty':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Công ty"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Hình thức thanh toán':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Hình thức thanh toán"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                default:
                    return null;
            }
        });
    }


    return (
        <Stack
            spacing={1}
            sx={{
                margin: "10px 0px",
            }}
        >
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}>
                    <TextField
                        sx={{ width: '100%' }}
                        size="small"
                        label="Nhập nội dung cần tìm kiếm"
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                >
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        sx={{ width: '100%' }}
                        fullWidth
                        size="small"
                        limitTags={0}
                        options={filterOptions}
                        onChange={(event, newValue) => handleChangeSelectFilter(event, newValue)}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                                    checkedIcon={<CheckBox fontSize="small" />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params}
                            label="Thêm lọc"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                style: { color: '#ccc' }
                            }}
                        />}
                    />
                </Grid>
                <Grid
                    container
                    item
                    spacing={2}
                >
                    {renderFilterComponent()}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                    >
                        <DatePicker
                            sx={{ width: '100%' }}
                            name="fromDate"
                            slotProps={{
                                textField: {
                                    size: "small",
                                    variant: "outlined",
                                },
                            }}
                            label="Từ ngày"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                    >
                        <DatePicker
                            sx={{ width: '100%' }}
                            name="toDate"
                            slotProps={{
                                textField: {
                                    size: "small",
                                    variant: "outlined",
                                },
                            }}
                            label="Đến ngày"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <Search />
                            </SvgIcon>
                        )}
                        variant="contained"
                        sx={{
                            backgroundColor: "#1C2536",
                            color: "white",
                            float: 'right'
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
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
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đang xử lý' ? '#1C2536' : '#4b9949',
                    }}
                    onClick={() => handleFilter('Đang xử lý')}
                >Công ty</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đã xong' ? '#1C2536' : '#4b9949',
                    }}
                    onClick={() => handleFilter('Đã xong')}
                >Hình thức thanh toán</BootstrapButton>
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
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    pageSizeOptions={[20, 50]}
                    checkboxSelection
                />
            </Box>

            <ModalDetail
                open={isModalDetailOpen}
                onClose={handleCloseDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <EditPaymentAccount
                openEditPaymentAccount={isOpenEditPaymentAccount}
                closeEditPaymentAccount={handleCloseEditPaymentAccount}
                rowData={selectedRow}
            />
        </Stack>
    );
}
