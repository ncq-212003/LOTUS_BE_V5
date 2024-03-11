import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Autocomplete, Avatar, Button, Grid, IconButton, Menu, MenuItem, SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ContactAdd from '../contact/contact-add';
import { Box } from '@mui/system';
import { Delete, Edit, GroupAdd, MoreVert, Search } from '@mui/icons-material';
import { styled, alpha } from "@mui/material/styles";
import ContactTable from '../contact/contact-table';
import ActionColumn from 'src/components/action-column ';
import ModalDetail from 'src/components/modal-detail';
import UnionEdit from '../edit/union-edit';
import { listUnionApi } from 'src/contexts/api/partner/api-union';
import { HANDLERS_UNION } from 'src/contexts/reducer/partner/reducer-union';
import { useApp } from 'src/hooks/use-app';
import { useEffect } from 'react';
import { listEmployeeApi } from 'src/contexts/api/company/api-employee';
import { listMarketApi } from 'src/contexts/api/setting/api-market';
import { findRegionByMarketIdApi, listRegionApi } from 'src/contexts/api/setting/api-region';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import UnionDetail from '../detail/union-detail';

export default function UnionTable() {
    const [isDialogDetailOpen, setisDialogDetailOpen] = useState(false);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [isDialogContactOpen, setIsDialogContactOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const [state, dispatch] = useApp();
    const { union } = state;
    const { unions } = union;
    const [employeeOption, setEmployeeOption] = useState([]);
    const [marketOption, setMarketOption] = useState([]);
    const [positionOption, setPositionOption] = useState([]);
    // const [marketSelected, setMarketSelected] = useState(null);
    const [statusAprove, setStatusAprove] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');

    //List employee 
    useEffect(() => {
        const listEmployeeName = async () => {
            const res = await listEmployeeApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const employees = res.data.map((e) => ({
                    label: e.lastName + " " + e.middleName + " " + e.firstName,
                    value: e.employeeId,
                }));
                setEmployeeOption(employees);
            }
        };
        listEmployeeName();
    }, []);

    // List market
    useEffect(() => {
        const listMarket = async () => {
            const res = await listMarketApi();
            const markets = res.data.map((m) => ({
                label: m.marketName,
                value: m.marketId,
            }));
            setMarketOption(markets);
        };
        listMarket();
    }, []);


    // List position by marketId
    // useEffect(() => {
    //     const listPosition = async (marketSelected) => {
    //         if (marketSelected) {
    //             const res = await findRegionByMarketIdApi(marketSelected);
    //             console.log(res);
    //             const postions = res.data.map((m) => ({
    //                 label: m.positionName,
    //                 value: m.positionId,
    //             }));
    //             setPositionOption(postions);
    //         }
    //     };
    //     listPosition(marketSelected);
    // }, [marketSelected]);

    //List position
    useEffect(() => {
        const listPosition = async () => {
            const res = await listRegionApi();
            const postions = res.data.map((m) => ({
                label: m.positionName,
                value: m.positionId,
            }));
            setPositionOption(postions);
        };
        listPosition();
    }, []);

    //List statusAprove
    const submissionStatusOptions = [
        { value: 1, label: "Được cấp phép" },
        { value: 2, label: "Chưa được cấp phép" }
    ];


    useEffect(() => {
        const listData = async () => {
            const res = await listUnionApi();
            dispatch({
                type: HANDLERS_UNION.LIST_UNION,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataWithSTT = Array.isArray(unions) ? unions.map((union, index) => ({
        ...union,
        stt: index + 1,
        id: union.id || index + 1,
        employeeName: employeeOption.find((e) => e.value === union.employeeIdTakecare)?.label,
        marketName: marketOption.find((m) => m.value === union.marketId)?.label,
        regionName: positionOption.find((p) => p.value == union.regionId)?.label,
        statusAproveName: submissionStatusOptions.find((s) => s.value == union.statusAprove)?.label,
    })) : [];


    // Dialog Details 
    const openDialogDetail = (params) => {
        setSelectedRow(params.row);
        setisDialogDetailOpen(true);
    };

    const closeDialogDetail = () => {
        setisDialogDetailOpen(false);
    };

    //Diaglo Edit 
    const openDialogEdit = (params) => {
        const rowData = params.row;
        const employee = employeeOption.find((e) => e.value === rowData.employeeIdTakecare);
        const market = marketOption.find((m) => m.value === rowData.marketId);
        const region = positionOption.find((p) => p.value == rowData.regionId);
        const status = submissionStatusOptions.find((s) => s.value == rowData.statusAprove);
        const dataEdit = {
            ...params.row,
            employee: employee,
            market: market,
            region: region,
            status: status
        }
        console.log(dataEdit);
        setSelectedRow(dataEdit);
        // setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    // Dialog Contact Add 

    const openDialog = (params) => {
        setSelectedRow(params.row);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    //Dialog Contact List

    const openDialogContact = (params) => {
        setSelectedRow(params.row);
        setIsDialogContactOpen(true);
    };

    const closeDialogContact = () => {
        setIsDialogContactOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 40 },
        {
            field: 'syndicateLogo',
            headerName: 'Logo',
            width: 80,
            renderCell: (params) => (
                <Avatar
                    src={'https://lotus.i.tisbase.online' + params.row.syndicateLogo}
                    alt="Logo"
                    sx={{ width: 40, height: 40 }}
                >Logo</Avatar>
            ),
        },
        // { field: 'syndicateLogo', headerName: 'Mã số nghiệp đoàn', width: 150 },
        { field: 'syndicateCode', headerName: 'Mã số nghiệp đoàn', width: 150 },
        { field: 'syndicateName', headerName: 'Tên nghiệp đoàn', width: 200 },
        { field: 'website', headerName: 'Địa chỉ Website', width: 200 },
        { field: 'statusAproveName', headerName: 'Tình trạng trình cục', width: 150 },
        { field: 'employeeName', headerName: 'Nhân viên chăm sóc', width: 150 },

        { field: 'contractNumber', headerName: 'Số hợp đồng', width: 120 },
        { field: 'contractSignDate', headerName: 'Ngày ký hợp đồng', width: 120 },


        { field: 'supportFirstMonth', headerName: 'Trợ cấp tháng đầu', width: 120 },
        { field: 'feeTraining', headerName: 'Phí đào tạo', width: 120 },


        { field: 'marketName', headerName: 'Thị trường', width: 120 },
        { field: 'regionName', headerName: 'Tỉnh/Thành phố', width: 120 },
        { field: 'syndicateAddress', headerName: 'Địa chỉ', width: 150 },
        { field: 'telephone', headerName: 'Số điện thoại', width: 150 },
        { field: 'fax', headerName: 'Số fax', width: 120 },

        { field: 'personRepresent', headerName: 'Họ tên người đại diện', width: 200 },
        { field: 'position', headerName: 'Chức vụ', width: 150 },

        { field: 'feeContract', headerName: 'Phí quản lý', width: 150 },
        { field: 'ghiChu', headerName: 'Ghi chú', width: 120 },

        {
            field: 'action',
            headerName: 'Hành động',
            width: 200,
            renderCell: (params) => (
                <>
                    <Tooltip title="Thêm người liên hệ">
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialog(params)
                            }}
                        >
                            <GroupAdd />
                        </IconButton>
                    </Tooltip>
                    <ActionColumn
                        handleViewDetail={openDialogDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                    />
                </>
            ),
        }

    ];

    const filterOptions = [
        'Chương trình tham gia',
        'Nguồn cung ứng (tỉnh thành)',
        'Thị trường',
        'Trình độ văn hóa',
        'Độ tuổi',
        'Kết quả sơ tuyển',
    ];

    const handleChangeSelectFilter = (event, newValue) => {
        setSelectedFilter('Nguồn cung ứng (tỉnh thành)');
    };

    const renderFilterComponent = () => {
        switch (selectedFilter) {
            case 'Chương trình tham gia':
                return (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                    >
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={[]}
                            renderInput={(params) => <TextField {...params}
                                label="Chương trình tham gia"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                );
            case 'Nguồn cung ứng (tỉnh thành)':
                return (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                    >
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={[]}
                            renderInput={(params) => <TextField {...params}
                                label="Nguồn cung ứng (tỉnh thành)"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                );
            case 'Thị trường':
                return (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                    >
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={[]}
                            renderInput={(params) => <TextField {...params}
                                label="Thị trường"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                );
            case 'Trình độ văn hóa':
                return (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                    >
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={[]}
                            renderInput={(params) => <TextField {...params}
                                label="Trình độ văn hóa"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                );
            case 'Kết quả sơ tuyển':
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
                                label="Kết quả sơ tuyển"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                );
            case 'Độ tuổi':
                return (
                    <>
                        <Grid
                            item
                            xs={12}
                            sm={3}
                        >
                            <TextField
                                sx={{ width: '100%' }}
                                size="small"
                                label="Từ độ tuổi"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={3}
                        >
                            <TextField
                                sx={{ width: '100%' }}
                                size="small"
                                label="Đến độ tuổi"
                                variant="outlined"
                            />
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    }

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        website: false,
        fax: false,
        website: false,
        position: false,
    });


    return (
        <div style={{ width: '100%' }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}>
                    {/* Để tạm 12 */}
                    <TextField
                        sx={{ width: '100%' }}
                        size="small"
                        label="Nhập tên nghiệp đoàn tìm kiếm"
                        variant="outlined"
                    />
                </Grid>
                {/* <Grid
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
                        options={filterOptions}
                        onChange={(event, newValue) => handleChangeSelectFilter(event, newValue)}
                        renderInput={(params) => <TextField {...params}
                            label="Chọn lọc"
                            variant="outlined"
                            placeholder="Có thể chọn nhiều"
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
                </Grid> */}
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
            <Alert
                icon={false}
                severity="info"
                sx={{
                    backgroundColor: 'rgb(229, 246, 253)',
                    margin: '12px 0'
                }}
            >
                <Typography ariant="subtitle2" >
                    Nghiệp đoàn: 4
                </Typography>
            </Alert>
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <TextField
                    sx={{ margin: "12px 0px", width: "50%" }}
                    size="small"
                    label="Nhập mã hoặc tên nhân viên"
                    variant="outlined"
                />
                <Button
                    sx={{
                        margin: "8px",
                        backgroundColor: "#1C2536",
                        color: "white",
                    }}
                    size="small"
                    variant="contained"
                >
                    Tìm kiếm
                </Button>
            </Box> */}
            <DataGrid
                rows={dataWithSTT}
                columns={columns}
                onRowDoubleClick={openDialogContact}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader': {
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}

                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[20, 50]}
                checkboxSelection
            />
            {/* <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            /> */}
            <ContactAdd
                open={isDialogOpen}
                onClose={closeDialog}
                id={selectedRow ? selectedRow.syndicateId : ""}
            />
            <ContactTable
                open={isDialogContactOpen}
                onClose={closeDialogContact}
                id={selectedRow ? selectedRow.syndicateId : ""}
            />
            <UnionEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                // id={selectedRow ? selectedRow.syndicateId : ""}
                rowData={selectedRow ? selectedRow : ""}
            />
            <UnionDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                id={selectedRow ? selectedRow.syndicateId : ""}
            />
        </div>
    );
}
