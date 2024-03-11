import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabCalendar() {
    const [tabs, setTabs] = React.useState({
        'Lịch': {
            'Danh sách lịch': false,
            'Thêm lịch': false,
            'Sửa lịch': false,
            'Xóa lịch': false
        },
        'Địa điểm': {
            'Danh sách địa điểm': false,
            'Thêm địa điểm': false,
            'Sửa địa điểm': false,
            'Xóa địa điểm': false
        },
        'Xe': {
            'Danh sách xe': false,
            'Thêm xe': false,
            'Sửa xe': false,
            'Xóa xe': false
        },
        'Quà tặng': {
            'Danh sách quà tặng': false,
            'Thêm quà tặng': false,
            'Sửa quà tặng': false,
            'Xóa quà tặng': false
        },
        'Tiến trình': {
            'Danh sách tiến trình': false,
            'Thêm tiến trình': false,
            'Sửa tiến trình': false,
            'Xóa tiến trình': false
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

