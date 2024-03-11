
import React, { useState, } from "react";
import Slide from "@mui/material/Slide";
import {
    Stack,
    Box,
    Tab,

} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabInfoPartner from "./tab-infopartner";
import TabInfoAdditional from "./tab-infoadditional";
import TabSalary from "./tab-salary";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props} />;
});

export default function ProgressAdd() {
    const [valueTabOne, setValueTabOne] = useState("1");

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

    return (
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
    );
}