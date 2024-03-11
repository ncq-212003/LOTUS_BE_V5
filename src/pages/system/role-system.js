import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Grid,
    Typography,
} from '@mui/material';


import React, { Fragment } from 'react';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState } from 'react';
import RoleSystemAdd from 'src/sections/system/role-system/role-system-add';
import { RoleSystemSearch } from 'src/sections/system/role-system/role-system-search';
import CompaniesList from 'src/sections/system/role-system/companies-list';
import RoleByDepartmentList from 'src/sections/system/role-system/role-by-department-list';

const Page = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
    };

    return (
        <>
            <Head>
                <title>Phân quyền hệ thống | Lotus</title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={4}
                            mb={3}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">Phân quyền hệ thống</Typography>
                            </Stack>
                            <RoleSystemSearch />
                        </Stack>
                        <Stack>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <CompaniesList handleDepartmentSelect={handleDepartmentSelect} />

                                </Grid>
                                <Grid item xs={12} md={8}>
                                    < RoleByDepartmentList selectedDepartment={selectedDepartment} />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Container>
            </Box >
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
