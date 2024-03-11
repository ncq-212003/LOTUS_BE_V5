import React, { useState, useEffect } from "react";
import { useApp } from 'src/hooks/use-app';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import MarketEdit from './market-edit';
import ModalDetail from 'src/components/modal-detail';
import { HANDLERS_MARKET } from 'src/contexts/reducer/setting/reducer-market';
import SnackbarAlert from "src/components/action-notification";
import { editMarketApi, listMarketApi } from 'src/contexts/api/setting/api-market';

export default function MarketTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [state, dispatch] = useApp();
  const { market } = state;
  const { markets } = market;

  const listData = async () => {
    try {
      const res = await listMarketApi();
      dispatch({
        type: HANDLERS_MARKET.LIST_MARKET,
        payload: res.data || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    listData();
  }, [dispatch]);

  const dataMarket = Array.isArray(markets)
    ? markets.map((market, index) => ({
      ...market,
      stt: index + 1,
      id: market.marketId || index + 1,
    }))
    : [];

  // Function event Delete
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        createByHidden: "1",
        lastModifedByHidden: "1"
      };

      dispatch({
        type: HANDLERS_MARKET.UPDATE_MARKET,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await editMarketApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting market:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
        listData(); //gọi lại listData
      }
    } catch (error) {
      console.error("Error deleting market:", error);
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

  // Search
  const handleSearch = () => {
    const filteredData = dataMarket.filter(
      (row) =>
        row.marketId.includes(searchValue) ||
        (row.marketName ?? '').includes(searchValue) ||
        row.description.includes(searchValue)
    );

    dispatch({
      type: HANDLERS_MARKET.LIST_MARKET,
      payload: filteredData,
    });
  };

  // Enter Press
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const columns = [
    { field: 'stt', headerName: 'STT', width: 90 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 130,
      renderCell: (params) => (
        <img
          src={'https://lotus.i.tisbase.online' + params.value}
          alt={`Avatar-${params.row.marketId}`}
          style={{ width: 45, height: 45, borderRadius: '50%' }}
        />
      ),
    },
    // { field: 'marketId', headerName: 'Mã Nước', width: 90 },
    { field: 'marketName', headerName: 'Tên Nước', width: 130 },
    { field: 'status', headerName: 'Trạng Thái', width: 130 },
    { field: 'description', headerName: 'Giới Thiệu Chi Tiết', width: 180 },
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
          alignItems: 'center'
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: '50%' }}
          size="small"
          variant="outlined"
          label="Nhập nội dung tìm kiếm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: '#1C2536',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0c4da2',
            },
          }}
          size='small'
          variant="contained"
          onClick={handleSearch}
        >Tìm kiếm</Button>
      </Box>
      {dataMarket.length === 0 ? (
        <h2>No Data</h2>
      ) : (
        <DataGrid
          rows={dataMarket}
          columns={columns}
          sx={{
            borderColor: 'rgb(224, 224, 224)',
            '& .MuiDataGrid-row': {
              border: '0.1px solid rgb(224, 224, 224) !important',
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
      )}
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <MarketEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.marketId : null}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}