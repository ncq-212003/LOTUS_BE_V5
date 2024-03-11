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
import ItemAdd from 'src/sections/setting/item/item-add';
import styles from '../../../style/index.module.scss'

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thêm Tài Sản - Vật Dụng | Lotus
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
                                    Thêm Tài Sản - Vật Dụng
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/setting/item'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowBackIcon />
                                            </SvgIcon>
                                        )}
                                        className={styles.btn}
                                        variant="contained"
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <ItemAdd />
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
