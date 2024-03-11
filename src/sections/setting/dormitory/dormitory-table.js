import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import ModalDetail from 'src/components/modal-detail';
import DormitoryEdit from './dormitory-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_DORMITORY } from 'src/contexts/reducer/setting/reducer-dormitory';
import { listDormitoryApi } from 'src/contexts/api/setting/api-dormitory';
import { listCompanyApi } from 'src/contexts/api/company/api-company';


export default function DormitoryTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [state, dispatch] = useApp();
    const { dormitory } = state;
    const { dormitories } = dormitory;
    const [companyOption, setCompanyOption] = useState([])

    //List Company
    useEffect(() => {
        const listCompanyName = async () => {
            const res = await listCompanyApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const companies = res.data.map((com) => ({
                    label: com.companyName,
                    value: com.companyId,
                }));
                setCompanyOption(companies);
                console.log(companies);
            }
        };
        listCompanyName();
    }, []);

    useEffect(() => {
        const listData = async () => {
            const res = await listDormitoryApi();
            dispatch({
                type: HANDLERS_DORMITORY.LIST_DORMITORY,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataWithSTT = Array.isArray(dormitories) ? dormitories.map((dormitory, index) => ({
        ...dormitory,
        stt: index + 1,
        id: dormitory.id || index + 1,
        companyName: companyOption.find((com) => com.value === dormitory.companyId)?.label,

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
        { field: 'companyName', headerName: 'Thuộc công ty', width: 150 },
        { field: 'code', headerName: 'Mã khu KTX', width: 130 },
        { field: 'dormitoryName', headerName: 'Tên ký túc xá', width: 150 },
        { field: 'address', headerName: 'Địa chỉ', width: 230 },
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
            <DormitoryEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
