import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useApp } from "src/hooks/use-app";
import { ListDocumentApi, updateDocumentApi, findDocumentByIdApi } from "src/contexts/api/setting/api-document";
import { HANDLERS_DOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import EditDocument from "./document-edit";
import SnackbarAlert from "src/components/action-notification";

export default function DocumentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // Tìm kiếm
  const [dataWithSTT, setDataWithSTT] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [textAlertForNotify, setTextAlertForNotify] = useState('');
  const [state, dispatch] = useApp();
  const { document } = state;
  const { documents } = document;

  const [paper, setPaper] = useState([
    { id: 1, name: "Căn cước công dân/ CMND" },
    { id: 2, name: "Giấy xác nhận" },
    { id: 3, name: "Loại thông báo" },
  ]);

  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
        PaperOrderHidden: "1"
      };

      dispatch({
        type: HANDLERS_DOCUMENT.UPATE_DOCUMENTS,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await updateDocumentApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting documents:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListDocumentApi();
        if (response.status == 200) {
          dispatch({
            type: HANDLERS_DOCUMENT.LIST_DOCUMENTS,
            payload: response.data,
          });
        }
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, []);

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = isEvent => {
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

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 50 },
    { field: "typePaper", headerName: "Loại giấy tờ", width: 250 },
    { field: "paperName", headerName: "Tên giấy tờ", width: 200 },
    { field: "paperOrder", headerName: "Thứ tự", width: 100 },
    { field: "field2", headerName: "Mã giấy tờ", width: 150 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  // tim kiem
  useEffect(() => {
    // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
    const updatedDataWithSTT = Array.isArray(documents) ? documents.map((doc, index) => ({
      ...doc,
      stt: index + 1,
      id: doc.id || index + 1,
      typePaper: paper.find(items => items.id === (parseInt(doc.field1) || 0))?.name
    })) : []

    setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
    setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
  }, [documents]);

  // phuc vu tim kiem
  useEffect(() => {
    if (searchValue.length == 0) {
      // gia tri ban dau
      setFilteredRows(dataWithSTT);
    }
  }, [searchValue]);

  const handleCloseAlert = async () => {
    setIsAlertDialogOpen(false);
  };

  // phuc vu tim kiem
  const handleSearch = async () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
      setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
    } else {
      const result = await findDocumentByIdApi(searchValue);

      if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
        const data = [result.data];

        const rowsWithId = data.map((item, index) => ({
          ...item,
          stt: index + 1,
          id: new Date().valueOf(),
          typePaper: paper.find(items => items.id === (parseInt(item.field1) || 0))?.name
        }));
        setFilteredRows(rowsWithId);
      } else {
        setIsAlertDialogOpen(true);
        setTextAlertForNotify("Không tìm thấy kết quả");
      }
    }
  };
  // end

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập loại giấy tờ"
          variant="outlined"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Box>
      <Box style={{ width: "100%" }}>
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
          pageSizeOptions={[20, 50]}
          checkboxSelection
        />
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditDocument
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.paperId : ""}
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
