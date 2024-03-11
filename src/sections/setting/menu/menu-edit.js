/* eslint-disable react-hooks/exhaustive-deps */
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
import { listMenuApi, updateMenuApi } from "src/contexts/api/setting/api-menu";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_MENU } from "src/contexts/reducer/setting/reducer-menu";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuEdit({ open, onClose, id }) {
    // state
    const [parentNameOption, setParentNameOption] = useState([]);
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // context
    const [state, dispatch] = useApp();
    const { menu } = state;
    const { menus } = menu;

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

    const dataEdit = Array.isArray(menus) ? menus.find(x => x.sMenuId == id) : [];
    const parentName = parentNameOption.find((x) => x.value === dataEdit?.sParentId);

    // list parentName
    useEffect(() => {
        const listParentName = async () => {
            const res = await listMenuApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const parent = res.data.map((com) => ({
                    label: com.sMenuName,
                    value: com.sMenuId,
                }));
                setParentNameOption(parent);
            }
        };
        listParentName();
    }, []);

    const validationSchema = Yup.object({
        // parentId: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        menuName: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        menuOrder: Yup.number().typeError("Vui lòng nhập số trường này."),
        menuIcon: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        menuLink: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    });

    const initialValues = {
        menuName: '',
        parentId: '',
        menuOrder: '',
        menuIcon: '',
        menuLink: '',
        description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    SParentIdHidden: values.parentId?.value || "0",
                    CreatedByHidden: "1",
                    SMenuIcon: values.menuIcon.trim(),
                    SMenuLink: values.menuLink.trim(),
                    Flag: "1",
                    SMenuId: id,
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: values.menuOrder.trim(),
                    SParentId: values.parentId?.value || "0",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: dataEdit.createdAt,
                    Field5: "1",
                    Description: values.description.trim(),
                    SMenuName: values.menuName.trim(),
                    CreatedBy: "1",
                };

                // console.log(formData);
                if (isEditing) {
                    const response = await updateMenuApi(formData);
                    if (response.status === 200) {
                        // call api list after add success
                        const res = await listMenuApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_MENU.LIST_MENU,
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
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const handleAutocompleteChange = (event, value) => {
        formik.setFieldValue('parentId', value);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    menuName: dataEdit.sMenuName || '',
                    parentId: parentName || '',
                    menuOrder: dataEdit.field1 || '',
                    menuIcon: dataEdit.sMenuIcon || '',
                    menuLink: dataEdit.sMenuLink || '',
                    description: dataEdit.description || '',
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
        <Dialog
            fullScreen
            open={open}
            onClose={() => handleClose(false)}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose(false)}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button
                        autoFocus
                        color="inherit"
                        onClick={formik.submitForm}
                        startIcon={<Save />}
                    >
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} xs={12}>
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
                                    Thông tin
                                </Typography>
                                <TextField
                                    error={formik.touched.menuName && Boolean(formik.errors.menuName)}
                                    helperText={formik.touched.menuName && formik.errors.menuName}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.menuName}
                                    name="menuName"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Autocomplete
                                    options={parentNameOption}
                                    value={formik.values.parentId}
                                    onChange={handleAutocompleteChange}
                                    onBlur={() => formik.setFieldTouched('parentId', true)}
                                    sx={{ margin: "4px", marginTop: "12px", marginRight: '0px' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Thuộc menu cha"
                                            variant="outlined"
                                            size="small"
                                            error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                                            helperText={formik.touched.parentId && formik.errors.parentId}
                                        />
                                    )}
                                />
                                <TextField
                                    error={formik.touched.menuOrder && Boolean(formik.errors.menuOrder)}
                                    helperText={formik.touched.menuOrder && formik.errors.menuOrder}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.menuOrder}
                                    name="menuOrder"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Thứ tự hiển thị"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={formik.touched.menuIcon && Boolean(formik.errors.menuIcon)}
                                    helperText={formik.touched.menuIcon && formik.errors.menuIcon}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.menuIcon}
                                    name="menuIcon"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Biểu tượng hiển thị"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={formik.touched.menuLink && Boolean(formik.errors.menuLink)}
                                    helperText={formik.touched.menuLink && formik.errors.menuLink}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.menuLink}
                                    name="menuLink"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Địa chỉ liên kết"
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    multiline
                                    rows={2}
                                    value={formik.values.description}
                                    name="description"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Ghi chú"
                                    fullWidth
                                    variant="outlined"
                                />
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
            <EditConfirmAlert
                onOpen={isEditDialog}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </Dialog>
    );
}