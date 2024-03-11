import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  Slide,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Box,
  SvgIcon,
  Tooltip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import { Add, Save } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { listCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { Stack } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = Yup.object({});
export default function CreateQuestionEdit({ open, onClose, id }) {
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [marketOption, setMarketOption] = useState([]);
  const [cqaCategoryOption, setCqaCategoryOption] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionSelect, setIsOptionSelect] = useState(false);

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

  //listCqaCategoryOption
  useEffect(() => {
    const listCqaCategoryOption = async () => {
      const res = await listCQACategoryApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((cqa) => ({
          label: cqa.cqaName,
          value: cqa.cqaCategoryId,
        }));
        setCqaCategoryOption(data);
      }
    };
    listCqaCategoryOption();
  }, []);

  const handleOpenModal = (params) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setIsModalOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      company: "",
      branch: "",
      departmentName: "",
      departmentId: "",
      deskPhone: "",
      mainPersonInCharge: "",
      status: "",
      description: "",
    },
    validationSchema: Yup.object({}),
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

  const handleClose = () => {
    onClose();
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    formik.handleChange(event);

    setIsOptionSelect(selectedType === "2");
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          <Grid item sm={12} xs={12} md={6}>
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
                <TextField {...params} label="Thị trường" variant="outlined" />
              )}
            />
            <TextField
              error={!!(formik.touched.questionName && formik.errors.questionName)}
              helperText={formik.touched.questionName && formik.errors.questionName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.questionName}
              name="questionName"
              required
              fullWidth
              label="Tên câu hỏi "
              variant="outlined"
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <TextField
              error={!!(formik.touched.order && formik.errors.order)}
              helperText={formik.touched.order && formik.errors.order}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.order}
              name="order"
              required
              fullWidth
              label="Thứ tự câu hỏi "
              variant="outlined"
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
            <Autocomplete
              error={!!(formik.touched.category && formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("category", newValue)}
              value={formik.values.category}
              name="category"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              fullWidth
              disablePortal
              options={cqaCategoryOption}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Nhóm câu hỏi" />
              )}
            />
            <Autocomplete
              error={!!(formik.touched.position && formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("position", newValue)}
              value={formik.values.position}
              name="position"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Thực tập sinh", "Du học sinh"]}
              renderInput={(params) => (
                <TextField {...params} label="Vị trí câu hỏi" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12} md={6}>
            <Box sx={{ margin: "4px", marginTop: "12px", marginLeft: "10px" }}>
              <FormLabel>Kiểu câu hỏi</FormLabel>
              <RadioGroup row name="type" value={formik.values.type} onChange={handleTypeChange}>
                <FormControlLabel value="1" control={<Radio size="small" />} label="Tự luận" />
                <FormControlLabel value="2" control={<Radio size="small" />} label="Lựa chọn" />
                <FormControlLabel value="3" control={<Radio size="small" />} label="Ngày giờ" />
              </RadioGroup>
            </Box>
            {isOptionSelect && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  error={!!(formik.touched.options && formik.errors.options)}
                  helperText={formik.touched.options && formik.errors.options}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("options", newValue)}
                  value={formik.values.options}
                  name="options"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Lựa chọn câu trả lời" variant="outlined" />
                  )}
                />
                <Tooltip title="Thêm">
                  <IconButton onClick={handleOpenModal}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box sx={{ margin: "4px", marginTop: "12px", marginLeft: "10px" }}>
              <FormLabel>Câu hỏi bắt buộc</FormLabel>
              <RadioGroup
                row
                name="required"
                value={formik.values.required}
                onChange={(event) => handleChange(event, "required")}
              >
                <FormControlLabel value="Có" control={<Radio size="small" />} label="Có" />
                <FormControlLabel value="Không" control={<Radio size="small" />} label="Không" />
              </RadioGroup>
            </Box>
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
          fullWidth
          rows={2}
          label="Mô tả "
          variant="outlined"
          size="small"
          sx={{ margin: "4px", marginTop: "12px" }}
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
      <BootstrapDialog onClose={closeModal} open={isModalOpen} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
          Thêm lựa chọn trả lời
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeModal}
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
            <TextField
              fullWidth
              size="small"
              label="Câu trả lời"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#e3e6e6",
          }}
        >
          <Button autoFocus onClick={handleAdd} variant="contained" sx={{ background: "#1C2536" }}>
            Thêm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </BootstrapDialog>
  );
}
