import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import ActionColumn from "src/components/action-column ";
import { listCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { HANDLERS_CQACATEGORY } from "src/contexts/reducer/setting/reducer-cqa-category";
import EthnicEdit from "../ethnicity/ethnicity-edit";
import SnackbarAlert from "src/components/action-notification";
import { useState } from "react";
import QuestionGroupEdit from "./question-group-edit";

// const rows = [
//   {
//     id: 1,
//     stt: 1,
//     NhomCauHoi: "Người thân bên Nhật",
//     GhiChu: "1",
//   },
//   {
//     id: 2,
//     stt: 2,
//     NhomCauHoi: "Sở thích tính cách",
//     GhiChu: "2",
//   },
//   {
//     id: 3,
//     stt: 3,
//     NhomCauHoi: "Tài chính sơ tuyển",
//     GhiChu: "3",
//   },
//   {
//     id: 4,
//     stt: 4,
//     NhomCauHoi: "Nguyện vọng đăng ký",
//     GhiChu: "4",
//   },
// ];

export default function QuestionGroupTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [state, dispatch] = useApp();
  const { cqaCategory } = state;
  const { cqaCategories } = cqaCategory;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCQACategoryApi();
        if (response.status == 200) {
          dispatch({
            type: HANDLERS_CQACATEGORY.LIST_CQACATEGORY,
            payload: response.data,
          });
        }
      } catch (error) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, []);

  const dataWithSTT = Array.isArray(cqaCategories)
    ? cqaCategories.map((x, index) => ({
        ...x,
        stt: index + 1,
        id: x.cqaCategoryId || index + 1,
      }))
    : [];

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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
        marketIdHidden: row.marketId,
      };

      dispatch({
        type: HANDLERS_ETHNIC.UPDATE_ETHNIC,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await updateEthnicApi(dataRowDelete);

      console.log(response);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting market:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting market:", error);
    }
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "cqaName",
      headerName: "Nhóm câu hỏi",
      width: 200,
    },
    {
      field: "orderCategory",
      headerName: "Thứ tự",
      width: 200,
    },
    {
      field: "description",
      headerName: "Ghi Chú",
      width: 300,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="edit" // chỉ hiển thị nút "Chỉnh sửa"
          />
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="delete" // chỉ hiển thị nút "Xóa"
          />
        </>
      ),
    },
  ];

  const handleSearch = () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
    } else {
      console.log("Giá trị tìm kiếm: ", searchValue);
    }
  };

  const handleCloseAlert = async () => {
    setIsAlertDialogOpen(false);
  };

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
          label="Nhập nhóm câu hỏi"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
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
      <DataGrid
        rows={dataWithSTT}
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <QuestionGroupEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.cqaCategoryId : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />

      {/*  alert when value search null */}
      <Dialog open={isAlertDialogOpen} onClose={handleCloseAlert}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Bạn phải nhập giá trị để tìm kiếm`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
