import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import ProgramTable from 'src/sections/finance/program/program-table';

const Page = () => {

  return (
    <>
      <Head>
        <title>
          Chương trình | Lotus
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Chương trình
                </Typography>
              </Stack>
              <div>
                <Link href='/finance/program/add'>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    sx={{
                      backgroundColor: '#1C2536'
                    }}
                  >
                    Thêm
                  </Button>
                </Link>
              </div>
            </Stack>
            <ProgramTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
