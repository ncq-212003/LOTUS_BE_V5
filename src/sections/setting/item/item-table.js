import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useApp } from 'src/hooks/use-app';
import { Box, Button, TextField } from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import styles from '../../../style/index.module.scss';
import ItemEdit from './item-edit';
import ModalDetail from 'src/components/modal-detail';
import SnackbarAlert from "src/components/action-notification";
import { editItemApi, listItemApi } from '../../../contexts/api/setting/api-item';
import { HANDLERS_ITEM } from 'src/contexts/reducer/setting/reducer-item';
import { listRoomApi } from 'src/contexts/api/setting/api-room';


const ItemTable = forwardRef(({ onExport }, ref) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [ClassOptions, setClassOptions] = useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [state, dispatch] = useApp();
  const { item } = state;
  const { items } = item;

  useEffect(() => {
    const listData = async () => {
      try {
        const res = await listRoomApi();
        if (Array.isArray(res.data) && res.data.length > 0) {
          const data = res.data.map((com) => ({
            label: com.dormitoryRoomColumn,
            value: com.dormitoryId,
          }));
          setClassOptions(data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    listData();
  }, []);

  const dataItems = Array.isArray(items) ? items.map((item, index) => ({
    ...item,
    stt: index + 1,
    id: item.assetId || index + 1,
    dormitoryRoomColumn: ClassOptions.find((s) => s.label === item.name)?.label,
  })) : [];  

  // List Item api
  const listData = async () => {
    try {
      const res = await listItemApi();
      dispatch({
        type: HANDLERS_ITEM.LIST_ITEM,
        payload: res.data || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    listData();
  }, [dispatch]);

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
        type: HANDLERS_ITEM.EDIT_ITEM,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await editItemApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
        listData(); 
      }
    } catch (error) {
      console.error("Error deleting:", error);
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = filteredRows.filter(
      (row) =>
        row.maphong.toString().toLowerCase().includes(searchTerm) ||
        row.mataisan.toLowerCase().includes(searchTerm) ||
        (row.tentaisan && row.tentaisan.toLowerCase().includes(searchTerm))
    );
    setFilteredRows(filteredData);
  };

  const columns = [
    { field: 'stt', headerName: 'STT', width: 90 },
    { field: 'code', headerName: 'Mã Tài Sản - Vật Dụng', width: 200 },
    { field: 'dormitoryRoomColumn', headerName: 'Tên phòng', width: 160 },
    { field: 'assetName', headerName: 'Tên Tài Sản - Vật Dụng', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 200 },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 150,
      headerAlign: 'center',
      align: 'center',
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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{
            margin: '12px 0px',
            width: '50%',
          }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
          onChange={handleSearch}
        />
        <Button
          className={styles.btn}
          size="small"
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: '#0c4da2',
            },
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={dataItems}
        columns={columns}
        sx={{
          borderColor: 'rgb(224, 224, 224)',
          '& .MuiDataGrid-row': {
            border: '0.1px solid rgb(224, 224, 224) !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ccc ',
            backgroundColor: '#f0f0f0',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <ItemEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.assetId : null}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
});

export default ItemTable;
