import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import MajorAdd from "src/sections/setting/major/major-add";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <>
      <Head>
        <title>Chuyên ngành | Lotus</title>
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
                <Typography variant="h4">Chuyên ngành</Typography>
              </Stack>
              <div>
                <Link href="/setting/major">
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
            <MajorAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
