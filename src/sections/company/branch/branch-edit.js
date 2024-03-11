import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Grid,
  Stack,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import SnackbarAlert from "src/components/action-notification";
import { listBranchApi, updateBranchApi } from "src/contexts/api/company/api-branch";
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";
import { listMarketApi } from "src/contexts/api/setting/api-market";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
  companies: "",
  address: "",
  mainPersonCharge: "",
  branchName: "",
  phone: "",
  website: "",
  country: "",
  description: "",
};

const validationSchema = Yup.object({
  companies: Yup.object()
    .shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    })
    .required("Vui lòng nhập thông tin vào trường này"),
  branchName: Yup.string().required("Vui lòng nhập thông tin vào trường này").nullable(),
  address: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  mainPersonCharge: Yup.object()
    .shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    })
    .required("Vui lòng nhập thông tin vào trường này"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
    .max(15, "Số điện thoại tối đa là 15 số"),
  country: "",
});

export default function BranchEdit({ open, onClose, id }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  const [countryOption, setCountryOption] = useState([]);

  const [state, dispatch] = useApp();
  const { branch } = state;
  const { branchs } = branch;

  const branchEdit = Array.isArray(branchs) ? branchs.find((bra) => bra.branchId == id) : [];
  const companyName = companyNameOption.find((com) => com.value === branchEdit?.companyId);

  const employeeMainName = employeeNameMain.find((em) => em.value === branchEdit?.employeeIdMain);
  const country = countryOption.find((c) => c.value === branchEdit?.marketId);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          companies: companyName || "",
          mainPersonCharge: employeeMainName || "",
          address: branchEdit.address || "",
          branchName: branchEdit.branchName || "",
          phone: branchEdit.telephone || "",
          website: branchEdit.website || "",
          country: country || "",
          description: "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có ID
    if (open && id) {
      fetchBranchData();
    }
  }, [open, id]);

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

  //list country
  useEffect(() => {
    const listCountry = async () => {
      const res = await listMarketApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const country = res.data.map((market) => ({
          label: market.marketName,
          value: market.marketId,
        }));
        setCountryOption(country);
      }
    };
    listCountry();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          branchId: id,
          companyId: values.companies.value,
          companyIdHidden: values.companies.value,
          branchName: values.branchName,
          marketId: values.country.value,
          marketIdHidden: values.country.value,
          address: values.address,
          locationId: 1,
          locationIdHidden: 1,
          telephone: values.phone,
          website: values.website,
          employeeIdMain: values.mainPersonCharge.value,
          employeeIdMainHidden: values.mainPersonCharge.value,
          description: values.description || "1",
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

        const data = JSON.stringify(values);

        console.log(formData);
        const response = await updateBranchApi(formData);
        if (response.status === 200) {
          // call api list after add success
          const res = await listBranchApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_BRANCH.LIST_BRANCH,
            payload: res.data,
          });
          handleClose(true);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.log(err.message);
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
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
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <IconButton edge="start" color="inherit" onClick={() => handleClose(false)} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "10px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              padding: "16px",
              bgcolor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={12}>
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
                  options={employeeNameMain}
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
                  options={countryOption}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Quốc gia" />
                  )}
                />
                <TextField
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Ghi chú"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#1C2536",
                }}
                type="submit"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </form>
      </Stack>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Dialog>
  );
}
