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
    styled,
    Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { useApp } from "src/hooks/use-app";
import { CloudUpload, Save } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";
import { format } from "date-fns";
import { listCompanyReceivingApi, updateCompanyReceivingApi } from "src/contexts/api/partner/api-company-receiving";
import { HANDLERS_COMPANY_RECEIVING } from "src/contexts/reducer/partner/reducer-company-receiving";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import { listUnionApi } from "src/contexts/api/partner/api-union";
import EditConfirmAlert from "src/components/action-edit-approval";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function CompanyReceivingEdit({ open, onClose, id }) {
    // state
    const [selectedFileGiayKinhDoanh, setSelectedFileGiayKinhDoanh] = useState(null);
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [nghiepDoanOption, setNghiepDoanOption] = useState([]);
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // context
    const [state, dispatch] = useApp();
    const { companyReceiving } = state;
    const { companies } = companyReceiving;

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

    //nghiepDoanOption
    useEffect(() => {
        const nghiepDoanOption = async () => {
            const res = await listUnionApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    label: x.syndicateName,
                    value: x.syndicateId,
                }));
                setNghiepDoanOption(data);
            }
        };
        nghiepDoanOption();
    }, []);

    const dataEdit = Array.isArray(companies) ? companies.find(com => com.companyId == id) : [];
    const nghiepDoan = nghiepDoanOption.find((x) => x.value === dataEdit?.syndicateId);

    const initialValues = {
        tenCTy: '',
        maCty: '',
        diaChi: '',
        email: '',
        sdt: '',
        website: '',
        masothue: '',
        loaiCty: 'Công ty',
        fileThongTin: '',
        logo: '',
        nguoiDaiDien: '',
        chucVu: '',
        ngayThanhLap: Date.now(),
        pageCty: '',
        ghiChu: '',
        trangThai: 'Hoạt động',
        nghiepDoan: '',
        submit: null
    };

    const validationSchema = Yup.object({
        tenCTy: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        maCty: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        nguoiDaiDien: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        chucVu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        sdt: Yup.string().matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại").max(15, "Số điện thoại tối đa là 15 số"),
        email: Yup.string().email("Vui lòng nhập email đúng định dạng"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    CompanyId: id,
                    CompanyName: values.tenCTy.trim(),
                    BriefCode: values.maCty.trim(),
                    Address: values.diaChi.trim(),
                    Email: values.email.trim(),
                    Telephone: values.sdt.trim(),
                    Website: values.website.trim(),
                    TaxCode: values.masothue.trim(),
                    TypeCompany: values.loaiCty.trim(),
                    LicenseBusiness: values.fileThongTin,
                    Logo: values.logo,
                    PersonResponsibilty: values.nguoiDaiDien.trim(),
                    PersonResponsibiltyRole: values.chucVu.trim(),
                    EstablishCompanyDate: format(new Date(values.ngayThanhLap), 'yyyy/MM/dd'),
                    Fanpage: values.pageCty.trim(),
                    Status: values.trangThai.trim(),
                    SyndicateId: values.nghiepDoan.value,
                    SyndicateIdHidden: values.nghiepDoan.value,
                    Description: values.ghiChu.trim(),
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    CreatedAt: dataEdit.createdAt,
                    CreatedBy: "1",
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedBy: "1",
                    LastModifedByHidden: "1",
                    Flag: "1",
                };

                // console.log(formData);

                if (isEditing) {
                    const response = await updateCompanyReceivingApi(formData);
                    if (response.status === 200) {
                        setSelectedFileLogo(null);
                        setSelectedFileGiayKinhDoanh(null);

                        // call api list after add success
                        const res = await listCompanyReceivingApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_COMPANY_RECEIVING.LIST_COMPANY_RECEIVING,
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
                    tenCTy: dataEdit.companyName || "",
                    logo: dataEdit.logo || "",
                    fileThongTin: dataEdit.licenseBusiness || "",
                    maCty: dataEdit.briefCode || "",
                    diaChi: dataEdit.address || "",
                    email: dataEdit.email || "",
                    sdt: dataEdit.telephone || "",
                    website: dataEdit.website || "",
                    masothue: dataEdit.taxCode || "",
                    loaiCty: dataEdit.typeCompany || "Công ty",
                    nguoiDaiDien: dataEdit.personResponsibilty || "",
                    chucVu: dataEdit.personResponsibiltyRole || "",
                    ngayThanhLap: Date.parse(dataEdit.establishCompanyDate) || Date.now(),
                    pageCty: dataEdit.fanpage || "",
                    ghiChu: dataEdit.description || "",
                    trangThai: dataEdit.status || "Hoạt động",
                    nghiepDoan: nghiepDoan || "",
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

    const handleFileChangeLogo = async (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const response = await uploadSingleFile("Company", file);
            if (response.status === 200) {
                setSnackbarSeverity("success");
                setSnackbarMessage("Tải file lên thành công.");
                setSnackbarOpen(true);

                getPathFromUrl(response.data);

                setSelectedFileLogo(file);
                formik.setFieldValue('logo', getPathFromUrl(response.data));
            } else {
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm ảnh thất bại.");
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarSeverity("warning");
            setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
            setSnackbarOpen(true);
            setSelectedFileLogo(null);
        }
    };

    const handleFileChangeGiayKinhDoanh = async (event) => {
        const file = event.target.files[0];

        const response = await uploadSingleFile("Company", file);
        if (response.status === 200) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Tải file lên thành công.");
            setSnackbarOpen(true);

            getPathFromUrl(response.data);

            setSelectedFileGiayKinhDoanh(file);
            formik.setFieldValue('fileThongTin', getPathFromUrl(response.data));
        } else {
            setSnackbarSeverity("error");
            setSnackbarMessage("Tải file lên thất bại.");
            setSnackbarOpen(true);
        }
    };

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
                    <IconButton edge="start"
                        color="inherit"
                        onClick={() => handleClose(false)}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
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
                    <Box
                        sx={{
                            bgcolor: "#f5f5f5",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={!!(formik.touched.tenCTy && formik.errors.tenCTy)}
                                    helperText={formik.touched.tenCTy && formik.errors.tenCTy}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tenCTy}
                                    name="tenCTy"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            margin: '0px 12px'
                                        }}
                                    >
                                        Logo hiện tại:
                                    </Typography>
                                    <Avatar
                                        src={'https://lotus.i.tisbase.online' + formik.values.logo}
                                        alt="Logo"
                                        sx={{ width: 40, height: 40, textAlign: 'center' }}
                                    >Logo</Avatar>
                                </Box>
                                <Button size="small"
                                    component="label"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "14px" }}>
                                    {selectedFileLogo ? (
                                        <>
                                            <CloudUpload sx={{ marginRight: 1 }} />
                                            {`Logo: ${selectedFileLogo.name}`}
                                        </>
                                    ) : (
                                        <>
                                            <CloudUpload sx={{ marginRight: 1 }} />
                                            Tải Logo
                                        </>
                                    )}
                                    <VisuallyHiddenInput type="file"
                                        accept="image/*"
                                        onChange={handleFileChangeLogo}
                                    />
                                </Button>
                                <TextField
                                    error={!!(formik.touched.maCty && formik.errors.maCty)}
                                    helperText={formik.touched.maCty && formik.errors.maCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.maCty}
                                    name="maCty"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã công ty"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    error={!!(formik.touched.diaChi && formik.errors.diaChi)}
                                    helperText={formik.touched.diaChi && formik.errors.diaChi}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.diaChi}
                                    name="diaChi"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Địa chỉ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.sdt && formik.errors.sdt)}
                                    helperText={formik.touched.sdt && formik.errors.sdt}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.sdt}
                                    name="sdt"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số điện thoại"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.website && formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.website}
                                    name="website"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Website"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >
                                <DatePicker
                                    error={!!(formik.touched.ngayThanhLap && formik.errors.ngayThanhLap)}
                                    helperText={formik.touched.ngayThanhLap && formik.errors.ngayThanhLap}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        formik.setFieldValue('ngayThanhLap', Date.parse(value));
                                    }}
                                    value={formik.values.ngayThanhLap}
                                    name="ngayThanhLap"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày thành lập"
                                />
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <TextField
                                        error={!!(formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien)}
                                        helperText={formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.nguoiDaiDien}
                                        name="nguoiDaiDien"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={!!(formik.touched.chucVu && formik.errors.chucVu)}
                                        helperText={formik.touched.chucVu && formik.errors.chucVu}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.chucVu}
                                        name="chucVu"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Chức vụ người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Box>
                                <TextField
                                    error={!!(formik.touched.pageCty && formik.errors.pageCty)}
                                    helperText={formik.touched.pageCty && formik.errors.pageCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pageCty}
                                    name="pageCty"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Fanpage công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.masothue && formik.errors.masothue)}
                                    helperText={formik.touched.masothue && formik.errors.masothue}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.masothue}
                                    name="masothue"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã số thuế"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.trangThai && formik.errors.trangThai)}
                                    helperText={formik.touched.trangThai && formik.errors.trangThai}
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                    }}
                                    value={formik.values.trangThai}
                                    name="trangThai"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Trạng thái"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="Hoạt động">Hoạt động</option>
                                    <option value="Chưa hoạt động">Chưa hoạt động</option>
                                </TextField>
                                <Autocomplete
                                    error={!!(formik.touched.nghiepDoan && formik.errors.nghiepDoan)}
                                    helperText={formik.touched.nghiepDoan && formik.errors.nghiepDoan}
                                    onBlur={formik.handleBlur}
                                    onChange={(event, newValue) => formik.setFieldValue("nghiepDoan", newValue)}
                                    value={formik.values.nghiepDoan}
                                    name="nghiepDoan"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={nghiepDoanOption}
                                    renderInput={(params) => <TextField {...params}
                                        label="Nghiệp đoàn"
                                        variant="outlined" />}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            margin: '0px 12px'
                                        }}
                                    >
                                        File thông tin hiện tại:
                                    </Typography>
                                    <Avatar
                                        src={'https://lotus.i.tisbase.online' + formik.values.fileThongTin}
                                        alt="Logo"
                                        sx={{ width: 40, height: 40, textAlign: 'center' }}
                                    >File</Avatar>
                                </Box>
                                <Button size="small"
                                    component="label"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "14px" }}>
                                    {selectedFileGiayKinhDoanh ? (
                                        <>
                                            <CloudUpload sx={{ marginRight: 1 }} />
                                            {`File thông tin: ${selectedFileGiayKinhDoanh.name}`}
                                        </>
                                    ) : (
                                        <>
                                            <CloudUpload sx={{ marginRight: 1 }} />
                                            Tải file thông tin
                                        </>
                                    )}
                                    <VisuallyHiddenInput type="file"
                                        onChange={handleFileChangeGiayKinhDoanh}
                                    />
                                </Button>
                            </Grid>
                            <TextField
                                error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                                helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                multiline
                                rows={2}
                                value={formik.values.ghiChu}
                                name="ghiChu"
                                sx={{ margin: "4px", marginTop: "12px", marginLeft: '20px' }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>
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
