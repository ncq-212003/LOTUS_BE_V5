import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    alpha
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ArrowLongLeftIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import OverseasStudentAdd from 'src/sections/overseas-student/add/overseas-student-add';
import Link from 'next/link';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_OVERSEAS_STUDENT } from 'src/contexts/reducer/overseas-student/reducer-overseas-student';
import { actionSetTouched, validateField } from 'src/sections/overseas-student/add/tab-infobasic';
import { validateFieldAspirationsAdmission } from 'src/sections/overseas-student/add/tab-aspirations-admission';
import { validateFieldHealthCondition } from 'src/sections/overseas-student/add/tab-healthcondition';
import { actionSetTouchedRow, validateFieldRowFamilyRelationShip } from 'src/sections/overseas-student/add/tab-familyrelationship';
import { validateFieldRowStudyProcess } from 'src/sections/overseas-student/add/tab-studyprocess';
import { validateFieldRowWorkexperienceDomestical } from 'src/sections/overseas-student/add/tab-workexperience-domestically';
import { validateFieldRowWorkexperienceInternational } from 'src/sections/overseas-student/add/tab-workexperience-internationally';
import { validateFieldTrainIQ } from 'src/sections/overseas-student/add/tab-trainIQ';
import { addStudentApi } from 'src/contexts/api/overseas-student/api-student';
import SnackbarAlert from 'src/components/action-notification';

