
import React, { useState, } from "react";
import Slide from "@mui/material/Slide";
import {
    Stack,
    Box,
    Tab,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    SvgIcon,
    Typography,
    Button,

} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabInfoPartner from "./tab-infopartner";
import TabInfoAdditional from "./tab-infoadditional";
import TabSalary from "./tab-salary";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderDetail({ open, onClose, id }) {
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
                    {/* <IconButton edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton> */}
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
                    {/* <Button autoFocus
                        color="inherit"
                        onClick={handleClose}>
                        Thoát
                    </Button> */}
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
                            <Tab label="Thông tin đối tác"
                                value="1" />
                            <Tab label="Mức lương, phí"
                                value="3" />
                            <Tab label="Thông tin bổ sung"
                                value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabInfoPartner />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabInfoAdditional />
                    </TabPanel>
                    <TabPanel
                        value="3"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabSalary />
                    </TabPanel>
                </TabContext>
            </Stack>
        </Dialog>
    );
}