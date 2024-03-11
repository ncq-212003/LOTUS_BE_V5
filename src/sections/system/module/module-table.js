import * as React from 'react';
import { AppBar, Button, Dialog, IconButton, SvgIcon, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import ModalDetail from 'src/components/modal-detail';
import ModuleEdit from './module-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_MODULE } from 'src/contexts/reducer/system/reducer-module';
import { listModuleApi } from 'src/contexts/api/system/api-module';


export default function ModuleTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { module } = state;
    const { modules } = module;

    React.useEffect(() => {
        const listData = async () => {
            const res = await listModuleApi();
            dispatch({
                type: HANDLERS_MODULE.LIST_MODULE,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataWithSTT = Array.isArray(modules) ? modules.map((module, index) => ({
        ...module,
        stt: index + 1,
        id: module.id || index + 1,
    })) : [];




    //Edit
    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    //Detail
    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'moduleSystemName', headerName: 'Tên module', width: 150 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
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

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <TextField sx={{ margin: "8px 0px", width: '50%', padding: '4px ' }} size="small" label="Nhập nội dung tìm kiếm" />
                <Button variant="contained" sx={{ margin: '8px', backgroundColor: "#1C2536" }}>Tìm kiếm</Button>
            </Box>
            <DataGrid
                rows={dataWithSTT}
                columns={columns}
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
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[20, 50]}
                disableRowSelectionOnClick
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <ModuleEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
