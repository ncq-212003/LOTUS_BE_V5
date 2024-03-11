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
import { ArrowLongLeftIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ProgressAdd from 'src/sections/order/progress/progress-add';
import Link from 'next/link';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thêm đơn hàng đang tiến cử | Lotus
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
                        <Typography variant="h4">
                            Thêm đơn hàng đang tiến cử
                        </Typography>
                    </Stack>
                    <div>
                        <Button
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <PlusIcon />
                                </SvgIcon>
                            )}
                            variant="contained"
                            sx={{
                                backgroundColor: '#1C2536',
                                marginRight: "12px",
                                marginTop: { xs: "-40px", sm: "0px" },
                            }}
                        >
                            Lưu
                        </Button>
                        <Link href='/order/progress'>
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
                <Container maxWidth="xl">
                    <ProgressAdd />
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
