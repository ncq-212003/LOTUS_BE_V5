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
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useState } from 'react';
import Link from 'next/link';
import MarketTable from 'src/sections/setting/market/market-table';
import ArrowBack from '@mui/icons-material/ArrowBack';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thị Trường | Lotus
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
                                    Thị Trường
                                </Typography>
                            </Stack>
                            <div>
                                <Link href="/setting">
                                    <Button
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <ArrowBack />
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#1C2536",
                                            margin: "0px 6px",
                                            '&:hover': {
                                                backgroundColor: '#0c4da2', 
                                            },
                                        }}
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                                <Link href='/setting/market/add'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536',
                                            '&:hover': {
                                                backgroundColor: '#0c4da2', 
                                            },
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <MarketTable />
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
