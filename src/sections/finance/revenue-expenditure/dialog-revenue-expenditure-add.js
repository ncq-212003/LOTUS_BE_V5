import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Button, Grid, IconButton, TextField, Tooltip, Typography, styled, Dialog, SvgIcon } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const TabExpenditure = () => {
    const [isOpenExpen, setIsOpenExpen] = useState(false);
    const [isOpenEditExpen, setIsOpenEditExpen] = useState(false);

    const handleOpenExpen = () => {
        setIsOpenExpen(true)
    }
    const handleCloseExpen = () => {
        setIsOpenExpen(false)
    }

    const handleOpenEditExpen = () => {
        setIsOpenEditExpen(true)
    }
    const handleCloseEditExpen = () => {
        setIsOpenEditExpen(false)
    }
    return (
        <>
            <Grid container spacing={0.4}>
                <Grid item xs={10} md={11} lg={11} xl={11}>
                    <Autocomplete
                        sx={{ margin: "4px" }}
                        fullWidth
                        size="small"
                        options={["Chi phí vận chuyển", "Tiền thuê/Nợ nhà", "Trả tiền bảo hiểm", "Chi tiêu giáo dục", "Quyên góp từ thiện"]}
                        renderInput={(params) => <TextField variant="outlined" {...params} label="Nhóm hạng mục" />}
                    />
                </Grid>
                <Grid item xs={2} md={1} lg={1} xl={1} >
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="Sửa nhóm hạng mục">
                            <IconButton aria-label="edit" style={{ color: "#000000" }}
                                onClick={handleOpenEditExpen}
                            >
                                <BorderColorOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Tên hạng mục"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Ghi chú"
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ marginTop: "30px" }}>
                Danh sách mục chi
            </Typography>
            <Box sx={{ minHeight: 220, flexGrow: 1, maxWidth: 300 }}>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultExpanded={['1', '2', '3', '5', '6', '7', '8']}
                    multiSelect
                >
                    <TreeItem nodeId="1" label="Hạng mục 1" defaultExpanded>
                        <TreeItem nodeId="2" label="Chi phí vận chuyển" />
                        <TreeItem nodeId="3" label="Tiền thuê/Nợ nhà" />
                    </TreeItem>
                    <TreeItem nodeId="4" label="Hạng mục 2" defaultExpanded>
                        <TreeItem nodeId="5" label="Trả tiền bảo hiểm" />
                        <TreeItem nodeId="6" label="Thu tiền ăn uống" />
                        <TreeItem nodeId="7" label="Quyên góp từ thiện" />
                    </TreeItem>
                </TreeView>
            </Box>
            {/* Hiển thị hộp thêm hạng mục */}
            {/* <BootstrapDialog
                onClose={handleCloseExpen}
                open={isOpenExpen}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    Thêm nhóm chi
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseExpen}
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
                    <Grid container>
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label='Tên nhóm chi'
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={handleCloseExpen}
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
            </BootstrapDialog> */}

            {/* Hiển thị hộp chỉnh sửa doanh mục chi */}
            <BootstrapDialog
                onClose={handleCloseEditExpen}
                open={isOpenEditExpen}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    Chỉnh sửa nhóm chi
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseEditExpen}
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
                    <Grid container>
                        <Autocomplete
                            sx={{ margin: "12px 4px 0px 0px " }}
                            fullWidth
                            size="small"
                            options={["Chi phí vận chuyển", "Tiền thuê/Nợ nhà", "Trả tiền bảo hiểm", "Chi tiêu giáo dục", "Quyên góp từ thiện"]}
                            renderInput={(params) => <TextField variant="outlined" {...params} label="Nhóm chi" />}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên mới"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={handleCloseEditExpen}
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
    )
}