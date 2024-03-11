import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
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
    Avatar,
    InputAdornment,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

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

export default function TabInfoBasic() {
    const [selectedFileAvt, setSelectedFileAvt] = useState(null);
    const [selectedFileBody, setSelectedFileBody] = useState(null);
    const [gender, setGender] = useState('1');
    const [issueDate, setIssueDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);

    const handleIssueDateChange = (date) => {
        setIssueDate(date);

        // Tính ngày hết hạn là 10 năm sau ngày cấp
        const expiryDate = new Date(date);
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        setExpiryDate(expiryDate);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleFileAvtChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFileAvt(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileBodyChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFileBody(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                                Thông tin cơ bản
                            </Typography>
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã hồ sơ"
                                fullWidth
                                variant="outlined"
                                value='PRDHS000001'
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã du học sinh"
                                fullWidth
                                variant="outlined"
                                value='ABC000001'
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày nhập học"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Họ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên đệm"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày sinh"
                            />
                            {/* <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Giới tính"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </TextField> */}
                            <Box
                                sx={{ margin: "4px", marginTop: "12px", display: "flex", flexDirection: "row" }}
                            >
                                <FormLabel sx={{ margin: "10px 10px 0 8px" }}>Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={gender}
                                    onChange={handleChangeGender}
                                >
                                    <FormControlLabel value="1" control={<Radio size="small" />} label="Nam" />
                                    <FormControlLabel value="2" control={<Radio size="small" />} label="Nữ" />
                                </RadioGroup>
                            </Box>
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tình trạng hôn nhân"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={1}>Chưa kết hôn</option>
                                <option value={2}>Đã kết hôn</option>
                                <option value={3}>Ly hôn</option>
                            </TextField>
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Trình độ văn hóa"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={1}>CĐ</option>
                                <option value={2}>TC NGHE</option>
                                <option value={3}>THCS</option>
                                <option value={4}>THPT</option>
                                <option value={5}>ĐH</option>
                            </TextField>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Kinh', 'Hmooong']}
                                defaultValue='Kinh'
                                renderInput={(params) => <TextField {...params} label="Dân tộc" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Phật', 'Không']}
                                defaultValue='Không'
                                renderInput={(params) => <TextField {...params} label="Tôn giáo" variant="outlined" />}
                            />
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tiến độ hồ sơ"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={0}>Không lựa chọn</option>
                            </TextField>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'TTS', 'CT khác']}
                                renderInput={(params) => <TextField {...params} label="Chương trình tham gia" variant="outlined" />}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
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
                                Căn cước công dân / CMND
                            </Typography>
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số CCCD"
                                fullWidth
                                variant="outlined"
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nơi cấp"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
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
                                Hộ chiếu
                            </Typography>
                            {/* lấy từ cấu hình chung */}
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Cục CS XNC']}
                                renderInput={(params) => <TextField {...params} label="Nơi cấp hộ chiếu" variant="outlined" />}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hộ chiếu"
                                fullWidth
                                variant="outlined"
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                                value={issueDate}
                                onChange={handleIssueDateChange}
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày hết hạn"
                                value={expiryDate}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
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
                                sx={{ marginBottom: "16px", marginTop: "16px" }}
                            >
                                Thông tin visa
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hồ sơ"
                                fullWidth
                                variant="outlined"
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày hết hạn"
                            />
                            <DatePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày nhận tư cách lưu trú"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
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
                                Địa chỉ
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số nhà, đường phố/Thôn"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Tỉnh, thành phố" variant="outlined" />}
                                />
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Quận / huyện" variant="outlined" />}
                                />
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Xã phường" variant="outlined" />}
                                />
                            </Box>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ nơi ở"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điện thoại di động"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    margin: '20px 0px',
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh chân dung
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedFileAvt}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small" component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file" onChange={handleFileAvtChange} />
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh toàn thân
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedFileBody}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small" component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file" onChange={handleFileBodyChange} />
                                    </Button>
                                </Box>
                            </Box>
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
                                Thông tin nộp hồ sơ
                            </Typography>
                            <Autocomplete
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Nhật', 'Hàn']}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                                            checkedIcon={<CheckBox fontSize="small" />}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Muốn đi" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Tú', 'Nghĩa']}
                                renderInput={(params) => <TextField {...params} label="Cán bộ tuyển dụng" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Đang tư vấn', 'Đã ký hợp đồng', 'Đã rút hồ sơ']}
                                renderInput={(params) => <TextField {...params} label="Kết quả sơ tuyển" variant="outlined" />}
                            />
                            <Autocomplete
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Cắt, Mài, Đánh bóng', 'Cơ điện', 'Hàn xì', 'May mặc']}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                                            checkedIcon={<CheckBox fontSize="small" />}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Kinh nghiệm" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Nguồn dài hạn', 'Chỉ thi tuyển']}
                                renderInput={(params) => <TextField {...params} label="Nhóm nguồn cung ứng" variant="outlined" />}
                            />
                            <TextField
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