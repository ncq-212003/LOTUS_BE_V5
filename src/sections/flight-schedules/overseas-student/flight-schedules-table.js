import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { GridActionsCellItem, GridRowEditStopReasons } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import { TableContainer, Table, TableRow, TableCell, TableBody } from "@mui/material";
import { AppBar, Toolbar, SvgIcon, TableHead, Typography, Stack } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import HistoryIcon from "@mui/icons-material/History";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import EditFlightSchedules from "./flight-schedules-edit";

// Dữ liệu mẫu
const rows = [
  {
    id: 1,
    stt: 1,
    intern: "Nguyễn Duy Dự",
    expectedFlight: "2023-11-15",
    expectedArrival: "2023-11-15",
    personInCharge: "Nguyễn Văn A",
    ariportGoFrom: "Sân bay Tân Sơn Nhất",
    ariportArrival: "Sân bay Nội Bài",
    description: "Ghi chú 1",
  },
  {
    id: 2,
    stt: 2,
    intern: "Nguyễn Anh Tú",
    expectedFlight: "2023-11-16",
    expectedArrival: "2023-11-16",
    personInCharge: "Trần Thị B",
    ariportGoFrom: "Sân bay Phú Quốc",
    ariportArrival: "Sân bay Đà Nẵng",
    description: "Ghi chú 2",
  },
  {
    id: 3,
    stt: 3,
    intern: "Nguyễn Văn Nam",
    expectedFlight: "2023-11-17",
    expectedArrival: "2023-11-17",
    personInCharge: "Lê Văn C",
    ariportGoFrom: "Sân bay Cam Ranh",
    ariportArrival: "Sân bay Cần Thơ",
    description: "Ghi chú 3",
  },
  {
    id: 4,
    stt: 4,
    intern: "Chu Văn Vĩ",
    expectedFlight: "2023-11-18",
    expectedArrival: "2023-11-18",
    personInCharge: "Phạm Thị D",
    ariportGoFrom: "Sân bay Chu Lai",
    ariportArrival: "Sân bay Pleiku",
    description: "Ghi chú 4",
  },
  {
    id: 5,
    stt: 5,
    intern: "Nguyễn Công Quyết",
    expectedFlight: "2023-11-19",
    expectedArrival: "2023-11-19",
    personInCharge: "Hoàng Văn E",
    ariportGoFrom: "Sân bay Buôn Ma Thuột",
    ariportArrival: "Sân bay Qui Nhơn",
    description: "Ghi chú 5",
  },
  {
    id: 6,
    stt: 6,
    intern: "Nguyễn Duy A",
    expectedFlight: "2023-11-20",
    expectedArrival: "2023-11-20",
    personInCharge: "Trịnh Thị F",
    ariportGoFrom: "Sân bay Phan Thiết",
    ariportArrival: "Sân bay Đà Lạt",
    description: "Ghi chú 6",
  },
  {
    id: 7,
    stt: 7,
    intern: "Nguyễn Văn X",
    expectedFlight: "2023-11-21",
    expectedArrival: "2023-11-21",
    personInCharge: "Ngô Văn G",
    ariportGoFrom: "Sân bay Nha Trang",
    ariportArrival: "Sân bay Vũng Tàu",
    description: "Ghi chú 7",
  },
  {
    id: 8,
    stt: 8,
    intern: "Nguyễn Văn K",
    expectedFlight: "2023-11-22",
    expectedArrival: "2023-11-22",
    personInCharge: "Vũ Thị H",
    ariportGoFrom: "Sân bay Long Xuyên",
    ariportArrival: "Sân bay Rạch Giá",
    description: "Ghi chú 8",
  },
  {
    id: 9,
    stt: 9,
    intern: "Nguyễn Văn Q",
    expectedFlight: "2023-11-23",
    expectedArrival: "2023-11-23",
    personInCharge: "Nguyễn Văn I",
    ariportGoFrom: "Sân bay Cà Mau",
    ariportArrival: "Sân bay Bạc Liêu",
    description: "Ghi chú 9",
  },
  {
    id: 10,
    stt: 10,
    intern: "Nguyễn Văn P",
    expectedFlight: "2023-11-24",
    expectedArrival: "2023-11-24",
    personInCharge: "Lê Thị K",
    ariportGoFrom: "Sân bay Hải Phòng",
    ariportArrival: "Sân bay Thanh Hóa",
    description: "Ghi chú 10",
  },
];

