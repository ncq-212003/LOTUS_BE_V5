/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfoBaseEmployee from "./info-basic-account";
import HealthConditionEmployee from "./heath-condition-account";

export default function AccountEdit() {
    const [valueTab, setValueTab] = useState("1");

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <>
            <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", minHeight: "95.9vh" }}>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Thông tin cơ bản" value="1" />
                            <Tab label="Tình trạng sức khỏe" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel
                        value="1"
                        sx={{
                            marginTop: "0px !important",
                            padding: "8px",
                        }}
                    >
                        <InfoBaseEmployee />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            marginTop: "0px !important",
                            padding: "8px",
                        }}
                    >
                        <HealthConditionEmployee />
                    </TabPanel>
                </TabContext>
            </Paper>
        </>
    );
}
