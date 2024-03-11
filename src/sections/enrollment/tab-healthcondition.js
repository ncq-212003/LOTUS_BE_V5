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

export default function TabHealthCondition() {
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
                                Tình trạng sức khỏe
                            </Typography>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'A', 'B', 'O', 'AB']}
                                renderInput={(params) => <TextField {...params} label="Nhóm máu" variant="outlined" />}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Cân nặng"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Chiều cao"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Uống rượu"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                // value={values.state}
                                >
                                    <option value={1}>Không lựa chọn</option>
                                    <option value={2}>Không</option>
                                    <option value={3}>Có</option>
                                </TextField>
                                <TextField
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Hút thuốc"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                // value={values.state}
                                >
                                    <option value={1}>Không lựa chọn</option>
                                    <option value={2}>Không</option>
                                    <option value={3}>Có</option>
                                </TextField>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Thị lực (trái)"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Thị lực (phải)"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tay thuận"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={1}>Không lựa chọn</option>
                                <option value={2}>Trái</option>
                                <option value={3}>Phải</option>
                                <option value={4}>Hai tay</option>
                            </TextField>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};