import { Add } from "@mui/icons-material";
import {
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  SvgIcon,
  Link,
  Tooltip,
  IconButton,
} from "@mui/material";
import { isInteger, useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { addDepartmentApi, listDepartmentApi } from "src/contexts/api/company/api-department";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { GenerateApi } from "src/contexts/api/random-api";
import { HANDLERS_DEPARMENT } from "src/contexts/reducer/company/reducer-department";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import ConfirmAlert from "src/components/action-confirm";

export default function DepartmentAdd() {
  // state
  const [codePhongban, setCodePhongban] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();

  //Alert Confirm
  const [isDialogSave, setIsDialogSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleModelOpen = () => {
    setIsDialogSave(true);
  };

  const handleModelClose = () => {
    setIsDialogSave(false);
  };

  // khi người dùng ấn thoát
  const handleCancelSave = () => {
    handleModelClose();
  }

  // khi người dùng xác định lưu 
  const handleConfirmSave = () => {
    setIsSaving(true);
    handleModelClose();
    formik.handleSubmit();
  }
  //end

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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOpenModal = (params) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      company: "",
      departmentName: "",
      BriefCode: "",
      deskPhone: "",
      mainPersonInCharge: "",
      status: "Hoạt động",
      description: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      BriefCode: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      deskPhone: Yup.string()
        .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
        .max(15, "Số điện thoại tối đa là 15 số"),
      mainPersonInCharge: Yup.object()
        .shape({
          value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
          label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        })
        .typeError("Vui lòng nhập thông tin vào trường này"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          EmployeeIdMain: values.mainPersonInCharge.value,
          Telephone: values.deskPhone,
          BriefCode: values.BriefCode,
          BranchIdHidden: 1,
          DeparmentName: values.departmentName,
          LastModifedByHidden: "1",
          CreatedByHidden: "1",
          EmployeeIdMainHidden: values.mainPersonInCharge.value,
          Flag: "1",
          DepartmentId: "1",
          Status: values.status,
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          Field1: "1",
          CompanyId: values.company.value,
          Field2: "1",
          Field3: "1",
          Field4: "1",
          CreatedAt: new Date().toISOString(),
          Field5: "1",
          LastModifedAt: new Date().toISOString(),
          Description: values.description,
          BranchId: 1,
          CreatedBy: "1",
          LastModifedBy: "1",
        };
        if (isSaving) {
          const response = await addDepartmentApi(formData);
          if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);

            formik.resetForm();

            // call api list after add success
            const res = await listDepartmentApi();
            // dispatch list data
            dispatch({
              type: HANDLERS_DEPARMENT.LIST_DEPARMENT,
              payload: res.data,
            });
            setIsSaving(false);
          } else {
            setIsSaving(false);
            setSnackbarSeverity("error");
            setSnackbarMessage("Có lỗi xảy ra !");
            setSnackbarOpen(true);
          }
        } else {
          handleModelOpen();
        }
      } catch (err) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const getRandom = async () => {
      const res = await GenerateApi("PB", "Number");
      setCodePhongban(res.data);
    };
    getRandom();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={3}
          sx={{
            margin: "38px 0",
          }}
        >
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item sm={12} xs={12} md={6}>
                <Autocomplete
                  error={!!(formik.touched.company && formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                  value={formik.values.company}
                  name="company"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={companyNameOption}
                  renderInput={(params) => (
                    <TextField {...params} label="Công ty" variant="outlined" />
                  )}
                />

                <TextField
                  error={!!(formik.touched.departmentName && formik.errors.departmentName)}
                  helperText={formik.touched.departmentName && formik.errors.departmentName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.departmentName}
                  name="departmentName"
                  required
                  fullWidth
                  label="Tên phòng ban "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <TextField
                  error={!!(formik.touched.BriefCode && formik.errors.BriefCode)}
                  helperText={formik.touched.BriefCode && formik.errors.BriefCode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={(formik.values.BriefCode = codePhongban)}
                  name="BriefCode"
                  required
                  fullWidth
                  label="Mã phòng ban "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  aria-readonly
                />
              </Grid>

              <Grid item sm={12} xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.deskPhone && formik.errors.deskPhone)}
                  helperText={formik.touched.deskPhone && formik.errors.deskPhone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.deskPhone}
                  name="deskPhone"
                  required
                  fullWidth
                  label="Số điện thoại bàn "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <Autocomplete
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) =>
                    formik.setFieldValue("mainPersonInCharge", newValue)
                  }
                  value={formik.values.mainPersonInCharge}
                  name="mainPersonInCharge"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={employeeNameMain}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Người phụ trách chính"
                      error={
                        !!(formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge)
                      }
                      helperText={
                        formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge
                      }
                    />
                  )}
                />
                <TextField
                  error={!!(formik.touched.status && formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  value={formik.values.status}
                  name="status"
                  fullWidth
                  sx={{ margin: "4px", marginTop: "12px" }}
                  label="Trạng thái"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Dừng hoạt động">Dừng hoạt động</option>
                </TextField>
                {/* <Autocomplete
                  error={!!(formik.touched.status && formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("status", newValue)}
                  value={formik.values.status}
                  name="status"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                  disablePortal
                  options={statusOption}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Tình trạng" />
                  )}
                /> */}
              </Grid>
            </Grid>
            <TextField
              error={!!(formik.touched.description && formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              multiline
              rows={3}
              fullWidth
              label="Mô tả "
              variant="outlined"
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1C2536",
                }}
                type="submit"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Stack>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
        <ConfirmAlert
          onOpen={isDialogSave}
          onClose={handleModelClose}
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      </form>
    </>
  );
}
