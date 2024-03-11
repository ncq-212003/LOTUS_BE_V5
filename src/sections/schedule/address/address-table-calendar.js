import React, { useState, useEffect } from "react";
import { Dialog, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip, DialogContentText, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import InfoRecord from "src/components/info-record";
import Rating from '@mui/material/Rating';
import { listAddressApi, updateAddressApi } from "src/contexts/api/schedule/api-address";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import useFetchLocation, { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import EditFormAddress from "./address-edit-form";
import styles from '../../../style/index.module.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const AddressTableCalendar = ({ openEditAdress, closeEditAdress }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [state, dispatch] = useApp();
  const { address } = state;
  const { addresses } = address;
  const [listDataTable, setListDataTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openBoots, setOpenBoots] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeDialog = () => {
    closeEditAdress();
  };

  // Xóa dữ liệu 
  const handleOpenDelete = (row) => {
    setIsAlertDialogOpen(true);
    setSelectedItem(row);
  };

  const handleCloseDelete = () => {
    setIsAlertDialogOpen(false);
  };

  const handleAgree = row => {
    try {
      handleDelete(row)
      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error("Error :", error);
      // Xử lý lỗi nếu cần thiết
    }
  };

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

  //end

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

  useEffect(() => {
    const dataWithSTT = async () => {
      const updatedList = await Promise.all(
        addresses.map(async (add, index) => {
          const { cityId, districtId, wardId } = add;

          // Gọi các hàm fetch thay vì hook ở đây
          const [cities, districts, wards] = await Promise.all([
            fetchCities(),
            fetchDistricts(cityId),
            fetchWards(districtId),
          ]);

          return {
            ...add,
            stt: index + 1,
            id: add.placeId || index + 1,
            nameCity: cities.find((city) => city.value === cityId)?.label,
            nameDistrict: districts.find((district) => district.value === districtId)?.label,
            nameWard: wards.find((ward) => ward.value === wardId)?.label,
            nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
          };
        })
      );
      setListDataTable(updatedList);
    };
    dataWithSTT();
  }, [addresses])

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseBoots = (isEvent) => {
    if (isEvent) {
      setOpenBoots(false);
      setDistrictId(9999);
      setCityId(9999);
      setSnackbarSeverity("success");
      setSnackbarMessage("Sửa thành công !");
      setSnackbarOpen(true);
    } else {
      setOpenBoots(false);
      setDistrictId(9999);
      setCityId(9999);
    }
  };

  const handleButtonClick = (event, row) => {
    setOpenBoots(true);
    setSelectedRow(row);
  };



  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openEditAdress}
        fullWidth
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Danh sách địa điểm
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="inherit">
            <XCircleIcon />
          </SvgIcon>
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ typography: "body1" }}>
            <TableContainer
              sx={{
                border: "1px solid rgb(224, 224, 224) !important",
              }}
              fullWidth
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                  <TableRow sx={{ border: "1.5px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={50}>Stt</TableCell>
                    <TableCell align="center" width={250}>Tên địa điểm</TableCell>
                    <TableCell align="center" width={95}>Người liên hệ</TableCell>
                    <TableCell align="center" width={150}>Số điện thoại</TableCell>
                    <TableCell align="center" width={300}>Tỉnh/ Thành phố</TableCell>
                    <TableCell align="center" width={200}>Quận/ Huyện</TableCell>
                    <TableCell align="center" width={200}>Xã/ Phường</TableCell>
                    {/* <TableCell align="center" width={200}>Kinh độ</TableCell>
                    <TableCell align="center" width={200}>Vĩ độ</TableCell> */}
                    <TableCell align="center" width={180}>Loại</TableCell>
                    <TableCell align="center" width={300}>Ghi chú</TableCell>
                    <TableCell align="center" width={120}>Đánh giá</TableCell>
                    <TableCell align="center" width={100}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDataTable.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.stt}</TableCell>
                      <TableCell>{items.placeName}</TableCell>
                      <TableCell>{items.manager}</TableCell>
                      <TableCell>{items.contactPhone}</TableCell>
                      <TableCell>{items.nameCity}</TableCell>
                      <TableCell>{items.nameDistrict}</TableCell>
                      <TableCell>{items.nameWard}</TableCell>
                      {/* <TableCell>{items.geoX}&deg;{items.geoDo && ` ${items.geoDo}`}</TableCell>
                      <TableCell>{items.geoY}&deg;{items.geoDo && ` ${items.geoDo}`}</TableCell> */}
                      <TableCell>{items.nameType}</TableCell>
                      <TableCell>{items.description}</TableCell>
                      <TableCell>
                        <Rating name={`rating-${index}`} value={items.rate} readOnly />
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="Chỉnh sửa thông tin">
                            <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={(event) => handleButtonClick(event, items)}>
                              <CreateIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton aria-label="Xóa" style={{ color: "#1C2536" }} onClick={() => handleOpenDelete(items)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer >
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: '#e3e6e6'
          }}
        >
          <InfoRecord />
        </DialogActions>
      </BootstrapDialog>

      < EditFormAddress
        openEditFormAdress={openBoots}
        closeEditFormAdress={handleCloseBoots}
        id={selectedRow ? selectedRow.id : ""}
      />

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />

      {/* Tạo hộp thoại alert khi xóa */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dialog
          open={isAlertDialogOpen}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có chắc chắn muốn xóa không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={styles.btn}
              onClick={handleCloseDelete}
            >
              Hủy
            </Button>
            <Button className={styles.btn} onClick={() => handleAgree(selectedItem)} autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};