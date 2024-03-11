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
import TabInfoBasic from "./tab-infobasic";
import TabHealthCondition from "./tab-healthcondition";
import TabTrainIQ from "./tab-trainIQ";
import TabProfile from "./tab-profile";
import TabFamilyRelationship from "./tab-familyrelationship";
import TabStudyProcess from "./tab-studyprocess";
import TabWorkExperienceDomestically from "./tab-workexperience-domestically";
import TabWorkExperienceInternationally from "./tab-workexperience-internationally";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import { useApp } from "src/hooks/use-app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InternEdit({ open, onClose, rowData }) {
  const [valueTabOne, setValueTabOne] = useState("1");

  //context
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { thucTapSinh } = intern;
  // console.log(rowData);
  useEffect(() => {
    const fetchData = () => {
      dispatch({
        type: HANDLERS_INTERN.SET_VALUES_FOR_EDIT_INTERN,
        payload: { rowData },
      });
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có rowData
    if (open && rowData) {
      fetchData();
    }
  }, [open, rowData]);

  const handleChangeOne = (event, newValue) => {
    setValueTabOne(newValue);
  };

  const handleClose = (isEvent) => {
    onClose(isEvent);
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
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
        <TabContext value={valueTabOne}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeOne}>
              <Tab label="Thông tin cơ bản" value="1" />
              <Tab label="Tình trạng sức khỏe" value="2" />
              <Tab label="Hồ sơ" value="3" />
              <Tab label="Đào tạo" value="4" />
              <Tab label="Quan hệ gia đình" value="5" />
              <Tab label="Quá trình học tập" value="6" />
              <Tab label="Kinh nghiệm làm việc trong nước" value="7" />
              <Tab label="Kinh nghiệm làm việc ngoài nước" value="8" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabInfoBasic />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabHealthCondition />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabProfile />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabTrainIQ />
          </TabPanel>
          <TabPanel
            value="5"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabFamilyRelationship />
          </TabPanel>
          <TabPanel
            value="6"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabStudyProcess />
          </TabPanel>
          <TabPanel
            value="7"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabWorkExperienceDomestically />
          </TabPanel>
          <TabPanel
            value="8"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabWorkExperienceInternationally />
          </TabPanel>
        </TabContext>
      </Stack>
    </Dialog>
  );
}
