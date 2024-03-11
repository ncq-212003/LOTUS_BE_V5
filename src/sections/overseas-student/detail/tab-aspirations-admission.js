/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { listMajorApi } from "src/contexts/api/setting/api-major";
import { listSchoolApi } from "src/contexts/api/setting/api-school";

export default function TabaSpirationsAdmission({ rowData }) {
    const [schoolWish, setSchoolWish] = useState([]);
    const [schoolPass, setSchoolPass] = useState([]);
    const [major, setMajor] = useState([]);
    const {
        schoolWishId,
        schoolPassId,
        majorId,
        numYear,
        educationLevelWishId,
    } = rowData;

    //getMajor
    useEffect(() => {
        const listData = async () => {
            const res = await listMajorApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    majorName: x.majorName,
                    majorId: x.majorId,
                }));
                setMajor(
                    data.find((x) => x.majorId === majorId)?.majorName
                );
            }
        };
        listData();
    }, []);

    //getSchoolWish
    useEffect(() => {
        const listData = async () => {
            const res = await listSchoolApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    schoolName: x.schoolName,
                    schoolId: x.schoolId,
                }));
                setSchoolWish(
                    data.find((x) => x.schoolId === schoolWishId)?.schoolName
                );
            }
        };
        listData();
    }, []);
    
    //getSchoolPass
    useEffect(() => {
        const listData = async () => {
            const res = await listSchoolApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    schoolName: x.schoolName,
                    schoolId: x.schoolId,
                }));
                setSchoolPass(
                    data.find((x) => x.schoolId === schoolPassId)?.schoolName
                );
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
                                textAlign='center'
                            >
                                Thông tin trường học
                            </Typography>

                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Muốn vào trường:</span> {schoolWish}
                            </Typography>

                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trường trúng tuyển:</span> {schoolPass}
                            </Typography>

                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chuyên ngành học:</span> {major}
                            </Typography>

                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số kỳ học:</span> {numYear}
                            </Typography>

                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Cấp học:</span> Đại học
                            </Typography>
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