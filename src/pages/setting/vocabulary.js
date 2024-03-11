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
import Link from 'next/link';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import VocabularyTable from 'src/sections/setting/vocabulary/vocabulary-table';

const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Từ vựng | Lotus
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
                                    Từ vựng
                                </Typography>
                            </Stack>
                            <div>
                                <Link href="/setting">
                                    <Button
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <ArrowLongLeftIcon />
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#1C2536",
                                            margin: "0px 6px",
                                        }}
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                                <Link href='/setting/vocabulary/add'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1C2536'
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <VocabularyTable />
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
