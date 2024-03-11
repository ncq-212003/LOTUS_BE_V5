import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import SnackbarAlert from "src/components/action-notification";
import NotificationEdit from './notification-edit';
import ModalDetail from 'src/components/modal-detail';
import { editNotificationApi, listNotificationApi } from "src/contexts/api/company/api-notification";
import { HANDLERS_NOTIFICATION } from "src/contexts/reducer/company/reducer-notification";

const rows = [];

export default function NotificationTable() {

    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [state, dispatch] = useApp();
    const { notification } = state;
    const { notifications } = notification;

    const listData = async () => {
        try {
            const res = await listNotificationApi();
            dispatch({
                type: HANDLERS_NOTIFICATION.LIST_NOTIFICATION,
                payload: res.data || [],
            });
        } catch (error) {
            console.error("Error fetching notification data:", error);
        }
    };
    
    useEffect(() => {
        listData();
    }, [dispatch]);    

    const dataNotification = Array.isArray(notifications)
        ? notifications.map((notification, index) => ({
            ...notification,
            stt: index + 1,
            id: notification.messageId || index + 1,
        }))
        : [];

    // Function event Delete
    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                CreatedByHidden: "1",
                LastModifiedByHidden: "1"
            };

            dispatch({
                type: HANDLERS_NOTIFICATION.UPDATE_NOTIFICATION,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await editNotificationApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting configsystem:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
                listData();
            }
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

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

    const columns = [
        {
            field: 'stt',
            headerName: 'STT',
            width: 70
        },
        {
            field: 'title',
            headerName: 'Tiêu đề',
            width: 130
        },
        {
            field: 'messageContent',
            headerName: 'Nội dung',
            width: 130
        },
        {
            field: 'createdBy',
            headerName: 'Người tạo thông báo',
            width: 150
        },
        {
            field: 'createdAt',
            headerName: 'Ngày thông báo',
            width: 150,
            valueFormatter: (params) => {
              const date = new Date(params.value);
              return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            },
          },
        {
            field: 'priority',
            headerName: 'Mức độ',
            width: 100,
        },
        {
            field: 'description',
            headerName: 'Mô tả',
            width: 100,
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={openDialogEdit}
                    params={params}
                    buttonType={null}
                    handleDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    return (
        <div style={{width: '100%', marginTop: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "12px 0px", width: '50%' }}
                    variant="outlined"
                    size='small'
                    label="Nhập nội dung tìm kiếm"
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
            <DataGrid
                rows={dataNotification}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
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
            <NotificationEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.messageId : null}
            />
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </div>
    );
}