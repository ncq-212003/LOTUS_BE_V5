import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CancelTable from 'src/sections/order/cancel/cancel-table';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Hủy | Lotus
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
                                <Typography variant="h4"
                                    sx={{
                                        color:'#d61818'
                                    }}
                                >
                                    Hủy
                                </Typography>
                            </Stack>
                        </Stack>
                        <CancelTable />
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