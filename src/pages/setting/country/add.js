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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Link from 'next/link';
import CountryAdd from 'src/sections/setting/country/country-add';
import styles from '../../../style/index.module.scss'

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thêm quốc gia | Lotus
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
                                    Thêm quốc gia
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/setting/country'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowBackIcon />
                                            </SvgIcon>
                                        )}
                                        className={styles.btnBack}
                                        variant="contained"
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <CountryAdd />
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
