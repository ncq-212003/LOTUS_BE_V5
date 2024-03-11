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
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        THÊM TRƯỜNG ĐẠI HỌC
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleAdd}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
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
                                bgcolor: "#f5f5f5",
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
            </Stack>
        </Dialog>
    );
}
