import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Grid,
  Stack,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  DialogActions,
  styled,
  DialogTitle,
  DialogContent,
  Divider,
  Autocomplete,
} from "@mui/material";
import { useApp } from "src/hooks/use-app";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "./action-notification";
import { addBranchApi, listBranchApi } from "src/contexts/api/company/api-branch";
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// const companies = [
//   { value: 1, label: "Công ty Apple" },
//   { value: 2, label: "Công ty Apple" },
//   { value: 3, label: "Công ty Apple " },
//   { value: 4, label: "Công ty Samsung" },
//   { value: 5, label: "Công ty Samsung " },
//   { value: 6, label: "Công ty Game" },
// ];

const employeeOption = [
  { value: 1, label: "Nghĩa" },
  { value: 2, label: "Tú" },
  { value: 3, label: "Dự" },
];

const locationOption = [
  { value: 1, label: "Trong nước" },
  { value: 2, label: "Nhật Bản" },
  { value: 3, label: "Hàn Quốc" },
];

export default function ModalAddBranch({ open, onClose }) {
  const [state, dispatch] = useApp();
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          label: com.companyName,
          value: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          label: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          value: employee.employeeId,
        }));
        setEmployeeNameMain(employees);
      }
    };
    listEmployeeName();
  }, []);

  const formik = useFormik({
    initialValues: {
      companies: "",
      address: "",
      mainPersonCharge: "",
      branchName: "",
      phone: "",
      website: "",
      country: "",
    },
    validationSchema: Yup.object({
      branchName: Yup.string().required("Vui lòng nhập thông tin vào trường này").nullable(),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
        .max(15, "Số điện thoại tối đa là 15 số"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          branchId: 1,
          companyId: values.companies.value,
          companyIdHidden: values.companies.value,
          branchName: values.branchName,
          address: values.address,
          location1: values.address,
          telephone: values.phone,
          website: values.website,
          employeeIdMain: values.mainPersonCharge.value,
          employeeIdMainHidden: values.mainPersonCharge.value,
          description: "1",
          field1: "1",
          field2: "1",
          field3: "1",
          fiedl4: "1",
          field5: "1",
          createdAt: new Date().toISOString(),
          createdBy: 1,
          createdByHidden: 1,
          lastModifedAt: new Date().toISOString(),
          lastModifedBy: 1,
          lastModifedByHidden: 1,
          flag: "1",
        };

        console.log(formData);

        const response = await addBranchApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          formik.resetForm();

          // call api list after add success
          const res = await listBranchApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_BRANCH.LIST_BRANCH,
            payload: res.data,
          });
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.log(err.message);
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    onClose();
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
          Thêm chi nhánh
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Stack sx={{ p: 2 }}>
            <Autocomplete
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("companies", newValue)}
              value={formik.values.companies}
              name="companies"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={companyNameOption}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Tên công ty"
                  error={!!(formik.touched.companies && formik.errors.companies)}
                  helperText={formik.touched.companies && formik.errors.companies}
                />
              )}
            />
            <TextField
              error={!!(formik.touched.branchName && formik.errors.branchName)}
              helperText={formik.touched.branchName && formik.errors.branchName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.branchName}
              name="branchName"
              variant="outlined"
              fullWidth
              size="small"
              label="Tên chi nhánh "
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <Autocomplete
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("mainPersonCharge", newValue)}
              value={formik.values.mainPersonCharge}
              name="mainPersonCharge"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={employeeOption}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Người phụ trách chính"
                  error={!!(formik.touched.mainPersonCharge && formik.errors.mainPersonCharge)}
                  helperText={formik.touched.mainPersonCharge && formik.errors.mainPersonCharge}
                />
              )}
            />
            <TextField
              error={!!(formik.touched.address && formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              name="address"
              variant="outlined"
              required
              fullWidth
              size="small"
              label="Địa chỉ"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <TextField
              error={!!(formik.touched.website && formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.website}
              name="website"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Website"
              fullWidth
            />
            <TextField
              error={!!(formik.touched.phone && formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              variant="outlined"
              fullWidth
              size="small"
              label="Số điện thoại "
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <Autocomplete
              error={!!(formik.touched.country && formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("country", newValue)}
              value={formik.values.country}
              name="country"
              size="small"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              options={locationOption}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Chọn quốc gia" />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#e3e6e6",
          }}
        >
          <Button autoFocus type="submit" variant="contained" sx={{ background: "#1C2536" }}>
            Thêm
          </Button>
        </DialogActions>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </form>
    </BootstrapDialog>
  );
}
