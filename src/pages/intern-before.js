import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import InternTable from "src/sections/intern/before-exit/intern-table";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import { useApp } from "src/hooks/use-app";

const Page = () => {
  const [state, dispatch] = useApp();
  const handleResetForm = () => {
    dispatch({
      type: HANDLERS_INTERN.RESET_INTERN,
    });
  };
  return (
    <>
      <Head>
        <title>TTS trước xuất cảnh | Lotus</title>
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
                <Typography variant="h4">TTS trước xuất cảnh</Typography>
              </Stack>
              <div>
                <Link href="/intern-before/add">
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
                    onClick={handleResetForm}
                  >
                    Thêm
                  </Button>
                </Link>
              </div>
            </Stack>
            <InternTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
