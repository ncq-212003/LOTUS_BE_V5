import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addEthnicApi, listEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import { useApp } from "src/hooks/use-app";
import { useState } from "react";
import { GenerateApi } from "src/contexts/api/random-api";
import { useEffect } from "react";
import { ListMarket, listMarketApi } from "src/contexts/api/setting/api-market";
import ConfirmAlert from "src/components/action-confirm";

const validationSchema = Yup.object({
  nameEthnicity: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  codeEthnicity: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  marketId: Yup.object()
    .shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    })
    .typeError("Vui lòng nhập thông tin vào trường này"),
});

const initialValues = {
  nameEthnicity: "",
  codeEthnicity: "",
  description: "",
  marketId: "",
};

export default function EthnicityAdd() {
  // state
  const [Code, setCode] = useState("");
  const [marketOption, setMarketOption] = useState([]);
  // context
  const [state, dispatch] = useApp();
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

  //listMarketOption
  useEffect(() => {
    const listMarketOption = async () => {
      const res = await listMarketApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.marketName,
          value: com.marketId,
        }));
        setMarketOption(data);
      }
    };
    listMarketOption();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          LastModifiedByHidden: "1",
          MarketIdHidden: values.marketId.value,
          CreatedByHidden: "1",
          EthnicId: "1",
          Flag: "1",
          Code: values.codeEthnicity.trim(),
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          MarketId: values.marketId.value,
          Field1: "1",
          Field2: "1",
          Field3: "1",
          EthnicName: values.nameEthnicity.trim(),
          Field4: "1",
          CreatedAt: new Date().toISOString(),
          Field5: "1",
          Description: values.description.trim(),
          CreatedBy: "1",
        };

        // console.log(formData);

        if (isSaving) {
          const response = await addEthnicApi(formData)
          if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Thêm thành công !");
            setSnackbarOpen(true);

            formik.resetForm();
            const resCode = await GenerateApi('DTOC', 'Number');
            setCode(resCode.data);

            // call api list after add success
            const res = await listEthnicApi();
            // dispatch list data
            dispatch({
              type: HANDLERS_ETHNIC.LIST_ETHNIC,
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
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const getRandom = async () => {
      const res = await GenerateApi('DTOC', 'Number');
      setCode(res.data);
    };
    getRandom();
  }, []);

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
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
                Thông tin
              </Typography>
              <TextField
                error={!!(formik.touched.nameEthnicity && formik.errors.nameEthnicity)}
                helperText={formik.touched.nameEthnicity && formik.errors.nameEthnicity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ margin: "4px", marginTop: "12px" }}
                value={formik.values.nameEthnicity}
                name="nameEthnicity"
                variant="outlined"
                required
                size="small"
                label="Dân tộc"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.codeEthnicity && formik.errors.codeEthnicity)}
                helperText={formik.touched.codeEthnicity && formik.errors.codeEthnicity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ margin: "4px", marginTop: "12px" }}
                value={formik.values.codeEthnicity = Code}
                name="codeEthnicity"
                variant="outlined"
                required
                size="small"
                label="Mã ( phân biệt )"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <Autocomplete
                error={!!(formik.touched.marketId && formik.errors.marketId)}
                helperText={formik.touched.marketId && formik.errors.marketId}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("marketId", newValue)}
                value={formik.values.marketId}
                name="marketId"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={marketOption}
                renderInput={(params) => (
                  <TextField {...params}
                    label="Thị trường"
                    variant="outlined" />
                )}
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ margin: "4px", marginTop: "12px" }}
                value={formik.values.description}
                name="description"
                variant="outlined"
                size="small"
                label="Ghi chú"
                fullWidth
                multiline
                rows={2}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: '12px' }}>
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
          </Grid>
        </Grid>
      </form>
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
    </Stack>
  );
}
