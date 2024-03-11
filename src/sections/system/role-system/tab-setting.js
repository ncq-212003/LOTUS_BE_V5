import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabSetting() {
    const [tabs, setTabs] = React.useState({
        'Cài đặt': {
            'Danh sách cài đặt': false,
            'Thêm cài đặt': false,
            'Sửa cài đặt': false,
            'Xóa cài đặt': false
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

