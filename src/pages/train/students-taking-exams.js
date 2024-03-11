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
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useState } from 'react';
import ListStudentTakingExamTable from 'src/sections/train/students/students-taking-exams-table';
import styles from '../../style/index.module.scss';
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
                    Học viên đang thi tuyển | Lotus
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
                                    Học viên đang thi tuyển
                                </Typography>
                            </Stack>
                            <div>
                                <Link href=''>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <LocalPrintshopOutlinedIcon  />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        className={styles.btn}
                                    >
                                        Báo cáo & In
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <ListStudentTakingExamTable />
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