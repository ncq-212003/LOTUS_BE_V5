import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import {
    Stack,
    Box,
    Tab,

} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabHealthCondition from "src/sections/overseas-student/add/tab-healthcondition";
import TabInfoBasic from "./tab-infobasic";
import TabContact from "./tab-contact";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props} />;
});

export default function OverseasStudentAdd() {
    const [valueTabOne, setValueTabOne] = useState("1");
    const [valueTabTwo, setValueTabTwo] = useState(1);

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

    const handleChangeTwo = (event, newValue) => {
        setValueTabTwo(newValue);
    };

    return (
        <Stack spacing={3}
            sx={{ p: 2, marginTop: "64px" }}>
            <TabContext value={valueTabOne}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeOne}>
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
                    <TabInfoBasic />
                </TabPanel>
                <TabPanel
                    value="2"
                    sx={{
                        marginTop: '0px !important',
                        padding: '8px'
                    }}
                >
                    <TabContact />
                </TabPanel>
            </TabContext>
        </Stack>
    );
}