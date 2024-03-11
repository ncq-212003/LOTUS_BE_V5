import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Button,

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import { actionSetTouched } from "./tab-infobasic";
import { useEffect } from "react";
import { listSchoolApi } from "src/contexts/api/setting/api-school";
import { useState } from "react";
import { listMajorApi } from "src/contexts/api/setting/api-major";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";

export function validateFieldAspirationsAdmission(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        muonVaoTruongId: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        truongTrungTuyenId: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        chuyenNganhHocId: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        soHocKy: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
        capHoc: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
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

export default function TabaSpirationsAdmission() {
    // state
    const [schoolOption, setSchoolOption] = useState([]);
    const [majorOption, setMarjorOption] = useState([]);
    const [educationLevel, setEducationLevel] = useState([]);
    // context
    const tab = "nguyenVongTrungTuyen";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { nguyenVongTrungTuyen } = overseasStudent;
    const {
        muonVaoTruongId,
        truongTrungTuyenId,
        chuyenNganhHocId,
        soHocKy,
        capHoc,
        touched,
        errors,
    } = nguyenVongTrungTuyen;

    const handleChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        const fieldValue = event.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
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

        validateFieldAspirationsAdmission(dispatch, tab, fieldName, fieldValue);
    };

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

        validateFieldAspirationsAdmission(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    //listSchoolOption
    useEffect(() => {
        const listData = async () => {
            const res = await listSchoolApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.schoolName,
                    value: com.schoolId,
                }));
                setSchoolOption(data);
            }
        };
        listData();
    }, []);

    //listMajorOption
    useEffect(() => {
        const listData = async () => {
            const res = await listMajorApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.majorName,
                    value: com.majorId,
                }));
                setMarjorOption(data);
            }
        };
        listData();
    }, []);

    //listEducationLevel
    useEffect(() => {
        const listEducationLevelOption = async () => {
            const res = await listEducationLevelApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const edutcationLevels = res.data.map((com) => ({
                    label: com.name,
                    value: com.educationLevelId,
                }));
                setEducationLevel(edutcationLevels);
            }
        };
        listEducationLevelOption();
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
                                Thông tin trường học
                            </Typography>
                            <Autocomplete
                                onBlur={() => handleBlur("muonVaoTruongId")}
                                onChange={(event, newValue) => handleChangeSelect(event, "muonVaoTruongId", newValue)}
                                value={muonVaoTruongId}
                                name="muonVaoTruongId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={schoolOption}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Muốn vào trường"
                                    variant="outlined"
                                    error={!!(touched.muonVaoTruongId && errors.muonVaoTruongId)}
                                    helperText={touched.muonVaoTruongId && errors.muonVaoTruongId}
                                />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("truongTrungTuyenId")}
                                onChange={(event, newValue) => handleChangeSelect(event, "truongTrungTuyenId", newValue)}
                                value={truongTrungTuyenId}
                                name="truongTrungTuyenId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={schoolOption}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Trường trúng tuyển"
                                    variant="outlined"
                                    error={!!(touched.truongTrungTuyenId && errors.truongTrungTuyenId)}
                                    helperText={touched.truongTrungTuyenId && errors.truongTrungTuyenId}
                                />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("chuyenNganhHocId")}
                                onChange={(event, newValue) => handleChangeSelect(event, "chuyenNganhHocId", newValue)}
                                value={chuyenNganhHocId}
                                name="chuyenNganhHocId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={majorOption}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Chuyên ngành học"
                                    variant="outlined"
                                    error={!!(touched.chuyenNganhHocId && errors.chuyenNganhHocId)}
                                    helperText={touched.chuyenNganhHocId && errors.chuyenNganhHocId}
                                />}
                            />
                            <TextField
                                error={!!(touched.soHocKy && errors.soHocKy)}
                                helperText={touched.soHocKy && errors.soHocKy}
                                onBlur={() => handleBlur("soHocKy")}
                                onChange={(event) => handleChange(event, "soHocKy")}
                                value={soHocKy}
                                name="soHocKy"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số kỳ học"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={!!(touched.capHoc && errors.capHoc)}
                                helperText={touched.capHoc && errors.capHoc}
                                onBlur={() => handleBlur("capHoc")}
                                onChange={(event) => handleChange(event, "capHoc")}
                                value={capHoc}
                                name="capHoc"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Cấp học"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {educationLevel.map((level) => (
                                    <option key={level}
                                        value={level.value}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    {/* <Grid
                        item
                        sm={12}
                        md={6}
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
                                Lịch bay
                            </Typography>
                            <FormControl
                                size="small"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                            >
                                <InputLabel>Ngày bay</InputLabel>
                                <TextField
                                    type="date"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    fullWidth
                                />
                            </FormControl>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giờ bay"
                                    fullWidth
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giờ đến"
                                    fullWidth
                                />
                            </Box>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hiệu chuyến bay"
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Sân bay đi"
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Sân bay đến"
                                fullWidth
                            />
                            <TextField
                                multiline
                                rows={3}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                            />
                        </Box>
                    </Grid> */}
                </Grid>
            </Stack>
        </>
    )
};