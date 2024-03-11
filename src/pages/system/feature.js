import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import FeatureAdd from "src/sections/system/feature/feature-add";
import FeatureTable from "src/sections/system/feature/feature-table";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [displayState, setDisplayState] = useState(true);
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    // Change state
    const handleDisplayState = () => {
        setDisplayState(!displayState);
    }


    return (
        <>
            <Head>
                <title>Chức năng | Lotus</title>
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
                                <Typography variant="h4">Chức năng</Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={
                                        <SvgIcon fontSize="small">
                                            {displayState ? <PlusIcon /> : <ListBulletIcon />}
                                        </SvgIcon>
                                    }
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#1C2536",
                                    }}
                                    onClick={handleDisplayState}
                                >
                                    {displayState ? "Thêm" : "Danh sách"}
                                </Button>
                            </div>
                        </Stack>
                        {displayState ? <FeatureTable /> : <FeatureAdd />}
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;