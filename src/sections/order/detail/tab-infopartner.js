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
                                textAlign='center'
                            >
                                Thông tin đối tác
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tên đơn hàng:</span> Đơn hàng A
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày thi tuyển:</span> 2023-12-01
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tỉnh đến làm việc:</span> Hồ Chí Minh
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nghiệp đoàn:</span> IT
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Xí nghiệp tiếp nhận:</span> Công ty XYZ
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Địa chỉ làm việc:</span> Đường ABC, Quận XYZ
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trạng thái đơn hàng:</span> Đang tiến cử
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Công ty phái cử:</span> Công ty ABC
                            </Typography>
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
                                textAlign='center'
                            >
                                Thời gian tuyển dụng
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Thi tay nghề:</span> Kỹ sư phần mềm
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày thi tuyển:</span> 2023-12-15
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày khách sang:</span> 2023-12-20
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày chốt hồ sơ:</span> 2023-12-10
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Hình thức tuyển:</span> Phỏng vấn
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Dự kiến xuất cảnh:</span> 2024-01-10
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Người kiểm soát:</span> Nguyễn Văn A
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Người thông báo:</span> Nguyễn Thị B
                            </Typography>
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
                                textAlign='center'
                            >
                                Tiêu chuẩn tuyển chọn
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngành tuyển:</span> Công nghệ thông tin
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Kinh nghiệm:</span> 3-5 năm
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Yêu cầu tay nghề:</span> Kỹ sư phần mềm có kinh nghiệm trong lập trình Java và Spring Framework.
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Điều kiện khác:</span> Kinh nghiệm làm việc ít nhất 3 năm trong lĩnh vực liên quan.
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Không bao gồm Tỉnh / TP:</span> Hồ Chí Minh, Đà Nẵng
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Yêu cầu tiếng Bản địa khi phỏng vấn:</span> Có khả năng giao tiếp tiếng Nhật cơ bản.
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Yêu cầu thị lực:</span> Không có yêu cầu đặc biệt.
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nội dung công việc:</span> Phát triển ứng dụng web sử dụng React và Node.js.
                            </Typography>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 0px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Ứng viên nam
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Số lượng ứng viên nam:</span> 50
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Số lượng cần chọn:</span> 10
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 0px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Ứng viên nữ
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Số lượng ứng viên nữ:</span> 50
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Số lượng cần chọn:</span> 10
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 0px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Độ tuổi
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '16px'
                                }}
                            >
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Từ:</span> 23
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Đến:</span> 40
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2"
                                sx={{
                                    margin: '6px 6px 0px 0px'
                                }}
                            >
                                Cân nặng
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '16px'
                                }}
                            >
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Từ:</span> 55
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Đến:</span> 60
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chiều cao:</span> 175 cm
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Sức khỏe:</span> Khỏe mạnh
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nhóm máu:</span> A
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tay thuận:</span> Phải
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Hình xăm:</span> Có (chữ LOVE ở cổ tay phải)
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Mù màu:</span> Không
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Uống rượu:</span> Có
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Hôn nhân:</span> Chưa kết hôn
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};