import React, { useEffect, useState } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { addRoomApi, listRoomApi } from "src/contexts/api/setting/api-room";
import { HANDLERS_ROOM } from "src/contexts/reducer/setting/reducer-room";
import { listDormitoryApi } from "src/contexts/api/setting/api-dormitory";
import SnackbarAlert from "src/components/action-notification";

const validationSchema = Yup.object({
    ktx: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
    maPhong: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    tenPhong: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    trangThai: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
});

const initialValues = {
    ktx: null,
    maPhong: "",
    tenPhong: "",
    trangThai: null,
};

const statusOptions = [
    {
        id: 1,
        label: 'Đang mở',
    },
    {
        id: 2,
        label: 'Đã đóng',
    },
    {
        id: 3,
        label: 'Chưa mở',
    },
]

export default function RoomAdd() {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [dormitoryOption, setDormitoryOption] = useState([]);

    //List Dormitory
    useEffect(() => {
        const listDormitoryName = async () => {
            const res = await listDormitoryApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const dormitories = res.data.map((d) => ({
                    label: d.dormitoryName,
                    value: d.dormitoryId,
                }));
                setDormitoryOption(dormitories);
            }
        };
        listDormitoryName();
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            console.log(values);
            try {
                const formData = {
                    dormitoryRoomId: 1,
                    dormitoryId: values.ktx.value,
                    dormitoryIdHidden: "1",
                    code: values.maPhong,
                    dormitoryRoomColumn: values.tenPhong,
                    status: values.trangThai.label,
                    description: "string",
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: 1,
                    lastModifiedByHidden: "1",
                    flag: "1"
                }

                const response = await addRoomApi(formData)
                console.log(response.status);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    // call api list after add success
                    const res = await listRoomApi();
                    console.log(res.data);
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_ROOM.LIST_ROOM,
                        payload: res.data,
                    });
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                console.log(err);
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleChange = (field, event, newValue) => {
        if (newValue !== null && typeof newValue === 'object' && 'label' in newValue) {
            formik.setFieldValue(field, newValue);

        } else {
            formik.handleChange(event);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Stack spacing={3}
            sx={{ p: 2, marginTop: "64px" }}
        >
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} xs={12}>
                    <Box sx={{ padding: "16px", border: "1px solid #ccc", borderRadius: "6px" }}>
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Thông tin cơ bản
                        </Typography>
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={dormitoryOption}
                            // getOptionLabel={(option) => option.dormitoryName}
                            onChange={(event, newValue) => handleChange('ktx', event, newValue)}
                            onBlur={() => formik.setFieldTouched('ktx', true)}
                            value={formik.values.ktx}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Tên ký túc xá"
                                    variant="outlined"
                                    error={formik.touched.ktx && Boolean(formik.errors.ktx)}
                                    helperText={formik.touched.ktx && formik.errors.ktx}
                                />
                            }
                        />

                        <TextField
                            error={!!(formik.touched.maPhong && formik.errors.maPhong)}
                            helperText={formik.touched.maPhong && formik.errors.maPhong}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maPhong}
                            name="maPhong"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã phòng"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            error={!!(formik.touched.tenPhong && formik.errors.tenPhong)}
                            helperText={formik.touched.tenPhong && formik.errors.tenPhong}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenPhong}
                            name="tenPhong"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên phòng"
                            fullWidth
                            variant="outlined"
                        />
                        <Autocomplete
                            fullWidth
                            size="small"
                            sx={{ margin: '4px', marginTop: '12px' }}
                            options={statusOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => handleChange('trangThai', event, newValue)}
                            onBlur={() => formik.setFieldTouched('trangThai', true)}
                            value={formik.values.trangThai}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Trạng thái"
                                    variant="outlined"
                                    error={formik.touched.trangThai && Boolean(formik.errors.trangThai)}
                                    helperText={formik.touched.trangThai && formik.errors.trangThai}
                                />
                            }
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                width: "100%",
                                marginTop: "20px",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={formik.handleSubmit}
                                sx={{
                                    backgroundColor: "#1C2536",
                                }}
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
        </Stack>
    );
}
