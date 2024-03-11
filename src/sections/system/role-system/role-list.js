import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { Button, Dialog, Slide, DialogActions, DialogTitle, DialogContent, Box, Tab, Tabs, TabPanel, Typography, IconButton, SvgIcon } from "@mui/material";
import TabCalendar from "./tab-calendar";
import TabIntern from "./tab-intern";
import TabOrder from "./tab-order";
import TabDocument from "./tab-document";
import TabAttendance from "./tab-attendance";
import TabFinance from "./tab-finance";
import TabCustomer from "./tab-customer";
import TabTrain from "./tab-train";
import TabCompany from "./tab-company";
import TabSetting from "./tab-setting";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RoleList({ open, onClose, selectedRow, selectedTab, handleTabChange }) {

    const handleClose = () => {
        onClose();
    };
    const permissions = [
        { id: 1, name: 'Lịch công tác', tab: <TabCalendar /> },
        { id: 2, name: 'TTS/DHS', tab: <TabIntern /> },
        { id: 3, name: 'Đơn hàng', tab: <TabOrder /> },
        { id: 4, name: 'Hồ sơ', tab: <TabDocument /> },
        { id: 5, name: 'Điểm danh', tab: <TabAttendance /> },
        { id: 6, name: 'Tài chính ', tab: <TabFinance /> },
        { id: 7, name: 'Khách hàng', tab: <TabCustomer /> },
        { id: 8, name: 'Đào tạo', tab: <TabTrain /> },
        { id: 9, name: 'Công ty', tab: <TabCompany /> },
        { id: 10, name: 'Cài đặt', tab: <TabSetting /> },
        { id: 11, name: 'Báo cáo' }
    ]



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle sx={{ backgroundColor: '#1C2536', display: 'flex' }}>
                <Typography sx={{ flex: 1, display: 'flex', alignItems: 'center' }} variant="h6" component="div" color="white">
                    Phân quyền cho nhóm: {selectedRow.roleName}
                </Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <SvgIcon fontSize="small" sx={{ color: 'white' }}>
                        <XCircleIcon />
                    </SvgIcon>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ typography: 'body1' }}>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        {permissions.map((permission) => (
                            <Tab key={permission.id} label={permission.name} />
                        ))}
                    </Tabs>
                </Box>
                {permissions.map((permission) => (
                    <TabPanel key={permission.id} value={selectedTab} index={permission.id - 1}>
                        {permission.tab}
                    </TabPanel>
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ m: 1, background: '#1C2536' }}

                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );

    function TabPanel({ children, value, index }) {
        return (
            <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
                {value === index && <Box p={3}>{children}</Box>}
            </div>
        );
    }
}
