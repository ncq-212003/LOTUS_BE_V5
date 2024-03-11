import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import UnionTable from "src/sections/partner/union/table/union-table";

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
                <title>Nghiệp đoàn | Lotus</title>
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
                            <Stack spacing={4}>
                                <Typography variant="h4">Nghiệp đoàn</Typography>
                            </Stack>
                            <div>
                                <Link href="/partner/union/add">
                                    <Button
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#1C2536",
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <UnionTable />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

