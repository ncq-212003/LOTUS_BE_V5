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
import ProfessionTable from 'src/sections/setting/profession/profession-table';
import ArrowBack from '@mui/icons-material/ArrowBack';
import styles from '../../style/index.module.scss'

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
                    Ngành nghề | Lotus
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
                                    Ngành nghề
                                </Typography>
                            </Stack>
                            <div>
                                <Link href="/setting">
                                    <Button
                                        className={styles.btn}
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <ArrowBack />
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                                <Link href='/setting/profession/add'>
                                    <Button
                                        className={styles.btn}
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                    >
                                        Thêm
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <ProfessionTable />
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
