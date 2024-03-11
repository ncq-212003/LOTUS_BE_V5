import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
    Slide,
    DialogActions,
    FormControlLabel,
    Switch,
} from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import { useState } from "react";
import { addPersonApi, findPersonBySyndicateIdApi, listPersonApi } from "src/contexts/api/partner/api-person";
import { HANDLERS_PERSON } from "src/contexts/reducer/partner/reducer-person";
import { useApp } from "src/hooks/use-app";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactAdd({ open, onClose, id }) {
    const [state, dispatch] = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const validationSchema = Yup.object({
        firstName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        middleName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        lastName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        position: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        address: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        email: Yup.string()
            .max(4000)
            .email("Vui lòng nhập email đúng định dạng")
            .required("Vui lòng nhập thông tin vào trường này"),
        phone: Yup.string()
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
            .max(15, "Số điện thoại tối đa là 15 số"),
        description: Yup.string(),

    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            position: "",
            address: "",
            email: "",
            phone: "",
            description: "",
            isLeader: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData =
                {
                    personId: 1,
                    syndicateId: id,
                    personType: "Syndicate",
                    firstName: values.firstName,
                    middleName: values.middleName,
                    lastName: values.lastName,
                    fullNameOtherLang: null,
                    position: values.position,
                    address: values.address,
                    email: values.email,
                    telephone: values.phone,
                    description: values.description,
                    isHeadPerson: values.isLeader,
                    field1: null,
                    field2: null,
                    field3: null,
                    field4: null,
                    field5: null,
                    createdAt: new Date().toISOString(),
                    createdBy: null,
                    lastModifedAt: new Date().toISOString(),
                    lastModifedBy: null,
                    flag: "1",
                    returnValue: 0
                }


                const response = await addPersonApi(formData)
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công !");
                    setSnackbarOpen(true);

                    formik.resetForm();

                    // call api list after add success
                    const res = await findPersonBySyndicateIdApi(id);
                    console.log(res.data);
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_PERSON.FIND_PERSON_BY_SYNDICATEDID,
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

    const handleClose = () => {
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // const formatPhoneNumber = (value) => {
    //     // Logic định dạng số điện thoại ở đây, ví dụ: chèn dấu "-" sau 3 và 7 ký tự
    //     return value.replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3");
    // };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Thêm người liên hệ
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2 }}>
                <Grid container spacing={2} margin="none" justifyContent="center">
                    <Grid item xs={12} md={12}>

                        <TextField
                            sx={{ margin: "4px" }}
                            label="Họ"
                            fullWidth
                            required
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Tên đệm"
                            fullWidth
                            required
                            name="middleName"
                            value={formik.values.middleName}
                            onChange={formik.handleChange}
                            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                            helperText={formik.touched.middleName && formik.errors.middleName}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Tên"
                            fullWidth
                            required
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Chức vụ"
                            fullWidth
                            required
                            name="position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={formik.touched.position && Boolean(formik.errors.position)}
                            helperText={formik.touched.position && formik.errors.position}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Địa chỉ"
                            fullWidth
                            required
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Email"
                            fullWidth
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Số điện thoại"
                            fullWidth
                            required
                            name="phone"
                            value={formik.values.phone}
                            onChange={(e) => {
                                const formattedValue = e.target.value.replace(/[^\d]/g, "");
                                formik.handleChange({
                                    target: { name: "phone", value: formattedValue },
                                });
                            }}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Ghi chú"
                            fullWidth
                            required
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            multiline
                            rows={2}
                            size="small"
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={<Switch
                                name="isLeader"
                                checked={formik.values.isLeader}
                                onChange={formik.handleChange}
                            />}
                            label="Là người đứng đầu"
                            sx={{ margin: "4px" }}
                        />

                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
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
        </Dialog>
    );
}
