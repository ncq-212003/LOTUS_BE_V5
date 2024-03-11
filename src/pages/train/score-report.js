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
import ReportStudyTable from 'src/sections/train/report/study-report';
import Link from 'next/link';
import styles from '../../style/index.module.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

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
                    Báo cáo bảng điểm | Lotus
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
                                    Báo cáo bảng điểm
                                </Typography>
                            </Stack>
                            <div>
                                <span>Chọn học kỳ: </span>
                                <select style={{height:'30px',marginRight:"20px"}}>
                                    <option>Học kì I năm học 2020-2021</option>
                                    <option>Học kì II năm học 2020-2021</option>
                                    <option>Học kì I năm học 2021-2022</option>
                                    <option>Học kì II năm học 2021-2022</option>
                                    <option>Học kì I năm học 2022-2023</option>
                                </select>
                                <Link href=''>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <LocalPrintshopOutlinedIcon  />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{backgroundColor: '#1C2536'}}
                                    >
                                        Báo cáo & In
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <ReportStudyTable />
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