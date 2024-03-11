import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Tab, AppBar } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import HealthConditionEmployee from "./tab-healthcondition";
import InfoBaseEmployee from "./tab-infobasic";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeDetail({ open, onClose, rowData }) {
  const [valueTab, setValueTab] = useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
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
      // PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: "#1C2536" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            CHI TIẾT
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button> */}
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
            <InfoBaseEmployee rowData={rowData} />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <HealthConditionEmployee rowData={rowData} />
          </TabPanel>
        </TabContext>
      </Stack>
    </Dialog>
  );
}