const Page = () => {
    // context
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const {
        duHocSinh,
        thongTinCoBan,
        tinhTrangSucKhoe,
        nguyenVongTrungTuyen,
        daoTao,
        quanHeGiaDinh,
        quaTrinhHocTap,
        kinhNghiemTrongNuoc,
        kinhNghiemNgoaiNuoc,
        ghiChuChung,
    } = overseasStudent;
    //state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [isSuccess, setIsSuccess] = useState(true);

    const handleAdd = async () => {
        Object.keys(thongTinCoBan)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "thongTinCoBan", fieldName);
                validateField(dispatch, "thongTinCoBan", fieldName, thongTinCoBan[fieldName]);
            });

        Object.keys(tinhTrangSucKhoe)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "tinhTrangSucKhoe", fieldName);
                validateFieldHealthCondition(
                    dispatch,
                    "tinhTrangSucKhoe",
                    fieldName,
                    tinhTrangSucKhoe[fieldName]
                );
            });

        Object.keys(nguyenVongTrungTuyen)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "nguyenVongTrungTuyen", fieldName);
                validateFieldAspirationsAdmission(
                    dispatch,
                    "nguyenVongTrungTuyen",
                    fieldName,
                    nguyenVongTrungTuyen[fieldName]
                );
            });

        Object.keys(daoTao)
            .slice(0, -2)
            .forEach((fieldName) => {
                actionSetTouched(dispatch, "daoTao", fieldName);
                validateFieldTrainIQ(dispatch, "daoTao", fieldName, daoTao[fieldName]);
            });

        quanHeGiaDinh.map((fieldName, index) => {
            Object.keys(fieldName)
                .slice(0, -2)
                .forEach((fieldNameRow) => {
                    actionSetTouchedRow(dispatch, "quanHeGiaDinh", index, fieldNameRow);
                    validateFieldRowFamilyRelationShip(
                        dispatch,
                        "quanHeGiaDinh",
                        index,
                        fieldNameRow,
                        fieldName[fieldNameRow]
                    );
                });
        });

        quaTrinhHocTap.map((fieldName, index) => {
            Object.keys(fieldName)
                .slice(0, -2)
                .forEach((fieldNameRow) => {
                    actionSetTouchedRow(dispatch, "quaTrinhHocTap", index, fieldNameRow);
                    validateFieldRowStudyProcess(
                        dispatch,
                        "quaTrinhHocTap",
                        index,
                        fieldNameRow,
                        fieldName[fieldNameRow]
                    );
                });
        });

        kinhNghiemTrongNuoc.map((fieldName, index) => {
            Object.keys(fieldName)
                .slice(0, -2)
                .forEach((fieldNameRow) => {
                    actionSetTouchedRow(dispatch, "kinhNghiemTrongNuoc", index, fieldNameRow);
                    validateFieldRowWorkexperienceDomestical(
                        dispatch,
                        "kinhNghiemTrongNuoc",
                        index,
                        fieldNameRow,
                        fieldName[fieldNameRow]
                    );
                });
        });

        kinhNghiemNgoaiNuoc.map((fieldName, index) => {
            Object.keys(fieldName)
                .slice(0, -2)
                .forEach((fieldNameRow) => {
                    actionSetTouchedRow(dispatch, "kinhNghiemNgoaiNuoc", index, fieldNameRow);
                    validateFieldRowWorkexperienceInternational(
                        dispatch,
                        "kinhNghiemNgoaiNuoc",
                        index,
                        fieldNameRow,
                        fieldName[fieldNameRow]
                    );
                });
        });

        // console.log(Object.values(thongTinCoBan).map((error) => error));
        // console.log(Object.values(tinhTrangSucKhoe.errors).map((error) => error));
        // console.log(Object.values(nguyenVongTrungTuyen.errors).map((error) => error));
        // console.log(Object.values(daoTao.errors).map((error) => error));
        // console.log(
        //     quanHeGiaDinh.map((fieldName) =>
        //         Object.values(fieldName.errors).map((error) => error)
        //     )
        // );
        // console.log(
        //     quaTrinhHocTap.map((fieldName) =>
        //         Object.values(fieldName.errors).map((error) => error)
        //     )
        // );
        // console.log(
        //     kinhNghiemTrongNuoc.map((fieldName) =>
        //         Object.values(fieldName.errors).map((error) => error)
        //     )
        // );
        // console.log(
        //     kinhNghiemNgoaiNuoc.map((fieldName) =>
        //         Object.values(fieldName.errors).map((error) => error)
        //     )
        // );

        if (Object.values(thongTinCoBan.errors).every((error) => !error) &&
            Object.values(tinhTrangSucKhoe.errors).every((error) => error === null) &&
            Object.values(nguyenVongTrungTuyen.errors).every((error) => error === null) &&
            Object.values(daoTao.errors).every((error) => error === null) &&
            quanHeGiaDinh.every((fieldName) =>
                Object.values(fieldName.errors).every((error) => error === null)
            ) &&
            quaTrinhHocTap.every((fieldName) =>
                Object.values(fieldName.errors).every((error) => error === null)
            ) &&
            kinhNghiemTrongNuoc.every((fieldName) =>
                Object.values(fieldName.errors).every((error) => error === null)
            ) &&
            kinhNghiemNgoaiNuoc.every((fieldName) =>
                Object.values(fieldName.errors).every((error) => error === null)
            )
        ) {
            try {
                // call api
                const response = await addStudentApi(overseasStudent);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Thêm thành công.");
                    setSnackbarOpen(true);
                    dispatch({
                        type: HANDLERS_OVERSEAS_STUDENT.RESET_OVERSEAS_STUDENT,
                    });
                     setIsSuccess(true);
                } else {
                    console.log(response);
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Đã xảy ra lỗi khi gửi dữ liệu!");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error(error);
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại!");
                setSnackbarOpen(true);
                return error;
            }
        }
        // console.log(overseasStudent);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Head>
                <title>
                    Thêm du học sinh | Lotus
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={4}
                    sx={{
                        backdropFilter: "blur(6px)",
                        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                        position: "-webkit-sticky",
                        position: "sticky",
                        top: 0,
                        padding: { xs: "10px 15px", sm: "15px 30px 8px" },
                        height: { xs: "120px", sm: "64px" },
                        zIndex: 1100,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="h4">
                            Thêm du học sinh
                        </Typography>
                    </Stack>
                    <div>
                        <Button
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <PlusIcon />
                                </SvgIcon>
                            )}
                            variant="contained"
                            sx={{
                                backgroundColor: '#1C2536',
                                marginRight: "12px",
                                marginTop: { xs: "-40px", sm: "0px" },
                            }}
                            onClick={handleAdd}
                        >
                            Lưu
                        </Button>
                        <Link href='/overseas-student-before'>
                            <Button
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        <ArrowLongLeftIcon />
                                    </SvgIcon>
                                )}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                    marginTop: { xs: "-40px", sm: "0px" },
                                }}
                            >
                                Quay lại
                            </Button>
                        </Link>
                    </div>
                </Stack>
                <Container maxWidth="xl">
                    <OverseasStudentAdd isSuccess={isSuccess} setSuccess={setIsSuccess}/>
                </Container>
                <SnackbarAlert
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                />
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
