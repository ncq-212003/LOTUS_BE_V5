import { XCircleIcon } from "@heroicons/react/24/solid";
import { Add } from "@mui/icons-material";
import {
  Stack,
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
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { listCQACategoryApi } from "src/contexts/api/setting/api-cqa-category";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { HANDLERS_COMMON_QUESTION_ASK } from "src/contexts/reducer/setting/reducer-common-question-ask";
import {
  addCommonQuestionAskApi,
  listCommonQuestionAskApi,
} from "src/contexts/api/setting/api-common-question-ask";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const initialValues = {
  market: "",
  questionName: "",
  category: "",
  type: "1",
  order: "",
  position: "Thực tập sinh",
  options: [],
  required: "Yes",
  description: "",
};

const validationSchema = Yup.object({
  market: Yup.object()
    .shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    })
    .typeError("Vui lòng nhập thông tin vào trường này")
    .required("Vui lòng nhập thông tin vào trường này"),
  questionName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  category: Yup.object()
    .shape({
      value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    })
    .typeError("Vui lòng nhập thông tin vào trường này")
    .required("Vui lòng nhập thông tin vào trường này"),
  order: Yup.number().required("Vui lòng nhập thông tin vào trường này"),
  position: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
});

export default function CreateQuestionAdd() {
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [marketOption, setMarketOption] = useState([]);
  const [cqaCategoryOption, setCqaCategoryOption] = useState([]);
  const [isOptionSelect, setIsOptionSelect] = useState(false);
  const [lines, setLines] = useState([]); // Khai báo mảng để lưu trữ giá trị

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          QuestionType: values.type,
          LastModifiedByHidden: 1,
          MaketId: values.market.value,
          CommonQuestionAskId: 1,
          PositionLocated: values.position,
          IsRequired: values.required === "Yes" ? 1 : 0,
          CreatedByHidden: 1,
          MaketIdHidden: values.market.value,
          CQACategoryId: values.category.value,
          Flag: 1,
          QuestionName: values.questionName,
          LastModifiedAt: new Date().toISOString(),
          OptionAnswer: JSON.stringify(values.options),
          IsRequiredHidden: values.required,
          OrderQuestion: values.order,
          LastModifiedBy: 1,
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CQACategoryIdHidden: values.category.value,
          Field1: 1,
          Field2: 1,
          Field3: 1,
          Field4: 1,
          CreatedAt: new Date().toISOString(),
          Field5: 1,
          Description: 1,
          OrderQuestionHidden: 1,
          CreatedBy: 1,
        };

        // const response = await addCommonQuestionAskApi(formData);
        // if (response.status === 200) {
        //   setSnackbarSeverity("success");
        //   setSnackbarMessage("Thêm thành công !");
        //   setSnackbarOpen(true);

        //   formik.resetForm();

        //   // call api list after add success
        //   const res = await listCommonQuestionAskApi();
        //   // dispatch list data
        //   dispatch({
        //     type: HANDLERS_COMMON_QUESTION_ASK.LIST_COMMON_QUESTION_ASK,
        //     payload: res.data,
        //   });
        // } else {
        //   setSnackbarSeverity("error");
        //   setSnackbarMessage("Có lỗi xảy ra !");
        //   setSnackbarOpen(true);
        // }
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

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    formik.handleChange(event);
    formik.setFieldValue("options", []);
    setIsOptionSelect(selectedType === "2");
  };

  const addRowAnswer = () => {
    setLines((prevLines) => [...prevLines, prevLines.length + 1]);
    formik.setFieldValue("options", [...formik.values.options, ""]);
  };

  const deleteRowAnswer = (rowIndex) => {
    setLines((prevLines) => prevLines.filter((line, index) => index !== rowIndex));
    const updatedOptions = formik.values.options.filter((_, index) => index !== rowIndex);
    formik.setFieldValue("options", updatedOptions);
  };

  const handleTextFieldChange = (value, index) => {
    const updatedOptions = [...formik.values.options];
    updatedOptions[index] = value;
    formik.setFieldValue("options", updatedOptions);
  };

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
                  onChange={(event, newValue) => formik.setFieldValue("market", newValue)}
                  value={formik.values.market}
                  name="market"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={marketOption}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Thị trường"
                      variant="outlined"
                      error={!!(formik.touched.market && formik.errors.market)}
                      helperText={formik.touched.market && formik.errors.market}
                      onBlur={formik.handleBlur}
                    />
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
              </Grid>
              <Grid item sm={12} xs={12} md={6}>
                <Autocomplete
                  onChange={(event, newValue) => formik.setFieldValue("category", newValue)}
                  value={formik.values.category}
                  name="category"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                  disablePortal
                  options={cqaCategoryOption}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Nhóm câu hỏi"
                      error={!!(formik.touched.category && formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />
                <Autocomplete
                  onChange={(event, newValue) => formik.setFieldValue("position", newValue)}
                  value={formik.values.position}
                  name="position"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["Thực tập sinh", "Du học sinh"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vị trí câu hỏi"
                      variant="outlined"
                      error={!!(formik.touched.position && formik.errors.position)}
                      helperText={formik.touched.position && formik.errors.position}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />
                <Box sx={{ margin: "4px", marginTop: "12px", marginLeft: "10px" }}>
                  <FormLabel>Câu hỏi bắt buộc</FormLabel>
                  <RadioGroup
                    row
                    name="required"
                    value={formik.values.required}
                    onChange={(event) => formik.handleChange(event)}
                  >
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Có" />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="Không" />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ margin: "4px", marginLeft: "10px" }}>
              <FormLabel>Kiểu câu hỏi</FormLabel>
              <RadioGroup row name="type" value={formik.values.type} onChange={handleTypeChange}>
                <FormControlLabel value="1" control={<Radio size="small" />} label="Tự luận" />
                <FormControlLabel value="2" control={<Radio size="small" />} label="Lựa chọn" />
                <FormControlLabel value="3" control={<Radio size="small" />} label="Ngày giờ" />
              </RadioGroup>
            </Box>
            {lines.map((line, index) => (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  key={line}
                  error={
                    !!(formik.touched[`cauTraLoi${index}`] && formik.errors[`cauTraLoi${index}`])
                  }
                  helperText={
                    formik.touched[`cauTraLoi${index}`] && formik.errors[`cauTraLoi${index}`]
                  }
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleTextFieldChange(e.target.value, index)}
                  // value={formik.values.options[index] || ""}
                  value={formik.values.options[index]}
                  sx={{ marginTop: "10px" }}
                  size="small"
                  label={`Câu trả lời ${index + 1}`}
                  fullWidth
                  variant="outlined"
                />
                <Button variant="text" onClick={() => deleteRowAnswer(index)}>
                  <DeleteIcon sx={{ color: "black", marginTop: "10px" }} />
                </Button>
              </Box>
            ))}
            {isOptionSelect && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Thêm">
                  <IconButton onClick={addRowAnswer}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
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
        {/* <BootstrapDialog onClose={closeModal} open={isModalOpen} fullWidth>
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
            <Button
              autoFocus
              onClick={handleAdd}
              variant="contained"
              sx={{ background: "#1C2536" }}
            >
              Thêm
            </Button>
          </DialogActions>
        </BootstrapDialog> */}
      </form>
    </>
  );
}
