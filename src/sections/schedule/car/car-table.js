import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import EditCar from "./car-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { listCarApi, updateCarApi, findCarByIdApi } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import SnackbarAlert from "src/components/action-notification";

export default function TableCar() {
  const [openEditCar, setOpenEditCar] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [listMainEmployee, setListMainEmployee] = useState([]);
  const [listNameCompany, setListNameCompany] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dataWithSTT, setDataWithSTT] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  // const style = setFilteredRows(filteredRows);
  const [textAlertForNotify, setTextAlertForNotify] = useState('');
  const [state, dispatch] = useApp();
  const { car } = state;
  const { cars } = car;

  const handleOpenEditCar = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setOpenEditCar(true);
  };

  const handleCloseEditCar = (isEvent) => {
    if (isEvent) {
      setOpenEditCar(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Sửa thành công !");
      setSnackbarOpen(true);
    } else {
      setOpenEditCar(false);
    }
  }
  // Check khi file ảnh hoặc logo khi được thêm thành công
  const handleSnackbarOnFileUpload = (isCheck) => {
    if (isCheck) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Tải file lên thành công.");
      setSnackbarOpen(true);
    }
  }

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  // delete row
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        LastModifedByHidden: "1",
        CreatedByHidden: "1",
        CompanyIdHidden: "1",
        EmployeeIdMainHidden: "1",
        NumberSeatsHidden: "1"
      };

      dispatch({
        type: HANDLERS_CAR.UPDATE_CAR,
        payload: dataRowDelete,
      });

      const response = await updateCarApi(dataRowDelete);
      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting cars:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting cars:", error);
    }
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 50 },
    {
      field: "avatar",
      headerName: "Hình ảnh",
      width: 120,
      // headerAlign: "center",
      renderCell: (params) => (
        <img
          src={'https://lotus.i.tisbase.online' + params.value}
          alt="Hinhanh"
          style={{
            height: 40,
            width: 40,
            borderRadius: '50%',
            display: 'block',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }}
        />
      )
    },
    { field: "companyName", headerName: "Thuộc công ty", width: 400 },
    { field: "carName", headerName: "Tên xe", width: 150 },
    { field: "numberSeats", headerName: "Số ghế", width: 100 },
    { field: "carNumber", headerName: "Biển số xe", width: 150 },
    { field: "employeeName", headerName: "Phụ trách chính", width: 200 },
    {
      field: "action",
      headerName: "Thao tác",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditCar}
          params={params}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  // call api list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCarApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_CAR.LIST_CAR,
            payload: response.data
          })
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error)
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await listCompanyApi();
      if (Array.isArray(response.data) && response.data.length > 0) {
        const listCompany = response.data.map((items) => ({
          comId: items.companyId,
          comName: items.companyName
        }))
        setListNameCompany(listCompany);
      }
    }
    fetchData()
  }, [])

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
        setListMainEmployee(listEmployee);
      }
    }
    fetchDataEmployee();
  }, [])

  // phuc vu tim kiem
  const handleSearch = async () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
      setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
    } else {
      const result = await findCarByIdApi(searchValue);

      if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
        const data = [result.data];

        const rowsWithId = data.map((item, index) => ({
          ...item,
          stt: index + 1,
          id: new Date().valueOf(),
          companyName: listNameCompany.find((com) => com.comId === item.companyId)?.comName,
          employeeName: listMainEmployee.find((em) => em.emId === item.employeeIdMain)?.emName
        }));
        setFilteredRows(rowsWithId);
      } else {
        setIsAlertDialogOpen(true);
        setTextAlertForNotify("Không tìm thấy kết quả");
      }
    }
  };

  // áp dụng cả điều này cho search 
  useEffect(() => {
    // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
    const updatedDataWithSTT = Array.isArray(cars) ? cars.map((car, index) => ({
      ...car,
      stt: index + 1,
      id: car.id || index + 1,
      companyName: listNameCompany.find((com) => com.comId === car.companyId)?.comName,
      employeeName: listMainEmployee.find((em) => em.emId === car.employeeIdMain)?.emName
    })) : [];

    setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
    setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
  }, [cars]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // phuc vu tim kiem
  useEffect(() => {
    if (searchValue.length == 0) {
      // gia tri ban dau
      setFilteredRows(dataWithSTT);
    }
  }, [searchValue]);

  const handleCloseAlert = async () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}

    >
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: '#1C2536',
            color: 'white'
          }}
          size='small'
          variant="contained"
          onClick={handleSearch}
        >Tìm kiếm</Button>
      </Box>
      <Box style={{ width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
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

      <EditCar
        open={openEditCar}
        onClose={handleCloseEditCar}
        id={selectedRow ? selectedRow.carId : ""}
        onSuccessFile={handleSnackbarOnFileUpload}
      />

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />

      {/*  alert when value search null */}
      <Dialog
        open={isAlertDialogOpen}
        onClose={handleCloseAlert}
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {textAlertForNotify}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAlert}
            autoFocus
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
