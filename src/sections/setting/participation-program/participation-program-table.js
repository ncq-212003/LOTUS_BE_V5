import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { ListDocumentApi } from "src/contexts/api/setting/api-document";
import { HANDLERS_DOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import { useEffect } from "react";


export default function ParticipationProgramTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [state, dispatch] = useApp();
  const { document } = state;
  const { documents } = document;

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

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "chuongTrinhThamgia",
      headerName: "Chương trình",
      width: 200,
    },
    {
      field: "ghiChu",
      headerName: "Ghi chú",
      width: 220,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip title="Chi tiết">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleViewDetail(params);
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleEdit(params.id);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(params.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = documents.map((rows, index) => {
    console.log(rows);
    return {
      id: rows.id,
      stt: index + 1,
      chuongTrinhThamgia: rows.name,
      ghiChu: rows.locationId,
    };
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    ghiChu: true,
  });

  const handleDelete = (index) => {
    const updateUnions = [...rows];

    const deletedUnion = updateUnions.splice(index, 1);

    if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
      console.log("Xóa thông tin của:", deletedUnion[0]);
    }
  };

  const handleEdit = (index) => {
    const updateUnions = [...rows];
    console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
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
          label="Nhập Chương trình"
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
        rows={rows}
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
    </div>
  );
}
