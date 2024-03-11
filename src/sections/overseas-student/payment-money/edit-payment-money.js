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
    DialogActions
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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditPaymentMoney({ openEditPaymentMoney, closeEditPaymentMoney, rowData }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();
    const handleAddCollect = () => {
        router.push("/finance/revenue-expenditure/add");
    }
    const handleClose = () => {
        closeEditPaymentMoney();
    };
    // Open add partner
    const [openPartner, setOpenPartner] = useState(false);

    const handleOpen = () => {
        setOpenPartner(true);
    }
    const handleCloseCollect = () => {
        setOpenPartner(false);
    }
    // Close add partner
    // tạo và lấy ảnh
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // end
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
        overseasName: Yup
            .string()
            .required('Tên du học sinh không được để trống'),
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
            overseasName: rowData?.overseasName || "",
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
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Stack
                        spacing={1}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <Box
                                    sx={{
                                        marginBottom: "16px",
                                        bgcolor: "#fff",
                                        padding: "5px 12px 10px 5px",
                                        border: "1px solid #ccc",
                                        borderRadius: "6px",
                                    }}

                                >
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
                                        rows={3}
                                        fullWidth
                                        variant="outlined"
                                    />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Autocomplete
                                            onChange={(event, newValue) => formik.setFieldValue("expenseCategories", newValue)}
                                            value={formik.values.expenseCategories}
                                            name="expenseCategories"
                                            sx={{ margin: "4px", marginTop: "12px" }}
                                            fullWidth
                                            size="small"
                                            options={[
                                                "Tiền ăn uống nhân viên", "Tiền mời khách đi uống cafe", "Tiền mua đồ ăn trong công ty"
                                            ]}
                                            renderInput={(params) => <TextField
                                                error={!!(formik.touched.expenseCategories && formik.errors.expenseCategories)}
                                                helperText={formik.touched.expenseCategories && formik.errors.expenseCategories}
                                                onBlur={formik.handleBlur}
                                                {...params}
                                                label="Hạng mục chi"
                                                variant="outlined" />}
                                        />
                                        <Tooltip title="Thêm">
                                            <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                                                onClick={handleAddCollect}
                                            // size="large"
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <Autocomplete
                                        onChange={(event, newValue) => formik.setFieldValue("account", newValue)}
                                        value={formik.values.account}
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
                                            "Tiền mặt"
                                        ]}
                                        renderInput={(params) =>
                                            <TextField
                                                error={!!(formik.touched.account && formik.errors.account)}
                                                helperText={formik.touched.account && formik.errors.account}
                                                onBlur={formik.handleBlur}
                                                {...params}
                                                label="Tài khoản/ Quỹ"
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
                                        label="Số tiền"
                                        fullWidth
                                        variant="outlined"
                                    />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Autocomplete
                                            onChange={(event, newValue) => formik.setFieldValue("overseasName", newValue)}
                                            value={formik.values.overseasName}
                                            name="overseasName"
                                            sx={{ margin: "4px", marginTop: "12px" }}
                                            fullWidth
                                            size="small"
                                            options={[
                                                "Nguyễn Văn A",
                                                "Nguyễn Văn B",
                                                "Nguyễn Văn C",
                                                "Nguyễn Văn D",
                                                "Nguyễn Văn E"
                                            ]}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={!!(formik.touched.overseasName && formik.errors.overseasName)}
                                                    helperText={formik.touched.overseasName && formik.errors.overseasName}
                                                    onBlur={formik.handleBlur}
                                                    {...params}
                                                    label="Tên du học sinh"
                                                    variant="outlined" />}
                                        />
                                        <Tooltip title="Thêm">
                                            <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                                                onClick={handleOpen}
                                            // size="large"
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <Autocomplete
                                        onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                                        value={formik.values.company}
                                        name="company"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        fullWidth
                                        size="small"
                                        options={[
                                            "Cty An Nghĩa",
                                            "Cty Bình An",
                                            "Cty An Trạch",
                                            "Cty Thành Công",
                                            "Cty Bình Dương"
                                        ]}
                                        renderInput={(params) =>
                                            <TextField
                                                error={!!(formik.touched.company && formik.errors.company)}
                                                helperText={formik.touched.company && formik.errors.company}
                                                onBlur={formik.handleBlur}
                                                {...params}
                                                label="Chi tiền từ công ty"
                                                variant="outlined"
                                            />}
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
                                        padding: "5px 12px 10px 5px",
                                        border: "1px solid #ccc",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <TextField
                                        error={!!(formik.touched.recipient && formik.errors.recipient)}
                                        helperText={formik.touched.recipient && formik.errors.recipient}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.recipient}
                                        name="recipient"
                                        sx={{ margin: "4px" }}
                                        size="small"
                                        label="Người nhận tiền"
                                        fullWidth
                                        variant="outlined"
                                    />

                                    <TextField
                                        error={!!(formik.touched.recipientAddress && formik.errors.recipientAddress)}
                                        helperText={formik.touched.recipientAddress && formik.errors.recipientAddress}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.recipientAddress}
                                        name="recipientAddress"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Địa chỉ người nhận tiền"
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
                                        label="Chứng từ kèm theo(Số hợp đồng/...)"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                                        sx={{
                                            backgroundColor: "#F8F8FF",
                                            fontSize: "12px", // Điều chỉnh kích thước chữ
                                            padding: "6px 10px", // Điều chỉnh kích thước nút
                                            margin: "2px 10px",
                                            color: "#000000",
                                            '&:hover': {
                                                backgroundColor: "#F8F8FF",
                                            },
                                        }}>
                                        Thêm file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>

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

                                <Stack direction="column" spacing={1} mt={3}>
                                    <Avatar
                                        sx={{
                                            width: "110px",
                                            height: "130px",
                                            marginLeft: "10px"
                                        }}
                                        variant="rounded"
                                        src={selectedFile}
                                    ></Avatar>
                                    <Button
                                        sx={{ width: "130px", padding: "9px 0px 10px 0px ", fontSize: "13px" }}
                                        component="label"
                                    >
                                        Tải ảnh hóa đơn
                                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    // onClick={closeAddress}
                                    sx={{
                                        marginTop: "30px",
                                        backgroundColor: "#1C2536",
                                        width: "150px",
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </form>
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
