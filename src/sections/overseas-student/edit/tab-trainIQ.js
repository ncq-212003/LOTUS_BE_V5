/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    Autocomplete,
} from "@mui/material";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";
import { actionSetTouched } from "./tab-infobasic";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { findClassroomByIdApi, listClassroomApi } from "src/contexts/api/train/api-classroom";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { HANDLERS_COMPANY } from "src/contexts/reducer/company/reducer-company";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

export function validateFieldTrainIQ(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        danhSachLopId: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        chuNhiemLop: Yup.string().max(4000),
        soDienThoaiChuNhiemLop: Yup.string().max(4000),
        ngayKhaiGiang: Yup.string().max(4000),
        ngayKetThuc: Yup.string().max(4000),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        });
}

export default function TabTrainIQ() {
    // state
    const [classOption, setClassOption] = useState([]);
    // context
    const tab = "daoTao";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { daoTao } = overseasStudent;
    const { company } = state;
    const { companies } = company;
    const {
        danhSachLopId,
        chuNhiemLop,
        soDienThoaiChuNhiemLop,
        ngayKhaiGiang,
        ngayKetThuc,
        touched,
        errors,
    } = daoTao;

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);

        let newValue;

        if (newValueSelect !== null) {
            newValue = newValueSelect;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        }

        validateFieldTrainIQ(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    // fill data to field
    useEffect(() => {
        const listData = async () => {
            if (danhSachLopId) {
                const res = await findClassroomByIdApi(danhSachLopId.value);
                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                    payload: { tab, fieldName: "chuNhiemLop", newValue: res.data.employeeFullName + ' | ' + res.data.employeeCode },
                });

                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                    payload: { tab, fieldName: "soDienThoaiChuNhiemLop", newValue: res.data.employeeMobilePhone },
                });

                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                    payload: { tab, fieldName: "ngayKhaiGiang", newValue: res.data.openDate },
                });

                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                    payload: { tab, fieldName: "ngayKetThuc", newValue: res.data.closeDate },
                });
            }
        };
        listData();
    }, [danhSachLopId]);

    //listClassOption
    useEffect(() => {
        const listData = async () => {
            const res = await listClassroomApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map(async (x) => {
                    return {
                        label: `${x.className} | ${x.code}`,
                        value: x.eClassId,
                    };
                });
                Promise.all(data).then((classOptions) => {
                    setClassOption(classOptions);
                });
            }
        };
        listData();
    }, []);


    return (
        <>
            <Stack spacing={3}>
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
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin đào tạo
                            </Typography>
                            <Autocomplete
                                onBlur={() => handleBlur("danhSachLopId")}
                                onChange={(event, newValue) => handleChangeSelect(event, "danhSachLopId", newValue)}
                                value={danhSachLopId}
                                name="danhSachLopId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={classOption}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Danh sách lớp"
                                    variant="outlined"
                                    error={!!(touched.danhSachLopId && errors.danhSachLopId)}
                                    helperText={touched.danhSachLopId && errors.danhSachLopId}
                                />}
                            />
                            <TextField
                                value={chuNhiemLop}
                                name="chuNhiemLop"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Chủ nhiệm"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                value={soDienThoaiChuNhiemLop}
                                name="soDienThoaiChuNhiemLop"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="SĐT chủ nhiệm"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale={"en-gb"}
                                >
                                    <DatePicker
                                        sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                        value={dayjs(ngayKhaiGiang)}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                variant: 'outlined',
                                            }
                                        }}
                                        label="Ngày khai giảng"
                                        disabled
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale={"en-gb"}
                                >
                                    <DatePicker
                                        sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                        value={dayjs(ngayKetThuc)}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                variant: 'outlined',
                                            }
                                        }}
                                        label="Ngày kết thúc"
                                        disabled
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};