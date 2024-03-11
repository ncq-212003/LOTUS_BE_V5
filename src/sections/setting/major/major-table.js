import React, { useState, useEffect } from "react";
import { useApp } from 'src/hooks/use-app';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import ModalDetail from "../../../components/modal-detail";
import SnackbarAlert from "src/components/action-notification";
import ActionColumn from "src/components/action-column ";
import { editMajorApi, listMajorApi } from "src/contexts/api/setting/api-major";
import { HANDLERS_MAJOR } from "src/contexts/reducer/setting/reducer-major";
import MajorEdit from "./major-edit";

// Dữ liệu mẫu
const rows = [];

export default function DocumentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [state, dispatch] = useApp();
  const { major } = state;
  const { majors } = major;

  useEffect(() => {
    const listData = async () => {
      try {
        const res = await listMajorApi();
        dispatch({
          type: HANDLERS_MAJOR.LIST_MAJOR,
          payload: res.data || [],
        });
      } catch (error) {
        console.error("Error fetching major data:", error);
      }
    };
    listData();
  }, [dispatch]);
  
  const dataMajor = Array.isArray(majors)
    ? majors.map((major, index) => ({
        ...major,
        stt: index + 1,
        id: major.majorId || index + 1,
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
        type: HANDLERS_MAJOR.UPDATE_MAJOR,
        payload: dataRowDelete,
      });
  
      // Gọi hàm update
      const response = await editMajorApi(dataRowDelete);
  
      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting major:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
        listData(); 
      }
    } catch (error) {
      console.error("Error deleting major:", error);
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
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "majorName",
      headerName: "Tên chuyên ngành",
      width: 200,
    },
    {
      field: "timeTraining",
      headerName: "Thời gian đào tạo",
      width: 220,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 220,
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
          label="Nhập tên chuyên ngành"
          variant="outlined"
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={dataMajor}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc ",
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
      <MajorEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.majorId : null}
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
