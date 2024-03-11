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
} from "@mui/material";
import { styled } from '@mui/material/styles';

export default function TabSalary() {

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
                                Mức lương, phí
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Lương cơ bản:</span> 20,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Lương thu nhập hiện tại khoảng:</span> 30,000,000 - 35,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trợ cấp:</span> 2,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Loại hợp đồng:</span> 24 tháng
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Thời gian làm việc của CT:</span> Toàn thời gian
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Điều kiện làm thêm:</span> Có (theo quy định của công ty)
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trợ cấp tháng đầu:</span> 3,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Bảo hiểm việc làm (%):</span> 8%
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Bảo hiểm xã hội:</span> 10%
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Các khoản khác (nhà, ga, điện, nước…):</span> 2,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Thực lĩnh (chưa làm thêm):</span> 6,000,000 VND
                            </Typography>
                            <Typography variant="body1" 
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chế độ khác:</span> Bảo hiểm sức khỏe
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};