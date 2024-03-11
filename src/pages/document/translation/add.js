import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Link from "next/link";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import TranslationAdd from "src/sections/document/translation/translation-add";

const Page = () => {
    return (
        <>
            <Head>
                <title>Hồ sơ dịch thuật | Lotus</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">Thêm hồ sơ dịch thuật</Typography>
                            </Stack>
                            <div>
                                <Link href="/document/translation">
                                    <Button
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <ListBulletIcon />
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#1C2536",
                                        }}
                                    >
                                        Danh sách
                                    </Button>
                                </Link>
                            </div>
                        </Stack>

                    </Stack>
                    <TranslationAdd />
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;