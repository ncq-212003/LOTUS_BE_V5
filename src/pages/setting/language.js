import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import SettingLanguage from "src/sections/language/language-setting-add.js"



const Page = () => {
  return (
    <>
      <Head>
        <title>Cấu hình ngôn ngữ | Lotus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl" >
          <Stack spacing={5} >
            <Stack direction="row"  spacing={4} justifyContent={'center'}>
              <Stack spacing={1} >
                <Typography variant="h4">Cấu hình ngôn ngữ</Typography>
              </Stack>
            </Stack>
            <Stack>
                <SettingLanguage/>
            </Stack>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
