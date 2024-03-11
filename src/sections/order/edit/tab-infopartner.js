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

export default function TabInfoPartner() {

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
                                Thông tin đối tác
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên đơn hàng"
                                fullWidth
                                variant="outlined"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày thi tuyển"
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn']}
                                renderInput={(params) => <TextField {...params} label="Tỉnh đến làm việc" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn']}
                                renderInput={(params) => <TextField {...params} label="Nghiệp đoàn" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn']}
                                renderInput={(params) => <TextField {...params} label="Xí nghiệp tiếp nhận" variant="outlined" />}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ làm việc"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Đang tiến cử', 'Đã tuyển xong', 'Hủy', 'Hoàn thành hồ sơ']}
                                defaultValue="Đang tiến cử"
                                renderInput={(params) => <TextField {...params} label="Trạng thái đơn hàng" variant="outlined" />}
                            />
                            {/* list cty của mình */}
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn']}
                                renderInput={(params) => <TextField {...params} label="Công ty phái cử" variant="outlined" />}
                            />
                        </Box>
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
                                Thời gian tuyển dụng
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Thi tay nghề"
                                fullWidth
                                variant="outlined"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày thi tuyển"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày khách sang"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày chốt hồ sơ"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Hình thức tuyển"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Dự kiến xuất cảnh"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Người kiểm soát"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Người thông báo"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid
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
                                Tiêu chuẩn tuyển chọn
                            </Typography>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params} label="Ngành tuyển" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params} label="Kinh nghiệm" variant="outlined" />}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Yêu cầu tay nghề"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điều kiện khác"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                multiple
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Hà Nội', 'Tp. Hồ Chí Minh']}
                                renderInput={(params) => <TextField {...params} label="Không bao gồm Tỉnh / TP" variant="outlined" />}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Yêu cầu tiếng Bản địa khi phỏng vấn"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Yêu cầu thị lực"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                multiline
                                rows={2}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nội dung công việc"
                                fullWidth
                                variant="outlined"
                            />
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 6px'
                                }}
                            >
                                Ứng viên nam
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số lượng ứng viên nam"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số lượng cần chọn"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 6px'
                                }}
                            >
                                Ứng viên nữ
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số lượng ứng viên nữ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số lượng cần chọn"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 6px'
                                }}
                            >
                                Độ tuổi
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Từ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Đến"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 6px'
                                }}
                            >
                                Cân nặng
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Từ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Đến"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Chiều cao"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Sức khỏe"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nhóm máu"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tay thuận"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Hình xăm"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Mù màu"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={1}>Không lựa chọn</option>
                                <option value={2}>Có</option>
                                <option value={3}>Không</option>
                            </TextField>
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
                                <option value={2}>Có</option>
                                <option value={3}>Không</option>
                            </TextField>
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Hôn nhân"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={1}>Không lựa chọn</option>
                                <option value={2}>Chưa kết hôn</option>
                                <option value={3}>Đã kết hôn</option>
                                <option value={4}>Ly hôn</option>
                            </TextField>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};