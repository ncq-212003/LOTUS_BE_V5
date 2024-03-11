import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCommon from './tab-common';

export default function TabFinance() {
    const [tabs, setTabs] = React.useState({
        'Báo cáo thu': {
            'Danh sách báo cáo thu': false,
            'Thêm báo cáo thu': false,
            'Sửa báo cáo thu': false,
            'Xóa báo cáo thu': false
        },
        'Báo cáo chi': {
            'Danh sách báo cáo chi': false,
            'Thêm báo cáo chi': false,
            'Sửa báo cáo chi': false,
            'Xóa báo cáo chi': false
        },
        'Chương trình': {
            'Danh sách chương trình': false,
            'Thêm chương trình': false,
            'Sửa chương trình': false,
            'Xóa chương trình': false
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

