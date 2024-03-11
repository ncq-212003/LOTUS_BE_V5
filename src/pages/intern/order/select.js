import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    alpha
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import OrderSelect from 'src/sections/intern/order/order-select';

const Page = () => {
    const selectedOrder = JSON.parse(localStorage.getItem('selectedOrder')) ? JSON.parse(localStorage.getItem('selectedOrder')) : {};

    return (
        <>
            <Head>
                <title>
                    Đơn hàng #{selectedOrder.maDonHang}  | Lotus
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                    sx={{
                        backdropFilter: "blur(6px)",
                        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                        position: "-webkit-sticky",
                        position: "sticky",
                        top: 0,
                        padding: { xs: "10px 15px", sm: "15px 30px 8px" },
                        height: { xs: "120px", sm: "64px" },
                        zIndex: 1100,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="h5">
                            Đơn hàng #{selectedOrder.maDonHang} - {selectedOrder.soLuongTuyen} người cần tuyển
                        </Typography>
                    </Stack>
                    <div>
                        <Link href='/intern/order'>
                            <Button
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        <ArrowLongLeftIcon />
                                    </SvgIcon>
                                )}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                    marginTop: { xs: "-40px", sm: "0px" },
                                }}
                            >
                                Quay lại
                            </Button>
                        </Link>
                    </div>
                </Stack>
                <Container maxWidth="xxl">
                    <OrderSelect />
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
