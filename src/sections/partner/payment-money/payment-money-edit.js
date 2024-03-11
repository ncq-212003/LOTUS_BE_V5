import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Tooltip,
    DialogActions,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from "next/router";
import { DateTimePicker } from "@mui/x-date-pickers";
import Avatar from "@mui/material/Avatar";
// import { AddPartner } from "../add-partner";
import InfoRecord from "src/components/info-record";
import { DropzoneArea } from "mui-file-dropzone";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PaymentMoneyEdit({ openEditPaymentMoney, closeEditPaymentMoney, rowData }) {
    const [showInternName, setShowInternName] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [showAccountField, setShowAccountField] = useState(false);
    const handleClose = () => {
        closeEditPaymentMoney();
    };

    const validationSchema = Yup.object({
        dateTime: Yup
            .string()
            .required('Ngày giờ không được để trống'),
        votes: Yup
            .number()
            .typeError('Số phiếu phải là một số')
            .integer('Số phiếu phải là số nguyên')
            .positive('Số phiếu phải là số nguyên dương')
            .required('Số phiếu không được để trống'),
        content: Yup
            .string()
            .required('Nội dung không được để trống'),
        expenseCategories: Yup
            .string()
            .required('Hạng mục chi không được để trống'),
        account: Yup
            .string()
            .required('Tài khoản không được để trống'),
        money: Yup
            .number()
            .typeError('Số tiền phải là một số')
            .integer('Số tiền phải là số nguyên')
            .positive('Số tiền phải là số nguyên dương')
            .required('Số tiền không được để trống'),
        partner: Yup
            .string()
            .required('Đối tác không được để trống'),
        company: Yup
            .string()
            .required('Công ty không được để trống'),
        employeeName: Yup
            .string()
            .required('Tên nhân viên không được để trống'),
        recipient: Yup
            .string()
            .required('Người nhận tiền không được để trống'),
        recipientAddress: Yup
            .string()
            .required('Địa chỉ người nhận tiền không được để trống'),
        accompanyingDocument: Yup
            .string()
            .required('Chứng từ kèm theo không được để trống'),
    });
    console.log(rowData)
    const formik = useFormik({
        // initialValues,
        enableReinitialize: true,
        initialValues: {
            // dateTime: rowData?.dateTime || "",
            votes: rowData?.votes || "",
            content: rowData?.content || "",
            expenseCategories: rowData?.expenseCategories || "",
            account: rowData?.account || "",
            money: rowData?.money || "",
            partner: rowData?.partner || "",
            company: rowData?.company || "",
            employeeName: rowData?.employeeName || "",
            recipient: rowData?.recipient || "",
            recipientAddress: rowData?.recipientAddress || "",
            accompanyingDocument: rowData?.accompanyingDocument || "",
            note: "",
            uploadfile: "",
            image: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                alert("Thanh cong")
                console.log(data)
                handleClose();
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    const handlePaymentMethodChange = (event, newValue) => {
        setSelectedPaymentMethod(newValue);
        setShowAccountField(newValue !== "Tiền mặt");
    };

    //Display partner name
    useEffect(() => {
        if (formik.values.profileCode && internProfiles[formik.values.profileCode]) {
            const profile = internProfiles[formik.values.profileCode];
            formik.setFieldValue("internName", profile.internName);
            setShowInternName(true);
        } else {
            formik.setFieldValue("internName", "");
            setShowInternName(false);
        }
    }, [formik.values.profileCode]);

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

    //InternProfile
    const internProfiles = {
        PRND000001: {
            internName: "Nguyễn Văn A"
        },
        PRND000002: {
            internName: "Nguyễn Văn B",
        },
    };
    const optionCategoies = ["Phí ăn ở", "Phí đào tạo", "Bảo hiểm y tế", "Chi phí hỗ trợ tư pháp"]
    const paymentMethods = ["Tiền mặt", "Chuyển khoản ngân hàng", "Thẻ tín dụng/Thẻ ghi nợ ", "Cổng thanh toán trực tuyến"]


    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditPaymentMoney}
            fullWidth
            // maxWidth="xl"
            fullScreen
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa tiền chi
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
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
                                    error={!!(formik.touched.profileCode && formik.errors.profileCode)}
                                    helperText={formik.touched.profileCode && formik.errors.profileCode}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.profileCode}
                                    name="profileCode"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã đối tác"
                                    fullWidth
                                    variant="outlined"
                                />
                                {showInternName &&
                                    <TextField
                                        error={!!(formik.touched.internName && formik.errors.internName)}
                                        helperText={formik.touched.internName && formik.errors.internName}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.internName}
                                        name="internName"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Tên thực tập sinh"
                                        fullWidth
                                        variant="outlined"
                                        // disabled
                                        InputProps={{ readOnly: true }}
                                    />
                                }
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("collectCategories", newValue)}
                                    value={formik.values.collectCategories}
                                    name="collectCategories"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={optionCategoies}
                                    renderInput={(params) => <TextField
                                        error={!!(formik.touched.collectCategories && formik.errors.collectCategories)}
                                        helperText={formik.touched.collectCategories && formik.errors.collectCategories}
                                        onBlur={formik.handleBlur}
                                        {...params}
                                        label="Hạng mục chi"
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
                                    onChange={handlePaymentMethodChange}
                                    value={selectedPaymentMethod}
                                    name="paymentMethod"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    options={paymentMethods}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Hình thức thanh toán"
                                            variant="outlined"
                                        />
                                    )}
                                />
                                {showAccountField && (
                                    <Autocomplete
                                        onChange={(event, newValue) => console.log(newValue)}  // Handle account change here
                                        value=""  // Provide the value you want to set for the account
                                        name="account"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        fullWidth
                                        size="small"
                                        options={[
                                            "Vietcombank",
                                            "Agribank",
                                            "VietinBank",
                                            "Momo",
                                            "BIDV",
                                            // Add other accounts if needed
                                        ]}
                                        renderInput={(params) => (
                                            <TextField
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
                                <TextField
                                    error={!!(formik.touched.votes && formik.errors.votes)}
                                    helperText={formik.touched.votes && formik.errors.votes}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.votes}
                                    name="votes"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số phiếu"
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
                                        Có thể chọn nhiều file
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
                                onClick={formik.handleSubmit}
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
            </DialogContent>
            {/* <AddPartner openAddPartner={openPartner} closeAddPartner={handleCloseCollect} /> */}
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <InfoRecord />
            </DialogActions>
        </BootstrapDialog>
    );
}
