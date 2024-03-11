/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import CompanyEdit from './company-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { useEffect } from 'react';
import { findCompanyByIdApi, listCompanyApi, updateCompanyApi } from 'src/contexts/api/company/api-company';
import { HANDLERS_COMPANY } from 'src/contexts/reducer/company/reducer-company';
import { format } from 'date-fns';
import { useState } from 'react';
import SnackbarAlert from 'src/components/action-notification';

const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
};

export default function CompanyTable() {
    // state
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');
    // context
    const [state, dispatch] = useApp();
    const { company } = state;
    const { companies } = company;

    useEffect(() => {
        const listData = async () => {
            const res = await listCompanyApi();
            dispatch({
                type: HANDLERS_COMPANY.LIST_COMPANY,
                payload: res.data,
            });
        };
        listData();
    }, []);

    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(companies[0]) ? companies[0].map((x, index) => ({
            ...x,
            stt: index + 1,
            id: x.id || index + 1,
        })) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [companies[0]]);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = (isEvent) => {
        if (isEvent) {
            setisDialogEditOpen(false);
            setSnackbarSeverity("success");
            setSnackbarMessage("Sửa thành công !");
            setSnackbarOpen(true);
        } else {
            setisDialogEditOpen(false);
        }
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                CreatedByHidden: "1",
                LastModifedByHidden: "1"
            };

            dispatch({
                type: HANDLERS_COMPANY.UPDATE_COMPANY,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await updateCompanyApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting market:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting market:", error);
        }
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        {
            field: 'logo',
            headerName: 'Logo',
            width: 120,
            renderCell: (params) => (
                <Avatar
                    src={'https://lotus.i.tisbase.online' + params.row.logo}
                    alt="Logo"
                    sx={{ width: 40, height: 40 }}
                >Logo</Avatar>
            ),
        },
        { field: 'companyName', headerName: 'Tên công ty', width: 200 },
        { field: 'briefCode', headerName: 'Mã công ty', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'email', headerName: 'Email', width: 120 },
        { field: 'telephone', headerName: 'Số điện thoại', width: 120 },
        { field: 'website', headerName: 'Website', width: 120 },
        { field: 'taxCode', headerName: 'Mã số thuế', width: 120 },
        { field: 'typeCompany', headerName: 'Loại công ty', width: 120 },
        { field: 'licenseBusiness', headerName: 'File thông tin khác', width: 120 },
        {
            field: 'personResponsibilty',
            headerName: 'Người đại diện',
            width: 180,
            renderCell: (params) => (
                <span>{params.value}</span>
            ),
        },
        { field: 'personResponsibiltyRole', headerName: 'Chức vụ', width: 120 },
        {
            field: 'establishCompanyDate',
            headerName: 'Ngày thành lập',
            width: 120,
            renderCell: (params) => (
                <span>{formatDate(params.value)}</span>
            ),
        },
        { field: 'fanpage', headerName: 'Fanpage công ty', width: 120 },
        { field: 'description', headerName: 'Ghi chú', width: 120 },
        { field: 'status', headerName: 'Trạng thái', width: 120 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={openDialogEdit}
                    params={params}
                    handleDelete={() => handleDelete(params.row)}
                />
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        email: false,
        telephone: false,
        website: false,
        taxCode: false,
        licenseBusiness: false,
        personResponsibilty: false,
        personResponsibiltyRole: false,
        establishCompanyDate: false,
        fanpage: false,
        description: false,
        typeCompany: false,
    });

    const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findCompanyByIdApi(searchValue);

            if (result.data != '') {
                const data = [result.data];

                const rowsWithId = data.map((item, index) => ({
                    ...item,
                    stt: index + 1,
                    id: new Date().valueOf(),
                }));

                setFilteredRows(rowsWithId);
            } else {
                setIsAlertDialogOpen(true);
                setTextAlertForNotify("Không tìm thấy kết quả");
            }
        }
    };

    // phuc vu tim kiem
    useEffect(() => {
        if(searchValue.length == 0) {
            setFilteredRows(dataWithSTT);
        }
    }, [searchValue]);

    const handleCloseAlert = async () => {
        setIsAlertDialogOpen(false);
    };

    return (
        <div style={{ width: '100%' }}>
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
                    label="Nhập tên công ty tìm kiếm"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button
                    sx={{
                        margin: '8px',
                        backgroundColor: '#1C2536',
                        color: 'white'
                    }}
                    size='small'
                    variant="contained"
                    onClick={handleSearch}
                >Tìm kiếm</Button>
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
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
                typeDateTime={{ establishCompanyDate: 'dd-MM-yyyy' }}
                dateTimeFields={{ establishCompanyDate: true }}
            />
            <CompanyEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.companyId : ""}
            />
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
            {/*  alert when value search null */}
            <Dialog
                open={isAlertDialogOpen}
                onClose={handleCloseAlert}
            >
                <DialogTitle>Thông báo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {textAlertForNotify}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAlert}
                        autoFocus
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
