import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import CreateQuestionEdit from "./create-question-edit";
import { useState } from "react";
import { useEffect } from "react";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { useApp } from "src/hooks/use-app";
import { listCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { Box, Button, TextField } from "@mui/material";
import BootstrapButton from "src/components/button-custom-filter";

// Dữ liệu mẫu
// const rows = [
//   {
//     stt: 1,
//     id: 1,
//     questionName: "Bạn có người thân bên Nhật không",
//     type: "2",
//     category: "Người thân bên Nhật",
//     order: "1",
//     options: ["Có người thân bên nhật ", " Không có người thân bên nhật"],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 2,
//     id: 2,
//     questionName: "Quan hệ với bạn thế nào",
//     type: "1",
//     category: "Người thân bên Nhật",
//     order: "2",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 3,
//     id: 3,
//     questionName: "Thời gian tại Nhật",
//     type: "1",
//     category: "Người thân bên Nhật",
//     order: "3",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 4,
//     id: 4,
//     questionName: "Nơi làm việc",
//     type: "1",
//     category: "Người thân bên Nhật",
//     order: "4",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 5,
//     id: 5,
//     questionName: "Điện thoại/Facebook của họ",
//     type: "1",
//     category: "Người thân bên Nhật",
//     order: "5",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 6,
//     id: 6,
//     questionName: "Họ tên người thân tại Nhật",
//     type: "1",
//     category: "Người thân bên Nhật",
//     order: "6",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 7,
//     id: 7,
//     questionId: "7",
//     questionName: "Sở thích cá nhân",
//     type: "1",
//     category: "Sở thích tính cách",
//     order: "7",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
//   {
//     stt: 8,
//     id: 8,
//     questionName: "Nhược điểm",
//     type: "1",
//     category: "Sở thích tính cách",
//     order: "8",
//     options: [],
//     position: "Thực tập sinh",
//     required: "Có",
//   },
// ];

export default function CreateQuestionTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');
  const [filteredRows, setFilteredRows] = useState([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [marketOption, setMarketOption] = useState([]);
  const [cqaCategoryOption, setCqaCategoryOption] = useState([]);

  const [state, dispatch] = useApp();
  const { commonQuestionAsk } = state;
  const { commonQuestionAsks } = commonQuestionAsk;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCommonQuestionAsksApi();
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

  //listMartkets
  useEffect(() => {
    const listMartkets = async () => {
      const res = await listMarketApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.marketName,
          value: com.marketId,
        }));
        setMarketOption(data);
      }
    };
    listMartkets();
  }, []);

  //listCqaCategoryOption
  useEffect(() => {
    const listCqaCategoryOption = async () => {
      const res = await listCQACategoryApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((cqa) => ({
          label: cqa.cqaName,
          value: cqa.cqaCategoryId,
        }));
        setCqaCategoryOption(data);
      }
    };
    listCqaCategoryOption();
  }, []);

  const dataWithSTT = Array.isArray(commonQuestionAsks)
    ? commonQuestionAsks.map((x, index) => ({
        ...x,
        stt: index + 1,
        id: x.commonQuestionAskId || index + 1,
        marketName: marketOption.find((s) => s.value === x.marketId)?.label,
        category: cqaCategoryOption.find((s) => s.value === x.cqaCategoryId)?.label,
        type: x.type === 1 ? "Tự luận" : x.type === 2 ? "Lựa chọn" : "Ngày giờ",
        required: x.required === 1 ? "Yes" : "No",
      }))
    : [];

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  };

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleSearch = () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
    } else {
      console.log("Giá trị tìm kiếm: ", searchValue);
    }
  };

  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
      };

      // dispatch({
      //   type: HANDLERS_STATUS.UPDATE_STATUS,
      //   payload: dataRowDelete,
      // });

      // Gọi hàm update
      // const response = await updateStatusApi(dataRowDelete);

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

  const handleFilter = (filterType) => {
    let filteredData = dataWithSTT;

    // Cập nhật trạng thái activeFilter khi người dùng chọn nút
    setActiveFilter(filterType);

    switch (filterType) {
      case "Tất cả":
        filteredData = dataWithSTT;
        break;
      case "Thực tập sinh":
        filteredData = dataWithSTT.filter((row) => row.positionLocated === "Thực tập sinh");
        break;
      case "Du học sinh":
        filteredData = dataWithSTT.filter((row) => row.positionLocated === "Du học sinh");
        break;
      // Thêm các trường hợp lọc khác tại đây
      default:
        filteredData = dataWithSTT;
        break;
    }
    setFilteredRows(filteredData);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 30 },
    {
      field: "market",
      headerName: "Thị trường",
      width: 150,
    },
    {
      field: "position",
      headerName: "Vị trí câu hỏi",
      width: 110,
    },
    {
      field: "questionName",
      headerName: "Tên câu hỏi",
      width: 180,
    },
    {
      field: "category",
      headerName: "Nhóm câu hỏi",
      width: 180,
    },
    {
      field: "type",
      headerName: "Kiểu câu hỏi",
      width: 100,
    },
    {
      field: "order",
      headerName: "Thứ tự câu hỏi",
      width: 100,
    },
    {
      field: "required",
      headerName: "Yêu cầu bắt buộc",
      width: 110,
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
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    email: false,
    sdt: false,
    website: false,
    masothue: false,
    giakinhdoanh: false,
    logo: false,
    nguoidaidien: false,
    chinhanh: false,
    ngaythanhlap: false,
    moTa: false,
    ghiChu: false,
  });
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
          label="Nhập tên vị trí cần tìm kiếm"
          variant="outlined"
          value={searchValue}
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
      <Box>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "#1C2536" : "#4b9949",
          }}
        >
          Tất cả
        </BootstrapButton>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Thực tập sinh")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Thực tập sinh" ? "#1C2536" : "#4b9949",
          }}
        >
          Thực tập sinh
        </BootstrapButton>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Du học sinh")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Du học sinh" ? "#1C2536" : "#4b9949",
          }}
        >
          Du học sinh
        </BootstrapButton>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <CreateQuestionEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
