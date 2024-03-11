import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ProgramRevenue from "./program-revenue";
import ProgramExpenditure from "./program-expenditure";
import { Save } from "@mui/icons-material";
import { GenerateApi } from "src/contexts/api/random-api";

export default function ProgramAdd() {
    const [codeProgram, setCodeProgram] = useState(null);
    const [revenues, setRevenues] = useState([]);
    const [expends, setExpends] = useState([]);


    const validationSchema = Yup.object().shape({
        tenChuongTrinh: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        maChuongTrinh: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        ghiChu: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            tenChuongTrinh: "",
            maChuongTrinh: '',
            mucThu: revenues,
            mucChi: expends,
            ghiChu: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            mucThu: revenues,
            mucChi: expends,
        }));
    }, [revenues, expends]);

    console.log(revenues);
    useEffect(() => {
        const getRandom = async () => {
            const resCode = await GenerateApi('LOCT', 'Number');
            setCodeProgram(resCode.data);
        };
        getRandom();
    }, []);

    return (
        <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Thông tin chương trình
                        </Typography>

                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="maChuongTrinh"
                            label="Mã chương trình"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maChuongTrinh = codeProgram}
                            error={formik.touched.maChuongTrinh && Boolean(formik.errors.maChuongTrinh)}
                            helperText={formik.touched.maChuongTrinh && formik.errors.maChuongTrinh}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true, // Giữ lại nhãn ngay cả khi input là readOnly
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="tenChuongTrinh"
                            label="Tên chương trình"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenChuongTrinh}
                            error={formik.touched.tenChuongTrinh && Boolean(formik.errors.tenChuongTrinh)}
                            helperText={formik.touched.tenChuongTrinh && formik.errors.tenChuongTrinh}
                        />
                        <TextField
                            fullWidth
                            label="Ghi chú"
                            size="small"
                            multiline
                            rows={2}
                            sx={{ marginTop: "12px" }}
                            variant="outlined"
                            {...formik.getFieldProps("ghiChu")}
                            error={formik.touched.ghiChu && Boolean(formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                        />
                    </Box>
                    {/* Mục thu */}
                    <ProgramRevenue
                        revenues={revenues}
                        setRevenues={setRevenues}
                    />

                    {/* Mục chi */}
                    <ProgramExpenditure
                        expends={expends}
                        setExpends={setExpends}
                    />
                    <Grid sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={formik.handleSubmit}
                            sx={{ marginTop: "16px", backgroundColor: "#1C2536" }}
                        >
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
