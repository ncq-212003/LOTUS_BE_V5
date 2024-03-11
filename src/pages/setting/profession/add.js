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
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ProfessionAdd from 'src/sections/setting/profession/profession-add';
import MarketSelect from 'src/sections/setting/profession/profession-market';

const Page = () => {

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
                                    Thêm Ngành Nghề
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/setting/profession'>
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
                        {/* <MarketSelect /> */}
                        <ProfessionAdd />
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
