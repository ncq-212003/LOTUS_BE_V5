import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_AIRPORT } from "src/contexts/reducer/setting/reducer-airport";
import { addAirPortApi, listAirPortApi } from "src/contexts/api/setting/api-airport";
import { useApp } from "src/hooks/use-app";
import ConfirmAlert from "src/components/action-confirm";
import { listCountryApi } from "src/contexts/api/setting/api-country";

export default function AirportAdd() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [listNameCountry, setListNameCountry] = useState([]);
    const [state, dispatch] = useApp();
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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const validationSchema = Yup.object({
        tenQuocGia: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tenSanBay: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        tenQuocGia: "",
        tenSanBay: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    AirportId: 1,
                    AirportName: values.tenSanBay,
                    CountryCode: values.tenQuocGia,
                    CityId: "1", //
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
                if (isSaving) {
                    const response = await addAirPortApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);
                        formik.resetForm();
                        const res = await listAirPortApi();
                        dispatch({
                            type: HANDLERS_AIRPORT.LIST_AIRPORT,
                            payload: res.data
                        })
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
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

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
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    sm={12}
                    md={12}
                    xs={12}
                >
                    <Box
                        sx={{
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
                            Thông tin cơ bản
                        </Typography>

                        <Autocomplete
                            id="country-select-demo"
                            sx={{ marginTop: "12px", }}
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
                            >
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
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
