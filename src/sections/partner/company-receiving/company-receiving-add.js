import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Autocomplete, SvgIcon, Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ModalAddBranch from "../../../components/modal-add-branch";
import { useState } from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_COMPANY_RECEIVING } from "src/contexts/reducer/partner/reducer-company-receiving";
import styled from "@emotion/styled";
import { CloudUpload } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";
import { addCompanyReceivingApi, listCompanyReceivingApi } from "src/contexts/api/partner/api-company-receiving";
import { getPathFromUrl } from "src/components/functions";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { useEffect } from "react";
import { GenerateApi } from "src/contexts/api/random-api";
import { listUnionApi } from "src/contexts/api/partner/api-union";
import ConfirmAlert from "src/components/action-confirm";

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

export default function AddCompanyReceiving() {
    // state
    const [codeCty, setCodeCty] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFileGiayKinhDoanh, setSelectedFileGiayKinhDoanh] = useState(null);
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    const [nghiepDoanOption, setNghiepDoanOption] = useState([]);
    // context
    const [state, dispatch] = useApp();
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenModal = (params) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema: Yup.object({
            tenCTy: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            maCty: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            nguoiDaiDien: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            chucVu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            sdt: Yup.string().matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại").max(15, "Số điện thoại tối đa là 15 số"),
            email: Yup.string().email("Vui lòng nhập email đúng định dạng"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    CompanyId: "1",
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
                    SyndicateId: '1',
                    SyndicateIdHidden: '1',
                    Description: values.ghiChu.trim(),
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: "1",
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedBy: "1",
                    LastModifedByHidden: "1",
                    Flag: "1",
                };

                // console.log(formData);

                if (isSaving) {
                    // call api
                    const response = await addCompanyReceivingApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        formik.resetForm();
                        setSelectedFileLogo(null);
                        setSelectedFileGiayKinhDoanh(null);
                        const resCode = await GenerateApi('CTTN', 'Number');
                        setCodeCty(resCode.data);

                        // call api list after add success
                        const res = await listCompanyReceivingApi();
                        // dispatch list data
                        dispatch({
                            type: HANDLERS_COMPANY_RECEIVING.LIST_COMPANY_RECEIVING,
                            payload: res.data,
                        });
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
    });

    const handleFileChangeLogo = async (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const response = await uploadSingleFile("CompanyOversea", file);
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

        const response = await uploadSingleFile("CompanyOversea", file);
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

    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi('CTTN', 'Number');
            setCodeCty(res.data);
        };
        getRandom();
    }, []);

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Stack
                    spacing={3}
                    sx={{
                        margin: '38px 0'
                    }}
                >
                    <Box
                        sx={{
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
                                    value={formik.values.maCty = codeCty}
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
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Stack>
                <ModalAddBranch
                    open={isModalOpen}
                    onClose={closeModal}
                />
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
            </form>
        </>
    )
}