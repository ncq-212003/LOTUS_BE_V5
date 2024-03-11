import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Grid,
  Stack,
  Box,
  Autocomplete,
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
import { HANDLERS_SCHOOL } from "src/contexts/reducer/setting/reducer-school";
import { listSchoolApi, updateSchoolApi } from "src/contexts/api/setting/api-school";
// import {listMarketApi} from "src/contexts/api/setting/api-market";
import SnackbarAlert from "src/components/action-notification";
import { listMarketApi } from "src/contexts/api/setting/api-market";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SchoolEdit({ open, onClose, id }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { school } = state;
  const { schools } = school;
  const [marketOption, setMarketOption] = useState([]);

  // List market
  useEffect(() => {
    const listData = async () => {
      const res = await listMarketApi();
      const markets = res.data.map((m) => ({
        label: m.marketName,
        value: m.marketId,
      }));
      setMarketOption(markets);
    };
    listData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object({

  });

  const initialValues = {
    schoolName: "",
    market: null,
    address: "",
    website: "",
    email: "",
    phone: "",
    contact: "",
    description: ""
  };

  const dataEdit = Array.isArray(schools) ? schools.find(x => x.schoolId == id) : [];


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      console.log(values.market);
      try {
        const formData = {
          schoolId: id,
          marketId: values.market.value,
          marketIdHidden: "1",
          schoolName: values.schoolName,
          address: values.address,
          email: values.email,
          phone: values.phone,
          description: values.description,
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
          flag: "1"
        }

        console.log(formData);
        const response = await updateSchoolApi(formData)

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Sửa thành công !");
          setSnackbarOpen(true);

          // call api list after add success
          const res = await listSchoolApi();
          console.log(res);
          // dispatch list data
          dispatch({
            type: HANDLERS_SCHOOL.LIST_SCHOOL,
            payload: res.data,
          });
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage("Sửa thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const selectedMarket = marketOption.find((market) => market.value === id);
        console.log(selectedMarket);
        formik.setValues({
          market: selectedMarket || null,
          schoolName: dataEdit.schoolName || '',
          address: dataEdit.address || '',
          email: dataEdit.email || '',
          phone: dataEdit.phone || '',
          description: dataEdit.description || '',
        });
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    };

    if (open && id) {
      fetchSchoolData();
    }
  }, [open, id]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
        <Toolbar>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
        <form
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
              md={12}
              xs={12}
            >
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  padding: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: "16px" }}
                >
                  Thông tin cơ bản
                </Typography>
                <TextField
                  error={!!(formik.touched.schoolName && formik.errors.schoolName)}
                  helperText={formik.touched.schoolName && formik.errors.schoolName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.schoolName}
                  name="schoolName"
                  variant="outlined"
                  required
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Tên trường học"
                  fullWidth
                />
                <Autocomplete
                  error={!!(formik.touched.market && formik.errors.market)}
                  helperText={formik.touched.market && formik.errors.market}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("market", newValue)}
                  value={formik.values.market}
                  name="market"
                  required
                  fullWidth
                  size="small"
                  options={marketOption}
                  sx={{ margin: "0px auto 13px" }}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Thị trường" />
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
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Địa chỉ trường học"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Địa chỉ email"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.website && formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.website}
                  name="website"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
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
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Điện thoại"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  multiline
                  name="description"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Ghi chú"
                  fullWidth
                />           <Box
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
                    type="submit"
                  >
                    Thêm
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
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
