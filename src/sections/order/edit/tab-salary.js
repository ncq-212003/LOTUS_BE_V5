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
import { DateTimePicker } from "@mui/x-date-pickers";

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
                            >
                                Mức lương, phí
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Lương cơ bản"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Lương thu nhập hiện tại khoảng"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Trợ cấp"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', '24 tháng', '36 tháng']}
                                renderInput={(params) => <TextField {...params} label="Loại hợp đồng" variant="outlined"/>}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Thời gian làm việc của CT"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điều kiện làm thêm"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Trợ cấp tháng đầu"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Bảo hiểm việc làm (%)"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Bảo hiểm xã hội"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Các khoản khác (nhà,ga,điện, nước…)"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Thực lĩnh (chưa làm thêm)"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Chế độ khác"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};