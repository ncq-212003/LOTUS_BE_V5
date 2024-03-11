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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function TabInfoAdditional() {
    const [files, setFiles] = useState([]);

    const handleChange = (files) => {
        setFiles(files);
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
                            >
                                File đơn hàng scan
                            </Typography>
                            <Typography
                                variant="span"
                                component="span"
                                sx={{ marginBottom: "16px" }}
                            >
                                Có thể chọn nhiều file
                            </Typography>
                            <DropzoneArea
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};