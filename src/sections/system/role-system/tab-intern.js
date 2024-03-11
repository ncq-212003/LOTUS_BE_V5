import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';


export default function TabIntern() {
    const [tabs, setTabs] = React.useState({
        'Thực tập sinh': {
            'Danh sách thực tập sịnh': false,
            'Thêm thực tập sinh': false,
            'Sửa thực tập sinh': false,
            'Xóa thực tập sinh': false
        },
        'Du học sinh': {
            'Danh sách du học sinh': false,
            'Thêm du học sinh': false,
            'Sửa du học sinh': false,
            'Xóa du học sinh': false
        },
        'Lịch bay': {
            'Danh sách lịch bay': false,
            'Thêm lịch bay': false,
            'Sửa lịch bay': false,
            'Xóa lịch bay': false
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

