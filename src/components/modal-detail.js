import React from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    Typography,
    DialogActions,
    styled,
    DialogTitle,
    DialogContent,
    Avatar
} from "@mui/material";
import InfoRecord from "./info-record";
import { format } from "date-fns";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ModalDetail({ open, onClose, rowData, columns, typeDateTime = null, dateTimeFields = null }) {
    const urlFile = "https://lotus.i.tisbase.online";

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    const isImage = (value) => {
        // Kiểm tra xem giá trị có phải là một đường dẫn hình ảnh hay không
        return typeof value === 'string' && (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.gif') || value.endsWith('.bmp'));
    };

    const formatDate = (value, fieldName) => {
        if (dateTimeFields && dateTimeFields[fieldName] && typeDateTime[fieldName]) {
            return format(new Date(value), typeDateTime[fieldName]);
        }
        return value;
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Thông tin chi tiết
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
                <Stack
                    sx={{ p: 2 }}
                >
                    {columns
                        .filter(column => column.field !== 'stt' && column.field !== 'action')
                        .map(column => (
                            <Grid container spacing={2} key={column.field} sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>{column.headerName}:</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {rowData && column.field && (
                                        <>
                                            {isImage(rowData[column.field]) ? (
                                                <>
                                                    <Avatar
                                                        src={rowData[column.field] ? urlFile + rowData[column.field] : ''}
                                                        alt={column.headerName}
                                                        sx={{ width: 60, height: 60 }}
                                                    >Ảnh</Avatar>
                                                </>
                                            ) : (
                                                <Typography variant="body1"
                                                    sx={{
                                                        wordWrap: 'break-word',
                                                    }}
                                                >
                                                    {formatDate(rowData[column.field], column.field)}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <InfoRecord />
                <Button autoFocus
                    onClick={handleAdd}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
