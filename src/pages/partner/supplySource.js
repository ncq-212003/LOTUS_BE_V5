import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useMemo, useCallback } from "react";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import AddSupplySource from "src/sections/partner/supplySource/supplySource-add";
import TableSupply from "src/sections/partner/supplySource/supplySource-table";
import axios from "axios";

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
        <title>Nguồn cung ứng | Lotus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Danh sách nguồn cung ứng</Typography>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={openDialog}
                sx={{
                  backgroundColor: "#1C2536",
                }}
              >
                Thêm nguồn cung ứng
              </Button>
            </div>
          </Stack>
          <TableSupply />
          <AddSupplySource open={isDialogOpen} onClose={closeDialog} />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
