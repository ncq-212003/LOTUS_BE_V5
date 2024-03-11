import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import ProfessionalCertificationAdd from "src/sections/setting/professionalCertification/professionalCertification-add";
import Link from "next/link";
import { ArrowLongLeftIcon} from '@heroicons/react/24/solid';

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
        <title>Công ty chứng nghề | Lotus</title>
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
                <Typography variant="h4">Công ty chứng nghề</Typography>
              </Stack>
              <div>
                <Link href="/setting/professionalCertification">
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
              </div>
            </Stack>
            <ProfessionalCertificationAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