const flightSchedulesHistories = [
  {
    expectedFlight: "2023-11-15 ",
    expectedArrival: "2023-11-15 ",
    ariportGoFrom: "Sân bay Tân Sơn Nhất",
    ariportArrival: "Sân bay Nội Bài",
    description: "Ghi chú 1",
  },
  {
    expectedFlight: "2023-11-16 ",
    expectedArrival: "2023-11-16 ",
    ariportGoFrom: "Sân bay Phú Quốc",
    ariportArrival: "Sân bay Đà Nẵng",
    description: "Ghi chú 2",
  },
  {
    expectedFlight: "2023-11-17 ",
    expectedArrival: "2023-11-17 ",
    ariportGoFrom: "Sân bay Cam Ranh",
    ariportArrival: "Sân bay Cần Thơ",
    description: "Ghi chú 3",
  },
  {
    expectedFlight: "2023-11-18 ",
    expectedArrival: "2023-11-18 ",
    ariportGoFrom: "Sân bay Chu Lai",
    ariportArrival: "Sân bay Pleiku",
    description: "Ghi chú 4",
  },
  {
    expectedFlight: "2023-11-19 ",
    expectedArrival: "2023-11-19 ",
    ariportGoFrom: "Sân bay Buôn Ma Thuột",
    ariportArrival: "Sân bay Qui Nhơn",
    description: "Ghi chú 5",
  },
];

export default function FlightSChedulesTable() {
  const [openDialogView, setOpenDialogView] = React.useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  }

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleViewHistorySupplyClick = (id) => {
    // formik.setFieldValue("name", filteredName(id));
    setOpenDialogView(true);
  };

  const handleCloseDialogView = () => {
    setOpenDialogView(false);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    description: false,
  });

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 10,
    },
    {
      field: "intern",
      headerName: "Họ và tên",
      width: 150,
    },
    {
      field: "expectedFlight",
      headerName: "Ngày bay dự kiến",
      width: 160,
    },
    {
      field: "expectedArrival",
      headerName: "Ngày đến dự kiến",
      width: 160,
    },
    {
      field: "personInCharge",
      headerName: "Phụ tránh chính",
      width: 150,
    },
    {
      field: "ariportGoFrom",
      headerName: "Sân bay đi",
      width: 160,
    },
    {
      field: "ariportArrival",
      headerName: "Sân bay đến",
      width: 160,
    },
    {
      field: "description",
      headerName: "Ghi chú",
      width: 150,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <Tooltip title="Lịch sử bay">
            <IconButton
              sx={{ color: "black" }}
              onClick={(e) => {
                e.stopPropagation();
                handleViewHistorySupplyClick(params.id);
              }}
            >
              <GridActionsCellItem
                icon={<HistoryIcon />}
                label="ViewHistory"
                color="inherit"
              />
            </IconButton>
          </Tooltip>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            params={params}
            buttonType="view"
          />
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="edit"
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
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
          label="Nhập Họ và tên"
          variant="outlined"
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <DatePicker
          name="dob"
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
            },
          }}
          label="Từ ngày"
          sx={{ marginRight: "8px" }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <DatePicker
          name="dob"
          sx={{ marginLeft: "12px" }}
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
            },
          }}
          label="Đến ngày"
        />
      </LocalizationProvider>
      <Button
        sx={{
          margin: "3px 0 20px 20px",
          backgroundColor: "#1C2536",
          color: "white",
        }}
        size="small"
        variant="contained"
      >
        Tìm kiếm
      </Button>
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
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[20, 50]}
        checkboxSelection
      />

      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditFlightSchedules
        openEdit={isDialogEditOpen}
        closeEdit={closeDialogEdit}
      />

      {/* Lịch sử bay */}
      <Dialog
        open={openDialogView}
        onClose={handleCloseDialogView}
        sx={{ border: "1px solid #ccc" }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Lịch sử bay
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialogView}
              aria-label="close"
            >
              <SvgIcon fontSize="small">
                <XCircleIcon />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack spacing={3} sx={{ p: 2, width: "600px" }}>
          <TableContainer sx={{ border: "1px solid #ccc", borderRadius: "4px", maxHeight: 400 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày bay dự kiến</TableCell>
                  <TableCell>Ngày đến dự kiến</TableCell>
                  <TableCell>Sân bay đi</TableCell>
                  <TableCell>Sân bay đến</TableCell>
                  <TableCell>Ghi chú</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flightSchedulesHistories.map((flightSchedule, index) => (
                  <TableRow key={index} sx={{ borderTop: "1px solid #ccc" }}>
                    <TableCell>{flightSchedule.expectedFlight}</TableCell>
                    <TableCell>{flightSchedule.expectedArrival}</TableCell>
                    <TableCell>{flightSchedule.ariportGoFrom}</TableCell>
                    <TableCell>{flightSchedule.ariportArrival}</TableCell>
                    <TableCell>{flightSchedule.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Dialog>
    </div>
  );
}
