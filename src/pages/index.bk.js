import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Autocomplete,
  Avatar,
  Box,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewTTS } from "src/sections/overview/overview-tts";
import { OverviewLatestTTS } from "src/sections/overview/overview-latest-tts";
import { OverviewLatestDHS } from "src/sections/overview/overview-latest-dhs";
import { OverviewOrder } from "src/sections/overview/overview-order";
import { OverviewDiemDanh } from "src/sections/overview/overview-doanhthu";
import { OverviewProfile } from "src/sections/overview/overview-profile";
import { OverviewDHS } from "src/sections/overview/overview-dhs";
import { OverviewFinance } from "src/sections/overview/overview-finance";
import { OverviewCongno } from "src/sections/overview/overview-congno";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { MarketContext } from "src/contexts/market-context";

const now = new Date();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Ban đầu, dialog được hiển thị
  const context = useContext(MarketContext);

  const handleMarketSelection = (marketName) => {
    context.setMarket(marketName);
  };

  return (
    <>
      {isDialogOpen && (
        <Dialog open={true} TransitionComponent={Transition}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              width: "600px",
              height: "330px",
            }}
          >
            <Box
              sx={{
                margin: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Thị trường </Typography>
            </Box>
            <Divider />
            <Box
              style={{
                marginTop:"30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h7" sx={{marginLeft:"-50px"}}>NHẬT BẢN </Typography>
              <Typography variant="h7" sx={{marginLeft:"-100px"}}>HÀN QUỐC </Typography>
              <Typography variant="h7" sx={{marginLeft:"-95px"}}>ÚC </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                sx={{
                  fontSize: 16,
                }}
                onClick={() => handleMarketSelection("Nhật Bản")}
              >
                <Avatar sx={{width:"180px", height:"180px"}} alt="Nhật bản" src="assets/page/nui-phu-si.jpg" variant="square" />
              </Button>
              <Button
                type="submit"
                sx={{
                  fontSize: 16,
                }}
                onClick={() => handleMarketSelection("Hàn quốc")}
              >
                <Avatar
                  sx={{width:"180px", height:"180px"}}
                  alt="Hàn quốc"
                  src="assets/page/52345-seoul-han-quoc-2-700x466.jpg"
                  variant="square"
                />
              </Button>
              <Button
                type="submit"
                sx={{
                  fontSize: 16,
                }}
                onClick={() => handleMarketSelection("Úc")}
              >
                <Avatar sx={{width:"180px", height:"180px"}} alt="Úc" src="assets/page/van-hoa-uc.jpg" variant="square" />
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
      {!isDialogOpen && (
        <>
          <Head>
            <title>Tổng quan | Lotus</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTTS difference={12} positive sx={{ height: "100%" }} value="$24k" />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewDHS
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value="1.6k"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewProfile sx={{ height: "100%" }} value={75.5} />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewFinance sx={{ height: "100%" }} value="$15k" />
                </Grid>
                <Grid xs={12} lg={8}>
                  <OverviewDiemDanh
                    chartSeries={[
                      {
                        name: "This year",
                        data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                      },
                      {
                        name: "Last year",
                        data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                      },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewCongno
                    chartSeries={[15, 22]}
                    labels={["Thu", "Chi"]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewOrder
                    products={[
                      {
                        id: "5ece2c077e39da27658aa8a9",
                        image: "/assets/avatars/avatar-alcides-antonio.png",
                        name: "Healthcare Erbology",
                        updatedAt: subHours(now, 6).getTime(),
                      },
                      {
                        id: "5ece2c0d16f70bff2cf86cd8",
                        image: "/assets/avatars/avatar-anika-visser.png",
                        name: "Makeup Lancome Rouge",
                        updatedAt: subDays(subHours(now, 8), 2).getTime(),
                      },
                      {
                        id: "b393ce1b09c1254c3a92c827",
                        image: "/assets/avatars/avatar-cao-yu.png",
                        name: "Skincare Soja CO",
                        updatedAt: subDays(subHours(now, 1), 1).getTime(),
                      },
                      {
                        id: "a6ede15670da63f49f752c89",
                        image: "/assets/avatars/avatar-carson-darrin.png",
                        name: "Makeup Lipstick",
                        updatedAt: subDays(subHours(now, 3), 3).getTime(),
                      },
                      {
                        id: "bcad5524fe3a2f8f8620ceda",
                        image: "/assets/avatars/avatar-chinasa-neo.png",
                        name: "Healthcare Ritual",
                        updatedAt: subDays(subHours(now, 5), 6).getTime(),
                      },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={12} lg={8}>
                  <OverviewLatestTTS
                    orders={[
                      {
                        id: "f69f88012978187a6c12897f",
                        ref: "DEV1049",
                        amount: 30.5,
                        customer: {
                          name: "Ekaterina Tankova",
                        },
                        createdAt: 1555016400000,
                        status: "pending",
                      },
                      {
                        id: "9eaa1c7dd4433f413c308ce2",
                        ref: "DEV1048",
                        amount: 25.1,
                        customer: {
                          name: "Cao Yu",
                        },
                        createdAt: 1555016400000,
                        status: "delivered",
                      },
                      {
                        id: "01a5230c811bd04996ce7c13",
                        ref: "DEV1047",
                        amount: 10.99,
                        customer: {
                          name: "Alexa Richardson",
                        },
                        createdAt: 1554930000000,
                        status: "refunded",
                      },
                      {
                        id: "1f4e1bd0a87cea23cdb83d18",
                        ref: "DEV1046",
                        amount: 96.43,
                        customer: {
                          name: "Anje Keizer",
                        },
                        createdAt: 1554757200000,
                        status: "pending",
                      },
                      {
                        id: "9f974f239d29ede969367103",
                        ref: "DEV1045",
                        amount: 32.54,
                        customer: {
                          name: "Clarke Gillebert",
                        },
                        createdAt: 1554670800000,
                        status: "delivered",
                      },
                      {
                        id: "ffc83c1560ec2f66a1c05596",
                        ref: "DEV1044",
                        amount: 16.76,
                        customer: {
                          name: "Adam Denisov",
                        },
                        createdAt: 1554670800000,
                        status: "delivered",
                      },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={12} lg={12}>
                  <OverviewLatestDHS
                    orders={[
                      {
                        id: "f69f88012978187a6c12897f",
                        ref: "DEV1049",
                        amount: 30.5,
                        customer: {
                          name: "Ekaterina Tankova",
                        },
                        createdAt: 1555016400000,
                        status: "pending",
                      },
                      {
                        id: "9eaa1c7dd4433f413c308ce2",
                        ref: "DEV1048",
                        amount: 25.1,
                        customer: {
                          name: "Cao Yu",
                        },
                        createdAt: 1555016400000,
                        status: "delivered",
                      },
                      {
                        id: "01a5230c811bd04996ce7c13",
                        ref: "DEV1047",
                        amount: 10.99,
                        customer: {
                          name: "Alexa Richardson",
                        },
                        createdAt: 1554930000000,
                        status: "refunded",
                      },
                      {
                        id: "1f4e1bd0a87cea23cdb83d18",
                        ref: "DEV1046",
                        amount: 96.43,
                        customer: {
                          name: "Anje Keizer",
                        },
                        createdAt: 1554757200000,
                        status: "pending",
                      },
                      {
                        id: "9f974f239d29ede969367103",
                        ref: "DEV1045",
                        amount: 32.54,
                        customer: {
                          name: "Clarke Gillebert",
                        },
                        createdAt: 1554670800000,
                        status: "delivered",
                      },
                      {
                        id: "ffc83c1560ec2f66a1c05596",
                        ref: "DEV1044",
                        amount: 16.76,
                        customer: {
                          name: "Adam Denisov",
                        },
                        createdAt: 1554670800000,
                        status: "delivered",
                      },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
