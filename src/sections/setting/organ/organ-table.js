import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import ActionColumn from 'src/components/action-column ';
import OrganEdit from './organ-edit';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_ORGAN } from 'src/contexts/reducer/setting/reducer-organ';
import { listOrganApi } from 'src/contexts/api/setting/api-organ';
import { useState, useEffect } from 'react';


export default function OrganTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [state, dispatch] = useApp();
    const { organ } = state;
    const { organs } = organ;

    //List Organ
    useEffect(() => {
        const listData = async () => {
            const res = await listOrganApi();
            dispatch({
                type: HANDLERS_ORGAN.LIST_ORGAN,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(organs);

    const dataWithSTT = Array.isArray(organs) ? organs.map((organ, index) => ({
        ...organ,
        id: index + 1 || organ.officeId,
    })) : [];

    console.log(dataWithSTT);
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
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'officeName', headerName: 'Tên cơ quan', width: 350 },
        { field: 'type', headerName: 'Loại giấy tờ', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'description', headerName: 'Mô tả', width: 200 },
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
            <OrganEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
