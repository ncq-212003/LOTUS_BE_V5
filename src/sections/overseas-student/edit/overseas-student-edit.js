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
import InfoRecord from "src/components/info-record";
import TabInfoBasic from "./tab-infobasic";
import TabHealthCondition from "./tab-healthcondition";
import TabTrainIQ from "./tab-trainIQ";
import TabaSpirationsAdmission from "./tab-aspirations-admission";
import TabFamilyRelationship from "./tab-familyrelationship";
import TabStudyProcess from "./tab-studyprocess";
import TabWorkExperienceDomestically from "./tab-workexperience-domestically";
import TabWorkExperienceInternationally from "./tab-workexperience-internationally";
import TabGeneralNotes from "./tab-general-notes";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props} />;
});

export default function OverseasStudentEdit({ open, onClose }) {
    const [valueTabOne, setValueTabOne] = useState("1");

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

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
            PaperProps={{ sx: {} }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <IconButton edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button autoFocus
                        color="inherit"
                        onClick={handleAdd}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3}
                sx={{ p: 2, marginTop: "64px", marginBottom: "64px" }}>
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
                            <Tab label="Tình trạng sức khỏe"
                                value="2" />
                            <Tab label="Nguyện vọng - Trúng Tuyển"
                                value="4" />
                            <Tab label="Đào tạo"
                                value="3" />
                            <Tab label="Quan hệ gia đình"
                                value="5" />
                            <Tab label="Quá trình học tập"
                                value="6" />
                            <Tab label="Kinh nghiệm trong nước"
                                value="7" />
                            <Tab label="Kinh nghiệm ngoài nước"
                                value="8" />
                            <Tab label="Ghi chú chung"
                                value="9" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabInfoBasic />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabHealthCondition />
                    </TabPanel>
                    <TabPanel
                        value="3"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabTrainIQ />
                    </TabPanel>
                    <TabPanel
                        value="4"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabaSpirationsAdmission />
                    </TabPanel>
                    <TabPanel value="5"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabFamilyRelationship />
                    </TabPanel>
                    <TabPanel
                        value="6"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabStudyProcess />
                    </TabPanel>
                    <TabPanel
                        value="7"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabWorkExperienceDomestically />
                    </TabPanel>
                    <TabPanel
                        value="8"
                        sx={{
                            marginTop: '0px !important',
                            padding: '8px'
                        }}
                    >
                        <TabWorkExperienceInternationally />
                    </TabPanel>
                    <TabPanel
                        value="9"
                        sx={{
                            marginTop: "0px !important",
                            padding: "8px",
                        }}
                    >
                        <TabGeneralNotes />
                    </TabPanel>
                </TabContext>
            </Stack>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "#e3e6e6",
                    padding: "4px",
                    zIndex: 1999
                }}
            >
                <InfoRecord />
            </Box>
        </Dialog>
    );
}
