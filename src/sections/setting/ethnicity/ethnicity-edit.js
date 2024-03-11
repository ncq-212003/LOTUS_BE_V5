/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Slide,
    DialogTitle,
    DialogContent,
    DialogActions,
    styled,
    Autocomplete
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import { Save } from "@mui/icons-material";
import { ListMarket, listMarketApi } from "src/contexts/api/setting/api-market";
import EditConfirmAlert from "src/components/action-edit-approval";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EthnicEdit({ open, onClose, id }) {
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [marketOption, setMarketOption] = useState([]);
    // context
    const [state, dispatch] = useApp();
    const { ethnic } = state;
    const { ethnics } = ethnic;

    //Alert Confirm Edit
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleModelOpen = () => {
        setIsEditDialog(true);
    };

    const handleModelClose = () => {
        setIsEditDialog(false);
    };

    // khi người dùng ấn thoát
    const handleCancelSave = () => {
        handleModelClose();
    }

    // khi người dùng xác định lưu 
    const handleConfirmSave = () => {
        setIsEditing(true);
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

    const dataEdit = Array.isArray(ethnics) ? ethnics.find(x => x.ethnicId == id) : [];
    const martketname = marketOption.find((x) => x.value === dataEdit?.marketId);

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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    MarketIdHidden: values.marketId.value,
                    CreatedByHidden: "1",
                    EthnicId: id,
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
                    CreatedAt: dataEdit.createdAt,
                    Field5: "1",
                    Description: values.description.trim(),
                    CreatedBy: "1",
                };

                // console.log(formData);

                if (isEditing) {
                    const response = await updateEthnicApi(formData);
                    if (response.status === 200) {
                        // call api list after add success
                        const res = await listEthnicApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_ETHNIC.LIST_ETHNIC,
                            payload: res.data,
                        });

                        handleClose(true);
                        setIsEditing(false);
                    } else {
                        setIsEditing(false);
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

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    nameEthnicity: dataEdit.ethnicName || "",
                    codeEthnicity: dataEdit.code || "",
                    marketId: martketname || "",
                    description: dataEdit.description || "",
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchCompanyData();
        }
    }, [open, id]);

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => handleClose(false)}
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
                <TextField
                    error={!!(formik.touched.nameEthnicity && formik.errors.nameEthnicity)}
                    helperText={formik.touched.nameEthnicity && formik.errors.nameEthnicity}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    sx={{ marginTop: "18px" }}
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
                    sx={{ marginTop: "18px" }}
                    value={formik.values.codeEthnicity}
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
                    sx={{ marginTop: "18px" }}
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
                    sx={{ marginTop: "18px" }}
                    value={formik.values.description}
                    name="description"
                    variant="outlined"
                    size="small"
                    label="Ghi chú"
                    fullWidth
                    multiline
                    rows={2}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <Button autoFocus
                    onClick={formik.submitForm}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
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
            <EditConfirmAlert
                onOpen={isEditDialog}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </BootstrapDialog>
    );
}
