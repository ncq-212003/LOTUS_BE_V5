import * as React from 'react';
import { Tooltip, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from '../style/index.module.scss';

const ActionColumn = ({ handleViewDetail, openDialogEdit, params, buttonType = null, handleDelete }) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);

  const handleOpenDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsAlertDialogOpen(false);
  };

  const handleAgree = async () => {
    try {

      // Gọi hàm handleDelete khi người dùng xác nhận xóa
      await handleDelete(params.row);

      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error("Error :", error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  const renderButton = () => {
    if (buttonType === null) {
      // Nếu không có giá trị, hiển thị tất cả các nút
      return (
        <>
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
          <Tooltip title="Sửa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                openDialogEdit(params);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenDelete();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      );
    }

    // Nếu có giá trị, chỉ hiển thị nút tương ứng
    switch (buttonType) {
      case 'view':
        return (
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
        );
      case 'edit':
        return (
          <Tooltip title="Sửa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                openDialogEdit(params);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        );
      case 'delete':
        return (
          <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenDelete();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {renderButton()}
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
          <Button className={styles.btn} onClick={handleAgree} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionColumn;

