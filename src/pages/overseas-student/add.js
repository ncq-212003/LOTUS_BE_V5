import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ListBulletIcon, PlusIcon } from '@heroicons/react/24/solid';
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
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
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
                                        margin: '0px 6px',
                                        position: 'fixed',
                                        top: '12px',
                                        right: '160px',
                                        zIndex: '1100'
                                    }}
                                >
                                    Lưu
                                </Button>
                                <Link href='/overseas-student'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ListBulletIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536',
                                            margin: '0px 6px'
                                        }}
                                    >
                                        Danh sách
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <OverseasStudentAdd />
                    </Stack>
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
