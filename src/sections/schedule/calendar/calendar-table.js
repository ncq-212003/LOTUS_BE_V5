import * as React from "react";
import { useState, Fragment, useMemo, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import dayjs from "dayjs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import EditMyCalendar from "./calendar-my-edit";
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment' // phân tích cú pháp giày giờ
import 'react-big-calendar/lib/css/react-big-calendar.css';
import backgroundEvents from "./react-big-calendar/resources/backgroundEvents";
import * as dates from './react-big-calendar/utils/dates'
import events from "./react-big-calendar/resources/events";
import { useRouter } from "next/router";
import { EditCalendar } from "./calendar-edit";

const rows = [
  {
    id: 1,
    stt: 1,
    tieuDe: "Hội Nghị Chiến Lược Khách Hàng",
    noiDungCongViec: "Phân Tích Khách Hàng, Chia Sẻ Thông Tin Chiến Lược, Thảo Luận về Chiến Lược Tiếp Thị và Quảng Bá",
    loaiLich: "Lịch công tác",
    nghiepDoan: "Nghiệp đoàn 1, nghiệp đoàn 2",
    congTyTiepNhan: "Cty Phạm An, Cty Hải Nam",
    congTyPhongBan: "Phòng Nhân Sự, Phòng kế toán",
    khachHang: "Nguyễn Bảo Trâm, Phạm Thái Bảo",
    diaDiem: "25 Hoàng Cầu ,Láng Hạ",
    ngayBatDau: "20/9/2023",
    ngayKetThuc: "21/9/2023",
    nhanVienThamGia: "Phạm thị Tâm, Nguyễn Văn thắng",
    nhanVienPhuTrach: "Phạm Bảo Nam",
    quaTang: "Hoa, quần áo",
    xe: "Xe 1, xe 2",
    tienDo: "10%",
    mucDoUuTien: "Cao"
  },
  {
    id: 2,
    stt: 2,
    tieuDe: "Cuộc Gặp Thảo Luận Về Nhu Cầu và Mong Muốn của Khách Hàng",
    noiDungCongViec: "Đánh Giá Hiện Tại và Đánh Giá Nhu Cầu Tương Lai, Phản Hồi Từ Khách Hàng, Chia Sẻ Kế Hoạch với Đội Ngũ Nội Bộ",
    loaiLich: "Lịch công tác",
    nghiepDoan: "Nghiệp đoàn 3",
    congTyTiepNhan: "Cty Pasona Group Inc, Cty JAC Recruitment",
    congTyPhongBan: "Phòng Kinh Doanh",
    khachHang: "Nguyễn Đắc Nam, Đỗ Duy Hải",
    diaDiem: "36 Xuân Hòa ,Đống Đa",
    ngayBatDau: "30/10/2023",
    ngayKetThuc: "32/10/2023",
    nhanVienThamGia: "Phạm Hải Nam, Nguyễn Văn thắng",
    nhanVienPhuTrach: "Phạm Bảo Nam",
    quaTang: "Hoa, Rượu vang",
    xe: "Xe 1, xe 2",
    tienDo: "20%",
    mucDoUuTien: "Cao"
  },
  {
    id: 3,
    stt: 3,
    tieuDe: "Đánh Giá Hiệu Suất và Hài Lòng của Khách Hàng",
    noiDungCongViec: "Thu Thập Dữ Liệu từ Khách Hàng, Kiểm Tra Tiến Độ Đối Với Mục Tiêu Hiệu Suất",
    loaiLich: "Lịch họp công ty",
    nghiepDoan: "Không có",
    congTyTiepNhan: "Không có",
    congTyPhongBan: "Phòng Tiếp Thị",
    khachHang: "Trần Thị Hương",
    diaDiem: "10 Nguyễn Thị Định, Cầu Giấy",
    ngayBatDau: "5/10/2023",
    ngayKetThuc: "5/10/2023",
    nhanVienThamGia: "Nguyễn Văn A, Trần Thị B",
    nhanVienPhuTrach: "Lê Văn C",
    quaTang: "Không có",
    xe: "Xe 1, xe 2",
    tienDo: "100%",
    mucDoUuTien: "Cao"
  },
  {
    id: 4,
    stt: 4,
    tieuDe: "Gặp mặt và kiểm điểm nhân viên",
    noiDungCongViec: "Phân tích lỗi sai của nhân viên, Chỉ ra những vấn đề còn hạn chế",
    loaiLich: "Lịch họp công ty",
    nghiepDoan: "Không có",
    congTyTiepNhan: "Cty Phạm Bảo",
    congTyPhongBan: "Phòng Công Nghệ Thông Tin",
    khachHang: "Nguyễn Thị Linh, Phan Duy Tùng",
    diaDiem: "15 Lê Văn Lương, Thanh Xuân",
    ngayBatDau: "12/11/2023",
    ngayKetThuc: "12/11/2023",
    nhanVienThamGia: "Nguyễn Văn D, Trần Thị E",
    nhanVienPhuTrach: "Lê Văn F",
    quaTang: "Quà bất ngờ",
    xe: "Xe 1, xe 2",
    tienDo: "50%",
    mucDoUuTien: "Thấp"
  },
  {
    id: 5,
    stt: 5,
    tieuDe: "Đón bà Nguyễn Thị Huyền bay từ Nhật về Hà nội",
    noiDungCongViec: "Đưa bà đi ăn nhà Nam Dương, trao đổi về việc hợp tác",
    loaiLich: "Lịch đón khách sân bay",
    nghiepDoan: "Nghiệp đoàn 5",
    congTyTiepNhan: "Cty Gia Khánh",
    congTyPhongBan: "Phòng Luật",
    khachHang: "Trần Văn Gia, Nguyễn Hữu Quốc",
    diaDiem: "20 Trần Duy Hưng, Trung Hòa",
    ngayBatDau: "25/11/2023",
    ngayKetThuc: "25/11/2023",
    nhanVienThamGia: "Nguyễn Văn H, Trần Thị I",
    nhanVienPhuTrach: "Lê Văn J",
    quaTang: "Không có",
    xe: "Xe 3, xe 2",
    tienDo: "0%",
    mucDoUuTien: "Trung Bình"
  },
];

const currentDate = dayjs();
// Chỉnh theo lịch to
const mLocalizer = momentLocalizer(moment)
// Thiết lập màu 
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

// 1 mảng chứa tất cả các giá trị của đối tượng có Views
let allViews = Object.keys(Views).map((k) => Views[k]);

export default function CalendarTable({ localizer = mLocalizer, ...props }) {

  // lịch to 
  const { components, defaultDate, max, views } = useMemo(() => ({
    components: {
      timeSlotWrapper: ColoredDateCellWrapper,
    },
    defaultDate: new Date(2023, 3, 1),
    max: dates.add(dates.endOf(new Date(2023, 17, 1), 'day'), -1, 'hours'),
    views: Object.keys(Views).map((k) => Views[k]),
  }),
    []
  )
  // gọi sự kiện alert title
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormCalendar, setIsOpenEditCalendar] = useState(false);
  const router = useRouter();
  const [valueDate, setValueDate] = useState("1");
  // open-edit-my-Calendar
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // close-edit-my-calendar

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormCalendar = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    const url = '/schedule/work-edit';
    router.push({
      pathname: url,
      query: { id: params.row.id },
    });
  }

  const handleCloseEditCalendar = () => {
    setIsOpenEditCalendar(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "tieuDe", headerName: "Tiêu đề công việc", width: 400 },
    { field: "noiDungCongViec", headerName: "Nội dung công việc", width: 400 },
    { field: "loaiLich", headerName: "Loại lịch", width: 180 },
    { field: "nghiepDoan", headerName: "Nghiệp đoàn", width: 250 },
    { field: "congTyTiepNhan", headerName: "Công ty tiếp nhận", width: 250 },
    { field: "congTyPhongBan", headerName: "Công ty - Phòng ban", width: 250 },
    { field: "khachHang", headerName: "Khách hàng", width: 250 },
    { field: "diaDiem", headerName: "Địa điểm", width: 250 },
    { field: "ngayBatDau", headerName: "Ngày bắt đầu", width: 150 },
    { field: "ngayKetThuc", headerName: "Ngày kết thúc", width: 150 },
    { field: "nhanVienThamGia", headerName: "Nhân viên tham gia", width: 250 },
    { field: "nhanVienPhuTrach", headerName: "Nhân viên phụ trách", width: 230 },
    { field: "quaTang", headerName: "Quà tặng", width: 150 },
    { field: "xe", headerName: "Xe", width: 150 },
    { field: "tienDo", headerName: "Tiến độ", width: 100 },
    { field: "mucDoUuTien", headerName: "Mức độ ưu tiên", width: 150 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormCalendar}
          params={params}
        />
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    congTyTiepNhan: false,
    congTyPhongBan: false,
    khachHang: false,
    diaDiem: false,
    ngayBatDau: false,
    ngayKetThuc: false,
    nhanVienThamGia: false,
    nhanVienPhuTrach: false,
    quaTang: false,
    xe: false,
    tienDo: false,
    mucDoUuTien: false,
  });

  const handleChange = (event, newValue) => {
    setValueDate(newValue);
  };

  return (
    <Stack
      spacing={3}
      sx={{
        margin: "30px 0px",
      }}
    >
      <Fragment>
        <div className="myCustomHeight" style={{ width: "100%", height: "800px" }}>
          <Calendar
            backgroundEvents={backgroundEvents}
            dayLayoutAlgorithm="no-overlap" // bố chí tránh chồng chéo lên nhau khi lịch cùng thời gian
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.DAY}
            events={events}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(events) => {
              const backgroundColor = events.colorEvento ? events.colorEvento : '#0c4da2';
              const color = events.color ? events.color : 'white';
              return { style: { backgroundColor, color } }
            }}
            max={max}
            showMultiDayTimes // hiển thị thời gian cho các sự kiện nhiều ngày
            step={60} // xác định số phút trong mỗi khoảng thời gian trên lưới lịch
          // views={allViews} // tùy chỉnh chế độ xem
          />
        </div>
      </Fragment>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueDate}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Lịch trong ngày" value="1" />
              <Tab label="Lịch theo tuần" value="2" />
              <Tab label="Lịch theo tháng" value="3" />
              <Tab label="Lịch theo năm" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                label="Nhập nội dung tìm kiếm"
                variant="outlined"
              />
              <Button
                sx={{
                  margin: '8px',
                  backgroundColor: '#1C2536',
                  color: 'white'
                }}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                // onRowClick={handleViewDetail}
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
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[20, 50]}
                checkboxSelection
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
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
                label="Nhập nội dung tìm kiếm"
                variant="outlined"
              />
              <Button
                sx={{
                  margin: '8px',
                  backgroundColor: '#1C2536',
                  color: 'white'
                }}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                // onRowClick={handleViewDetail}
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
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </TabPanel>
          <TabPanel value="3">
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
                label="Nhập nội dung tìm kiếm"
                variant="outlined"
              />
              <Button
                sx={{
                  margin: '8px',
                  backgroundColor: '#1C2536',
                  color: 'white'
                }}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                // onRowClick={handleViewDetail}
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
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </TabPanel>
          <TabPanel value="4">
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
                label="Nhập nội dung tìm kiếm"
                variant="outlined"
              />
              <Button
                sx={{
                  margin: '8px',
                  backgroundColor: '#1C2536',
                  color: 'white'
                }}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                // onRowClick={handleViewDetail}
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
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      {/* Hiện trang chi tiết khi click vào bảng  */}
      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      {/* < EditCalendar
        // openEdit={isOpenEditFormCalendar}
        // closeEdit={handleCloseEditCalendar}
        rowData={selectedRow}
      /> */}
    </Stack>
  );
}