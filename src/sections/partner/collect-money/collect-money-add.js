import {
  Autocomplete,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DropzoneArea } from "mui-file-dropzone";



const unionProfiles = [
  { id: "PRND000001", name: "Nghiệp đoàn A" },
  { id: "PRND000002", name: "Nghiệp đoàn B" },
  { id: "PRND000003", name: "Nghiệp đoàn C" },
];
const optionCategoies = [
  { id: 1, name: "Phí ăn ở" },
  { id: 2, name: "Phí đào tạo" },
  { id: 3, name: "Bảo hiểm y tế" },
  { id: 4, name: "Chi phí hỗ trợ tư pháp" }
];

const paymentMethods =
  [
    { id: 1, name: "Tiền mặt" },
    { id: 2, name: "Chuyển khoản ngân hàng" },
    { id: 3, name: "Thẻ tín dụng/ Thẻ ghi nợ" },
    { id: 4, name: "Cổng thanh toán trực tuyến" }
  ]

const accountPayments =
  [
    { id: 1, name: "Nguyễn Thành Nam" },
    { id: 2, name: "Tạ Công Vinh" },
    { id: 3, name: "Lê Thị Thảo" },
    { id: 4, name: "Nguyễn Thành Trung" }
  ]

export const CollectMoneyAdd = () => {
  const [showPartnerName, setShowPartnerName] = useState(false);
  const [showAccountField, setShowAccountField] = useState(false);
  const validationSchema = Yup.object({
    transactionID: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    profileCode: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này"),
    dateTime: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    content: Yup
      .string(),
    collectCategories: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    paymentMethod: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    accountPayments: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    money: Yup
      .number()
      .typeError('Số tiền phải là một số')
      .integer('Số tiền phải là số nguyên')
      .positive('Số tiền phải là số nguyên dương')
      .required('Vui lòng nhập thông tin vào trường này'),
    partnerName: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    company: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    employeeName: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    payer: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    payerAddress: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    accompanyingDocument: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    transactionID: "PTDT000001",
    profileCode: "",
    dateTime: Date.now(),
    content: "",
    collectCategories: "",
    paymentMethod: "",
    accountPayment: "",
    money: "",
    partnerName: "",
    employeeName: "",
    payer: "",
    payerAddress: "",
    accompanyingDocument: "",
    note: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
        const data = JSON.stringify(values);
        console.log(data);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        console.error("Submit Error:", err);
      }
    }

  })


  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  };




  //Display partner name
  useEffect(() => {
    const selectedProfile = unionProfiles.find((profile) => profile.id === formik.values.profileCode);

    if (selectedProfile) {
      formik.setFieldValue("partnerName", selectedProfile.name);
      setShowPartnerName(true);
    } else {
      formik.setFieldValue("partnerName", "");
      setShowPartnerName(false);
    }
  }, [formik.values.profileCode, unionProfiles]);


  //Chứng từ kèm theo
  const [files, setFiles] = useState([]);

  const handleChange = (files) => {
    setFiles(files);
  };

  useEffect(() => {
    const tagContentDrop = document.querySelector('.css-1gqpucm-MuiTypography-root');
    if (tagContentDrop) {
      tagContentDrop.textContent = "Kéo và thả tệp vào đây hoặc nhấp vào";
    }
  }, [])

  return (
    <Stack spacing={2} sx={{ p: 2, marginTop: "5px" }}>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box
            sx={{
              marginBottom: "16px",
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "4px"
            }}
          >
            <TextField
              error={!!(formik.touched.transactionID && formik.errors.transactionID)}
              helperText={formik.touched.transactionID && formik.errors.transactionID}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.transactionID}
              name="transactionID "
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Mã số phiếu"
              fullWidth
              variant="outlined"
            />
            <Autocomplete
              options={unionProfiles}
              getOptionLabel={(option) => option.id}
              value={unionProfiles.find((u) => u.id === formik.values.profileCode) || null}

              onChange={(e, value) => formik.setFieldValue("profileCode", value?.id || "")}
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.profileCode && Boolean(formik.errors.profileCode)}
                  helperText={formik.touched.profileCode && formik.errors.profileCode}
                  onBlur={formik.handleBlur}
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Mã đối tác "
                />
              )}
            />
            {showPartnerName &&
              <TextField
                error={!!(formik.touched.partnerName && formik.errors.partnerName)}
                helperText={formik.touched.partnerName && formik.errors.partnerName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.partnerName}
                name="partnerName"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên đối tác"
                fullWidth
                variant="outlined"
                // disabled
                InputProps={{ readOnly: true }}
              />
            }
            <Autocomplete
              options={optionCategoies}
              getOptionLabel={(option) => option.name}
              value={optionCategoies.find((c) => c.id === formik.values.collectCategories)}
              onChange={(e, value) => formik.setFieldValue("collectCategories", value?.id || "")}
              name="collectCategories"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              renderInput={(params) => <TextField
                error={!!(formik.touched.collectCategories && formik.errors.collectCategories)}
                helperText={formik.touched.collectCategories && formik.errors.collectCategories}
                onBlur={formik.handleBlur}
                {...params}
                label="Hạng mục thu"
                variant="outlined" />}
            />

            <TextField
              error={!!(formik.touched.money && formik.errors.money)}
              helperText={formik.touched.money && formik.errors.money}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.money}
              name="money"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số tiền(VND)"
              fullWidth
              variant="outlined"
            />
            <Autocomplete
              options={paymentMethods}
              getOptionLabel={(option) => option.name}
              value={paymentMethods.find((pm) => pm.id === formik.values.paymentMethod)}
              onChange={(e, value) => {
                formik.setFieldValue("paymentMethod", value?.id || "");
                setShowAccountField(value?.id === 2);
              }}
              name="paymentMethod"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  error={!!(formik.touched.paymentMethod && formik.errors.paymentMethod)}
                  helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Hình thức thanh toán"
                  variant="outlined"
                />
              )}
            />
            {showAccountField && (
              <Autocomplete
                options={accountPayments}
                getOptionLabel={(option) => option.name}
                value={accountPayments.find((ap) => ap.id === formik.values.accountPayment)}
                onChange={(e, value) => formik.setFieldValue("accountPayment", value?.id || "")}
                name="accountPayment"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                renderInput={(params) => (
                  <TextField
                    error={!!(formik.touched.accountPayment && formik.errors.accountPayment)}
                    helperText={formik.touched.accountPayment && formik.errors.accountPayment}
                    onBlur={formik.handleBlur}
                    {...params}
                    label="Tài khoản/Quỹ"
                    variant="outlined"
                  />
                )}
              />
            )}

            <DateTimePicker
              error={!!(formik.touched.dateTime && formik.errors.dateTime)}
              helperText={formik.touched.dateTime && formik.errors.dateTime}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('dateTime', Date.parse(value));
              }}
              value={formik.values.dateTime}
              name="dateTime"
              sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined'
                }
              }}
              label="Ngày& Giờ"
              ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
              format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
            />
            <TextField
              error={!!(formik.touched.content && formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nội dung"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("employeeName", newValue)}
              value={formik.values.employeeName}
              name="employeeName"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={[
                "Phạm Hoàng Minh",
                "Phan Tuấn Bình",
                "Hải Văn Can",
                "Giàng A Phò",
                "Trần Văn Bình"
              ]}
              renderInput={(params) =>
                <TextField
                  error={!!(formik.touched.employeeName && formik.errors.employeeName)}
                  helperText={formik.touched.employeeName && formik.errors.employeeName}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Tên nhân viên"
                  variant="outlined" />}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              marginBottom: "16px",
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "4px"
            }}
          >
            <TextField
              error={!!(formik.touched.payer && formik.errors.payer)}
              helperText={formik.touched.payer && formik.errors.payer}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payer}
              name="payer"
              sx={{ margin: "4px" }}
              size="small"
              label="Người nộp tiền"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.payerAddress && formik.errors.payerAddress)}
              helperText={formik.touched.payerAddress && formik.errors.payerAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payerAddress}
              name="payerAddress"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ người nộp tiền"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.accompanyingDocument && formik.errors.accompanyingDocument)}
              helperText={formik.touched.accompanyingDocument && formik.errors.accompanyingDocument}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.accompanyingDocument}
              name="accompanyingDocument"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chứng từ kèm theo (Số hợp đồng/...)"
              fullWidth
              variant="outlined"
            />
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                margin: "4px",
                marginTop: "12px",
                "& .css-1gqpucm-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
              >
                File chứng từ kèm theo
              </Typography>
              <Typography
                variant="span"
                component="span"
                sx={{ marginBottom: "16px" }}
              >
                Chọn nhiều file
              </Typography>
              <DropzoneArea
                onChange={handleChange}
              />
            </Box>

            <TextField
              error={!!(formik.touched.note && formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.note}
              name="note"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />
          </Box>
        </Grid>
        <Box marginLeft="auto">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              marginTop: "30px",
              backgroundColor: "#1C2536",
              width: "150px",
            }}
          >
            Lưu
          </Button>
        </Box>
      </Grid>
    </Stack>
  );
};
