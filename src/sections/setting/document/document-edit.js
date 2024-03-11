import * as React from "react";
import {
  SvgIcon,
  TextField,
  Grid,
  Button,
  Dialog,
  IconButton,
  styled,
  DialogTitle,
  DialogContent,
  Box,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import SnackbarAlert from "src/components/action-notification";
import { updateDocumentApi, ListDocumentApi } from "src/contexts/api/setting/api-document";
import { HANDLERS_DOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import { useApp } from "src/hooks/use-app";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditDocument({ open, onClose, id }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { document } = state;
  const { documents } = document;
  //Alert Confirm Edit
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleModelOpen = () => {
    setIsEditDialog(true);
  };

  const handleModelClose = () => {
    setIsEditDialog(false);
  };

  // khi người dùng ấn thoát
  const handleCancelSave = () => {
    handleModelClose();
  }

  // khi người dùng xác định lưu 
  const handleConfirmSave = () => {
    setIsEditing(true);
    handleModelClose();
    formik.handleSubmit();
  }
  //end

  const [paper, setPaper] = useState([
    { id: 1, name: "Căn cước công dân/ CMND" },
    { id: 2, name: "Giấy xác nhận" },
    { id: 3, name: "Loại thông báo" },
  ]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClose = (isEvent) => {
    onClose(isEvent);
  };

  const documentEdit = Array.isArray(documents) ? documents.find(doc => doc.paperId === id) : [];

  const validationSchema = Yup.object({
    loaiGiayTo: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    tenGiayTo: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    thuTu: Yup
      .number()
      .positive(' Vui lòng nhập một số lớn hơn 0')
      .typeError('Vui lòng nhập số vào trường này')
      .required('Vui lòng nhập thông tin vào trường này'),
    maGiayTo: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    loaiGiayTo: "",
    tenGiayTo: "",
    thuTu: "",
    maGiayTo: "",
    // ghiChu: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          PaperId: id,
          PaperName: values.tenGiayTo,
          Code: "1",
          PaperOrder: values.thuTu,
          PaperOrderHidden: "1",
          Description: "Không vấn đề",
          Field1: values.loaiGiayTo,
          Field2: values.maGiayTo.trim(),
          Field3: "1",
          Field4: "1",
          Field5: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: 1,
          LastModifiedByHidden: "1",
          Flag: "1"
        }

        if (isEditing) {
          const response = await updateDocumentApi(formData);
          if (response.status === 200) {
            formik.resetForm();
            const listData = await ListDocumentApi();
            dispatch({
              type: HANDLERS_DOCUMENT.LIST_DOCUMENTS,
              payload: listData.data
            })
            handleClose(true);
            setIsEditing(false);
          } else {
            setIsEditing(false);
            setSnackbarSeverity("error");
            setSnackbarMessage("Có lỗi xảy ra !");
            setSnackbarOpen(true);
          }
        } else {
          handleModelOpen();
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchAirportData = () => {
      try {
        formik.setValues({
          loaiGiayTo: (parseInt(documentEdit.field1) || 0) || "",
          tenGiayTo: documentEdit.paperName || "",
          thuTu: documentEdit.paperOrder || "",
          maGiayTo: documentEdit.field2 || "",
          ghiChu: documentEdit.description || "",
        })
      } catch (error) {
        console.error("Đã xảy ra lỗi !!!!", error);
      }
    }
    if (open && id) {
      fetchAirportData();
    }
  }, [open, id])

  return (
    <BootstrapDialog
      onClose={() => handleClose(false)}
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
        Chỉnh sửa giấy tờ
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
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
          <Grid container>
            <Autocomplete
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={paper}
              value={paper.find((item) => item.id === formik.values.loaiGiayTo) || null}
              onChange={(_, newValue) => {
                formik.setFieldValue('loaiGiayTo', newValue ? newValue.id : null);
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Loại giấy tờ"
                  name="loaiGiayTo"
                  onBlur={formik.handleBlur}
                  error={formik.touched.loaiGiayTo && Boolean(formik.errors.loaiGiayTo)}
                  helperText={formik.touched.loaiGiayTo && formik.errors.loaiGiayTo}
                />
              )}
            />

            <TextField
              error={!!(formik.touched.tenGiayTo && formik.errors.tenGiayTo)}
              helperText={formik.touched.tenGiayTo && formik.errors.tenGiayTo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenGiayTo}
              name="tenGiayTo"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Tên giấy tờ"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.thuTu && formik.errors.thuTu)}
              helperText={formik.touched.thuTu && formik.errors.thuTu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.thuTu}
              name="thuTu"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Thứ tự"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.maGiayTo && formik.errors.maGiayTo)}
              helperText={formik.touched.maGiayTo && formik.errors.maGiayTo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.maGiayTo}
              name="maGiayTo"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Mã giấy tờ"
              fullWidth
            />
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              marginTop: '20px'
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1C2536',
              }}
              onClick={formik.handleSubmit}
              startIcon={<Save />}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      <EditConfirmAlert
        onOpen={isEditDialog}
        onClose={handleModelClose}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </BootstrapDialog>
  );
}
