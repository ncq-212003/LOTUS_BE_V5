import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import RoomEdit from './room-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_ROOM } from 'src/contexts/reducer/setting/reducer-room';
import { listRoomApi } from 'src/contexts/api/setting/api-room';
import { listDormitoryApi } from 'src/contexts/api/setting/api-dormitory';
import { useState, useEffect } from 'react';

export default function RoomTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { room } = state;
    const { rooms } = room;
    const [dormitoryOption, setDormitoryOption] = useState([])

    //List Dormitory
    useEffect(() => {
        const listDormitoryName = async () => {
            const res = await listDormitoryApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const dormitories = res.data.map((d) => ({
                    label: d.dormitoryName,
                    value: d.dormitoryId,
                }));
                setDormitoryOption(dormitories);
            }
        };
        listDormitoryName();
    }, []);

    useEffect(() => {
        const listData = async () => {
            const res = await listRoomApi();
            dispatch({
                type: HANDLERS_ROOM.LIST_ROOM,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataWithSTT = Array.isArray(rooms) ? rooms.map((room, index) => ({
        ...room,
        stt: index + 1,
        id: room.id || index + 1,
        dormitoryName: dormitoryOption.find((d) => d.value === room.dormitoryId)?.label,
    })) : [];
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

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };


    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'dormitoryName', headerName: 'Tên ký túc xá', width: 200 },
        { field: 'code', headerName: 'Mã phòng', width: 130 },
        { field: 'dormitoryRoomColumn', headerName: 'Tên phòng', width: 200 },
        { field: 'status', headerName: 'Trạng thái', width: 120 },
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
                    />
                </>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({

    });




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
                rows={dataWithSTT}
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
            <RoomEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
