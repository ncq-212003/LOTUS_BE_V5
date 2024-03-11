import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FlightChedulesAdd from 'src/sections/flight-schedules/flight-schedules-add.js';


const Page = () => {
  return (
    <>
      <Head>
        <title>Lịch bay | Lotus</title>
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
                <Typography variant="h4">Danh sách lịch bay</Typography>
              </Stack>
            </Stack>
            <Stack>
                 <FlightChedulesAdd/>
            </Stack>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
