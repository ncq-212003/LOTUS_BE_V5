import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
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
    Autocomplete,
    Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_AIRPORT } from "src/contexts/reducer/setting/reducer-airport";
import { updateAirPortApi, listAirPortApi } from "src/contexts/api/setting/api-airport";
import SnackbarAlert from "src/components/action-notification";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";
import { listCountryApi } from "src/contexts/api/setting/api-country";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditAirport({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listNameCountry, setListNameCountry] = useState([]);
    const [state, dispatch] = useApp();
    const { airport } = state;
    const { airports } = airport;
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

    const airportEdit = Array.isArray(airports) ? airports.find(air => air.airportId == id) : []

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = (isEvent) => {
        onClose(isEvent);
    };

    const countries = [
        { code: 'VN', label: 'Việt Nam' },
        { code: 'KP', label: 'Hàn Quốc' },
        { code: 'JP', label: 'Nhật Bản' },
        { code: 'CN', label: 'China' },
        { code: 'TH', label: 'Thái Lan' },
        { code: 'AI', label: 'Anguilla' },
    ]

    const validationSchema = Yup.object({
        tenQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tenSanBay: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tenQuocGia: "",
            tenSanBay: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    AirportId: id,
                    AirportName: values.tenSanBay,
                    CountryCode: values.tenQuocGia,
                    CityId: "1", // để mặc định là 1
                    CityIdHidden: "1",
                    Description: "Không vấn đề",
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
                    const response = await updateAirPortApi(formData);
                    if (response.statusText === "OK") {
                        formik.resetForm();
                        const listData = await listAirPortApi();
                        dispatch({
                            type: HANDLERS_AIRPORT.LIST_AIRPORT,
                            payload: listData.data
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
    })

    useEffect(() => {
        const fetchAirportData = () => {
            try {
                formik.setValues({
                    tenQuocGia: airportEdit.countryCode,
                    tenSanBay: airportEdit.airportName,
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (open && id) {
            fetchAirportData();
        }
    }, [open, id])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listCountryApi();
            if (Array.isArray(response.data) && response.data.length > 0) {
                const listCountryName = response.data.map((items) => ({
                    countryCode: items.code,
                    countryName: items.name
                }))
                setListNameCountry(listCountryName);
            }
        }
        fetchData()
    }, [])

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
                            id="country-select-demo"
                            sx={{ marginTop: "12px", width: "100% " }}
                            options={listNameCountry}
                            autoHighlight
                            size="small"
                            getOptionLabel={(option) => option.countryName}
                            value={listNameCountry.find((option) => option.countryCode === formik.values.tenQuocGia) || null}
                            onChange={(event, value) => formik.setFieldValue('tenQuocGia', value ? value.countryCode : '')}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.countryName}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.tenQuocGia && formik.errors.tenQuocGia)}
                                    helperText={formik.touched.tenQuocGia && formik.errors.tenQuocGia}
                                    {...params}
                                    label="Tên quốc gia"
                                    variant='outlined'
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                        <TextField
                            error={!!(formik.touched.tenSanBay && formik.errors.tenSanBay)}
                            helperText={formik.touched.tenSanBay && formik.errors.tenSanBay}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenSanBay}
                            name="tenSanBay"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên sân bay"
                            fullWidth
                            variant="outlined"
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
