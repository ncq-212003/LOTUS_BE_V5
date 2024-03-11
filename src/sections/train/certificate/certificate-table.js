import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import { useApp } from 'src/hooks/use-app';
import ActionColumn from 'src/components/action-column ';
import CertificateEdit from './certificate-edit';
import ModalDetail from 'src/components/modal-detail';
import SnackbarAlert from "src/components/action-notification";
import styles from '../../../style/index.module.scss'
import { HANDLERS_CERTIFICATE } from 'src/contexts/reducer/train/reducer-certificate';
import { editCertificateApi,listCertificateApi } from 'src/contexts/api/train/api-certificate';

const rows = [];

export default function CertificateTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [state, dispatch] = useApp();
    const { certificate } = state;
    const { certificates } = certificate;

    const listData = async () => {
        try {
          const res = await listCertificateApi();
          dispatch({
            type: HANDLERS_CERTIFICATE.LIST_CERTIFICATE,
            payload: res.data || [],
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        listData();
      }, [dispatch]);
      
    const dataCertificate = Array.isArray(certificates) ? certificates.map((certificate, index) => ({
        ...certificate,
        stt: index + 1,
        id: certificates.certificateId || index + 1,
    })) : [];

    //Function event Delete
    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                CreatedByHidden: "1",
                LastModifiedByHidden: "1"
            };

            dispatch({
                type: HANDLERS_CERTIFICATE.UPDATE_CERTIFICATE,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await editCertificateApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting certificate:", response);
            } else {
                // Gọi lại ListCertificate cập nhật lại data
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
                listData();
            }
        } catch (error) {
            console.error("Error deleting certificate:", error);
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
            field: 'logo',
            headerName: 'Logo',
            width: 100,
            renderCell: (params) => (
                <img
                    src={'https://lotus.i.tisbase.online' + params.value}
                    alt={`Logo-${params.row.certificateId}`}
                    style={{ width: 45, height: 45, borderRadius: '50%' }}
                />
            ),
        },
        {
            field: 'code',
            headerName: 'Mã chứng chỉ',
            width: 130
        },
        {
            field: 'certificateName',
            headerName: 'Tên chứng chỉ',
            width: 130
        },
        {
            field: 'companyAprove',
            headerName: 'Tên đơn vị cấp',
            width: 130,
        },
        {
            field: 'certificateField',
            headerName: 'Chuyên ngành',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Thông Tin Chi Tiết',
            width: 150,
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
        <div style={{ width: '100%', marginTop: '50px' }}>
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
                    className={styles.btn}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            <DataGrid
                rows={dataCertificate}
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
            <CertificateEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.certificateId : null}
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