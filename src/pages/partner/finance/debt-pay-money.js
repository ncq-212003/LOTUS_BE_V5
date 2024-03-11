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
import TableDebtPay from "src/sections/partner/debt-pay-money/table-debt-pay";
import Link from 'next/link';
import { ArrowLongLeftIcon, PlusIcon } from '@heroicons/react/24/solid';

const Page = () => {

  return (
    <>
      <Head>
        <title>
          Nợ phải chi | Lotus
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
                  Nợ phải chi
                </Typography>
              </Stack>
              <div>
                <Link href="/partner/finance">
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
                {/* <Link href='/finance/debt-payment/add'>
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
                </Link> */}
              </div>
            </Stack>
            <TableDebtPay />
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
