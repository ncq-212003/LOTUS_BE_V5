import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Link from "next/link";
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import CreateQuestionTable from "src/sections/setting/create-question/create-question-table";


const Page = () => {
  return (
    <>
      <Head>
        <title>Tạo câu hỏi | Lotus</title>
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
                <Typography variant="h4">Danh sách câu hỏi</Typography>
              </Stack>
              <div>
                <Link href="/setting">
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
                <Link href="/setting/create-question/add">
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
            <CreateQuestionTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
