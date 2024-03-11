import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditFormAddress from "./address-edit-form";
import Rating from '@mui/material/Rating';
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { listAddressApi, updateAddressApi, findAddressByIdApi } from "src/contexts/api/schedule/api-address";
import useFetchLocation, { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import SnackbarAlert from "src/components/action-notification";

export default function Addresstable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormAddress, setIsOpenEditAddress] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { address } = state;
  const { addresses } = address;
  const [listDataTable, setListDataTable] = useState([]);
  // Tìm kiếm
  const [dataWithSTT, setDataWithSTT] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [textAlertForNotify, setTextAlertForNotify] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAddressApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: response.data,
          });
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error);
      }
    };
    fetchData();
  }, []);

  const [typeCalendar, setTypeCalendar] = useState([
    { id: 1, name: "Lịch đón khách sân bay" },
    { id: 2, name: "Lịch nhà hàng" },
    { id: 3, name: "Lịch đón khách" },
    { id: 4, name: "Lịch họp công ty" },
    { id: 5, name: "Lịch khác" },
  ])

  // delete row
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        LastModifedByHidden: "1",
        CreatedByHidden: "1",
        CityIdHidden: "1",
        DistrictIdHidden: "1",
        RateHidden: "1",
        WardIdHidden: "1"
      };

      dispatch({
        type: HANDLERS_ADDRESS.UPDATE_ADDRESS,
        payload: dataRowDelete,
      });

      const response = await updateAddressApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting address:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // useEffect(() => {
  //   const updateListDataTable = async () => {
  //     const updatedList = await Promise.all(
  //       addresses.map(async (add, index) => {
  //         const { cityId, districtId, wardId } = add;

  //         const [cities, districts, wards] = await Promise.all([
  //           fetchCities(),
  //           fetchDistricts(cityId),
  //           fetchWards(districtId),
  //         ]);

  //         return {
  //           ...add,
  //           stt: index + 1,
  //           id: add.placeId || index + 1,
  //           nameCity: cities.find((city) => city.value === cityId)?.label,
  //           nameDistrict: districts.find((district) => district.value === districtId)?.label,
  //           nameWard: wards.find((ward) => ward.value === wardId)?.label,
  //           nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
  //         };
  //       })
  //     );
  //     setListDataTable(updatedList);
  //   };
  //   updateListDataTable();
  // }, [addresses])



  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsModalDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleOpenEditFormAddress = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsOpenEditAddress(true);
  };

  const handleCloseEditAddress = (isEvent) => {
    if (isEvent) {
      setIsOpenEditAddress(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Sửa thành công !");
      setSnackbarOpen(true);
    } else {
      setIsOpenEditAddress(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "placeName", headerName: "Tên địa điểm", width: 200 },
    { field: "manager", headerName: "Người liên hệ", width: 200 },
    { field: "contactPhone", headerName: "Số điện thoại ", width: 200 },
    { field: "nameCity", headerName: "Tỉnh/ Thành phố", width: 200 },
    { field: "nameDistrict", headerName: "Quận/ Huyện", width: 200 },
    { field: "nameWard", headerName: "Xã/ Phường", width: 200 },
    // {
    //   field: "geoX",
    //   headerName: "Kinh độ",
    //   width: 120,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value}&deg;
    //     </div>
    //   ),
    // },
    // {
    //   field: "geoY",
    //   headerName: "Vĩ Độ",
    //   width: 150,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value}&deg;
    //     </div>
    //   ),
    // },
    { field: "nameType", headerName: "Loại", width: 150 },
    { field: "description", headerName: "Ghi chú", width: 300 },
    {
      field: "rate", headerName: "Đánh giá", width: 150,
      renderCell: (params) => (
        <Rating name="read-only" value={params.value} readOnly />
      ),
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormAddress}
          params={params}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  // tim kiem
  useEffect(() => {
    // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
    const updateListDataTable = async () => {
      const updatedList = await Promise.all(
        addresses.map(async (add, index) => {
          const { cityId, districtId, wardId } = add;

          const [cities, districts, wards] = await Promise.all([
            fetchCities(),
            fetchDistricts(cityId),
            fetchWards(districtId),
          ]);

          return {
            ...add,
            stt: index + 1,
            id: add.id || index + 1,
            nameCity: cities.find((city) => city.value === cityId)?.label,
            nameDistrict: districts.find((district) => district.value === districtId)?.label,
            nameWard: wards.find((ward) => ward.value === wardId)?.label,
            nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
          };
        })
      );
      // setListDataTable(updatedList);
      setDataWithSTT(updatedList); // Cập nhật dataWithSTT vào state
      setFilteredRows(updatedList); // Cập nhật filteredRows khi statuss thay đổi
    };
    updateListDataTable();
  }, [addresses]);

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

  // phuc vu tim kiem
  const handleSearch = async () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
      setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
    } else {
      const result = await findAddressByIdApi(searchValue);

      if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
        const data = [result.data];
        const rowsWithId = await Promise.all(
          data.map(async (add, index) => {
            const { cityId, districtId, wardId } = add;

            const [cities, districts, wards] = await Promise.all([
              fetchCities(),
              fetchDistricts(cityId),
              fetchWards(districtId),
            ]);

            return {
              ...add,
              stt: index + 1,
              id: new Date().valueOf(),
              nameCity: cities.find((city) => city.value === cityId)?.label,
              nameDistrict: districts.find((district) => district.value === districtId)?.label,
              nameWard: wards.find((ward) => ward.value === wardId)?.label,
              nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
            };
          })
        );
        setFilteredRows(rowsWithId);
      } else {
        setIsAlertDialogOpen(true);
        setTextAlertForNotify("Không tìm thấy kết quả");
      }
    }
  };
  // end

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
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
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
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
      <Box style={{ width: "100%" }}>
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
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50]}
          checkboxSelection
        />

        <ModalDetail
          open={isModalDetailOpen}
          onClose={handleCloseDetail}
          rowData={selectedRow}
          columns={columns}
        />

        <EditFormAddress
          openEditFormAdress={isOpenEditFormAddress}
          closeEditFormAdress={handleCloseEditAddress}
          id={selectedRow ? selectedRow.placeId : ""}
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
      </Box>
    </Stack>
  );
}
