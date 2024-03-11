import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  Tab,
  Tabs,
  Divider,
  AppBar,
  Checkbox,
  styled,
  DialogTitle,
  IconButton,
  SvgIcon,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { Box, Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useFetchLocation from "src/contexts/api/location-api";
import { listSupplyTypeApi } from "src/contexts/api/setting/api-supply-type";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = Yup.object({});

const initialValues = {
  typeSupplySource: "",
  name: "",
  cityPerson: [],
  phone: "",
  email: "",
  personalDescription: "",
  city: "",
  cityDescription: "",
};

// const typeSupplySourceOption = [
//   { value: 1, label: "Cá nhân" },
//   { value: 2, label: "Tỉnh / thành phố" },
//   { value: 3, label: "Bộ lao động thương binh" },
//   { value: 4, label: "Trung tâm giáo dục thường xuyên" },
// ];

export default function AddSupplySource({ open, onClose }) {
  // const [tabValue, setTabValue] = useState(0); // Initialize tab value

  // const handleChangeTab = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  const { cities } = useFetchLocation();
  const [supplySouceType, setSupplySouceType] = useState([]);

  //listCompanyName
  useEffect(() => {
    const listSupplySouceType = async () => {
      const res = await listSupplyTypeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const SupplySouceTypes = res.data.map((sst) => ({
          label: sst.supplySourceTypeName,
          value: sst.supplySourceTypeId,
        }));
        setSupplySouceType(SupplySouceTypes);
      }
    };
    listSupplySouceType();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);

        console.log(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <BootstrapDialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
          Chọn loại cung ứng
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
              error={!!(formik.touched.typeSupplySource && formik.errors.typeSupplySource)}
              helperText={formik.touched.typeSupplySource && formik.errors.typeSupplySource}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("typeSupplySource", newValue)}
              value={formik.values.typeSupplySource}
              name="typeSupplySource"
              sx={{ margin: "0 auto", marginTop: "15px", width: "80%" }}
              required
              options={supplySouceType}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label={"Loại cung ứng"} />
              )}
            />
            {formik.values.typeSupplySource === null ? null : formik.values.typeSupplySource
                .value === 1 ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  size="small"
                  variant="outlined"
                  name="name"
                  required
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  label="Tên"
                />
                <Autocomplete
                  error={!!(formik.touched.cityPerson && formik.errors.cityPerson)}
                  helperText={formik.touched.cityPerson && formik.errors.cityPerson}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("cityPerson", newValue)}
                  value={formik.values.cityPerson}
                  name="cityPerson"
                  multiple
                  limitTags={3}
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  disableCloseOnSelect
                  size="small"
                  options={cities}
                  renderOption={(props, optionRole, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {optionRole.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label={"Tỉnh / thành phố"} />
                  )}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  size="small"
                  variant="outlined"
                  name="phone"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Số điện thoại"
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  size="small"
                  variant="outlined"
                  name="email"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Email"
                />
                <TextField
                  error={!!(formik.touched.descriptionPerson && formik.errors.descriptionPerson)}
                  helperText={formik.touched.descriptionPerson && formik.errors.descriptionPerson}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionPerson}
                  size="small"
                  variant="outlined"
                  multiline
                  name="descriptionPerson"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  label="Ghi chú"
                />
              </Box>
            ) : formik.values.typeSupplySource.value === 2 ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Autocomplete
                  error={!!(formik.touched.city && formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("city", newValue)}
                  value={formik.values.city}
                  name="city"
                  sx={{ margin: "0 auto", marginTop: "20px", width: "80%" }}
                  size="small"
                  required
                  autoHighlight
                  options={cities}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label={"Tỉnh / thành phố"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <TextField
                  error={!!(formik.touched.descriptionCity && formik.errors.descriptionCity)}
                  helperText={formik.touched.descriptionCity && formik.errors.descriptionCity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionCity}
                  size="small"
                  variant="outlined"
                  name="descriptionCity"
                  multiline
                  sx={{ margin: "10px auto 30px", width: "80%" }}
                  label="Ghi chú"
                  margin="normal"
                />
              </Box>
            ) : formik.values.typeSupplySource.value === 3 ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  error={!!(formik.touched.personInCharge && formik.errors.personInCharge)}
                  helperText={formik.touched.personInCharge && formik.errors.personInCharge}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.personInCharge}
                  size="small"
                  variant="outlined"
                  name="name"
                  required
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  label="Người phụ trách"
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  size="small"
                  variant="outlined"
                  name="phone"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Số điện thoại"
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  size="small"
                  variant="outlined"
                  name="email"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Email"
                />
                <TextField
                  error={!!(formik.touched.descriptionCity && formik.errors.descriptionCity)}
                  helperText={formik.touched.descriptionCity && formik.errors.descriptionCity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionCity}
                  size="small"
                  variant="outlined"
                  name="descriptionCity"
                  multiline
                  sx={{ margin: "10px auto 30px", width: "80%" }}
                  label="Ghi chú"
                  margin="normal"
                />
              </Box>
            ) : formik.values.typeSupplySource.value === 4 ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  error={!!(formik.touched.personInCharge && formik.errors.personInCharge)}
                  helperText={formik.touched.personInCharge && formik.errors.personInCharge}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.personInCharge}
                  size="small"
                  variant="outlined"
                  name="name"
                  required
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  label="Người phụ trách"
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  size="small"
                  variant="outlined"
                  name="phone"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Số điện thoại"
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  size="small"
                  variant="outlined"
                  name="email"
                  sx={{ margin: "0 auto", marginTop: "10px", width: "80%" }}
                  required
                  label="Email"
                />
                <TextField
                  error={!!(formik.touched.descriptionCity && formik.errors.descriptionCity)}
                  helperText={formik.touched.descriptionCity && formik.errors.descriptionCity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptionCity}
                  size="small"
                  variant="outlined"
                  name="descriptionCity"
                  multiline
                  sx={{ margin: "10px auto 30px", width: "80%" }}
                  label="Ghi chú"
                  margin="normal"
                />
              </Box>
            ) : null}
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
      </BootstrapDialog>
    </form>
  );
}
{
  /* <Box sx={{ borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            textColor="inherit"
            variant="fullWidth"
          >
            
            <Tab label="Cá nhân"/>
            <Tab label="Tỉnh / thành phố" /> 
          </Tabs>
        </Box> */
}
