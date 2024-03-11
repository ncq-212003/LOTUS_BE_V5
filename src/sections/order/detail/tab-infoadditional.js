import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Button,
    Avatar,
    InputAdornment,

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { Component, useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";

const filesData = [
    { id: 1, name: "File 1", url: "url/to/file1.pdf" },
    { id: 2, name: "File 2", url: "url/to/file2.pdf" },
    { id: 3, name: "File 3", url: "url/to/file3.pdf" },
    { id: 4, name: "File 4", url: "url/to/file4.pdf" },
    { id: 5, name: "File 5", url: "url/to/file5.pdf" },
    { id: 6, name: "File 6", url: "url/to/file6.pdf" },
    { id: 7, name: "File 7", url: "url/to/file7.pdf" },
    { id: 8, name: "File 8", url: "url/to/file8.pdf" },
    { id: 9, name: "File 9", url: "url/to/file9.pdf" },
    { id: 10, name: "File 10", url: "url/to/file10.pdf" },
];

export default function TabInfoAdditional() {
    const handleDownload = (url) => {
        window.open(url, "_blank");
    };

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={12}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                                textAlign='center'
                            >
                                File đơn hàng scan
                            </Typography>
                            <Stack spacing={2}>
                                {filesData.map((file) => (
                                    <Box
                                        key={file.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <Avatar sx={{ marginRight: "12px" }}>File</Avatar>
                                        <Typography variant="body1" component="span">
                                            {file.name}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDownload(file.url)}
                                            sx={{
                                                backgroundColor: '#1C2536'
                                            }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};