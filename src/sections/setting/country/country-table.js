import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { HANDLERS_COUNTRY } from "src/contexts/reducer/setting/reducer-country";
import { findCountryByIdApi, listCountryApi, updateCountryApi } from "src/contexts/api/setting/api-country";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import EditCountry from "./country-edit";

export default function TableCountry() {
    const [openEditCountry, setOpenEditCountry] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // Tìm kiếm
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');

    const [state, dispatch] = useApp();
    const { country } = state;
    const { countrys } = country;

    //Edit
    const handleOpenEditCountry = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setOpenEditCountry(true);
    };

    const handleCloseEditCountry = (isEvent) => {
        if (isEvent) {
            setOpenEditCountry(false);
            setSnackbarSeverity("success");
            setSnackbarMessage("Sửa thành công !");
            setSnackbarOpen(true);
        } else {
            setOpenEditCountry(false);
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // delete row
    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                LastModifiedByHidden: "1",
                CreatedByHidden: "1",
                CityIdHidden: "1"
            };

            dispatch({
                type: HANDLERS_COUNTRY.UPDATE_COUNTRY,
                payload: dataRowDelete,
            });

            const response = await updateCountryApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting country:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting country:", error);
        }
    };

    const handleViewDetail = (params) => {

        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listCountryApi();
                if (response.status === 200) {
                    dispatch({
                        type: HANDLERS_COUNTRY.LIST_COUNTRY,
                        payload: response.data
                    })
                }
            } catch (error) {
                console.error("Đã xảy ra lỗi!!!. Vui lòng kiểm tra lại", error)
            }
        }
        fetchData();
    }, [])

    const columns = [
        { field: "stt", headerName: "STT", width: 70 },
        { field: "name", headerName: "Tên quốc gia", width: 300 },
        { field: "code", headerName: "Mã quốc gia", width: 150 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditCountry}
                    params={params}
                    handleDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    // tim kiem
    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(countrys) ? countrys.map((items, index) => ({
            ...items,
            stt: index + 1,
            id: items.id || index + 1,
        })) : []

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [countrys]);

    // phuc vu tim kiem
    useEffect(() => {
        if (searchValue.length == 0) {
            // gia tri ban dau
            setFilteredRows(dataWithSTT);
        }
    }, [searchValue]);

    const handleCloseAlert = async () => {
        setIsAlertDialogOpen(false);
    };

    // phuc vu tim kiem
    const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findCountryByIdApi(searchValue);

            if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
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
    // end

    return (
        <Stack
            spacing={1}
            sx={{
                margin: "30px 0px",
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
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
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
            <Box style={{ height: 400, width: "100%" }}>
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
            <EditCountry
                open={openEditCountry}
                onClose={handleCloseEditCountry}
                id={selectedRow ? selectedRow.countryId : ""}
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
        </Stack>
    );
}
