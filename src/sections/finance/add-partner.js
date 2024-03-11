import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Dialog, styled, IconButton, SvgIcon } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const AddPartner = ({ openAddPartner, closeAddPartner }) => {
    const handleClose = () => {
        closeAddPartner();
    };
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                open={openAddPartner}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    Thêm đối tác
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <SvgIcon fontSize="inherit">
                        <XCircleIcon />
                    </SvgIcon>
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Tên đối tác mới"
                        variant="outlined"
                        size="small"
                        sx={{ margin: "4px", marginTop: "12px" }}
                    />
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                width: "150px",
                                backgroundColor: "#1C2536",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
};
