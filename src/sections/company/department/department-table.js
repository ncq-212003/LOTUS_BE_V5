import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import DepartmentEdit from "./department-edit";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import {
  findDepartmentByIdApi,
  listDepartmentApi,
  updateDepartmentApi,
} from "src/contexts/api/company/api-department";
import { HANDLERS_DEPARMENT } from "src/contexts/reducer/company/reducer-department";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import SnackbarAlert from "src/components/action-notification";

// Dữ liệu mẫu
// const rows = [
//   {
//     stt: 1,
//     id: 1,
//     congTy: "Công ty A",
//     chiNhanh: "Chi nhánh A",
//     tenPhongBan: "Phòng A1",
//     maPhongBan: "PA1",
//     soDienThoaiBan: "123456",
//     nguoiPhuTrachChinh: "Người A1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 1",
//   },
//   {
//     stt: 2,
//     id: 2,
//     congTy: "Công ty A",
//     chiNhanh: "Chi nhánh A",
//     tenPhongBan: "Phòng A2",
//     maPhongBan: "PA2",
//     soDienThoaiBan: "789012",
//     nguoiPhuTrachChinh: "Người A2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 2",
//   },
//   {
//     stt: 3,
//     id: 3,
//     congTy: "Công ty B",
//     chiNhanh: "Chi nhánh B",
//     tenPhongBan: "Phòng B1",
//     maPhongBan: "PB1",
//     soDienThoaiBan: "654321",
//     nguoiPhuTrachChinh: "Người B1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 3",
//   },
//   {
//     stt: 4,
//     id: 4,
//     congTy: "Công ty B",
//     chiNhanh: "Chi nhánh B",
//     tenPhongBan: "Phòng B2",
//     maPhongBan: "PB2",
//     soDienThoaiBan: "987654",
//     nguoiPhuTrachChinh: "Người B2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 4",
//   },
//   {
//     stt: 5,
//     id: 5,
//     congTy: "Công ty C",
//     chiNhanh: "Chi nhánh C",
//     tenPhongBan: "Phòng C1",
//     maPhongBan: "PC1",
//     soDienThoaiBan: "111222",
//     nguoiPhuTrachChinh: "Người C1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 5",
//   },
//   {
//     stt: 6,
//     id: 6,
//     congTy: "Công ty C",
//     chiNhanh: "Chi nhánh C",
//     tenPhongBan: "Phòng C2",
//     maPhongBan: "PC2",
//     soDienThoaiBan: "333444",
//     nguoiPhuTrachChinh: "Người C2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 6",
//   },
//   {
//     stt: 7,
//     id: 7,
//     congTy: "Công ty D",
//     chiNhanh: "Chi nhánh D",
//     tenPhongBan: "Phòng D1",
//     maPhongBan: "PD1",
//     soDienThoaiBan: "555666",
//     nguoiPhuTrachChinh: "Người D1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 7",
//   },
//   {
//     stt: 8,
//     id: 8,
//     congTy: "Công ty D",
//     chiNhanh: "Chi nhánh D",
//     tenPhongBan: "Phòng D2",
//     maPhongBan: "PD2",
//     soDienThoaiBan: "777888",
//     nguoiPhuTrachChinh: "Người D2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 8",
//   },
//   {
//     stt: 9,
//     id: 9,
//     congTy: "Công ty E",
//     chiNhanh: "Chi nhánh E",
//     tenPhongBan: "Phòng E1",
//     maPhongBan: "PE1",
//     soDienThoaiBan: "999000",
//     nguoiPhuTrachChinh: "Người E1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 9",
//   },
//   {
//     stt: 0,
//     id: 10,
//     congTy: "Công ty E",
//     chiNhanh: "Chi nhánh E",
//     tenPhongBan: "Phòng E2",
//     maPhongBan: "PE2",
//     soDienThoaiBan: "121314",
//     nguoiPhuTrachChinh: "Người E2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 10",
//   },
// ];

export default function DepartmentTable() {
  // state
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // context
  const [state, dispatch] = useApp();
  const { department } = state;
  const { departments } = department;

  useEffect(() => {
    const listData = async () => {
      const res = await listDepartmentApi();
      dispatch({
        type: HANDLERS_DEPARMENT.LIST_DEPARTMENT,
        payload: res.data,
      });
    };
    listData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataWithSTT = Array.isArray(departments)
    ? departments.map((x, index) => ({
        ...x,
        stt: index + 1,
        id: x.id || index + 1,
        companyName: companyNameOption.find((com) => com.companyId === x.companyId)?.companyName,
        employeeMain: employeeNameMain.find((em) => em.employeeId === x.employeeIdMain)
          ?.employeeName,
      }))
    : [];

  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          companyName: com.companyName,
          companyId: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          employeeName: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          employeeId: employee.employeeId,
        }));
        setEmployeeNameMain(employees);
      }
    };
    listEmployeeName();
  }, []);

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

  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        EmployeeIdMain: row.employeeIdMain,
        Telephone: row.telephone,
        BriefCode: row.briefCode,
        BranchIdHidden: "1",
        DeparmentName: row.deparmentName,
        LastModifedByHidden: "1",
        CreatedByHidden: "1",
        EmployeeIdMainHidden: row.employeeIdMain,
        Flag: "D",
        DepartmentId: row.id,
        Status: row.status,
        TimeStamp: Math.floor(new Date().getTime() / 1000),
        Field1: "1",
        CompanyId: row.companyId,
        Field2: "1",
        Field3: "1",
        Field4: "1",
        CreatedAt: row.createdAt,
        Field5: "1",
        LastModifedAt: new Date().toISOString(),
        Description: row.description,
        BranchId: 1,
        CreatedBy: "1",
        LastModifedBy: "1",
      };

      dispatch({
        type: HANDLERS_DEPARMENT.UPDATE_DEPARTMENT,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await updateDepartmentApi(dataRowDelete);

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
    { field: "stt", headerName: "STT", width: 30 },
    {
      field: "companyName",
      headerName: "Công ty",
      width: 250,
    },
    {
      field: "deparmentName",
      headerName: "Tên phòng ban",
      width: 130,
    },
    {
      field: "briefCode",
      headerName: "Mã phòng ban",
      width: 130,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại bàn",
      width: 130,
    },
    {
      field: "employeeMain",
      headerName: "Người phụ trách chính",
      width: 150,
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 150,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 130,
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
    description: false,
    ghiChu: false,
  });

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
          label="Nhập tên phòng ban tìm kiếm"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
      <DataGrid
        rows={dataWithSTT}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
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
      <DepartmentEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.departmentId : ""}
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
