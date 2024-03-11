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
import { useApp } from "src/hooks/use-app";
import { HANDLERS_ROOM } from "src/contexts/reducer/setting/reducer-room";
import { listRoomApi, updateRoomApi } from "src/contexts/api/setting/api-room";
import { listDormitoryApi } from "src/contexts/api/setting/api-dormitory";
import SnackbarAlert from "src/components/action-notification";
import { Save } from "@mui/icons-material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RoomEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { room } = state;
    const { rooms } = room;
    const [dormitoryOption, setDormitoryOption] = useState([])

    const statusOptions = [
        {
            value: '1',
            label: 'Đang mở',
        },
        {
            value: '2',
            label: 'Đã đóng',
        },
        {
            value: '3',
            label: 'Chưa mở',
        },
    ]

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


    const validationSchema = Yup.object({
        ktx: Yup.object().required("Vui lòng chọn ký túc xá."),
        maPhong: Yup.string().required("Mã phòng không được để trống."),
        tenPhong: Yup.string().required("Tên phòng không được để trống."),
        trangThai: Yup.object().required("Vui lòng chọn trạng thái."),
    });

    const initialValues = {
        ktx: "",
        maPhong: "",
        tenPhong: "",
        trangThai: 1,
    };

    const dataEdit = Array.isArray(rooms) ? rooms.find(x => x.dormitoryRoomId == id) : [];

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            console.log(values);
            try {
                const formData = {
                    dormitoryRoomId: id,
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

                const response = await updateRoomApi(formData)

                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listRoomApi();
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
                setSnackbarSeverity("error");
                setSnackbarMessage("Sửa thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const fetchDormitoryData = async () => {
            try {
                const selectedDormitory = dormitoryOption.find((dor) => dor.value === dataEdit.dormitoryId);
                const selectedStatus = statusOptions.find((status) => status.label === dataEdit.status);
                console.log(selectedDormitory);
                console.log(selectedStatus);
                console.log(selectedStatus);
                formik.setValues({
                    ktx: selectedDormitory || null,
                    maPhong: dataEdit.code || '',
                    tenPhong: dataEdit.dormitoryRoomColumn,
                    trangThai: selectedStatus || null,
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchDormitoryData();
        }
    }, [open, id]);

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

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
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
                                Thông tin cơ bản
                            </Typography>
                            <Autocomplete
                                error={!!(formik.touched.ktx && formik.errors.ktx)}
                                helperText={formik.touched.ktx && formik.errors.ktx}
                                onBlur={formik.handleBlur}
                                onChange={(event, newValue) => handleChange('ktx', event, newValue)}
                                value={formik.values.ktx}
                                name="ktx"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={dormitoryOption}
                                renderInput={(params) => <TextField {...params} label="Tên ký túc xá" variant="outlined" />}
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
                                    display: 'flex',
                                    justifyContent: 'end',
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    startIcon={<Save />}
                                    sx={{
                                        backgroundColor: '#1C2536',
                                    }}

                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
    );
}
