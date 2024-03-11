import * as React from "react";
import { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  TextField,
  Stack,
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  Dialog,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Save } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { listCQACategoryApi, updateCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { HANDLERS_CQACATEGORY } from "src/contexts/reducer/setting/reducer-cqa-category";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = Yup.object({
  category: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  order: Yup.number().required("Vui lòng nhập thông tin vào trường này."),
  description: Yup.string(),
});

const initialValues = {
  category: "",
  order: "",
  description: "",
};

export default function QuestionGroupEdit({ open, onClose, id }) {
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // context
  const [state, dispatch] = useApp();
  const { cqaCategory } = state;
  const { cqaCategories } = cqaCategory;

  const dataEdit = Array.isArray(cqaCategories)
    ? cqaCategories.find((x) => x.cqaCategoryId == id)
    : [];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          category: dataEdit.cqaName || "",
          order: dataEdit.orderCategory || "",
          description: dataEdit.description || "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có ID
    if (open && id) {
      fetchCompanyData();
    }
  }, [open, id]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          cqaCategoryId: id,
          cqaName: values.category,
          orderCategory: values.order,
          orderCategoryHidden: "1",
          description: values.description || "1",
          field1: "1",
          field2: "1",
          field3: "1",
          field4: "1",
          field5: "1",
          timeStamp: Math.floor(new Date().getTime() / 1000),
          createdAt: new Date().toISOString(),
          createdBy: 1,
          createdByHidden: "1",
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: 1,
          lastModifiedByHidden: "1",
          flag: "1",
        };

        console.log(formData);

        const response = await updateCQACategoryApi(formData);
        if (response.status === 200) {
          handleClose(true);
          formik.resetForm();

          // call api list after add success
          const res = await listCQACategoryApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_CQACATEGORY.LIST_CQACATEGORY,
            payload: res.data,
          });
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

  return (
    <BootstrapDialog onClose={() => handleClose(false)} open={open} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
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
      <DialogContent dividers>
        <TextField
          error={!!(formik.touched.category && formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.category}
          name="category"
          variant="outlined"
          required
          size="small"
          sx={{ margin: "4px", marginBottom: "12px" }}
          label="Tên nhóm câu hỏi"
          fullWidth
        />
        <TextField
          error={!!(formik.touched.order && formik.errors.order)}
          helperText={formik.touched.order && formik.errors.order}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.order}
          required
          name="order"
          variant="outlined"
          size="small"
          sx={{ margin: "4px", marginBottom: "12px" }}
          label="Thứ tự"
          fullWidth
        />
        <TextField
          error={!!(formik.touched.description && formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          name="description"
          variant="outlined"
          size="small"
          sx={{ margin: "4px", marginBottom: "12px" }}
          label="Ghi chú"
          fullWidth
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
