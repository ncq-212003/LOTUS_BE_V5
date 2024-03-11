import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UniversityAdd({ open, onClose }) {

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>
                        <TextField
                            required
                            sx={{
                                marginBottom: '12px'
                            }}
                            size="small"
                            label="Tên trường"
                            fullWidth
                        />
                        <TextField
                            sx={{
                                marginBottom: '12px'
                            }}
                            size="small"
                            label="Xếp hạng"
                            fullWidth
                        />
                        <TextField
                            sx={{
                                marginBottom: '12px'
                            }}
                            size="small"
                            label="Thị trường"
                            fullWidth
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid
                item
                sm={12}
                md={12}
                xs={12}
            >
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: '#1C2536',
                    }}
                >
                    Thêm
                </Button>
            </Grid>
        </Stack>
    );
}
