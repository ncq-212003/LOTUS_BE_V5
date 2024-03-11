import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Tab, AppBar } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import TabContact from "../add/tab-contact";
import TabInfoBasicEdit from "./tab-infobasic-edit";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { updateUnionApi } from "src/contexts/api/partner/api-union";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export function actionSetTouched(dispatch, tab, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_UNION.SET_TOUCHED_UNION,
        payload: { tab, fieldName, value },
    });
}

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        syndicateId: Yup.number(),
        selectedFile: Yup.string(),
        avatar: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        tenNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        syndicateNameOtherLang: Yup.string(),
        diaChiWebsite: Yup
            .string(),
        // .required("Vui lòng nhập thông tin vào trường này"),
        tinhTrangTrinhCuc: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoCapPhep: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        nhanVienChamSoc: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        ghiChu: Yup.string(),
        maSoHopDong: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        ngayKyHopDong: Yup
            .date()
            .typeError("Vui lòng nhập đúng định dạng")
            .required("Vui lòng nhập thông tin vào trường này"),
        troCapThangDau: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiCapDaoTao: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        thiTruong: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        thanhPho: Yup
            .object()
            .required("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        syndicateAddressOtherLang: Yup.string(),
        soDienThoai: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        fax: Yup
            .string(),
        // .required("Vui lòng nhập thông tin vào trường này"),
        hoTenNguoiDaiDien: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        personRepresentOtherLang: Yup.string(),
        chucVu: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiQuanLy: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        });
}

export default function UnionEdit({ open, onClose, rowData }) {
    const [valueTabOne, setValueTabOne] = useState("1");
    const [valueTabTwo, setValueTabTwo] = useState(1);
    const [state, dispatch] = useApp();
    const { union } = state;
    const { unions, basicInfo, contact } = union;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    console.log(rowData);

    useEffect(() => {
        const fetchData = () => {
            dispatch({
                type: HANDLERS_UNION.SET_VALUES_FOR_EDIT_UNION,
                payload: { rowData },
            });
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có rowData
        if (open && rowData) {
            fetchData();
        }
    }, [open, rowData]);


    const handleSave = async () => {
        Object.keys(basicInfo)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "basicInfo", fieldName);
                validateFieldInfobasic(dispatch, "basicInfo", fieldName, basicInfo[fieldName]);
            });

        contact.map((fieldName, index) => {
            Object.keys(fieldName)
                .slice(0, -2)
                .forEach((fieldNameRow) => {
                    actionSetTouchedRow(dispatch, "contact", index, fieldNameRow);
                    validateFieldRowContact(
                        dispatch,
                        "contact",
                        index,
                        fieldNameRow,
                        fieldName[fieldNameRow]
                    );
                });
        });

        const noErrors = Object.values(basicInfo.errors).every((error) => error === null) &&
            contact.every((fieldName) =>
                Object.values(fieldName.errors).every((error) => error === null)
            )

        if (noErrors) {
            try {
                console.log(union);
                const response = await updateUnionApi(union);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Dữ liệu đã được gửi thành công.");
                    setSnackbarOpen(true);
                    // dispatch({
                    //     type: HANDLERS_UNION.RESET_UNION,
                    // });
                } else {
                    console.log(response);
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Đã xảy ra lỗi khi gửi dữ liệu!");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.log(error);
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại!");
                setSnackbarOpen(true);
            }
        }
    };


    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

    const handleChangeTwo = (event, newValue) => {
        setValueTabTwo(newValue);
    };

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: "#1C2536" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <TabContext value={valueTabOne}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeOne}>
                            <Tab label="Thông tin cơ bản"
                                value="1" />
                            <Tab label="Danh sách liên hệ"
                                value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabInfoBasicEdit />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        {/* <TabContact /> */}
                    </TabPanel>
                </TabContext>
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


