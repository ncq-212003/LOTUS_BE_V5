import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import Slide from "@mui/material/Slide";
import {
    SvgIcon,
    Stack,
    Box,
    Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabInfoBasic from "./tab-infobasic-detail";
import TabContactDetail from "./tab-contact-detail";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props} />;
});

export default function UnionDetail({ open, onClose, id }) {
    const [valueTabOne, setValueTabOne] = useState("1");

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: {} }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div">
                        CHI TIẾT
                    </Typography>
                    <IconButton edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3}
                sx={{ p: 2, marginTop: "64px" }}>
                <TabContext value={valueTabOne}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChangeOne}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            <Tab label="Thông tin cơ bản"
                                value="1" />
                            <Tab label="Danh sách liên hệ"
                                value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabInfoBasic id={id} />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabContactDetail />
                    </TabPanel>

                </TabContext>
            </Stack>
        </Dialog>
    );
}
