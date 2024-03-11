import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AddQuestion } from "src/sections/train/question/question-add";
import { TableQuestion } from "src/sections/train/question/question-table";

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
                <Typography variant="h4">
                  Tạo câu hỏi
                  {/* Tạo câu hỏi {selectedType ? ` - ${selectedType}` : ""} */}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <AddQuestion />
        <TableQuestion />
        </Container>
      </Box>
     
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

{
  /* <Typography variant="h6" sx={{marginTop: "30px"}}>Chọn loại bài thi: </Typography>
          <Box>
          <Grid container spacing={2} sx={{ marginTop: "1px", display: "flex", justifyContent: "center"}}>
          <Grid item xs={2} >
          <Typography
          sx={{
                    marginLeft: "10px",
                  }}
                >
                  Trắc nghiệm:
                </Typography>
                <Button
                  sx={{
                    backgroundColor: selectedType === "Trắc nghiệm" ? "gray" : "#ccc",
                    "&:hover": {
                      backgroundColor: selectedType === "Trắc nghiệm" ? "gray" : "gray", // Màu xám khi hover vào nút
                    },
                  }}
                  onClick={() => handleTypeSelect("Trắc nghiệm")}
                >
                  <Avatar
                    sx={{
                      width: "70px",
                      height: "90px",
                    }}
                    variant="rounded"
                    src="/assets/tracNghiem.png"
                  ></Avatar>
                </Button>
              </Grid>
              <Grid item xs={2} sx={{marginLeft: "-70px"}}>
                <Typography
                  sx={{
                    marginLeft: "20px",
                  }}
                >
                  Trực tiếp:
                </Typography>
                <Button
                  sx={{
                    marginTop: "2px",
                    width: "102px",
                    height: "107px",
                    backgroundColor: selectedType === "Trực tiếp" ? "gray" : "#ccc",
                    "&:hover": {
                      backgroundColor: selectedType === "Trực tiếp" ? "gray" : "gray", // Màu xám khi hover vào nút
                    },
                  }}
                  onClick={() => handleTypeSelect("Trực tiếp")}
                >
                  <Avatar
                    sx={{
                      width: "80px",
                      height: "100px",
                    }}
                    variant="rounded"
                    src="/assets/tuLuan.jpg"
                  ></Avatar>
                </Button>
              </Grid>
            </Grid>
          </Box>
          {selectedType? selectedType ==="Trắc nghiệm" ? <AddQuestion /> : null:null} */
}
