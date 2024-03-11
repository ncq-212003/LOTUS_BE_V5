
import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import { Visibility } from "@mui/icons-material";
import dayjs from "dayjs";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";

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
export const TableEveryoneCalendar = ({ employeeName }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [listNameEmployee, setListNameEmployee] = useState([]);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  // useEffect(() => {
  //   if (
  //     valueDate?.ngayBatDau &&
  //     valueDate?.ngayKetThuc &&
  //     valueDate.ngayBatDau < formattedDateTime &&
  //     formattedDateTime < valueDate.ngayKetThuc
  //   ) {
  //     setAlertMessage("Thành công");
  //   } else {
  //     setAlertMessage("Lỗi");
  //   }
  // }, [valueDate, formattedDateTime]);

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
      width: 80,
      renderCell: (params) => (
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

  // danh sách nhân viên 
  useEffect(() => {
    const fetchDataEmployee = async () => {
      const response = await listEmployeeApi();
      if (Array.isArray(response.data) && response.data.length > 0) {
        const listEmployee = response.data.map((item) => (
          {
            emId: item.employeeId,
            emName: item.lastName + " " + item.middleName + " " + item.firstName
          }
        ))
        setListNameEmployee(listEmployee);
      }
    }
    fetchDataEmployee();
  }, [])

  return (
    <>
      <Box style={{ width: "100%" }}>
        <Box display={"flex"} sx={{ margin: "20px 0px" }}>
          <Typography sx={{ ml: 2, fontWeight: 700 }} >
            Nhân viên:
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400 }}>
            {listNameEmployee.find(items => items.emId === employeeName)?.emName}
          </Typography>
        </Box>
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

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </>
  )
}