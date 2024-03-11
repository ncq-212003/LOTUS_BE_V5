import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ActionColumn from "src/components/action-column ";
import LoginIcon from "@mui/icons-material/Login";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, SvgIcon } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import ModalDetail from "src/components/modal-detail";
import EmployeeEdit from "../edit/employee-edit";
import EmployeeDetail from "../detail/employee-detail";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import { format } from "date-fns";
import { useState } from "react";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listDepartmentApi } from "src/contexts/api/company/api-department";
import { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import SnackbarAlert from "src/components/action-notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const DepartmentOption = () => {
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
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

  // list department
  useEffect(() => {
    const listDepartment = async () => {
      const res = await listDepartmentApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const departments = res.data.map((dep) => ({
          value: dep.departmentId,
          company: companyNameOption.find((com) => com.companyId === dep.companyId)?.companyName,
          label: dep.deparmentName,
        }));
        setDepartmentOptions(departments);
      }
    };
    listDepartment();
  }, [companyNameOption]);

  const optionsForDepartment = departmentOptions.map((option) => ({
    companies: option.company,
    ...option,
  }));

  return optionsForDepartment.sort((a, b) => (a.companies > b.companies ? 1 : -1));
};

export default function EmployeeTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [isDialogDetailOpen, setisDialogDetailOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogSystemAccessOpen, setDialogSystemAccessOpen] = useState(false);
  const optionsForDepartment = DepartmentOption();
  const [listDataTable, setListDataTable] = useState([]);

  const [state, dispatch] = useApp();
  const { employee } = state;
  const { employees } = employee;

  useEffect(() => {
    const listData = async () => {
      const res = await listEmployeeApi();
      dispatch({
        type: HANDLERS_EMPLOYEE.LIST_EMPLOYEES,
        payload: res.data,
      });
    };
    listData();
  }, []);

  useEffect(() => {
    const updateListDataTable = async () => {
      if (employees) {
        const updatedList = await Promise.all(
          employees.map(async (emp, index) => {
            const { domicileCityId, domicileDistrictId, domicileWardId } = emp;

            const [cities, districts, wards] = await Promise.all([
              fetchCities(),
              fetchDistricts(domicileCityId),
              fetchWards(domicileDistrictId),
            ]);

            return {
              ...emp,
              stt: index + 1,
              id: emp.id || index + 1,
              employeeName: emp.lastName + " " + emp.middleName + " " + emp.firstName,
              departmentValues: optionsForDepartment.filter((dep) =>
                emp.departmentIds
                  .split(",")
                  .map((id) => parseInt(id, 10))
                  .includes(dep.value)
              ),
              nameCity: cities.find((city) => city.value === domicileCityId),
              nameDistrict: districts.find((district) => district.value === domicileDistrictId),
              nameWard: wards.find((ward) => ward.value === domicileWardId),
            };
          })
        );
        setListDataTable(updatedList || []);
      }
    };
    updateListDataTable();
  }, [employees]);

  // console.log(listDataTable);

  const handleDialogSystemAccessOpen = () => {
    setDialogSystemAccessOpen(true);
  };

  const handleDialogSystemAccessClose = () => {
    setDialogSystemAccessOpen(false);
  };

  const openDialogDetail = (params) => {
    setSelectedRow(params.row);
    setisDialogDetailOpen(true);
  };

  const closeDialogDetail = () => {
    setisDialogDetailOpen(false);
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

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
    dispatch({
      type: HANDLERS_EMPLOYEE.RESET_EMPLOYEE,
    });
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

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    email: true,
    sdt: true,
    ghiChu: false,
    role: false,
  });

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
        <Avatar
          src={"https://lotus.i.tisbase.online" + params.row.avatar}
          alt="Avatar"
          sx={{ width: 40, height: 40 }}
        >
          Avatar
        </Avatar>
      ),
    },
    {
      field: "employeeCode",
      headerName: "Mã nhân viên",
      width: 150,
    },
    {
      field: "employeeName",
      headerName: "Tên nhân viên",
      width: 150,
    },
    {
      field: "departmentNames",
      headerName: "Công ty - Phòng ban",
      width: 190,
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 190,
    },
    {
      field: "userName",
      headerName: "Tài khoản",
      width: 90,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "mobilePhone",
      headerName: "Số điện thoại",
      width: 120,
    },
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
          <Tooltip title="Truy cập hệ thống">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleDialogSystemAccessOpen();
              }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="delete" // chỉ hiển thị nút "Xóa"
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
          label="Nhập mã hoặc tên nhân viên"
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
      <DataGrid
        rows={listDataTable}
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
      <EmployeeDetail 
        open={isDialogDetailOpen} 
        onClose={closeDialogDetail} 
        rowData={selectedRow ? selectedRow : ""} 
      />
      <EmployeeEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        rowData={selectedRow ? selectedRow : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />

      {/* Truy cập hệ thống */}
      <Dialog open={dialogSystemAccessOpen} onClose={handleDialogSystemAccessClose}>
        <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Truy cập hệ thống
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogSystemAccessClose}
              aria-label="close"
            >
              <SvgIcon fontSize="small">
                <XCircleIcon />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              margin: "0 auto",
              maxWidth: "600px",
            }}
          >
            <TextField
              // onChange={(event) => handleChange(event, "loginName")}
              // value={loginName}
              variant="outlined"
              label="Tên người dùng"
              fullWidth
              name="loginName"
              sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <TextField
                // onChange={(event) => handleChange(event, "password")}
                // value={password}
                variant="outlined"
                label="Mật khẩu"
                fullWidth
                name="password"
                sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
              />
              <TextField
                // onChange={(event) => handleChange(event, "confirmPassword")}
                // value={confirmPassword}
                variant="outlined"
                label="Xác nhận mật khẩu"
                fullWidth
                name="confirmPassword"
                sx={{ flex: 1, mr: 1 }}
              />
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              // value={status}
              // onChange={(event) => handleChange(event, "status")}
            >
              <FormControlLabel
                value="isActive"
                control={<Radio size="small" />}
                label="Đang hoạt động"
              />
              <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              paddingLeft: "40px",
              paddingRight: "40px",
              margin: " 0 20px 20px",
              fontSize: 16,
              backgroundColor: "#1C2536",
            }}
          >
            Lưu
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
