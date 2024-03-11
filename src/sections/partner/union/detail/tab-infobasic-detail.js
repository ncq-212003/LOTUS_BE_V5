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
    Divider,

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { findUnionByIdApi } from "src/contexts/api/partner/api-union";

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

export default function TabInfoBasic({ id }) {
    const [unionDetail, setUnionDetail] = useState(null);
    console.log(id);
    //Find union 
    useEffect(() => {
        const findDetailUnion = async (id) => {
            console.log(id);
            if (id) {
                const res = await findUnionByIdApi(id);
                console.log(res.data);
                setUnionDetail(res.data);
            }
        };
        findDetailUnion(id);
    }, [id]);

    console.log(unionDetail);

    return (
        <>
            {unionDetail ? (
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
                                    Thông tin cơ bản
                                </Typography>
                                <Box
                                    sx={{
                                        margin: '20px 0px 0px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginBottom: "16px"
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Mã số nghiệp đoàn: </span>
                                            {unionDetail.syndicateCode}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginBottom: "16px"
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Tên nghiệp đoàn: </span>
                                            {unionDetail.syndicateName}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginBottom: "16px"
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Địa chỉ website: </span>
                                            {unionDetail.website}
                                        </Typography>

                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Stack direction="row" spacing={2}>
                                            <Avatar
                                                sx={{
                                                    width: "120px",
                                                    height: "120px",
                                                }}
                                                variant="rounded"
                                                src={"https://lotus.i.tisbase.online" + unionDetail.syndicateLogo}
                                            ></Avatar>
                                        </Stack>
                                    </Box>

                                </Box>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginBottom: "16px"
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>Tình trạng trình cục: </span>
                                    {unionDetail.statusAprove}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginBottom: "16px"
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>Nhân viên chăm sóc: </span>
                                    {unionDetail.employeeIdTakecare}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginBottom: "16px"
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>Ghi chú: </span>
                                    {unionDetail.employeeIdTakecare}
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
                                    Hợp đồng
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Số hợp đồng: </span>
                                    {unionDetail.contractNumber}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Ngày ký hợp đồng: </span>
                                    {unionDetail.contractSignDate}
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
                                    Phí hỗ trợ thực tập sinh / người lao động
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Trợ cấp tháng đầu: </span>
                                    {unionDetail.supportFirstMonth}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Phí cấp đào tạo: </span>
                                    {unionDetail.feeTraining}
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
                                    Địa chỉ nghiệp đoàn
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '16px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Thị trường: </span>
                                    {unionDetail.marketId}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '16px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Tỉnh, thành phố: </span>
                                    {unionDetail.regionId}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '16px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Địa chỉ: </span>
                                    {unionDetail.syndicateAddress}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '16px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Số điện thoại: </span>
                                    {unionDetail.telephone}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '16px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Số fax: </span>
                                    {unionDetail.fax}
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
                                    Đại diện nghiệp đoàn
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Họ và tên người đại diện: </span>
                                    {unionDetail.personRepresent}
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Chức vụ: </span>
                                    {unionDetail.position}
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
                                    sx={{ marginBottom: "16px", marginTop: "16px" }}
                                    textAlign='center'
                                >
                                    Phí quản lý
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Phí quản lý :</span>
                                    {unionDetail.feeContract}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            ) : (
                <Typography>Đang tải...</Typography>
            )}
        </>
    )
};