import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import EditAirport from "./airport-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { HANDLERS_AIRPORT } from "src/contexts/reducer/setting/reducer-airport";
import { listAirPortApi, updateAirPortApi, findAirPortByIdApi } from "src/contexts/api/setting/api-airport";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import { listCountryApi } from "src/contexts/api/setting/api-country";

export default function TableAirport() {
    const [openEditAirport, setOpenEditAirport] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listNameCountry, setListNameCountry] = useState([]);
    // Tìm kiếm
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');

    const [state, dispatch] = useApp();
    const { airport } = state;
    const { airports } = airport;

    //Edit
    const handleOpenEditAirport = (params) => {
        setSelectedRow(params.row); //lay gia tri cua dong do 
        setOpenEditAirport(true);
    };

    const handleCloseEditAirport = (isEvent) => {
        if (isEvent) {
            setOpenEditAirport(false);
            setSnackbarSeverity("success");
            setSnackbarMessage("Sửa thành công !");
            setSnackbarOpen(true);
        } else {
            setOpenEditAirport(false);
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
                type: HANDLERS_AIRPORT.UPDATE_AIRPORT,
                payload: dataRowDelete,
            });

            const response = await updateAirPortApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting airport:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting airport:", error);
        }
    };

    const handleViewDetail = (params) => {

        setSelectedRow(params.row); //lay gia tri cua dong do 
        setIsModalDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsModalDetailOpen(false);
    }
    const countries = [
        { code: 'VN', label: 'Việt Nam' },
        { code: 'KP', label: 'Hàn Quốc' },
        { code: 'JP', label: 'Nhật Bản' },
        { code: 'CN', label: 'China' },
        { code: 'TH', label: 'Thái Lan' },
        { code: 'AI', label: 'Anguilla' },
    ]
    useEffect(() => {
        const fetchData = async () => {
            const response = await listCountryApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listCountryName = response.data.map((items) => ({
                    countryCode: items.code,
                    countryName: items.name
                }))
                setListNameCountry(listCountryName);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listAirPortApi();
                if (response.status === 200) {
                    dispatch({
                        type: HANDLERS_AIRPORT.LIST_AIRPORT,
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
        { field: "airportName", headerName: "Tên sân bay", width: 300 },
        { field: "nameCountry", headerName: "Tên quốc gia", width: 150 },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={handleOpenEditAirport}
                    params={params}
                    handleDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    // tim kiem
    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(airports) ? airports.map((airport, index) => ({
            ...airport,
            stt: index + 1,
            id: airport.id || index + 1,
            nameCountry: listNameCountry.find((coun) => coun.countryCode === airport.countryCode)?.countryName
        })) : []

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [airports]);

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
            const result = await findAirPortByIdApi(searchValue);

            if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
                const data = [result.data];

                const rowsWithId = data.map((item, index) => ({
                    ...item,
                    stt: index + 1,
                    id: new Date().valueOf(),
                    nameCountry: listNameCountry.find((coun) => coun.countryCode === item.countryCode)?.countryName
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
            <EditAirport
                open={openEditAirport}
                onClose={handleCloseEditAirport}
                id={selectedRow ? selectedRow.airportId : ""}
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
