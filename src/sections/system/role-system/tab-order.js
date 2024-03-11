import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabOrder() {
    const [tabs, setTabs] = React.useState({
        'Đang tiến cử': {
            'Danh sách đơn hàng đang tiến cử': false,
            'Thêm đơn hàng đang tiến cử': false,
            'Sửa đơn hàng đang tiến cử': false,
            'Xóa đơn hàng đang tiến cử': false
        },
        'Đã tuyển xong': {
            'Danh sách đơn hàng đã tuyển xong': false,
            'Thêm đơn hàng đã tuyển xong': false,
            'Sửa đơn hàng đã tuyển xong': false,
            'Xóa đơn hàng đã tuyển xong': false
        },
        'Hoàn thành hồ sơ': {
            'Danh sách đơn hàng hoàn thành hồ sơ': false,
            'Thêm đơn hàng hoàn thành hồ sơ': false,
            'Sửa đơn hàng hoàn thành hồ sơ': false,
            'Xóa đơn hàng hoàn thành hồ sơ': false
        },
        'Hủy': {
            'Danh sách đơn hàng hủy': false,
            'Thêm đơn hàng hủy': false,
            'Sửa đơn hàng hủy': false,
            'Xóa đơn hàng hủy': false
        }
    });

    const handleParentChange = (parentName, event) => {
        const updatedTabs = { ...tabs };
        updatedTabs[parentName] = { ...tabs[parentName] };
        for (const child in updatedTabs[parentName]) {
            updatedTabs[parentName][child] = event.target.checked;
        }
        setTabs(updatedTabs);
    };

    const handleChildChange = (parentName, childName, event) => {
        setTabs((prevTabs) => ({
            ...prevTabs,
            [parentName]: {
                ...prevTabs[parentName],
                [childName]: event.target.checked
            }
        }));
    };

    return (
        <Grid container spacing={3}>
            {Object.keys(tabs).map((parentName) => (
                <TabCommon
                    key={parentName}
                    tabData={{
                        parentName,
                        checked: tabs,
                        setChecked: setTabs,
                        handleParentChange: (event) => handleParentChange(parentName, event),
                        handleChildChange: (childName, event) => handleChildChange(parentName, childName, event)
                    }}
                />
            ))}
        </Grid>
    );
}

