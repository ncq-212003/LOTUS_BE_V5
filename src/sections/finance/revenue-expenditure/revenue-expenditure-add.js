import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { styled, IconButton, SvgIcon, Grid, Button } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TreeViewRevenueExpenditure, { TabRevenue } from './tree-view-revenue-expenditure';
import { TabExpenditure } from './dialog-revenue-expenditure-add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { FormRevenueExpenditure } from './form-revenue-expenditure';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function RevenueExpenditure() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //data
    const optionRevenue = [
        { id: 1, title: "Học phí" },
        { id: 2, title: "Phí sinh hoạt" },
        { id: 3, title: "Bảo hiểm" },
    ];

    const optionExpenditure = [
        { id: 1, title: "Thuế và Giấy Tờ Pháp Lý" },
        { id: 2, title: "Chương Trình Giải Trí và Văn Hóa" },
        { id: 3, title: "Các Hạng Mục Khác" },
    ];
    // const optionExpenditure = ["Thuế và Giấy Tờ Pháp Lý", "Chương Trình Giải Trí và Văn Hóa", "Các Hạng Mục Khác"];
    const [treeDataRevenue, setTreeDataRevenue] = React.useState([
        {
            id: '1',
            label: 'Học phí',
            children: [
                { id: '2', label: 'Phí đăng ký nhập học' },
                { id: '3', label: 'Học phí cơ sở' },
            ],
        },
        {
            id: '4',
            label: 'Phí sinh hoạt',
            children: [
                { id: '5', label: 'Chỗ ở' },
                { id: '6', label: 'Ăn uống' },
                { id: '7', label: 'Đi lại' },
            ],
        },
        {
            id: '8',
            label: 'Bảo hiểm',
            children: [
                { id: '9', label: 'Bảo hiểm y tế' },
                { id: '10', label: 'Bảo hiểm du lịch' },
            ],
        },
    ]);
    const [treeDataExpenditure, setTreeDataExpenditure] = React.useState([
        {
            id: '1',
            label: 'Thuế và Giấy Tờ Pháp Lý',
            children: [
                { id: '2', label: 'Thuế thu nhập' },
                { id: '3', label: 'Chi phí visa và giấy tờ' },
            ],
        },
        {
            id: '4',
            label: 'Chương Trình Giải Trí và Văn Hóa',
            children: [
                { id: '5', label: 'Du lịch và giải trí' },
                { id: '6', label: 'Sự kiện văn hóa' },
            ],
        },
        {
            id: '7',
            label: 'Các Hạng Mục Khác',
            children: [
                { id: '8', label: 'Trả tiền bảo hiểm' },
            ],
        },
    ]);


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Hạng mục thu" value="1" />
                        <Tab label="Hạng mục chi" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormRevenueExpenditure options={optionRevenue} titleEdit={"thu"} />
                    <TreeViewRevenueExpenditure title={"Danh sách mục thu"} treeData={treeDataRevenue} />
                </TabPanel>
                <TabPanel value="2">
                    <FormRevenueExpenditure options={optionExpenditure} titleEdit={"chi"} />
                    <TreeViewRevenueExpenditure title={"Danh sách mục chi"} treeData={treeDataExpenditure} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}