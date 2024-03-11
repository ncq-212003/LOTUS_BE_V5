/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import MenuEdit from './menu-edit';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_MENU } from 'src/contexts/reducer/setting/reducer-menu';
import { findMenuByIdApi, listMenuApi, updateMenuApi } from 'src/contexts/api/setting/api-menu';
import { useEffect } from 'react';
import { useState } from 'react';
import SnackbarAlert from 'src/components/action-notification';

// Dữ liệu mẫu
const rows = [];

export default function MenuTable() {
    // state
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [parentNameOption, setParentNameOption] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');
    // context
    const [state, dispatch] = useApp();
    const { menu } = state;
    const { menus } = menu;

    useEffect(() => {
        const listData = async () => {
            const res = await listMenuApi();
            dispatch({
                type: HANDLERS_MENU.LIST_MENU,
                payload: res.data,
            });
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(menus) ? menus.map((menu, index) => ({
            ...menu,
            stt: index + 1,
            id: menu.id || index + 1,
            parentName: parentNameOption.find((com) => com.sMenuId === menu.sParentId)?.sMenuName,
        })) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [menus]);

    // list parentName
    useEffect(() => {
        const listParentName = async () => {
            const res = await listMenuApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const parent = res.data.map((com) => ({
                    sMenuName: com.sMenuName,
                    sMenuId: com.sMenuId,
                }));
                setParentNameOption(parent);
            }
        };
        listParentName();
    }, []);

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
                LastModifiedByHidden: "1",
                SParentIdHidden: "0",
            };

            dispatch({
                type: HANDLERS_MENU.UPDATE_MENU,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await updateMenuApi(dataRowDelete);

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
        { field: 'sMenuName', headerName: 'Tên', width: 150 },
        {
            field: 'sMenuIcon',
            headerName: 'Biểu tượng',
            width: 130,
        },
        { field: 'field1', headerName: 'Thứ tự giao diện', width: 150 },
        { field: 'sMenuLink', headerName: 'Liên kết', width: 150 },
        {
            field: 'parentName',
            headerName: 'Mục cha',
            width: 230,
            renderCell: (params) => (
                <span>{params.value || "Không thuộc mục nào"}</span>
            ),
        },
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

    const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findMenuByIdApi(searchValue);

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
                    label="Nhập tên menu tìm kiếm"
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
            />
            <MenuEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.sMenuId : ""}
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