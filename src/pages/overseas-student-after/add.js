import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    AppBar,
    Toolbar,
    IconButton,
    alpha
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ArrowLongLeftIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import OverseasStudentAdd from 'src/sections/overseas-student/add/overseas-student-add';
import Link from 'next/link';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Head>
                <title>
                    Thêm du học sinh | Lotus
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
                    direction={{ xs: "column", sm: "row" }}
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
                            Thêm du học sinh
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
                        <Link href='/overseas-student-after'>
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
                    <OverseasStudentAdd />
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
