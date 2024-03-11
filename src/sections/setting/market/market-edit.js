import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import {
  TextField,
  SvgIcon,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Autocomplete
} from "@mui/material";
import { editMarketApi, listMarketApi } from "src/contexts/api/setting/api-market";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { HANDLERS_MARKET } from "src/contexts/reducer/setting/reducer-market";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import { Avatar } from "@mui/material";
import { Save, CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function MarketEdit({ open, onClose, id }) {
  const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { market } = state;
  const { markets } = market;

  const dataEdit = Array.isArray(markets) ? markets.find(x => x.marketId == id) : [];

  const validationSchema = Yup.object({
    marketName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    status: Yup.string().required('Vui lòng chọn trạng thái'),
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      try {
        const response = await uploadSingleFile("Market", file);

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Tải file lên thành công.");
          setSnackbarOpen(true);

          const imagePath = getPathFromUrl(response.data);

          setSelectedFileLogo(file);
          formik.setFieldValue('avatar', imagePath);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Thêm ảnh thất bại.");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setSnackbarSeverity("warning");
      setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
      setSnackbarOpen(true);
      setSelectedFileLogo(null);
    }
  };

  const initialValues = {
    marketName: '',
    avatar: '',
    description: '',
    status: 'Đang hoạt động',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          marketId: dataEdit.marketId || '',
          marketName: values.marketName,
          avatar: values.avatar,
          status: "Đang hoạt động",
          description: values.description,
          field1: "1",
          field2: "1",
          field3: "1",
          field4: "1",
          field5: "1",
          createdAt: new Date().toISOString(),
          createBy: "1",
          createByHidden: "1",
          lastModifedAt: new Date().toISOString(),
          lastModifedBy: "1",
          lastModifedByHidden: "1",
          flag: "A"
        };

        const response = await editMarketApi(formData);

        if (response.status === 200) {
          formik.resetForm();
          // call api list after add success
          const res = await listMarketApi();

          // dispatch list data
          dispatch({
            type: HANDLERS_MARKET.LIST_MARKET,
            payload: res.data,
          });
          handleClose(true)
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleClose = (isEvent) => {
    onClose(isEvent);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          marketId: dataEdit.marketId || '',
          avatar: dataEdit.avatar || '',
          marketName: dataEdit.marketName || '',
          description: dataEdit.description || '',
          status: dataEdit.status || 'Đang hoạt động',
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    if (open && id) {
      fetchMarketData();
    }
  }, [open, id]);

  return (
    <BootstrapDialog
      onClose={() => handleClose(false)}
      open={open}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
        Chỉnh sửa
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
      <DialogContent dividers sx={{ overflowX: "hidden !important" }}>
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Tên Nước"
          fullWidth
          name="marketName"
          error={!!(formik.touched.marketName && formik.errors.marketName)}
          helperText={formik.touched.marketName && formik.errors.marketName}
          onBlur={formik.handleBlur}
          onChange={(e) => formik.setFieldValue('marketName', e.target.value)}
          value={formik.values.marketName}
        />
        <Button size="small"
          component="label"
          fullWidth
          sx={{ margin: "4px", marginTop: "14px" }}>
          {selectedFileLogo ? (
            <>
              <CloudUpload sx={{ marginRight: 1 }} />
              {`Logo: ${selectedFileLogo.name}`}
            </>
          ) : (
            <>
              <CloudUpload sx={{ marginRight: 1 }} />
              Thay logo
            </>
          )}
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Avatar
            src={'https://lotus.i.tisbase.online' + formik.values.avatar}
            alt="Avatar"
            sx={{ width: 40, height: 40, textAlign: 'center', marginLeft: '15px' }}
          >Avatar</Avatar>
        </Button>
        <Autocomplete
          error={!!(formik.touched.status && formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          onBlur={formik.handleBlur}
          onChange={(event, newValue) => formik.setFieldValue("status", newValue?.value || '')}
          value={{ label: formik.values.status, value: formik.values.status }}
          name="status"
          sx={{ margin: "4px", marginTop: "12px" }}
          fullWidth
          size="small"
          options={[
            { label: "Đang hoạt động", value: "Đang hoạt động" },
            { label: "Tạm dừng", value: "Tạm dừng" },
            { label: "Khóa", value: "Khóa" },
          ]}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField {...params} label="Trạng thái" variant="outlined" />
          )}
        />

        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Giới Thiệu Chi Tiết"
          fullWidth
          value={formik.values.description}
          onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'flex-end',
          backgroundColor: '#e3e6e6'
        }}
      >
        <Button autoFocus
          onClick={formik.submitForm}
          variant="contained"
          sx={{ background: '#1C2536' }}
          startIcon={<Save />}
        >
          Lưu
        </Button>
      </DialogActions>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </BootstrapDialog>
  );
}
