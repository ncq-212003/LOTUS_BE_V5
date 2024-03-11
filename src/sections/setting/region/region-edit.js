import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    SvgIcon,
    TextField,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Grid,
    Autocomplete
} from "@mui/material";
import { XCircleIcon } from '@heroicons/react/24/solid';
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_REGION } from "src/contexts/reducer/setting/reducer-region";
import { updateRegionApi, listRegionApi } from "src/contexts/api/setting/api-region";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function RegionEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listMarket, setListMarket] = useState([]);

    const [state, dispatch] = useApp();
    const { region } = state;
    const { regions } = region;
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

    const regionEdit = Array.isArray(regions) ? regions.find(reg => reg.positionId == id) : []

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        tenThiTruong: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tenVung: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tenThiTruong: '',
            tenVung: '',
            tenRieng: '',
            submit: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    PositionId: id,
                    MarketId: values.tenThiTruong,  // sau sẽ thay thành thị trường khác lấy theo thị trường
                    MarketIdHidden: "1",
                    CountryCode: 0,
                    PositionName: values.tenVung,
                    PositionOtherName: values.tenRieng || "Không có tên",
                    Description: "Địa điểm đã được chỉ định rõ ràng",
                    Field1: "1",
                    Field2: "2",
                    Field3: "3",
                    Field4: "4",
                    Field5: "5",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    LastModifiedByHidden: "1",
                    Flag: "1"
                }
                if (isEditing) {
                    const response = await updateRegionApi(formData)
                    if (response.status == 200) {
                        formik.resetForm();
                        const res = await listRegionApi();
                        dispatch({
                            type: HANDLERS_REGION.LIST_REGION,
                            payload: res.data
                        })
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
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await listMarketApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listData = response.data.map((items) => (
                    {
                        maketId: items.marketId,
                        maketName: items.marketName
                    }
                ))
                setListMarket(listData);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchRegionData = () => {
            try {
                formik.setValues({
                    tenThiTruong: regionEdit.marketId || "",
                    tenVung: regionEdit.positionName || "",
                    tenRieng: regionEdit.positionOtherName || "",
                    ghiChu: regionEdit.description || ""
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (open && id) {
            fetchRegionData();
        }
    }, [open, id])

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    return (
        <BootstrapDialog
            onClose={() => handleClose(false)}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa thông tin
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
                <Box sx={{ typography: "body1" }}>
                    <Grid container>
                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={listMarket}
                            value={listMarket.find((item) => item.maketId === formik.values.tenThiTruong) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('tenThiTruong', newValue ? newValue.maketId : null);
                            }}
                            getOptionLabel={(option) => option.maketName}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Tên thị trường"
                                    name="tenThiTruong"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.tenThiTruong && Boolean(formik.errors.tenThiTruong)}
                                    helperText={formik.touched.tenThiTruong && formik.errors.tenThiTruong}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenVung && formik.errors.tenVung)}
                            helperText={formik.touched.tenVung && formik.errors.tenVung}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenVung}
                            name="tenVung"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên vùng"
                            fullWidth
                        />

                        <TextField
                            error={!!(formik.touched.tenRieng && formik.errors.tenRieng)}
                            helperText={formik.touched.tenRieng && formik.errors.tenRieng}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenRieng}
                            name="tenRieng"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: "12px" }}
                            label="Tên riêng"
                            fullWidth
                        />
                    </Grid>
                    <Box
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
                            onClick={formik.handleSubmit}
                            startIcon={<Save />}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
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