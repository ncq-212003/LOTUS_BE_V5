/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { useEffect } from 'react';
import { useState } from 'react';
import { listStatusApi } from 'src/contexts/api/setting/api-status';
import { HANDLERS_STATUS } from 'src/contexts/reducer/setting/reducer-status';
import StatusEdit from './vocabulary-edit';
import BootstrapButton from 'src/components/button-custom-filter';
import { findVocabularyByIdApi, listVocabularyApi, updateVocabularyApi } from 'src/contexts/api/setting/api-vocabulary';
import { HANDLERS_VOCABULARY } from 'src/contexts/reducer/setting/reducer-vocabulary';
import SnackbarAlert from 'src/components/action-notification';

// Dữ liệu mẫu
const rows = [];

const filterNames = [
    'Tất cả',
    'Việt',
    'Nhật',
    'Hàn',
    'Anh',
];

export default function VocabularyTable() {
    // state
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [filteredRows, setFilteredRows] = useState(rows);
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');
    // context
    const [state, dispatch] = useApp();
    const { vocabulary } = state;
    const { vocabularies } = vocabulary;

    useEffect(() => {
        const listData = async () => {
            const res = await listVocabularyApi();
            dispatch({
                type: HANDLERS_VOCABULARY.LIST_VOCABULARY,
                payload: res.data,
            });
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(vocabularies) ? vocabularies.map((x, index) => ({
            ...x,
            stt: index + 1,
            id: x.id || index + 1,
        })) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [vocabularies]);

    //Detail 
    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };
    //Edit
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

    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                CreatedByHidden: "1",
                LastModifiedByHidden: "1"
            };

            dispatch({
                type: HANDLERS_VOCABULARY.UPDATE_VOCABULARY,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await updateVocabularyApi(dataRowDelete);

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
        { field: 'vocalbularyRoot', headerName: 'Từ dịch', width: 150 },
        { field: 'language', headerName: 'Dịch sang', width: 150 },
        { field: 'vocalbularyTranslate', headerName: 'Nghĩa', width: 150 },
        { field: 'description', headerName: 'Ghi chú', width: 120 },
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

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({

    });

    const handleFilter = (filterType) => {
        let filteredData = dataWithSTT;

        // Cập nhật trạng thái activeFilter khi người dùng chọn nút
        setActiveFilter(filterType);

        if (filterType === 'Tất cả') {
            // Nếu là tất cả, hiển thị toàn bộ dữ liệu
            setFilteredRows(dataWithSTT);
        } else {
            // Ngược lại, lọc dữ liệu theo language
            filteredData = dataWithSTT.filter(row => row.language === filterType);
            setFilteredRows(filteredData);
        }
    }

    const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findVocabularyByIdApi(searchValue);

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
        if (searchValue.length == 0) {
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
                    label="Nhập từ dịch tìm kiếm"
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
            <Box>
                {filterNames.map(filterName => (
                    <BootstrapButton
                        key={filterName}
                        size='small'
                        onClick={() => handleFilter(filterName)}
                        variant="contained"
                        sx={{
                            backgroundColor: activeFilter === filterName ? '#1C2536' : '#4b9949',
                        }}
                    >
                        {filterName}
                    </BootstrapButton>
                ))}
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
            />
            <StatusEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.vocalbularyId : ""}
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