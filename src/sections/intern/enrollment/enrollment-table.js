import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, styled, Tooltip, IconButton } from "@mui/material";
import { Autorenew, Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "src/components/modal-detail";
import InternEdit from "./intert-edit";
import ActionColumn from "src/components/action-column ";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#4b9949",
  borderRadius: "1px",
  "&:hover": {
    backgroundColor: "#4b9949",
    borderColor: "#4b9949",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "#1C2536",
  },
});

const rows = [
  {
    id: 1,
    stt: 1,
    maHoSo: "HS001",
    ngayDangKy: "2023-10-27",
    hoTen: "Nguyễn Bảo A",
    ngaySinh: "1990-05-15",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 2,
    stt: 2,
    maHoSo: "HS002",
    ngayDangKy: "2023-10-28",
    hoTen: "Trần Phương B",
    ngaySinh: "1995-02-20",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 3,
    stt: 3,
    maHoSo: "HS003",
    ngayDangKy: "2023-10-29",
    hoTen: "Lê Bảo C",
    ngaySinh: "1987-11-10",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 4,
    stt: 4,
    maHoSo: "HS004",
    ngayDangKy: "2023-10-30",
    hoTen: "Phạm Phương D",
    ngaySinh: "1998-09-05",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 5,
    stt: 5,
    maHoSo: "HS005",
    ngayDangKy: "2023-10-31",
    hoTen: "Vũ Bảo E",
    ngaySinh: "2001-03-25",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 6,
    stt: 6,
    maHoSo: "HS006",
    ngayDangKy: "2023-11-01",
    hoTen: "Nguyễn Phương F",
    ngaySinh: "1996-07-14",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 7,
    stt: 7,
    maHoSo: "HS007",
    ngayDangKy: "2023-11-02",
    hoTen: "Trần Bảo G",
    ngaySinh: "2000-01-30",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 8,
    stt: 8,
    maHoSo: "HS008",
    ngayDangKy: "2023-11-03",
    hoTen: "Lê Phương H",
    ngaySinh: "1993-04-19",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 9,
    stt: 9,
    maHoSo: "HS009",
    ngayDangKy: "2023-11-04",
    hoTen: "Phạm Bảo I",
    ngaySinh: "1991-08-09",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 10,
    stt: 10,
    maHoSo: "HS010",
    ngayDangKy: "2023-11-05",
    hoTen: "Vũ Phương K",
    ngaySinh: "1997-12-28",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 11,
    stt: 11,
    maHoSo: "HS0011",
    ngayDangKy: "2023-11-02",
    hoTen: "Trần Bảo G",
    ngaySinh: "2000-01-30",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 12,
    stt: 12,
    maHoSo: "HS0012",
    ngayDangKy: "2023-11-03",
    hoTen: "Lê Phương H",
    ngaySinh: "1993-04-19",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
  {
    id: 13,
    stt: 13,
    maHoSo: "HS0013",
    ngayDangKy: "2023-11-04",
    hoTen: "Phạm Bảo I",
    ngaySinh: "1991-08-09",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 14,
    stt: 14,
    maHoSo: "HS0014",
    ngayDangKy: "2023-10-29",
    hoTen: "Lê Bảo C",
    ngaySinh: "1987-11-10",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
  },
  {
    id: 15,
    stt: 15,
    maHoSo: "HS0015",
    ngayDangKy: "2023-10-30",
    hoTen: "Phạm Phương D",
    ngaySinh: "1998-09-05",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
  },
];

export default function EnrollmentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("Tất cả");

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

  const handleFilter = (filterType) => {
    let filteredData = rows;

    setActiveFilter(filterType);

    switch (filterType) {
      case "Tất cả":
        filteredData = rows;
        break;
      case "Đang sơ tuyển":
        filteredData = rows.filter((row) => row.gioiTinh === "Nam");
        break;
      case "Chưa tiến cử":
        filteredData = rows.filter((row) => row.gioiTinh === "Nữ");
        break;
      // Thêm các trường hợp lọc khác tại đây
      default:
        filteredData = rows;
        break;
    }
    setFilteredRows(filteredData);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    maHoSo: true,
    tienDo: true,
    gioHoc: false,
    loaiPhongHoc: false,
    phongHoc: false,
  });

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 70,
    },
    {
      field: "ngayDangKy",
      headerName: "Ngày đăng ký",
      width: 130,
    },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      width: 200,
    },
    {
      field: "ngaySinh",
      headerName: "Ngày sinh",
      width: 120,
    },
    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 100,
    },
    {
      field: "honNhan",
      headerName: "Hôn nhân",
      width: 100,
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
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="view"
          />
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="delete"
          />
          <Tooltip title="Thiết đặt lại">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Autorenew />
            </IconButton>
          </Tooltip>
        </>

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
          label="Nhập nội dung tìm kiếm"
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
      <InternEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
