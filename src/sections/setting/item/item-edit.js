import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Save } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  TextField,
  SvgIcon,
  Autocomplete,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
} from "@mui/material";
import { editItemApi, listItemApi } from "src/contexts/api/setting/api-item";
import { HANDLERS_ITEM } from "src/contexts/reducer/setting/reducer-item";
import { listRoomApi } from "src/contexts/api/setting/api-room";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ItemEdit({ open, onClose, id }) {
  const [selectedDormitory, setSelectedDormitory] = useState(null);
  const [ClassOptions, setClassOptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { item } = state;
  const { items } = item;

  const dataEdit = Array.isArray(items) ? items.find((x) => x.assetId === id) : {};
  const ClassRoom = ClassOptions.find((x) => x.label === dataEdit?.name);

  useEffect(() => {
    const listData = async () => {
      try {
        const res = await listRoomApi();
        if (Array.isArray(res.data) && res.data.length > 0) {
          const data = res.data.map((com) => ({
            label: com.dormitoryRoomColumn,
            value: com.dormitoryId,
          }));
          setClassOptions(data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    listData();
  }, []);

  const validateItemForm = Yup.object({
    dormitoryId: Yup.object().shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    }),
    code: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    assetName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  });

  const initialValues = {
    dormitoryId: null,
    code: "",
    assetName: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateItemForm,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          assetId: id,
          assetName: values.assetName,
          code: values.code,
          name: selectedDormitory ? selectedDormitory.label : '',
          description: values.description,
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          timeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: "1",
          createdByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: "1",
          LastModifiedByHidden: "1",
          Description: values.description.trim(),
          Flag: "A",
        };
        console.log(formData);
        const response = await editItemApi(formData);

        if (response.status === 200) {
          formik.resetForm();
          // call api list after add success
          const res = await listItemApi();

          // dispatch list data
          dispatch({
            type: HANDLERS_ITEM.LIST_ITEM,
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

  useEffect(() => {
    const fetchItemData = () => {
      try {
        formik.setValues({
          dormitoryId: ClassRoom || null,
          code: dataEdit.code || "",
          assetName: dataEdit.assetName || "",
          description: dataEdit.description || "",
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    if (open && id) {
      fetchItemData();
    }
  }, [open, id]);

  const handleClose = (isEvent) => {
    onClose(isEvent);
};

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <BootstrapDialog onClose={() => handleClose(false)} open={open} fullWidth>
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}
      >
        Chỉnh sửa
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
        sx={{
          position: "absolute",
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
        <Autocomplete
          error={!!(formik.touched.dormitoryId && formik.errors.dormitoryId)}
          helperText={
            formik.touched.dormitoryId && formik.errors.dormitoryId
          }
          onBlur={formik.handleBlur}
          onChange={(event, newValue) => {
            formik.setFieldValue("dormitoryId", newValue);
            setSelectedDormitory(newValue);
          }}
          value={formik.values.dormitoryId}
          name="dormitoryId"
          sx={{ margin: "4px", marginTop: "12px" }}
          fullWidth
          size="small"
          options={ClassOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Tên phòng" variant="outlined" />
          )}
        />

        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          variant="outlined"
          size="small"
          name="code"
          label="Mã tài sản vật dụng"
          fullWidth
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          name="assetName"
          label="Tên tài sản vật dụng"
          fullWidth
          value={formik.values.assetName}
          onChange={formik.handleChange}
          error={formik.touched.assetName && Boolean(formik.errors.assetName)}
          helperText={formik.touched.assetName && formik.errors.assetName}
        />
        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Mô tả"
          fullWidth
          value={formik.values.description}
          onChange={(e) => {
            formik.setFieldValue("description", e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          backgroundColor: "#e3e6e6",
        }}
      >
        <Button
          autoFocus
          onClick={formik.submitForm}
          variant="contained"
          sx={{ background: "#1C2536" }}
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
