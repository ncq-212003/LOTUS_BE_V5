import Head from 'next/head';
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    TextField,
    Stack,
    Typography,
    Autocomplete,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {

    const handleAddUnionName = () => {
        setUnionNameValues((prevInputValues) => [...prevInputValues, '']);
    };
    const [unionNameValues, setUnionNameValues] = useState([]);
    const [selectValues, setSelectValues] = useState(['Việt Nam', 'Nhật Bản', 'Anh']);

    return (
        <>
            <Head>
                <title>
                    Công ty | Devias Kit
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
                                    Công ty
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Button size="small" onClick={handleAddUnionName} sx={{ padding: "0 12px 12px", margin: "-4px auto 4px 4px" }}  >Đặt nhiều ngôn ngữ</Button>
                            {unionNameValues.map((value, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Autocomplete
                                        options={selectValues}
                                        value={selectValues[index]}
                                        onChange={(event, newValue) => {
                                            setSelectValues((prevSelectValues) => {
                                                const updatedSelectValues = [...prevSelectValues];
                                                updatedSelectValues[index] = newValue;
                                                return updatedSelectValues;
                                            });
                                        }}
                                        sx={{ flex: 1, mr: 1 }}
                                        renderInput={(params) => <TextField {...params} label="Ngôn ngữ" />}
                                    />
                                    {/* <Button onClick={() => handleGetValue(index)}>Get Value</Button> */}
                                    <Button onClick={() => handleRemoveUnionName(index)}>Xóa</Button>
                                </div>
                            ))}
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
