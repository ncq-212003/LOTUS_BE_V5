import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, styled, Tooltip, IconButton, Avatar } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import InternDetail from "../detail/intern-detail";
import InternEdit from "../edit/intern-edit";

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
    avatar:
      "https://allimages.sgp1.digitaloceanspaces.com/wikilaptopcom/2021/02/1613336473_271_Nhung-anh-the-dep-nhat.jpg",
    profileCode: "PR-TTS-20230115-88080",
    iLaborCode: "TTS-20230115-68808",
    hoTen: "Nguyễn Hữu Đạt",
    mobilePhone: "123-456-7890",
    email: "john.doe@example.com",
    commonStatusId: "Lưu tạm",
  },
  {
    id: 2,
    stt: 2,
    avatar: "https://th.bing.com/th/id/OIP.8dupjBWh5eDzS8Xu1kTyxgHaK1?rs=1&pid=ImgDetMain",
    profileCode: "PR-TTS-20230115-39223",
    iLaborCode: "TTS-20230115-50485",
    hoTen: "Trần Phúc Lâm",
    mobilePhone: "987-654-3210",
    email: "jane.smith@example.com",
    commonStatusId: "Lưu tạm",
  },
  {
    id: 3,
    stt: 3,
    avatar: "https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-chat-luong.jpg",
    profileCode: "PR-TTS-20230115-39223",
    iLaborCode: "TTS-20230115-07516",
    hoTen: "Nguyễn Hữu Nghĩa",
    mobilePhone: "555-987-6543",
    email: "robert.johnson@example.com",
    commonStatusId: "Đang sơ tuyển",
  },
  {
    id: 4,
    stt: 4,
    avatar:
      "https://dichvuphotoshop.com/wp-content/uploads/2021/05/Photoshop-thay-nen-xanh-anh-the-theo-yeu-cau-3.jpg",
    profileCode: "PR-TTS-20230115-15538",
    iLaborCode: "TTS-20230115-86965",
    hoTen: "Trần Huy Hoàng",
    mobilePhone: "222-333-4444",
    email: "emily.davis@example.com",
    commonStatusId: "Đang sơ tuyển",
  },
  {
    id: 5,
    stt: 5,
    avatar: "https://th.bing.com/th/id/OIP.3MOLdT4iBFzgEy9MxemqWAAAAA?rs=1&pid=ImgDetMain",
    profileCode: "PR-TTS-20230115-34610",
    iLaborCode: "TTS-20230115-74125",
    hoTen: "Đinh Mạnh Hùng",
    mobilePhone: "777-888-9999",
    email: "william.turner@example.com",
    commonStatusId: "Lưu tạm",
  },
  {
    id: 6,
    stt: 6,
    avatar: "https://img2.thuthuatphanmem.vn/uploads/2019/05/06/anh-the-nam-dep_100828584.jpg",
    profileCode: "PR-TTS-20230115-36274",
    iLaborCode: "TTS-20230115-74966",
    hoTen: "Nguyễn Chí Thanh",
    mobilePhone: "111-222-3333",
    email: "alice.white@example.com",
    commonStatusId: "Đang sơ tuyển",
  },
  {
    id: 7,
    stt: 7,
    avatar:
      "https://kenh14cdn.com/2020/6/30/img0096-1592366363868430058761-1593507888983990295582.jpeg",
    profileCode: "PR-TTS-20230115-12776",
    iLaborCode: "TTS-20230115-61853",
    hoTen: "Lê Khôi Nguyên",
    mobilePhone: "444-555-6666",
    email: "daniel.brown@example.com",
    commonStatusId: "Lưu tạm",
  },
  // {
  //   id: 8,
  //   stt: 8,
  //   avatar: 'https://tiemanhsky.com/wp-content/uploads/2020/03/%E1%BA%A3nh-th%E1%BA%BB-683x1024.jpg',
  //   profileCode: 'PR-TTS-20230115-66333',
  //   iLaborCode: 'TTS-20230115-35339',
  //   hoTen: 'Lý Minh Triết',
  //   mobilePhone: '666-777-8888',
  //   email: 'olivia.green@example.com',
  //   commonStatusId: 'Đang sơ tuyển',
  // },
  // {
  //   id: 9,
  //   stt: 9,
  //   avatar: 'https://top10meohay.com/wp-content/uploads/2017/07/d4-1.jpg',
  //   profileCode: 'PR-TTS-20230115-46656',
  //   iLaborCode: 'TTS-20230115-06298',
  //   hoTen: 'Tạ Thanh Tùng',
  //   mobilePhone: '999-111-2222',
  //   email: 'george.miller@example.com',
  //   commonStatusId: 'Đang sơ tuyển',
  // },
  // {
  //   id: 10,
  //   stt: 10,
  //   avatar: 'https://decemberimage.files.wordpress.com/2016/08/anh-tinh.jpg?w=600',
  //   profileCode: 'PR-TTS-20230115-82420',
  //   iLaborCode: 'TTS-20230115-48697',
  //   hoTen: 'Nguyễn Kiến Văn',
  //   mobilePhone: '333-444-5555',
  //   email: 'sophia.turner@example.com',
  //   commonStatusId: 'Lưu tạm',
  // },
];

export default function InternTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("Tất cả");

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  };

  const openDialogDetail = (params) => {
    setSelectedRow(params.row);
    setisDialogDetailOpen(true);
  };

  const closeDialogDetail = () => {
    setisDialogDetailOpen(false);
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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 10,
    },
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 60,
      renderCell: (params) => (
        <Avatar src={params.row.avatar} alt="Avatar" sx={{ width: 40, height: 40 }}>
          Avatar
        </Avatar>
      ),
    },
    {
      field: "profileCode",
      headerName: "Mã hồ sơ",
      width: 180,
    },
    {
      field: "iLaborCode",
      headerName: "Mã thực tập sinh",
      width: 180,
    },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      width: 160,
    },
    {
      field: "mobilePhone",
      headerName: "Số điện thoại",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    { field: "commonStatusId", headerName: "Trạng thái", width: 100 },

    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <Tooltip title="Chi tiết">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                openDialogDetail(params);
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
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

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    maHoSo: true,
    tienDo: true,
    gioHoc: false,
    loaiPhongHoc: false,
    phongHoc: false,
  });

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
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <DatePicker
          name="fromDate"
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
          name="toDate"
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
          onClick={() => handleFilter("Về nước")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === " Về nước" ? "#1C2536" : "#4b9949",
          }}
        >
          Về nước
        </BootstrapButton>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Chuyển đổi hợp đồng")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === " Chuyển đổi hợp đồng" ? "#1C2536" : "#4b9949",
          }}
        >
          Chuyển đổi hợp đồng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Mất tích" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Mất tích")}
        >
          Mất tích
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Rút / hủy hồ sơ" ? "#1C2536" : "#6366f1",
          }}
          onClick={() => handleFilter("Rút / hủy hồ sơ")}
        >
          Rút / hủy hồ sơ
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
      <InternDetail
        open={isDialogDetailOpen}
        onClose={closeDialogDetail}
        id={selectedRow ? selectedRow.id : ""}
      />
      <InternEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
