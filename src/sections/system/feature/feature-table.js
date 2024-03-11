import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import ModalDetail from 'src/components/modal-detail';
import FeatureEdit from './feature-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_FEATURE } from 'src/contexts/reducer/system/reducer-feature';
import { listFeatureApi } from 'src/contexts/api/system/api-feature';
import { listModuleApi } from 'src/contexts/api/system/api-module';

export default function FeatureTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { feature } = state;
    const { features } = feature;
    const [moduleOption, setModuleOption] = useState([])

    React.useEffect(() => {
        const listData = async () => {
            const res = await listFeatureApi();
            dispatch({
                type: HANDLERS_FEATURE.LIST_FEATURE,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //List Module
    React.useEffect(() => {
        const listModuleName = async () => {
            const res = await listModuleApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const modules = res.data.map((md) => ({
                    label: md.moduleSystemName,
                    value: md.moduleSystemId,
                }));
                setModuleOption(modules);
            }
        };
        listModuleName();
    }, []);

    const dataWithSTT = Array.isArray(features) ? features.map((feature, index) => ({
        ...feature,
        stt: index + 1,
        id: feature.functionSystemId || index + 1,
        moduleName: moduleOption.find((md) => md.value === feature.moduleSystemId)?.label,
    })) : [];

    //Edit
    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        console.log(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    //Deatail
    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'functionName', headerName: 'Tên chức năng ', width: 150 },
        { field: 'moduleName', headerName: 'Tên Module ', width: 150 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
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

    console.log(dataWithSTT);

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
                    sx={{ margin: "8px 0px", width: '50%', padding: '4px ' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                />
                <Button
                    variant="contained"
                    sx={{
                        margin: '8px',
                        backgroundColor: "#1C2536",
                    }}
                >
                    Tìm kiếm
                </Button>
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
            <FeatureEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />

        </div>
    );
}