import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Head from 'next/head';
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Container,
    Typography,
    Button
} from "@mui/material";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import NotificationAdd from 'src/sections/company/notification/notification-add';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thông Báo | Lotus
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
                                    Thông Báo
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/company/notification'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowBack />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536',
                                            margin: '0px 6px'
                                        }}
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                    </Stack>
                    <NotificationAdd/>
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
