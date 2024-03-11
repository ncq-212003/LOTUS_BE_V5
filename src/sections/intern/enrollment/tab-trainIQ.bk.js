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
                                bgcolor: "#f5f5f5",
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={['Không lựa chọn', 'Tú', 'Nghĩa']}
                                    renderInput={(params) => <TextField {...params} label="Giáo viên phụ trách" />}
                                />
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={['Không lựa chọn', 'A', 'B']}
                                    renderInput={(params) => <TextField {...params} label="Lớp học" />}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày bắt đầu</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày kết thúc</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                            </Box>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'P101']}
                                renderInput={(params) => <TextField {...params} label="Phòng KTX" />}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                 <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày bắt đầu ở</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày kết thúc ở KTX</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};