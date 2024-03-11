import * as React from 'react';
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import RegionEdit from './region-edit';
import { useApp } from "src/hooks/use-app";
import { HANDLERS_REGION } from "src/contexts/reducer/setting/reducer-region";
import { listRegionApi, updateRegionApi, findRegionByIdApi } from "src/contexts/api/setting/api-region";
import { listMarketApi } from 'src/contexts/api/setting/api-market';
import SnackbarAlert from 'src/components/action-notification';

export default function RegionTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [listMarket, setListMarket] = useState([]);
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
    const { region } = state;
    const { regions } = region;

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
                MarketIdHidden: '1'
            };

            dispatch({
                type: HANDLERS_REGION.UPDATE_REGION,
                payload: dataRowDelete,
            });

            const response = await updateRegionApi(dataRowDelete);
            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting region:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting region:", error);
        }
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    // Danh sách thị trường 
    useEffect(() => {
        const fetchData = async () => {
            const response = await listMarketApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listData = response.data.map((items) => (
                    {
                        maketId: items.marketId,
                        maketName: items.marketName
                    }
                ))
                setListMarket(listData);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listRegionApi();
                if (response.status === 200) {
                    dispatch({
                        type: HANDLERS_REGION.LIST_REGION,
                        payload: response.data
                    })
                }
            } catch (error) {
                console.log("Đã xảy ra lỗi !!!", error)
            }
        };
        fetchData();
    }, [])

    const countries = [
        { code: 'KP', label: 'Korea' },
        { code: 'AI', label: 'Anguilla' },
        { code: 'JP', label: 'Japan' },
        { code: 'CN', label: 'China' },
        { code: 'FR', label: 'France' },
        { code: 'VN', label: 'VietNam' },
    ]

    const regionTable = Array.isArray(regions) ? regions.map((reg, index) => ({
        ...reg,
        stt: index + 1,
        id: reg.positionId || index + 1,
        maketNames: listMarket.find((market) => market.maketId === reg.marketId)?.maketName
    })) : [];

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'maketNames', headerName: 'Thị Trường', width: 150 },
        { field: 'positionName', headerName: 'Vùng', width: 180 },
        { field: 'positionOtherName', headerName: 'Tên riêng', width: 200 },
        // { field: 'description', headerName: 'Ghi chú', width: 200 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                        handleDelete={() => handleDelete(params.row)}
                    />
                </>
            ),
        }
    ];

    // tim kiem
    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(regions) ? regions.map((reg, index) => ({
            ...reg,
            stt: index + 1,
            id: reg.id || index + 1,
            maketNames: listMarket.find((market) => market.maketId === reg.marketId)?.maketName
        })) : [];
        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [regions]);

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
            const result = await findRegionByIdApi(searchValue);

            if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
                const data = [result.data];

                const rowsWithId = data.map((item, index) => ({
                    ...item,
                    stt: index + 1,
                    id: new Date().valueOf(),
                    maketNames: listMarket.find((market) => market.maketId === item.marketId)?.maketName
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
        <div style={{ height: 400, width: '100%' }}>
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
            <DataGrid
                rows={filteredRows}
                columns={columns}
                autoHeight
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
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <RegionEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.positionId : ""}
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
        </div >
    );
}