import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AddQuestion } from "src/sections/train/part-question/part-question-add";
import { TableQuestion } from "src/sections/train/part-question/part-question-table";

const Page = () => {
  return (
    <>
      <Head>
        <title>Tạo phần | Lotus</title>
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
                <Typography variant="h4">
                  Tạo phần
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* <AddQuestion /> */}
        {/* <TableQuestion /> */}
        </Container>
      </Box>
     
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
