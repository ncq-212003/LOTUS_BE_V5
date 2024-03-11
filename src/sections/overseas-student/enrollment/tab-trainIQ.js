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
import { DatePicker } from "@mui/x-date-pickers";

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

export default function TabTrainIQ() {
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
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'A', 'B']}
                                renderInput={(params) => <TextField {...params} label="Danh sách lớp" variant="outlined"/>}
                            />
                            <TextField
                                disabled
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Chủ nhiệm"
                                fullWidth
                                variant="outlined"
                                value='Cô Anh'
                            />
                            <TextField
                                disabled
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="SĐT chủ nhiệm"
                                fullWidth
                                variant="outlined"
                                value='0989475458'
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <DatePicker
                                    disabled
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày khai giảng"
                                />
                                <DatePicker
                                    disabled
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày kết thúc"
                                />
                            </Box>
                            <TextField
                                multiline
                                rows={2}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
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