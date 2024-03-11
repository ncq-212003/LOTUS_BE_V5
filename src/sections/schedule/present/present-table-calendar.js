import React, { useState, useEffect } from "react";
import { Dialog, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip, DialogContentText, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import InfoRecord from "src/components/info-record";
import { listPresentApi, updatePresentApi } from "src/contexts/api/schedule/api-present";
import { HANDLERS_PRESENT } from "src/contexts/reducer/schedule/reducer-present";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import EditFormPresent from "./present-form-edit";
import styles from '../../../style/index.module.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AvatarCell = ({ imageUrl }) => (
  <img
    src={'https://lotus.i.tisbase.online' + imageUrl}
    alt="Hinhanh"
    style={{
      height: 40,
      width: 40,
      borderRadius: '50%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  />
);

export const PresentTableCalendar = ({ openEditPresent, closeEditPresent }) => {
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [state, dispatch] = useApp();
  const { present } = state;
  const { presents } = present;

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
      };

      dispatch({
        type: HANDLERS_PRESENT.UPDATE_PRESENT,
        payload: dataRowDelete,
      });

      const response = await updatePresentApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting presents:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting presents:", error);
    }
  };

  //end

  const handleOpenEditFormPresent = (event, row) => {
    setSelectedRow(row);
    setIsOpenEditPresent(true);
  }

  const handleCloseEditPresent = (isEvent) => {
    if (isEvent) {
      setIsOpenEditPresent(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Sửa thành công !");
      setSnackbarOpen(true);
    } else {
      setIsOpenEditPresent(false);
    }
  }

  const closeDialog = () => {
    closeEditPresent();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listPresentApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_PRESENT.LIST_PRESENT,
            payload: response.data
          })
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi . Vui lòng kiểm tra lại");
      }
    }
    fetchData();
  }, [])

  // list dữ liệu thông qua mảng trong ruducer
  const PresentTable = Array.isArray(presents) ? presents.map((pre, index) => ({
    ...pre,
    stt: index + 1,
    id: pre.presentId || index + 1,
  })) : []

  // Check khi file ảnh hoặc logo khi được thêm thành công
  const handleSnackbarOnFileUpload = (isCheck) => {
    if (isCheck) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Tải file lên thành công.");
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openEditPresent}
        fullWidth
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>Danh sách quà tặng</DialogTitle>
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
            <TableContainer sx={{ border: "1px solid rgb(224, 224, 224) !important" }} fullWidth>
              <Table>
                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                  <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={10}>STT</TableCell>
                    <TableCell align="center" width={100}>Hình ảnh</TableCell>
                    <TableCell align="center" width={200}>Tên quà tặng</TableCell>
                    <TableCell align="center" width={300}>Chú thích</TableCell>
                    <TableCell align="center" width={100}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {PresentTable.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.stt}</TableCell>
                      <TableCell align="center"><AvatarCell imageUrl={items.field1} /></TableCell>
                      <TableCell>{items.presentName}</TableCell>
                      <TableCell>{items.description}</TableCell>
                      <TableCell align="center" >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Tooltip title="Chỉnh sửa thông tin">
                            <IconButton aria-label="Chỉnh sửa" style={{ color: "#1C2536" }} onClick={(event) => handleOpenEditFormPresent(event, items)}>
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
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', backgroundColor: '#e3e6e6' }}>
          <InfoRecord />
        </DialogActions>
      </BootstrapDialog>
      <EditFormPresent
        openEditFormPresent={isOpenEditFormPresent}
        closeEditFormPresent={handleCloseEditPresent}
        id={selectedRow ? selectedRow.id : ""}
        onSuccessFile={handleSnackbarOnFileUpload}
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